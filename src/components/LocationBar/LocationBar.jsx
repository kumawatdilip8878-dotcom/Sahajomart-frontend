import { useEffect, useRef, useState } from "react";
import { locations } from "../../data/locations";
import "./LocationBar.css";

const LocationBar = () => {
  const [selectedLocation, setSelectedLocation] =
    useState("Jaipur");

  const locationListRef = useRef(null);

  const animationRef = useRef(null);
  const pausedRef = useRef(false);

  /* =====================================================
     LOCATION CLICK
  ===================================================== */

  const handleLocationChange = (location) => {
    setSelectedLocation(location);

    console.log("Selected Store Location:", location);
  };


  /* =====================================================
     MOBILE AUTO SLIDER
  ===================================================== */

  useEffect(() => {
    const slider = locationListRef.current;

    if (!slider) return;

    let running = true;
    let lastTime = 0;

    /*
      Speed:
      0.04 = slow and smooth
    */
    const speed = 0.04;


    /* =====================================================
       ANIMATION
    ===================================================== */

    const animate = (currentTime) => {

      if (!running) return;

      /*
        First frame
      */
      if (!lastTime) {
        lastTime = currentTime;
      }

      const deltaTime =
        currentTime - lastTime;

      lastTime = currentTime;


      /*
        ONLY MOBILE
      */
      if (
        window.innerWidth <= 768 &&
        !pausedRef.current
      ) {

        slider.scrollLeft +=
          deltaTime * speed;


        /*
          Last location ke baad
          first location par wapas
        */

        if (
          slider.scrollLeft +
            slider.clientWidth >=
          slider.scrollWidth - 1
        ) {
          slider.scrollLeft = 0;
        }
      }


      animationRef.current =
        requestAnimationFrame(animate);
    };


    /*
      Start
    */

    animationRef.current =
      requestAnimationFrame(animate);


    /* =====================================================
       TOUCH START
    ===================================================== */

    const handleTouchStart = () => {
      pausedRef.current = true;
    };


    /* =====================================================
       TOUCH END
    ===================================================== */

    const handleTouchEnd = () => {

      /*
        User ko swipe karne ka time do
      */

      setTimeout(() => {
        pausedRef.current = false;
      }, 700);
    };


    /* =====================================================
       MOUSE ENTER
    ===================================================== */

    const handleMouseEnter = () => {

      if (window.innerWidth <= 768) {
        pausedRef.current = true;
      }
    };


    /* =====================================================
       MOUSE LEAVE
    ===================================================== */

    const handleMouseLeave = () => {

      if (window.innerWidth <= 768) {
        pausedRef.current = false;
      }
    };


    /* =====================================================
       EVENTS
    ===================================================== */

    slider.addEventListener(
      "touchstart",
      handleTouchStart,
      { passive: true }
    );

    slider.addEventListener(
      "touchend",
      handleTouchEnd,
      { passive: true }
    );

    slider.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    slider.addEventListener(
      "mouseleave",
      handleMouseLeave
    );


    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {

      running = false;

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }


      slider.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      slider.removeEventListener(
        "touchend",
        handleTouchEnd
      );

      slider.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      slider.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };

  }, []);


  /* =====================================================
     UI
  ===================================================== */

  return (
    <section
      className="location-bar"
      id="stores"
    >

      <div className="container location-inner">

        {/* ==========================================
            TITLE
        ========================================== */}

        <span className="location-title">
          Our Stores:
        </span>


        {/* ==========================================
            LOCATION SLIDER
        ========================================== */}

        <div
          className="location-list"
          ref={locationListRef}
        >

          {locations.map((location) => (

            <button
              key={location}
              type="button"
              className={`location-chip ${
                selectedLocation === location
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleLocationChange(location)
              }
            >
              {location}
            </button>

          ))}

        </div>

      </div>

    </section>
  );
};

export default LocationBar;