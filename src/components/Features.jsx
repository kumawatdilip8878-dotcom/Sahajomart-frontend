import React from "react";
import "./Features.css";

const features = [
  {
    icon: "🛍️",
    title: "Wide Range of Products",
    description:
      "From daily essentials to specialty items, find it all in one place.",
  },
  {
    icon: "🏷️",
    title: "Exciting Offers",
    description:
      "Enjoy exclusive discounts and offers on your favorite products.",
  },
  {
    icon: "🏪",
    title: "Shop from Nearby Stores",
    description:
      "Browse products from your local sahjoMart store with ease.",
  },
  {
    icon: "🚚",
    title: "Fast & Reliable Delivery",
    description:
      "Get your order delivered quickly and safely to your doorstep.",
  },
  {
    icon: "🎧",
    title: "Customer Support",
    description:
      "We're here to help you at every step of your shopping journey.",
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">
              {feature.icon}
            </div>

            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;