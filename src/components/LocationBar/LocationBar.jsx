import { useEffect, useRef, useState } from "react";
import { locations } from "../../data/locations";
import "./LocationBar.css";

const LocationBar = () => {
  const [selectedLocation, setSelectedLocation] = useState("Jaipur");
  const locationListRef = useRef(null);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    console.log("Selected Store Location:", location);
  };

  /* ========================================
     MOBILE AUTO SLIDER
  ======================================== */
  useEffect(() => {
    const slider = locationListRef.current;

    if (!slider) return;

    const startSlider = () => {
      if (window.innerWidth > 768) return;

      const scrollAmount = 1;

      const interval = setInterval(() => {
        if (!slider) return;

        slider.scrollLeft += scrollAmount;

        /*
          End par pahunchne ke baad
          slider ko wapas beginning par le aao
        */
        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - 2
        ) {
          slider.scrollLeft = 0;
        }
      }, 30);

      return interval;
    };

    const interval = startSlider();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="location-bar" id="stores">
      <div className="container location-inner">

        <span className="location-title">
          Our Stores:
        </span>

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
    </div>
  );
};

export default LocationBar;