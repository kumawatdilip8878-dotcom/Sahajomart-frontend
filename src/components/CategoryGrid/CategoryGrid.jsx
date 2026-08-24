import React from "react";
import { categories } from "../../data/categories";
import "./CategoryGrid.css";

function CategoryGrid() {
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

        <div className="category-grid">
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