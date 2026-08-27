import { useEffect, useState } from "react";
import "./PWAInstallPrompt.css";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // ==========================================
    // CHECK INSTALLED / STANDALONE
    // ==========================================
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return;
    }

    // ==========================================
    // DETECT iPHONE / iPAD / iOS SAFARI
    // ==========================================
    const userAgent = window.navigator.userAgent;

    const ios =
      /iPhone|iPad|iPod/i.test(userAgent) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1);

    setIsIOS(ios);

    // ==========================================
    // iOS / SAFARI
    // Safari does NOT support beforeinstallprompt
    // ==========================================
    if (ios) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);

      return () => clearTimeout(timer);
    }

    // ==========================================
    // ANDROID / CHROME
    // ==========================================
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      setDeferredPrompt(event);

      setTimeout(() => {
        setShowPopup(true);
      }, 2000);
    };

    const handleAppInstalled = () => {
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

  // ==========================================
  // ANDROID INSTALL
  // ==========================================
  const installApp = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();

    const { outcome } =
      await deferredPrompt.userChoice;

    console.log(
      "SahajoMart install result:",
      outcome
    );

    setDeferredPrompt(null);
    setShowPopup(false);
  };

  // ==========================================
  // CLOSE
  // ==========================================
  const closePopup = () => {
    setShowPopup(false);
  };

  // ==========================================
  // NOTHING TO SHOW
  // ==========================================
  if (!showPopup) {
    return null;
  }

  return (
    <div className="pwa-overlay">
      <div className="pwa-popup">

        {/* APP ICON */}
        <div className="pwa-app-icon">
          <img
            src="https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg"
            alt="SahajoMart"
          />
        </div>

        {/* ================================= */}
        {/* iOS / SAFARI */}
        {/* ================================= */}

        {isIOS ? (
          <>
            <h2>Install SahajoMart</h2>

            <p className="pwa-ios-text">
              Add SahajoMart to your iPhone
              Home Screen for a faster
              shopping experience.
            </p>

            <div className="ios-install-steps">

              <div className="ios-step">
                <span className="ios-number">1</span>

                <span>
                  Tap the{" "}
                  <strong>Share</strong>{" "}
                  button in Safari
                </span>
              </div>

              <div className="ios-step">
                <span className="ios-number">2</span>

                <span>
                  Select{" "}
                  <strong>
                    Add to Home Screen
                  </strong>
                </span>
              </div>

              <div className="ios-step">
                <span className="ios-number">3</span>

                <span>
                  Tap <strong>Add</strong>
                </span>
              </div>

            </div>

            <button
              className="pwa-later-button pwa-close-button"
              onClick={closePopup}
            >
              Maybe Later
            </button>
          </>
        ) : (
          /* ================================= */
          /* ANDROID / CHROME */
          /* ================================= */
          <>
            <h2>Install SahajoMart</h2>

            <p>
              Install our app for a faster
              and better shopping experience.
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
          </>
        )}

      </div>
    </div>
  );
};

export default PWAInstallPrompt;