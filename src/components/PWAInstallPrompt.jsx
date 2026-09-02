import { useEffect, useRef, useState } from "react";
import { MdInstallMobile } from "react-icons/md";
import "./PWAInstallPrompt.css";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [showIOSPopup, setShowIOSPopup] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const hideTimerRef = useRef(null);

  useEffect(() => {
    // ==========================================
    // CHECK IF APP ALREADY INSTALLED
    // ==========================================
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return;
    }

    // ==========================================
    // DETECT IOS
    // ==========================================
    const userAgent = window.navigator.userAgent;

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
    // ANDROID / CHROME INSTALL EVENT
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

  // ==========================================
  // INSTALL BUTTON CLICK
  // ==========================================
  const installApp = async () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    // ==========================================
    // IOS / SAFARI
    // ==========================================
    if (isIOS) {
      setShowButton(false);
      setShowIOSPopup(true);

      return;
    }

    // ==========================================
    // ANDROID / CHROME
    // ==========================================
    if (!deferredPrompt) {
      console.log("Install prompt not available.");
      return;
    }

    try {
      await deferredPrompt.prompt();

      const { outcome } =
        await deferredPrompt.userChoice;

      console.log(
        "SahajoMart install result:",
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
      {/* ======================================
          INSTALL BUTTON
      ====================================== */}

      {showButton && (
      <button
  className="pwa-floating-install"
  onClick={installApp}
  type="button"
  aria-label="Install SahajoMart App"
>
  <MdInstallMobile className="pwa-install-icon" />
  <span>Install</span>
</button>
      )}


      {/* ======================================
          IOS INSTALL POPUP
      ====================================== */}

      {showIOSPopup && (
        <div className="ios-install-overlay">

          <div className="ios-install-popup">

            {/* CLOSE BUTTON */}

            <button
              className="ios-popup-close"
              onClick={() =>
                setShowIOSPopup(false)
              }
              type="button"
              aria-label="Close"
            >
              ✕
            </button>


            {/* LOGO */}

            <div className="ios-app-logo">
              <img
                src="https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg"
                alt="SahajoMart"
              />
            </div>


            {/* TITLE */}

            <h3>
              Install SahjoMart
            </h3>


            <p>
              Add SahjoMart to your
              iPhone Home Screen.
            </p>


            {/* STEPS */}

            <div className="ios-steps">

              {/* STEP 1 */}

              <div className="ios-step">

                <span className="step-number">
                  1
                </span>

                <span>
                  Tap the{" "}
                  <strong>
                    Share ⬆
                  </strong>{" "}
                  button in Safari
                </span>

              </div>


              {/* STEP 2 */}

              <div className="ios-step">

                <span className="step-number">
                  2
                </span>

                <span>
                  Select{" "}
                  <strong>
                    Add to Home Screen
                  </strong>
                </span>

              </div>


              {/* STEP 3 */}

              <div className="ios-step">

                <span className="step-number">
                  3
                </span>

                <span>
                  Tap{" "}
                  <strong>
                    Add
                  </strong>
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