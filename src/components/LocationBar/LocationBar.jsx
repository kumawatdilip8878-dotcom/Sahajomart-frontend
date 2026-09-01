import { useEffect, useRef, useState } from "react";
import { locations } from "../../data/locations";
import "./LocationBar.css";

const LocationBar = () => {
  const [selectedLocation, setSelectedLocation] =
    useState("Jaipur");

  const locationListRef = useRef(null);
  const locationTrackRef = useRef(null);
  const animationRef = useRef(null);

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
    const viewport = locationListRef.current;
    const track = locationTrackRef.current;

    if (!viewport || !track) return;

    let running = true;
    let lastTime = 0;
    let currentPosition = 0;

    /*
      Speed:
      0.04 = slow
      0.06 = medium
      0.08 = fast
    */
    const speed = 0.04;

    const animate = (currentTime) => {
      if (!running) return;

      if (!lastTime) {
        lastTime = currentTime;
      }

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      /*
        ONLY MOBILE
      */
      if (window.innerWidth <= 768) {
        const maxScroll =
          track.scrollWidth - viewport.clientWidth;

        if (maxScroll > 0) {
          currentPosition += deltaTime * speed;

          /*
            End par pahunchne ke baad
            first position par wapas
          */
          if (currentPosition >= maxScroll) {
            currentPosition = 0;
          }

          /*
            iPhone Safari GPU animation
          */
          track.style.transform =
            `translate3d(${-currentPosition}px, 0, 0)`;
        }
      } else {
        /*
          Desktop par position reset
        */
        if (currentPosition !== 0) {
          currentPosition = 0;
          track.style.transform =
            "translate3d(0, 0, 0)";
        }
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      running = false;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      track.style.transform =
        "translate3d(0, 0, 0)";
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

        {/* TITLE */}

        <span className="location-title">
          Home Delivery for
        </span>

        {/* SLIDER VIEWPORT */}

        <div
          className="location-list"
          ref={locationListRef}
        >

          {/* MOVING TRACK */}

          <div
            className="location-track"
            ref={locationTrackRef}
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
      </div>
    </section>
  );
};

export default LocationBar;