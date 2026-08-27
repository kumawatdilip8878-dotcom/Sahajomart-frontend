import React, { useEffect, useRef } from "react";
import { categories } from "../../data/categories";
import "./CategoryGrid.css";

function CategoryGrid() {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let running = true;
    let lastTime = 0;
    let currentPosition = 0;

    // Smooth speed
    const speed = 0.04;

    const animate = (currentTime) => {
      if (!running) return;

      if (!lastTime) {
        lastTime = currentTime;
      }

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // ONLY MOBILE
      if (window.innerWidth <= 720) {
        const maxScroll =
          slider.scrollWidth - slider.clientWidth;

        if (maxScroll > 0) {
          currentPosition -= deltaTime * speed;

          // Last category ke baad first se start
          if (Math.abs(currentPosition) >= maxScroll) {
            currentPosition = 0;
          }

          // iPhone Safari + Android GPU animation
          slider.style.transform =
            `translate3d(${currentPosition}px, 0, 0)`;
        }
      } else {
        // Desktop par normal position
        currentPosition = 0;
        slider.style.transform = "translate3d(0, 0, 0)";
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

      slider.style.transform = "";
    };
  }, []);

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

        <div
          className="category-grid"
          ref={sliderRef}
        >
          {categories.map((category) => (
            <a
              href={category.link}
              className="category-tile"
              key={category.name}
            >
              <img
                src={category.image}
                alt={category.name}
              />

              <span>{category.name}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategoryGrid;