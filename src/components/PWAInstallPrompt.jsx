import { useEffect, useState } from 'react';
import './PWAInstallPrompt.css';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
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
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`SahajoMart install result: ${outcome}`);
    setDeferredPrompt(null);
    setShowPopup(false);
  };

  if (!showPopup || !deferredPrompt) return null;

  return (
    <div className="pwa-overlay">
      <div className="pwa-popup">
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
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
