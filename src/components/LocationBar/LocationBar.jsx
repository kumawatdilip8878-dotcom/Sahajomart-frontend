import { useEffect, useRef, useState } from "react";
import { locations } from "../../data/locations";
import "./LocationBar.css";

const LocationBar = () => {
  const [selectedLocation, setSelectedLocation] = useState("Jaipur");

  const locationListRef = useRef(null);

  const animationRef = useRef(null);
  const isPausedRef = useRef(false);

  /* ========================================
     LOCATION CLICK
  ======================================== */

  const handleLocationChange = (location) => {
    setSelectedLocation(location);

    console.log("Selected Store Location:", location);
  };

  /* ========================================
     MOBILE CONTINUOUS AUTO SLIDER
  ======================================== */

  useEffect(() => {
    const slider = locationListRef.current;

    if (!slider) return;

    let running = true;

    const speed = 0.5;

    /* -------------------------------
       ANIMATION
    -------------------------------- */

    const animate = () => {
      if (!running) return;

      /*
        Sirf mobile par auto slider chalega
      */

      if (
        window.innerWidth <= 768 &&
        !isPausedRef.current
      ) {
        slider.scrollLeft += speed;

        /*
          Last ke paas pahunchne par
          smoothly beginning par aa jao
        */

        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - 1
        ) {
          slider.scrollLeft = 0;
        }
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    /* ========================================
       PAUSE ON TOUCH
    ======================================== */

    const handleTouchStart = () => {
      isPausedRef.current = true;
    };

    const handleTouchEnd = () => {
      /*
        Thoda delay taaki user ki swipe complete ho
      */

      setTimeout(() => {
        isPausedRef.current = false;
      }, 800);
    };

    /* ========================================
       PAUSE ON MOUSE
       Useful for testing mobile mode
    ======================================== */

    const handleMouseEnter = () => {
      if (window.innerWidth <= 768) {
        isPausedRef.current = true;
      }
    };

    const handleMouseLeave = () => {
      if (window.innerWidth <= 768) {
        isPausedRef.current = false;
      }
    };

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

    /*
      Start animation
    */

    animationRef.current =
      requestAnimationFrame(animate);

    /* ========================================
       CLEANUP
    ======================================== */

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

  return (
    <section
      className="location-bar"
      id="stores"
    >
      <div className="container location-inner">

        {/* ========================================
            TITLE
        ======================================== */}

        <span style={{fontSize:"20px"}} className="location-title">
          Our Stores:
        </span>

        {/* ========================================
            LOCATION LIST
        ======================================== */}

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