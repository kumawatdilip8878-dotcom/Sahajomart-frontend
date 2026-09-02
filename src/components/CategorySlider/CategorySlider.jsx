import React, {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import "./CategorySlider.css";

function CategorySlider({
  id,
  title,
  description,
  items = [],
}) {
  /* =====================================================
     REFS
  ===================================================== */

  const trackRef = useRef(null);

  const positionRef = useRef(0);

  const animationRef = useRef(null);

  const pausedRef = useRef(false);

  const currentIndexRef = useRef(0);

  const firstFadeRef = useRef(true);

  const reactId = useId();


  /* =====================================================
     STATES
  ===================================================== */

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      return window.innerWidth <= 768;
    });


  /* =====================================================
     DATA
  ===================================================== */

  const originalLength = items.length;

  const extendedItems = [
    ...items,
    ...items,
    ...items,
  ];


  /* =====================================================
     DIFFERENT TIMING FOR EACH CATEGORY SLIDER
  ===================================================== */

  const timingRef = useRef(null);

  if (timingRef.current === null) {
    /*
      id + title + React unique id

      Isse har CategorySlider ka
      timer different rahega.
    */

    const key = `${id || ""}-${
      title || ""
    }-${reactId}`;

    let hash = 0;

    for (
      let i = 0;
      i < key.length;
      i++
    ) {
      hash =
        (
          hash * 31 +
          key.charCodeAt(i)
        ) %
        100000;
    }

    timingRef.current = {
      /*
        First change:
        1.4 sec se 3.8 sec ke beech
      */

      firstDelay:
        1400 +
        (hash % 2400),

      /*
        Uske baad:
        5.2 sec se 7.7 sec ke beech
      */

      interval:
        5200 +
        (hash % 2500),
    };
  }


  /* =====================================================
     UPDATE CURRENT INDEX
  ===================================================== */

  const updateCurrentIndex = (
    index
  ) => {
    currentIndexRef.current =
      index;

    setCurrentIndex(index);
  };


  /* =====================================================
     MOBILE / DESKTOP DETECTION
  ===================================================== */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth <= 768
      );
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);


  /* =====================================================
     RESET FIRST MOBILE FADE
  ===================================================== */

  useEffect(() => {
    if (isMobile) {
      firstFadeRef.current =
        true;
    }
  }, [isMobile]);


  /* =====================================================
     GET DESKTOP SLIDE WIDTH
  ===================================================== */

  const getSlideWidth = () => {
    const track =
      trackRef.current;

    if (!track) {
      return 0;
    }

    const card =
      track.querySelector(
        ".slide-card"
      );

    if (!card) {
      return 0;
    }

    const cardWidth =
      card.getBoundingClientRect()
        .width;

    const styles =
      window.getComputedStyle(
        track
      );

    const gap =
      parseFloat(
        styles.gap
      ) || 0;

    return cardWidth + gap;
  };


  /* =====================================================
     DESKTOP AUTO SLIDER
  ===================================================== */

  useEffect(() => {
    /*
      Mobile par horizontal
      animation nahi chalegi.
    */

    if (isMobile) {
      return;
    }

    const track =
      trackRef.current;

    if (
      !track ||
      !originalLength
    ) {
      return;
    }

    let running = true;

    let lastTime =
      performance.now();

    /*
      Desktop slider speed
    */

    const speed = 20;


    /* =================================================
       ANIMATION
    ================================================= */

    const animate = (time) => {
      if (!running) {
        return;
      }

      let delta =
        time - lastTime;

      lastTime = time;


      /*
        Browser tab change ke baad
        sudden jump prevent karta hai.
      */

      if (delta > 50) {
        delta = 50;
      }


      const width =
        getSlideWidth();


      if (
        width &&
        !pausedRef.current
      ) {
        const oneSetWidth =
          width *
          originalLength;


        /* =========================================
           MOVE
        ========================================= */

        positionRef.current +=
          (
            speed *
            delta
          ) /
          1000;


        /* =========================================
           INFINITE LOOP
        ========================================= */

        if (
          positionRef.current >=
          oneSetWidth * 2
        ) {
          positionRef.current -=
            oneSetWidth;
        }


        if (
          positionRef.current <
          oneSetWidth
        ) {
          positionRef.current +=
            oneSetWidth;
        }


        /* =========================================
           TRANSFORM
        ========================================= */

        track.style.transform =
          `translate3d(${
            -positionRef.current
          }px, 0, 0)`;


        /* =========================================
           CURRENT DOT
        ========================================= */

        const index =
          Math.floor(
            positionRef.current /
              width
          ) %
          originalLength;


        const safeIndex =
          index < 0
            ? 0
            : index;


        if (
          safeIndex !==
          currentIndexRef.current
        ) {
          updateCurrentIndex(
            safeIndex
          );
        }
      }


      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };


    /* =================================================
       INITIALIZE
    ================================================= */

    const initialize = () => {
      const width =
        getSlideWidth();

      if (!width) {
        return;
      }


      /*
        Middle duplicate set se
        slider start hoga.
      */

      positionRef.current =
        (
          originalLength +
          currentIndexRef.current
        ) *
        width;


      track.style.transform =
        `translate3d(${
          -positionRef.current
        }px, 0, 0)`;


      lastTime =
        performance.now();


      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };


    const timer =
      setTimeout(
        initialize,
        100
      );


    /* =================================================
       DESKTOP RESIZE
    ================================================= */

    const handleResize = () => {
      const width =
        getSlideWidth();

      if (!width) {
        return;
      }


      positionRef.current =
        (
          originalLength +
          currentIndexRef.current
        ) *
        width;


      track.style.transform =
        `translate3d(${
          -positionRef.current
        }px, 0, 0)`;
    };


    window.addEventListener(
      "resize",
      handleResize
    );


    /* =================================================
       CLEANUP
    ================================================= */

    return () => {
      running = false;

      clearTimeout(timer);

      window.removeEventListener(
        "resize",
        handleResize
      );


      if (
        animationRef.current
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }


      track.style.transform =
        "translate3d(0, 0, 0)";
    };

  }, [
    isMobile,
    originalLength,
  ]);


  /* =====================================================
     MOBILE AUTO CHANGE
     DIFFERENT TIMING FOR EVERY CATEGORY
  ===================================================== */

  useEffect(() => {
    if (!isMobile) {
      return;
    }


    if (
      originalLength <= 1
    ) {
      return;
    }


    /*
      User ne pause kiya hai.
    */

    if (isPaused) {
      return;
    }


    const timing =
      timingRef.current;


    /*
      First time alag delay.

      Uske baad category ka
      apna unique interval.
    */

    const delay =
      firstFadeRef.current
        ? timing.firstDelay
        : timing.interval;


    const timer =
      setTimeout(() => {
        firstFadeRef.current =
          false;


        const nextIndex =
          currentIndex >=
          originalLength - 1
            ? 0
            : currentIndex + 1;


        updateCurrentIndex(
          nextIndex
        );

      }, delay);


    return () => {
      clearTimeout(timer);
    };

  }, [
    isMobile,
    currentIndex,
    originalLength,
    isPaused,
  ]);


  /* =====================================================
     CLICK = PAUSE / RESUME
     DESKTOP + MOBILE
  ===================================================== */

  const handleSliderClick = (
    event
  ) => {
    /*
      View link ya buttons click
      karne par pause/resume
      trigger nahi hoga.
    */

    if (
      event.target.closest(
        "a, button"
      )
    ) {
      return;
    }


    const newPausedState =
      !pausedRef.current;


    pausedRef.current =
      newPausedState;


    setIsPaused(
      newPausedState
    );
  };


  /* =====================================================
     DOT CLICK
  ===================================================== */


  /* =====================================================
     EMPTY
  ===================================================== */

  if (!items.length) {
    return null;
  }


  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section
      className="section category-section"
      id={id}
    >

      <div className="container">


        {/* ==========================================
            SECTION HEADER
        ========================================== */}

        <div className="section-head">

          <div>

            <span className="section-kicker">
              Category
            </span>


            <h2>
              {title}
            </h2>


            <p>
              {description}
            </p>

          </div>

        </div>


        {/* ==========================================
            SLIDER
        ========================================== */}

        <div
          className={`category-slider ${
            isPaused
              ? "slider-paused"
              : ""
          }`}
          onClick={
            handleSliderClick
          }
        >


          {/* ======================================
              MOBILE / IPHONE / SAFARI
              SLOW CROSS FADE
          ====================================== */}

          {isMobile ? (

            <div className="mobile-fade-stage">

              {items.map(
                (
                  item,
                  index
                ) => (

                  <article
                    key={`${item.title || "mobile"}-${index}`}
                    className={`slide-card mobile-fade-card ${
                      index ===
                      currentIndex
                        ? "active"
                        : ""
                    }`}
                    aria-hidden={
                      index !==
                      currentIndex
                    }
                  >

                    {/* IMAGE */}

                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.title ||
                        "Category"
                      }
                      draggable="false"
                    />


                    {/* CONTENT */}

                    <div className="slide-content">


                      {item.label && (

                        <span className="slide-label">
                          {
                            item.label
                          }
                        </span>

                      )}


                      <h3>
                        {
                          item.title
                        }
                      </h3>


                      {item.description && (

                        <p>
                          {
                            item.description
                          }
                        </p>

                      )}


                      {item.link && (

                        <a
                          href={
                            item.link
                          }
                          tabIndex={
                            index ===
                            currentIndex
                              ? 0
                              : -1
                          }
                        >
                          View
                        </a>

                      )}

                    </div>

                  </article>

                )
              )}

            </div>

          ) : (

            /* ======================================
               DESKTOP TRACK
            ====================================== */

            <div
              className="category-track"
              ref={trackRef}
            >

              {extendedItems.map(
                (
                  item,
                  index
                ) => (

                  <article
                    className="slide-card"
                    key={`${item.title || "item"}-${index}`}
                  >

                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.title ||
                        "Category"
                      }
                      draggable="false"
                    />


                    <div className="slide-content">

                      {item.label && (

                        <span className="slide-label">
                          {
                            item.label
                          }
                        </span>

                      )}


                      <h3>
                        {
                          item.title
                        }
                      </h3>


                      {item.description && (

                        <p>
                          {
                            item.description
                          }
                        </p>

                      )}


                      {item.link && (

                        <a
                          href={
                            item.link
                          }
                        >
                          View
                        </a>

                      )}

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </div>


        {/* ==========================================
            DOTS
        ========================================== */}
{/* 
        <div className="dots-container">

          {items.map(
            (_, index) => (

              <button
                key={index}
                type="button"

                className={`dot ${
                  index ===
                  currentIndex
                    ? "active"
                    : ""
                }`}

                onClick={() =>
                  goToSlide(
                    index
                  )
                }

                aria-label={`Go to slide ${
                  index + 1
                }`}
              />

            )
          )}

        </div> */}

      </div>

    </section>
  );
}

export default CategorySlider;