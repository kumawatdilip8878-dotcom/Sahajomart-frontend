import {
  useEffect,
  useRef,
  useState,
} from "react";

import { locations } from "../../data/locations";

import "./LocationBar.css";

const LocationBar = () => {
  const [selectedLocation, setSelectedLocation] =
    useState("Jaipur");

  const locationListRef = useRef(null);
  const locationTrackRef = useRef(null);
  const firstSetRef = useRef(null);

  const animationRef = useRef(null);

  /* =====================================================
     LOCATION CLICK
  ===================================================== */

  const handleLocationChange = (location) => {
    setSelectedLocation(location);

    console.log(
      "Selected Store Location:",
      location
    );
  };

  /* =====================================================
     MOBILE INFINITE AUTO SLIDER

     NO VISIBLE JUMP
  ===================================================== */

  useEffect(() => {
    const viewport =
      locationListRef.current;

    const track =
      locationTrackRef.current;

    const firstSet =
      firstSetRef.current;

    if (
      !viewport ||
      !track ||
      !firstSet
    ) {
      return;
    }

    let running = true;

    let currentPosition = 0;

    let lastTime = 0;

    let loopDistance = 0;

    /*
      SPEED

      0.025 = very slow
      0.035 = smooth
      0.045 = medium
      0.060 = fast
    */

    const speed = 0.035;


    /* =================================================
       CALCULATE ONE COMPLETE LOCATION SET WIDTH
    ================================================= */

    const calculateLoopDistance = () => {
      const trackStyle =
        window.getComputedStyle(track);

      const trackGap =
        parseFloat(
          trackStyle.columnGap ||
            trackStyle.gap ||
            "0"
        ) || 0;

      loopDistance =
        firstSet.getBoundingClientRect()
          .width + trackGap;
    };


    calculateLoopDistance();


    /* =================================================
       ANIMATION
    ================================================= */

    const animate = (currentTime) => {
      if (!running) {
        return;
      }

      /*
        First frame
      */

      if (!lastTime) {
        lastTime = currentTime;
      }

      const deltaTime =
        Math.min(
          currentTime - lastTime,
          40
        );

      lastTime = currentTime;


      /* ===============================================
         AUTO SLIDER ONLY MOBILE / SMALL TABLET
      =============================================== */

      if (window.innerWidth <= 768) {

        if (loopDistance > 0) {

          currentPosition +=
            deltaTime * speed;


          /*
            IMPORTANT

            0 par reset nahi kar rahe.

            Ek complete duplicate set ke
            distance ko minus kar rahe hain.

            Visually same Jaipur exactly
            same position par hota hai,
            isliye koi jump nahi dikhta.
          */

          if (
            currentPosition >=
            loopDistance
          ) {
            currentPosition -=
              loopDistance;
          }


          track.style.transform =
            `translate3d(${-currentPosition}px, 0, 0)`;
        }

      } else {

        /*
          PC PAR NORMAL STATIC LIST
        */

        if (currentPosition !== 0) {
          currentPosition = 0;

          track.style.transform =
            "translate3d(0, 0, 0)";
        }
      }


      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };


    /* =================================================
       START
    ================================================= */

    animationRef.current =
      requestAnimationFrame(
        animate
      );


    /* =================================================
       SCREEN RESIZE
    ================================================= */

    const handleResize = () => {
      calculateLoopDistance();

      /*
        Current value safe range me lao
      */

      if (
        loopDistance > 0 &&
        currentPosition >=
          loopDistance
      ) {
        currentPosition =
          currentPosition %
          loopDistance;
      }

      if (
        window.innerWidth > 768
      ) {
        currentPosition = 0;

        track.style.transform =
          "translate3d(0, 0, 0)";
      }
    };


    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "orientationchange",
      handleResize
    );


    /* =================================================
       RESIZE OBSERVER

       Images/fonts/layout change hone par bhi
       exact width calculate hogi.
    ================================================= */

    let resizeObserver = null;

    if (
      typeof ResizeObserver !==
      "undefined"
    ) {
      resizeObserver =
        new ResizeObserver(() => {
          calculateLoopDistance();
        });

      resizeObserver.observe(
        firstSet
      );

      resizeObserver.observe(
        viewport
      );
    }


    /* =================================================
       CLEANUP
    ================================================= */

    return () => {
      running = false;

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "orientationchange",
        handleResize
      );

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      track.style.transform =
        "translate3d(0, 0, 0)";
    };
  }, []);


  /* =====================================================
     LOCATION SET
  ===================================================== */

  const renderLocations = (
    setName
  ) => {
    return locations.map(
      (location, index) => (
        <button
          key={`${setName}-${location}-${index}`}
          type="button"
          className={`location-chip ${
            selectedLocation ===
            location
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleLocationChange(
              location
            )
          }
        >
          {location}
        </button>
      )
    );
  };


  /* =====================================================
     UI
  ===================================================== */

  return (
    <section
      className="location-bar"
      id="stores"
    >
      <div className="container location-inner">

        {/* TITLE */}

        <span className="location-title">
          Home Delivery for
        </span>


        {/* SLIDER VIEWPORT */}

        <div
          className="location-list"
          ref={locationListRef}
        >

          {/* ============================================
              MOVING TRACK

              SAME LOCATIONS 2 TIMES

              SET 1 → SET 2 → SET 1...
          ============================================ */}

          <div
            className="location-track"
            ref={locationTrackRef}
          >

            {/* FIRST ORIGINAL SET */}

            <div
              className="location-set"
              ref={firstSetRef}
            >
              {renderLocations(
                "first"
              )}
            </div>


            {/* DUPLICATE SET */}

            <div
              className="location-set"
              aria-hidden="true"
            >
              {renderLocations(
                "second"
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default LocationBar;