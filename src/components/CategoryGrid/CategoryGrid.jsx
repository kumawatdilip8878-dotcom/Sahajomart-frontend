import React, { useEffect, useRef } from "react";
import { categories } from "../../data/categories";
import "./CategoryGrid.css";

function CategoryGrid() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let position = 0;
    let lastTime = performance.now();
    let running = true;

    const speed = 35; // pixels per second

    const animate = (time) => {
      if (!running) return;

      const delta = time - lastTime;
      lastTime = time;

      // Mobile + iPhone + Safari
      if (window.innerWidth <= 720) {
        position -= (speed * delta) / 1000;

        /*
         * Original categories ki exact width.
         * Duplicate ke baad isi position par
         * animation seamlessly continue hogi.
         */
        const originalWidth = track.scrollWidth / 2;

        if (originalWidth > 0 && Math.abs(position) >= originalWidth) {
          position += originalWidth;
        }

        track.style.transform =
          `translate3d(${position}px, 0, 0)`;

        track.style.webkitTransform =
          `translate3d(${position}px, 0, 0)`;
      } else {
        position = 0;

        track.style.transform =
          "translate3d(0, 0, 0)";

        track.style.webkitTransform =
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

      track.style.transform = "";
      track.style.webkitTransform = "";
    };
  }, []);

  const loopCategories = [
    ...categories,
    ...categories,
  ];

  return (
    <section className="section" id="categories">

      <div className="container">

        <div className="section-head">
          <div>

            <span className="section-kicker">
              Browse
            </span>

            <h2>Shop by Category</h2>

            <p>
              Select a category to quickly browse available
              product images and store promotions.
            </p>

          </div>
        </div>


        {/* ===============================
            VIEWPORT
        =============================== */}

        <div className="category-grid">

          {/* ===============================
              MOVING TRACK
          =============================== */}

          <div
            className="category-track"
            ref={trackRef}
          >

            {loopCategories.map((category, index) => (

              <a
                href={category.link}
                className="category-tile"
                key={`${category.name}-${index}`}
              >

                <img
                  src={category.image}
                  alt={category.name}
                  draggable="false"
                />

                <span>
                  {category.name}
                </span>

              </a>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default CategoryGrid;