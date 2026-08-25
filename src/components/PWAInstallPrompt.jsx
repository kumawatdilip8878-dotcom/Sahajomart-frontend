<<<<<<< HEAD
import { useEffect, useState } from 'react';
import './PWAInstallPrompt.css';
=======
import { useEffect, useState } from "react";
import "./PWAInstallPrompt.css";
>>>>>>> b01cfae25f5df4e8d0e6d429207868e84cafd56e

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    const installed =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (installed) return;

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowPopup(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowPopup(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
=======
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
>>>>>>> b01cfae25f5df4e8d0e6d429207868e84cafd56e
    };
  }, []);

  const installApp = async () => {
<<<<<<< HEAD
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`SahajoMart install result: ${outcome}`);
=======
    if (!deferredPrompt) {
      return;
    }

    // Open browser install dialog
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log("Install result:", outcome);

>>>>>>> b01cfae25f5df4e8d0e6d429207868e84cafd56e
    setDeferredPrompt(null);
    setShowPopup(false);
  };

<<<<<<< HEAD
  if (!showPopup || !deferredPrompt) return null;
=======
  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }
>>>>>>> b01cfae25f5df4e8d0e6d429207868e84cafd56e

  return (
    <div className="pwa-overlay">
      <div className="pwa-popup">
<<<<<<< HEAD
        <div className="pwa-app-icon">
          <img src="/icons/icon-192.png" alt="SahajoMart" />
        </div>
        <h2>Install SahajoMart</h2>
        <p>Install our app for a faster and better shopping experience.</p>
        <button className="pwa-install-button" onClick={installApp}>
          Install App
        </button>
        <button className="pwa-later-button" onClick={() => setShowPopup(false)}>
          Maybe Later
        </button>
=======

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

>>>>>>> b01cfae25f5df4e8d0e6d429207868e84cafd56e
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default PWAInstallPrompt;
=======
export default PWAInstallPrompt;
>>>>>>> b01cfae25f5df4e8d0e6d429207868e84cafd56e
