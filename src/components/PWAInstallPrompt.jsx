import { useEffect, useState } from "react";
import "./PWAInstallPrompt.css";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isInstalled) {
      return;
    }

    const handleBeforeInstallPrompt = (event) => {
      // Stop browser's default mini install UI
      event.preventDefault();

      // Save install event
      setDeferredPrompt(event);

      // Show our popup after 2 seconds
      setTimeout(() => {
        setShowPopup(true);
      }, 2000);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Open browser install dialog
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log("Install result:", outcome);

    setDeferredPrompt(null);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="pwa-overlay">
      <div className="pwa-popup">

        <div className="pwa-app-icon">
          <img
            src="/icons/icon-192.png"
            alt="Sahajomart"
          />
        </div>

        <h2>Install Sahajomart</h2>

        <p>
          Install our app for a faster and better
          shopping experience.
        </p>

        <button
          className="pwa-install-button"
          onClick={installApp}
        >
          Install App
        </button>

        <button
          className="pwa-later-button"
          onClick={closePopup}
        >
          Maybe Later
        </button>

      </div>
    </div>
  );
};

export default PWAInstallPrompt;