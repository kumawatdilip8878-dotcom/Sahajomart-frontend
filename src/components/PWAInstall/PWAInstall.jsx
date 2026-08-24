import { useEffect, useState } from "react";
import "./PWAInstall.css";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();

      setDeferredPrompt(event);
      setShowInstall(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log("Install result:", outcome);

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  if (!showInstall) {
    return null;
  }

  return (
    <div className="install-pwa">
      <div className="install-pwa-content">
        <div>
          <h3>Install SahajoMart</h3>

          <p>
            Install SahajoMart for a faster app-like experience.
          </p>
        </div>

        <button onClick={handleInstall}>
          Install App
        </button>
      </div>
    </div>
  );
};

export default InstallPWA;