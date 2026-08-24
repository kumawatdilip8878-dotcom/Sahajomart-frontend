import React from "react";
import { promotions } from "../../data/promotions";
import "./PromoSlider.css";

function PromoSlider() {
  const items = [...promotions, ...promotions];

  return (
    <section className="promo-section" id="offers">
      <div className="container">
        <div className="promo-heading">
          <span>Featured promotions</span>
          <span>Hover to pause</span>
        </div>

        <div className="promo-track-wrapper">
          <div className="promo-track">
            {items.map((item, index) => (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="promo-item"
                key={`${item.title}-${index}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="promo-text">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoSlider;