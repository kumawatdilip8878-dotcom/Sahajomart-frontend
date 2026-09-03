import {
  useEffect,
  useRef,
} from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";

import "./SocialMediaSection.css";

const SocialMediaSection = () => {
  const trackRef = useRef(null);
  const firstSetRef = useRef(null);
  const animationRef = useRef(null);

  const socials = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      className: "facebook",
      link: "https://facebook.com/",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      className: "instagram",
      link: "https://instagram.com/",
    },
    {
      name: "Snapchat",
      icon: <FaSnapchatGhost />,
      className: "snapchat",
      link: "https://snapchat.com/",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      className: "twitter",
      link: "https://twitter.com/",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      className: "whatsapp",
      link: "https://wa.me/919876543210",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      className: "linkedin",
      link: "https://linkedin.com/",
    },
  ];

  /* =====================================================
     MOBILE INFINITE SLIDER
  ===================================================== */

  useEffect(() => {
    const track =
      trackRef.current;

    const firstSet =
      firstSetRef.current;

    if (!track || !firstSet) {
      return;
    }

    let running = true;

    let position = 0;

    let lastTime = 0;

    let loopWidth = 0;

    /*
      SPEED

      0.015 = very slow
      0.020 = slow
      0.030 = medium
    */

    const speed = 0.018;

    /* =================================================
       CALCULATE WIDTH
    ================================================= */

    const calculateLoopWidth = () => {
      const trackStyle =
        window.getComputedStyle(track);

      const gap =
        parseFloat(
          trackStyle.columnGap ||
            trackStyle.gap ||
            "0"
        ) || 0;

      loopWidth =
        firstSet.getBoundingClientRect()
          .width + gap;
    };

    calculateLoopWidth();

    /* =================================================
       ANIMATION
    ================================================= */

    const animate = (time) => {
      if (!running) {
        return;
      }

      if (!lastTime) {
        lastTime = time;
      }

      const delta =
        Math.min(
          time - lastTime,
          40
        );

      lastTime = time;

      /* ===============================================
         ONLY MOBILE
      =============================================== */

      if (
        window.innerWidth <= 768
      ) {
        if (loopWidth > 0) {
          position +=
            delta * speed;

          /*
            Invisible reset.
            Visible jump nahi aayega.
          */

          if (
            position >= loopWidth
          ) {
            position -=
              loopWidth;
          }

          track.style.transform =
            `translate3d(${-position}px, 0, 0)`;
        }
      } else {
        /*
          DESKTOP STATIC
        */

        position = 0;

        track.style.transform =
          "translate3d(0, 0, 0)";
      }

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animationRef.current =
      requestAnimationFrame(
        animate
      );

    /* =================================================
       RESIZE
    ================================================= */

    const handleResize = () => {
      calculateLoopWidth();

      if (
        window.innerWidth > 768
      ) {
        position = 0;

        track.style.transform =
          "translate3d(0, 0, 0)";
      } else if (
        loopWidth > 0 &&
        position >= loopWidth
      ) {
        position =
          position % loopWidth;
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "orientationchange",
      handleResize
    );

    /* =================================================
       RESIZE OBSERVER
    ================================================= */

    let resizeObserver = null;

    if (
      typeof ResizeObserver !==
      "undefined"
    ) {
      resizeObserver =
        new ResizeObserver(() => {
          calculateLoopWidth();
        });

      resizeObserver.observe(
        firstSet
      );
    }

    /* =================================================
       CLEANUP
    ================================================= */

    return () => {
      running = false;

      if (
        animationRef.current
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "orientationchange",
        handleResize
      );

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      track.style.transform =
        "translate3d(0, 0, 0)";
    };
  }, []);

  /* =====================================================
     SOCIAL ITEMS
  ===================================================== */

  const renderSocials = (
    setName
  ) =>
    socials.map(
      (
        social,
        index
      ) => (
        <a
          key={`${setName}-${social.name}-${index}`}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-card ${social.className}`}
          aria-label={`Open ${social.name}`}
          title={social.name}
        >
          {/* BACK LAYER */}

          <span className="social-layer layer-one" />

          {/* SECOND BACK LAYER */}

          <span className="social-layer layer-two" />

          {/* FRONT CARD */}

          <span className="social-front-card">

            <span className="social-icon">
              {social.icon}
            </span>

          </span>
        </a>
      )
    );

  /* =====================================================
     UI
  ===================================================== */

  return (
    <section className="social-section">

      <div className="social-container">

        {/* HEADING */}

        <div className="social-heading">

          <h2>
            Connect With Us
          </h2>

          <p>
            Follow Sahjo Mart on social media
          </p>

        </div>

        {/* SLIDER VIEWPORT */}

        <div className="social-slider">

          <div
            className="social-track"
            ref={trackRef}
          >

            {/* FIRST SET */}

            <div
              className="social-set"
              ref={firstSetRef}
            >
              {renderSocials(
                "first"
              )}
            </div>

            {/* DUPLICATE SET
                MOBILE INFINITE SLIDER
            */}

            <div
              className="social-set social-set-duplicate"
              aria-hidden="true"
            >
              {renderSocials(
                "second"
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default SocialMediaSection;