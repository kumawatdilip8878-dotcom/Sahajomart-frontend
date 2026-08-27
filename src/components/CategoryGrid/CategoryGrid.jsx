import React, { useEffect, useRef } from "react";
import { categories } from "../../data/categories";
import "./CategoryGrid.css";

function CategoryGrid() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let animationId;
    let isPaused = false;

    const moveSlider = () => {
      if (window.innerWidth <= 720 && !isPaused) {
        slider.scrollLeft += 0.5;

        // End par pahunchne ke baad wapas start
        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth - 2
        ) {
          slider.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(moveSlider);
    };

    // Touch par temporarily pause
    const pauseSlider = () => {
      isPaused = true;
    };

    const resumeSlider = () => {
      isPaused = false;
    };

    slider.addEventListener("touchstart", pauseSlider);
    slider.addEventListener("touchend", resumeSlider);

    animationId = requestAnimationFrame(moveSlider);

    return () => {
      cancelAnimationFrame(animationId);

      slider.removeEventListener("touchstart", pauseSlider);
      slider.removeEventListener("touchend", resumeSlider);
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