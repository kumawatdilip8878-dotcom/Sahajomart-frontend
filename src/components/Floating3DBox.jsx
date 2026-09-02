import { useState } from "react";
import "./Floating3DBox.css";

const Floating3DBox = () => {
  const [showBox, setShowBox] = useState(true);

  const openLink = () => {
    window.open(
      "https://www.google.com",
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!showBox) return null;

  return (
    <div className="floating-3d-wrapper">

      {/* CLOSE BUTTON */}
      <button
        className="cube-close-btn"
        onClick={(e) => {
          e.stopPropagation();
          setShowBox(false);
        }}
        aria-label="Close"
      >
        ×
      </button>

      {/* 3D SCENE */}
      <div
        className="floating-3d-scene"
        onClick={openLink}
        role="link"
        tabIndex={0}
        aria-label="Open SahjoMart"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openLink();
          }
        }}
      >
        <div className="floating-cube">

          {/* FRONT */}
          <div className="cube-face cube-front">
            <span className="cube-big-letter">
              R.
            </span>

            <div className="cube-face-bottom">
              Radhaswami
            </div>
          </div>

          {/* BACK */}
          <div className="cube-face cube-back">
            <span className="cube-big-letter">
              S.
            </span>

            <div className="cube-face-bottom">
              Satsang
            </div>
          </div>

          {/* RIGHT - SAHJO MART LOGO */}
          <div className="cube-face cube-right cube-logo-face">
            <img
              src="https://i.postimg.cc/c4y0j5vN/img-2-1784471233954-jpg.jpg"
              alt="Sahjo Mart"
              className="cube-sahjo-logo"
              draggable="false"
            />
          </div>

          {/* LEFT */}
          <div className="cube-face cube-left">
            <span className="cube-big-letter">
              S.
            </span>

            <div className="cube-face-bottom">
              Sahjo
            </div>
          </div>

          {/* TOP */}
          <div className="cube-face cube-top">
            <span className="top-text">
              SAHJO MART
            </span>
          </div>

          {/* BOTTOM */}
          <div className="cube-face cube-bottom">
            <span className="top-text">
              SHOP NOW
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Floating3DBox;