import { useState } from "react";
import "./TopBar.css";

import {
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const TopBar = () => {
  const [language, setLanguage] = useState("en");

  const handleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="top-bar">
      <div className="container top-bar-inner">

        <div className="top-contact">

          {/* PHONE */}
          <a
            href="tel:+919876543210"
            className="contact-item contact-link"
            aria-label="Call Sahjo Mart"
          >
            <FaPhoneAlt className="contact-icon phone-icon" />

            <span>
              +91 98765 43210
            </span>
          </a>


          {/* LOCATION */}
          <a
            href="#locations"
            className="contact-item location-contact contact-link"
            aria-label="View Sahjo Mart locations"
          >
            <FaMapMarkerAlt className="contact-icon location-icon" />

            <span>
              Shop from your nearest Sahjo Mart store
            </span>
          </a>

        </div>


        {/* LANGUAGE */}

        <div className="language-switcher">

          <button
            className={`language-btn ${
              language === "en"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleLanguage("en")
            }
            type="button"
            aria-label="English"
          >
            EN
          </button>

          <button
            className={`language-btn ${
              language === "hi"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleLanguage("hi")
            }
            type="button"
            aria-label="Hindi"
          >
            हिं
          </button>

        </div>

      </div>
    </div>
  );
};

export default TopBar;