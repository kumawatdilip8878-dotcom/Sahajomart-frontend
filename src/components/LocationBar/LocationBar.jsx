import React, { useEffect, useRef, useState } from "react";
import "./LocationBar.css";

const locations = [
  "Jaipur",
  "Jodhpur",
  "Kota",
  "Ajmer",
  "Udaipur",
  "Bikaner",
  "Alwar",
  "Sikar",
  "Bharatpur",
  "Chittorgarh",
];

const LocationBar = () => {
  const sliderRef = useRef(null);

  // Selected location
  const [activeLocation, setActiveLocation] = useState("Jaipur");

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let animationFrame;
    let paused = false;

    const speed = 0.45;

    const moveSlider = () => {
      if (!paused) {
        slider.scrollLeft += speed;

        const halfWidth = slider.scrollWidth / 2;

        if (halfWidth > 0 && slider.scrollLeft >= halfWidth) {
          slider.scrollLeft -= halfWidth;
        }
      }

      animationFrame = requestAnimationFrame(moveSlider);
    };

    const handleMouseEnter = () => {
      paused = true;
    };

    const handleMouseLeave = () => {
      paused = false;
    };

    const handleTouchStart = () => {
      paused = true;
    };

    const handleTouchEnd = () => {
      paused = false;
    };

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    slider.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    slider.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    animationFrame = requestAnimationFrame(moveSlider);

    return () => {
      cancelAnimationFrame(animationFrame);

      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);

      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleLocationClick = (location) => {
    setActiveLocation(location);

    console.log("Selected Location:", location);
  };

  return (
    <section className="location-bar">
      <div className="location-inner">

        {/* TITLE */}
        <div className="location-title">
          Shop by Location
        </div>

        {/* SLIDER */}
        <div
          className="location-list"
          ref={sliderRef}
        >

          {/* FIRST SET */}
          {locations.map((location, index) => (
            <button
              type="button"
              key={`first-${index}`}
              className={`location-chip ${
                activeLocation === location ? "active" : ""
              }`}
              onClick={() => handleLocationClick(location)}
            >
              {location}
            </button>
          ))}

          {/* DUPLICATE SET */}
          {locations.map((location, index) => (
            <button
              type="button"
              key={`second-${index}`}
              className={`location-chip ${
                activeLocation === location ? "active" : ""
              }`}
              onClick={() => handleLocationClick(location)}
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