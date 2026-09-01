import "./FlipBox.css";

const Floating3DBox = () => {

  const openLink = () => {
    window.open(
      "https://www.google.com",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      className="floating-3d-wrapper"
      onClick={openLink}
      role="link"
      tabIndex={0}
      aria-label="Open SahjoMart"
      onKeyDown={(e) => {
        if (
          e.key === "Enter" ||
          e.key === " "
        ) {
          openLink();
        }
      }}
    >

      <div className="floating-3d-scene">

        <div className="floating-cube">

          {/* FRONT */}
          <div className="cube-face cube-front">
            <span className="cube-icon">
              🛍️
            </span>

            <strong>
              SahjoMart
            </strong>

            <small>
              Shop Now
            </small>
          </div>


          {/* BACK */}
          <div className="cube-face cube-back">
            <span className="cube-icon">
              🛒
            </span>

            <strong>
              Online
            </strong>

            <small>
              Explore
            </small>
          </div>


          {/* RIGHT */}
          <div className="cube-face cube-right">
            <span>
              SHOP
            </span>
          </div>


          {/* LEFT */}
          <div className="cube-face cube-left">
            <span>
              MART
            </span>
          </div>


          {/* TOP */}
          <div className="cube-face cube-top">
            <span>
              SAHJO
            </span>
          </div>


          {/* BOTTOM */}
          <div className="cube-face cube-bottom">
            <span>
              VISIT
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Floating3DBox;