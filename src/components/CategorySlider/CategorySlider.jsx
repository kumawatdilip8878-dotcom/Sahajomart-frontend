import React from "react";
import "./CategorySlider.css";

function CategorySlider({
  id,
  title,
  description,
  items,
}) {
  const slide = (direction) => {
    const slider = document.getElementById(id);

    if (!slider) return;

    const distance = slider.clientWidth * 0.8;

    slider.scrollBy({
      left: distance * direction,
      behavior: "smooth",
    });
  };

  return (
    <section className="section" id={id}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">
              Category
            </span>

            <h2>{title}</h2>

            <p>{description}</p>
          </div>

          <div className="slider-controls">
            <button
              className="slider-btn"
              onClick={() => slide(-1)}
            >
              ‹
            </button>

            <button
              className="slider-btn"
              onClick={() => slide(1)}
            >
              ›
            </button>
          </div>
        </div>

        <div
          className="category-slider"
          id={`${id}-slider`}
        >
          {items.map((item) => (
            <article
              className="slide-card"
              key={item.title}
              id={item.id || undefined}
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <div className="slide-content">
                <span className="slide-label">
                  {item.label}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <a href={item.link || "#"}>
                  View More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySlider;