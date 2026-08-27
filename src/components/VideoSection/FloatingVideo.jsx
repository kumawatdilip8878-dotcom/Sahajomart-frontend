import React, { useState, useEffect, useRef } from "react";
import "./FloatingVideo.css";

const FloatingVideo = () => {
  const [position, setPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const videoRef = useRef(null);

  // ========================================
  // VIDEO AUTOPLAY
  // ========================================

  useEffect(() => {
    if (videoRef.current && isVisible) {
      videoRef.current.play().catch((err) => {
        console.log("Auto-play blocked:", err);
      });
    }
  }, [isVisible]);


  // ========================================
  // CONTINUOUS RIGHT → LEFT MOVEMENT
  // ========================================

  useEffect(() => {
    if (!isVisible) return;

    let animationId;

    let currentPosition = window.innerWidth;

    const speed = 0.5;

    const animate = () => {

      currentPosition -= speed;

      /*
       * Video completely left side se bahar hone ke baad
       * dobara right side se start hoga.
       */
      const videoWidth =
        window.innerWidth <= 360
          ? 130
          : window.innerWidth <= 480
          ? 150
          : window.innerWidth <= 768
          ? 180
          : 260;

      if (currentPosition <= -videoWidth) {
        currentPosition = window.innerWidth;
      }

      setPosition(currentPosition);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);


  // ========================================
  // CLOSE
  // ========================================

  const handleClose = () => {
    setIsVisible(false);
  };


  if (!isVisible) {
    return null;
  }


  return (
    <div className="floating-video-wrapper">

      <div
        className="floating-video-container"
        style={{
          left: `${position}px`,
        }}
      >

        <div className="floating-video-box">

          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="video-close-btn"
            onClick={handleClose}
            aria-label="Close video"
          >
            ✕
          </button>


          {/* VIDEO */}

          <video
            ref={videoRef}
            src="https://media.gettyimages.com/id/483716927/video/fruit-and-vegetable-section-of-a-supermarket.mp4?s=mp4-640x640-gi&k=20&c=jckrFhUhSTIG8qGWYV7KR3seKptpqnbhQhtvb1A2b3w="
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            className="floating-video"
          />


          {/* OVERLAY */}

          <div className="video-overlay"></div>

        </div>

      </div>

    </div>
  );
};

export default FloatingVideo;