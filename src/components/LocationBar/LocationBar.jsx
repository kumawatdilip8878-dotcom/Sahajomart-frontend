import { useState } from "react";
import { locations } from "../../data/locations";
import "./LocationBar.css";

const LocationBar = () => {
  const [selectedLocation, setSelectedLocation] = useState("Jaipur");

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    console.log("Selected Store Location:", location);
  };

  return (
    <>
      <div className="location-bar" id="stores">
        <div className="container location-inner">
          <span className="location-title">Our Stores:</span>

          <div className="location-list">
            {locations.map((location) => (
              <button
                key={location}
                type="button"
                className={`location-chip ${
                  selectedLocation === location ? "active" : ""
                }`}
                onClick={() => handleLocationChange(location)}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationBar;