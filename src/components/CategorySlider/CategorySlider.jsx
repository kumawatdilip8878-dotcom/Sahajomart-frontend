import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./CategorySlider.css";

const CategorySlider = ({
  id,
  title,
  description,
  items = [],
}) => {
  /* =====================================================
     DEVICE
  ===================================================== */

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth <= 600
      : false
  );

  /* =====================================================
     MOBILE STATES
  ===================================================== */

  const [mobileIndex, setMobileIndex] =
    useState(0);

  const [mobileAnimate, setMobileAnimate] =
    useState(true);

  const [mobilePaused, setMobilePaused] =
    useState(false);

  /* =====================================================
     SAFE ITEMS
  ===================================================== */

  const safeItems = useMemo(() => {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.filter(
      (item) =>
        item &&
        typeof item.image === "string" &&
        item.image.trim() !== ""
    );
  }, [items]);

  /* =====================================================
     CHECK SCREEN
  ===================================================== */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth <= 600
      );
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "orientationchange",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "orientationchange",
        handleResize
      );
    };
  }, []);

  /* =====================================================
     RESET WHEN CATEGORY CHANGES
  ===================================================== */

  useEffect(() => {
    setMobileIndex(0);

    setMobileAnimate(true);

    setMobilePaused(false);
  }, [id]);

  /* =====================================================
     UNIQUE CATEGORY NUMBER

     Har category ki timing alag hogi
  ===================================================== */

  const uniqueNumber = useMemo(() => {
    if (!id) {
      return 1;
    }

    return id
      .split("")
      .reduce(
        (total, character) =>
          total +
          character.charCodeAt(0),
        0
      );
  }, [id]);

  /* =====================================================
     MOBILE AUTO SLIDER

     - alag-alag timing
     - fade
     - jump
     - tap pause/start
  ===================================================== */

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    if (safeItems.length <= 1) {
      return;
    }

    if (mobilePaused) {
      return;
    }

    /*
      Har category ka alag interval

      Approx:
      3200ms
      3900ms
      4600ms
      5300ms
      6000ms
    */

    const intervalTime =
      3200 +
      (uniqueNumber % 5) * 700;

    /*
      Har category alag time
      se first change karegi
    */

    const firstDelay =
      800 +
      (uniqueNumber % 6) * 450;

    let intervalId = null;

    let firstTimeout = null;

    let animationTimeout = null;

    /* =================================================
       CHANGE IMAGE
    ================================================= */

    const changeSlide = () => {
      /*
        Old image fade out
      */

      setMobileAnimate(false);

      animationTimeout =
        setTimeout(() => {
          /*
            Next image
          */

          setMobileIndex(
            (previousIndex) =>
              (previousIndex + 1) %
              safeItems.length
          );

          /*
            New image fade + jump
          */

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setMobileAnimate(true);
            });
          });
        }, 300);
    };

    /* =================================================
       START
    ================================================= */

    firstTimeout = setTimeout(() => {
      changeSlide();

      intervalId = setInterval(
        changeSlide,
        intervalTime
      );
    }, firstDelay);

    /* =================================================
       CLEANUP
    ================================================= */

    return () => {
      if (firstTimeout) {
        clearTimeout(firstTimeout);
      }

      if (animationTimeout) {
        clearTimeout(
          animationTimeout
        );
      }

      if (intervalId) {
        clearInterval(intervalId);
      }

      setMobileAnimate(true);
    };
  }, [
    isMobile,
    mobilePaused,
    safeItems.length,
    uniqueNumber,
  ]);

  /* =====================================================
     DESKTOP ITEMS

     Same list ko 2 baar duplicate
     continuous infinite slider ke liye
  ===================================================== */

  const desktopItems = useMemo(() => {
    return [
      ...safeItems,
      ...safeItems,
    ];
  }, [safeItems]);

  /* =====================================================
     MOBILE TAP PAUSE / START
  ===================================================== */

  const toggleMobileSlider = () => {
    if (!isMobile) {
      return;
    }

    if (safeItems.length <= 1) {
      return;
    }

    setMobilePaused(
      (previousState) =>
        !previousState
    );
  };

  /* =====================================================
     EMPTY
  ===================================================== */

  if (safeItems.length === 0) {
    return null;
  }

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <section
      className="category-section"
      id={id}
    >
      <div className="category-container">

        {/* ===============================================
            TITLE
        =============================================== */}

        <div className="category-heading">

          <h2>
            {title}
          </h2>

          {description && (
            <p>
              {description}
            </p>
          )}

        </div>


        {/* ===============================================
            MOBILE
        =============================================== */}

        {isMobile ? (

          <div
            className={`category-mobile-slider ${
              mobilePaused
                ? "mobile-paused"
                : ""
            }`}
            onClick={
              toggleMobileSlider
            }
            role="button"
            tabIndex={0}
            aria-pressed={
              mobilePaused
            }
            aria-label={
              mobilePaused
                ? `${title} slider start`
                : `${title} slider pause`
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();

                toggleMobileSlider();
              }
            }}
          >

            <div
              className={`category-mobile-card ${
                mobileAnimate
                  ? "mobile-slide-show"
                  : "mobile-slide-hide"
              }`}
            >

              <img
                src={
                  safeItems[
                    mobileIndex
                  ]?.image
                }
                alt={
                  safeItems[
                    mobileIndex
                  ]?.alt ||
                  `${title} ${
                    mobileIndex + 1
                  }`
                }
                draggable="false"
              />

            </div>

          </div>

        ) : (

          /* =============================================
             PC / TABLET
          ============================================= */

          <div className="category-desktop-viewport">

            <div className="category-desktop-track">

              {desktopItems.map(
                (item, index) => (

                  <div
                    className="category-desktop-slide"
                    key={`${id}-${index}`}
                  >

                    <div className="category-image-wrapper">

                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.alt ||
                          `${title} ${
                            (index %
                              safeItems.length) +
                            1
                          }`
                        }
                        loading="lazy"
                        draggable="false"
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      </div>
    </section>
  );
};

export default CategorySlider;