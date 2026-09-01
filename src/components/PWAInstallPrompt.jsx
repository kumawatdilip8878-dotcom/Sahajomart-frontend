import { useEffect, useRef, useState } from "react";
import "./PWAInstallPrompt.css";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [showIOSPopup, setShowIOSPopup] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const hideTimerRef = useRef(null);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) return;

    const userAgent = navigator.userAgent;

    const ios =
      /iPhone|iPad|iPod/i.test(userAgent) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1);

    setIsIOS(ios);

    // ==========================================
    // SHOW BUTTON IMMEDIATELY
    // ==========================================
    setShowButton(true);

    // ==========================================
    // HIDE AFTER 6 SECONDS
    // ==========================================
    hideTimerRef.current = setTimeout(() => {
      setShowButton(false);
    }, 6000);

    // ==========================================
    // ANDROID INSTALL EVENT
    // ==========================================
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      setDeferredPrompt(event);
    };

    // ==========================================
    // APP INSTALLED
    // ==========================================
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowButton(false);
      setShowIOSPopup(false);

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
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

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const installApp = async () => {
    // Stop auto-hide when user clicks
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    // iPhone / iPad
    if (isIOS) {
      setShowButton(false);
      setShowIOSPopup(true);
      return;
    }

    // Android
    if (!deferredPrompt) {
      return;
    }

    try {
      await deferredPrompt.prompt();

      const { outcome } =
        await deferredPrompt.userChoice;

      console.log(
        "SahajoMart install:",
        outcome
      );

      setDeferredPrompt(null);
      setShowButton(false);
    } catch (error) {
      console.error(
        "PWA install error:",
        error
      );
    }
  };

  return (
    <>
      {showButton && (
        <button
          className="pwa-floating-install"
          onClick={installApp}
          type="button"
        >
          <span className="pwa-mobile-symbol">
            ▣
          </span>

          <span>
            ऐप इंस्टॉल करें
          </span>
        </button>
      )}

      {showIOSPopup && (
        <div className="ios-install-overlay">
          <div className="ios-install-popup">

            <button
              className="ios-popup-close"
              onClick={() =>
                setShowIOSPopup(false)
              }
              type="button"
            >
              ✕
            </button>

            <div className="ios-app-logo">
              <img
                src="https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg"
                alt="SahajoMart"
              />
            </div>

            <h3>
              Install SahajoMart
            </h3>

            <p>
              Add SahajoMart to your Home Screen.
            </p>

            <div className="ios-steps">

              <div className="ios-step">
                <span className="step-number">
                  1
                </span>

                <span>
                  Tap the <strong>Share ⬆</strong> button in Safari
                </span>
              </div>

              <div className="ios-step">
                <span className="step-number">
                  2
                </span>

                <span>
                  Select <strong>Add to Home Screen</strong>
                </span>
              </div>

              <div className="ios-step">
                <span className="step-number">
                  3
                </span>

                <span>
                  Tap <strong>Add</strong>
                </span>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;