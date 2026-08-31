import { useEffect, useRef, useState } from "react";
import { locations } from "../../data/locations";
import "./LocationBar.css";

const LocationBar = () => {
  const [selectedLocation, setSelectedLocation] = useState("Jaipur");

  const locationListRef = useRef(null);
  const locationTrackRef = useRef(null);
  const animationRef = useRef(null);

  // ✅ Infinite slider ke liye duplicate
  const sliderLocations = [...locations, ...locations];

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    console.log("Selected Store Location:", location);
  };

  useEffect(() => {
    const viewport = locationListRef.current;
    const track = locationTrackRef.current;

    if (!viewport || !track) return;

    let currentPosition = 0;
    let lastTime = 0;
    let running = true;

    // speed
    const speed = 0.035;

    const animate = (currentTime) => {
      if (!running) return;

      if (!lastTime) {
        lastTime = currentTime;
      }

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (window.innerWidth <= 768) {
        /*
          Track me locations 2 baar hain.
          Isliye total width / 2 = first set ki width
        */
        const singleSetWidth = track.scrollWidth / 2;

        currentPosition += deltaTime * speed;

        /*
          IMPORTANT:
          0 par reset nahi karna.
          Sirf first set ki width minus karni hai.
          
          Visually same items second copy me already present hain,
          isliye koi jump nahi dikhega.
        */
        if (currentPosition >= singleSetWidth) {
          currentPosition -= singleSetWidth;
        }

        track.style.transform = `translate3d(
          ${-currentPosition}px,
          0,
          0
        )`;
      } else {
        currentPosition = 0;

        track.style.transform =
          "translate3d(0, 0, 0)";
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

  return (
    <section className="location-bar" id="stores">
      <div className="container location-inner">

        <span className="location-title">
          Our Stores:
        </span>

        <div
          className="location-list"
          ref={locationListRef}
        >
          <div
            className="location-track"
            ref={locationTrackRef}
          >
            {sliderLocations.map((location, index) => (
              <button
                key={`${location}-${index}`}
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