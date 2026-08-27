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

    // Speed
    const speed = 0.035;

    const animate = (time) => {
      if (!running) return;

      if (!lastTime) {
        lastTime = time;
      }

      const delta = time - lastTime;
      lastTime = time;

      // MOBILE ONLY
      if (window.innerWidth <= 720) {
        const firstCard = slider.firstElementChild;

        if (firstCard) {
          slider.scrollLeft += delta * speed;

          /*
           * First card completely viewport ke
           * left side se bahar chala gaya
           */
          const cardWidth = firstCard.offsetWidth;

          const gap = parseFloat(
            window.getComputedStyle(slider).columnGap ||
            window.getComputedStyle(slider).gap ||
            0
          );

          if (slider.scrollLeft >= cardWidth + gap) {
            /*
             * Current scroll position ko adjust karo
             * taaki jump na dikhe
             */
            slider.scrollLeft -= cardWidth + gap;

            /*
             * First card ko last mein move karo.
             * DUPLICATE NAHI BAN RAHA.
             */
            slider.appendChild(firstCard);
          }
        }
      } else {
        slider.scrollLeft = 0;
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
                draggable="false"
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