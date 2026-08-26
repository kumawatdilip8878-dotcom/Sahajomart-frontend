import React from "react";
import "./InfoStrip.css";

function InfoStrip() {
  const details = [
    {
      label: "Contact",
      value: "+91 98765 43210",
    },
    {
      label: "FSSAI No.",
      value: "XXXXXXXXXXXXXX",
    },
    {
      label: "Registration No.",
      value: "XXXXXXXXXX",
    },
    {
      label: "Service",
      value:
        "Shop through your nearest SahjoMart store",
    },
  ];

  return (
    <section className="info-strip">
      <div className="container">
        <div className="info-grid">
          {details.map((item) => (
            <div
              className="info-card"
              key={item.label}
            >
              <span>{item.label}</span>

              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoStrip;