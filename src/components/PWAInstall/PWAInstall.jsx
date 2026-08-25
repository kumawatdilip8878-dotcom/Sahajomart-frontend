import { useEffect, useState } from "react";
import "./PWAInstall.css";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isInstalled) {
      console.log("SahajoMart is already installed");
      return;
    }

    const handleBeforeInstallPrompt = (event) => {
      console.log("✅ beforeinstallprompt fired");

      event.preventDefault();

      setDeferredPrompt(event);

      setTimeout(() => {
        setShowPopup(true);
      }, 2000);
    };

    const handleAppInstalled = () => {
      console.log("✅ SahajoMart installed");

      setDeferredPrompt(null);
      setShowPopup(false);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) {
      console.log("❌ Install prompt is not available");
      return;
    }

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
            alt="SahajoMart"
          />
        </div>

        <h2>Install SahajoMart</h2>

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