import { useEffect, useRef, useState } from "react";
import { locations } from "../../data/locations";
import "./LocationBar.css";

const LocationBar = () => {
  const [selectedLocation, setSelectedLocation] = useState("Jaipur");
  const [offset, setOffset] = useState(0);
  
  const locationListRef = useRef(null);
  const animationRef = useRef(null);
  const pausedRef = useRef(false);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    console.log("Selected Store Location:", location);
  };

  useEffect(() => {
    const slider = locationListRef.current;
    if (!slider) return;

    let running = true;
    let lastTime = 0;
    const speed = 0.04;

    const animate = (currentTime) => {
      if (!running) return;

      if (!lastTime) {
        lastTime = currentTime;
      }

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (window.innerWidth <= 768 && !pausedRef.current) {
        setOffset(prev => {
          const totalWidth = slider.scrollWidth - slider.clientWidth;
          if (totalWidth <= 0) return 0;
          
          let newOffset = prev + deltaTime * speed;
          if (newOffset >= totalWidth) {
            newOffset = 0;
          }
          return newOffset;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // ✅ Transform apply
    const applyTransform = () => {
      if (slider && window.innerWidth <= 768) {
        slider.style.transform = `translateX(-${offset}px)`;
        slider.style.transition = 'none';
      }
    };
    applyTransform();

    // Touch events
    const handleTouchStart = () => {
      pausedRef.current = true;
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        pausedRef.current = false;
      }, 700);
    };

    const handleMouseEnter = () => {
      if (window.innerWidth <= 768) {
        pausedRef.current = true;
      }
    };

    const handleMouseLeave = () => {
      if (window.innerWidth <= 768) {
        pausedRef.current = false;
      }
    };

    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchend", handleTouchEnd, { passive: true });
    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    // ✅ Resize handler
    const handleResize = () => {
      if (window.innerWidth > 768) {
        slider.style.transform = 'translateX(0px)';
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      running = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchend", handleTouchEnd);
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [offset]);

  return (
    <section className="location-bar" id="stores">
      <div className="container location-inner">
        <span className="location-title">Our Stores:</span>
        <div className="location-list" ref={locationListRef}>
          {locations.map((location) => (
            <button
              key={location}
              type="button"
              className={`location-chip ${selectedLocation === location ? "active" : ""}`}
              onClick={() => handleLocationChange(location)}
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