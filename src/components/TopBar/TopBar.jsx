import { useState } from "react";
import "./TopBar.css";

const TopBar = () => {
  const [language, setLanguage] = useState("en");

  const handleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="top-bar">
      <div className="container top-bar-inner">

        <div className="top-contact">
          <span>📞 +91 98765 43210</span>

          <span>
            📍 Shop from your nearest SahajoMart store
          </span>
        </div>

        <div className="language-switcher">

          <button
            className={`language-btn ${
              language === "en" ? "active" : ""
            }`}
            onClick={() => handleLanguage("en")}
          >
            {/* English */}
          </button>

          {/* <span>|</span> */}

          <button
            className={`language-btn ${
              language === "hi" ? "active" : ""
            }`}
            onClick={() => handleLanguage("hi")}
          >
            {/* हिन्दी */}
          </button>

        </div>

      </div>
    </div>
  );
};

export default TopBar;