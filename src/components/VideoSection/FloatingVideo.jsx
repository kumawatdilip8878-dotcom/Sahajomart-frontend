import React, { useState, useEffect, useRef } from "react";
import "./FloatingVideo.css";

const FloatingVideo = () => {
  const [position, setPosition] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  const videoRef = useRef(null);

  // Video autoplay
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

    let currentPosition = 100;

    // Speed
    const speed = 0.150;

    const animate = () => {
      currentPosition -= speed;

      // Left side par completely bahar jaane ke baad
      // right side se dobara enter karega
      if (currentPosition <= -5) {
        currentPosition = 100;
      }

      setPosition(currentPosition);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

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
          left: `${position}%`,
          transform: "translateX(-100%)",
        }}
      >

        <div className="floating-video-box">

          {/* Close Button */}
          <button
            className="video-close-btn"
            onClick={handleClose}
            aria-label="Close video"
          >
            ✕
          </button>

          {/* Video */}
          <video
            ref={videoRef}
            src="https://media.gettyimages.com/id/483716927/video/fruit-and-vegetable-section-of-a-supermarket.mp4?s=mp4-640x640-gi&k=20&c=jckrFhUhSTIG8qGWYV7KR3seKptpqnbhQhtvb1A2b3w="
            muted
            autoPlay
            loop
            playsInline
            className="floating-video"
          />

          {/* Overlay */}
          <div className="video-overlay">
            <span>Special Offer</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default FloatingVideo;