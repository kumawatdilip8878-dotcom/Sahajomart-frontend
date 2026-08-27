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

          {/* 📞 Phone */}
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon phone-icon" />
            <span>+91 98765 43210</span>
          </div>

          {/* 📍 Location */}
          <div className="contact-item location-contact">
            <FaMapMarkerAlt className="contact-icon location-icon" />
            <span>
              Shop from your nearest SahajoMart store
            </span>
          </div>

        </div>

        <div className="language-switcher">

          <button
            className={`language-btn ${
              language === "en" ? "active" : ""
            }`}
            onClick={() => handleLanguage("en")}
          >
          </button>

          <button
            className={`language-btn ${
              language === "hi" ? "active" : ""
            }`}
            onClick={() => handleLanguage("hi")}
          >
          </button>

        </div>

      </div>
    </div>
  );
};

export default TopBar;