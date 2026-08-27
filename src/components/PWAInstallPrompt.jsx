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
      // Stop browser's default install UI
      event.preventDefault();

      // Save install event
      setDeferredPrompt(event);

      // Show our popup after 2 seconds
      setTimeout(() => {
        setShowPopup(true);
      }, 2);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowPopup(false);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log("SahajoMart install result:", outcome);

    setDeferredPrompt(null);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup || !deferredPrompt) {
    return null;
  }

  return (
    <div className="pwa-overlay">
      <div className="pwa-popup">
        <div className="pwa-app-icon">
            <img
            src='https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg' border='0'
             alt='img-2-1784471233954-jpg'
             
          />
        </div>

        <h2>Install Sahjo Mart</h2>

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