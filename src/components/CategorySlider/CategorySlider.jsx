import React, { useEffect, useRef, useState } from "react";
import "./CategorySlider.css";

function CategorySlider({ id, title, description, items = [] }) {
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const progressRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const originalLength = items.length;

  /*
   * Duplicate nahi kar rahe.
   * Real items ko hi continuously move karenge.
   */

  /* =====================================================
     GET CARD WIDTH
  ===================================================== */

  const getCardWidth = () => {
    const slider = sliderRef.current;

    if (!slider) return 0;

    const card = slider.querySelector(".slide-card");

    if (!card) return 0;

    const cardWidth = card.getBoundingClientRect().width;

    const style = window.getComputedStyle(slider);

    const gap = parseFloat(style.columnGap || style.gap) || 0;

    return cardWidth + gap;
  };

  /* =====================================================
     AUTO SLIDER
  ===================================================== */

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || originalLength <= 1) {
      return undefined;
    }

    let running = true;
    let lastTime = performance.now();

    /*
     * Speed in pixels per second
     */
    const speed = 35;

    const animate = (currentTime) => {
      if (!running) return;

      const deltaTime = currentTime - lastTime;

      lastTime = currentTime;

      /*
       * Very large delta avoid
       */
      const safeDelta = Math.min(deltaTime, 50);

      /*
       * Move continuously
       */
      slider.scrollLeft +=
        (speed * safeDelta) / 1000;

      const cardWidth = getCardWidth();

      if (cardWidth > 0) {
        /*
         * Current visible card
         */
        const rawIndex =
          Math.round(slider.scrollLeft / cardWidth);

        const newIndex =
          rawIndex % originalLength;

        setCurrentIndex(newIndex);

        /*
         * IMPORTANT
         *
         * Jab last ke paas pahunch jaye
         * to first par smoothly reset.
         */

        const maxScroll =
          slider.scrollWidth -
          slider.clientWidth;

        if (
          maxScroll > 0 &&
          slider.scrollLeft >= maxScroll - 1
        ) {
          slider.scrollLeft = 0;
          setCurrentIndex(0);
        }
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    /*
     * Start animation
     */
    animationRef.current =
      requestAnimationFrame(animate);

    /*
     * Cleanup
     */
    return () => {
      running = false;

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );

        animationRef.current = null;
      }
    };
  }, [originalLength]);

  /* =====================================================
     RESIZE
  ===================================================== */

  useEffect(() => {
    const handleResize = () => {
      const slider = sliderRef.current;

      if (!slider) return;

      /*
       * Resize ke baad position safe rakho
       */
      const maxScroll =
        slider.scrollWidth -
        slider.clientWidth;

      if (
        maxScroll <= 0 ||
        slider.scrollLeft > maxScroll
      ) {
        slider.scrollLeft = 0;
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =====================================================
     PROGRESS BAR
  ===================================================== */

  useEffect(() => {
    const progress = progressRef.current;

    if (!progress) return;

    progress.style.transition = "none";
    progress.style.width = "0%";

    const frame = requestAnimationFrame(() => {
      if (!progress) return;

      progress.style.transition =
        "width 4s linear";

      progress.style.width = "100%";
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [currentIndex]);

  /* =====================================================
     GO TO SLIDE
  ===================================================== */

  const goToSlide = (index) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const cardWidth = getCardWidth();

    if (!cardWidth) return;

    /*
     * Auto animation temporarily stop
     */
    if (animationRef.current) {
      cancelAnimationFrame(
        animationRef.current
      );

      animationRef.current = null;
    }

    const targetPosition =
      index * cardWidth;

    const startPosition =
      slider.scrollLeft;

    const distance =
      targetPosition - startPosition;

    const duration = 600;

    const startTime =
      performance.now();

    let running = true;

    const animateToSlide = (currentTime) => {
      if (!running) return;

      const progress = Math.min(
        (currentTime - startTime) /
          duration,
        1
      );

      const eased =
        1 -
        Math.pow(1 - progress, 3);

      slider.scrollLeft =
        startPosition +
        distance * eased;

      if (progress < 1) {
        animationRef.current =
          requestAnimationFrame(
            animateToSlide
          );
      } else {
        slider.scrollLeft =
          targetPosition;

        setCurrentIndex(index);

        /*
         * Restart auto slider
         */
        let lastTime =
          performance.now();

        const continueAnimation =
          (time) => {
            if (!running) return;

            const delta =
              Math.min(
                time - lastTime,
                50
              );

            lastTime = time;

            slider.scrollLeft +=
              (35 * delta) / 1000;

            const maxScroll =
              slider.scrollWidth -
              slider.clientWidth;

            if (
              maxScroll > 0 &&
              slider.scrollLeft >=
                maxScroll - 1
            ) {
              slider.scrollLeft = 0;
              setCurrentIndex(0);
            } else {
              const width =
                getCardWidth();

              if (width > 0) {
                const newIndex =
                  Math.round(
                    slider.scrollLeft /
                      width
                  ) % originalLength;

                setCurrentIndex(
                  newIndex
                );
              }
            }

            animationRef.current =
              requestAnimationFrame(
                continueAnimation
              );
          };

        animationRef.current =
          requestAnimationFrame(
            continueAnimation
          );
      }
    };

    animationRef.current =
      requestAnimationFrame(
        animateToSlide
      );
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section
      className="section category-slider-section"
      id={id}
    >
      <div className="container">

        {/* HEADER */}

        <div className="section-head">
          <div>
            <span className="section-kicker">
              Category
            </span>

            <h2>{title}</h2>

            <p>
              {description}
            </p>
          </div>
        </div>

        {/* SLIDER */}

        <div
          className="category-slider"
          id={`${id}-slider`}
          ref={sliderRef}
        >
          {items.map((item, index) => (
            <article
              className="slide-card"
              key={
                item.id ||
                `${item.title || "item"}-${index}`
              }
            >
              <img
                src={item.image}
                alt={item.title || "Category"}
                draggable="false"
              />

              <div className="slide-content">
                {item.label && (
                  <span className="slide-label">
                    {item.label}
                  </span>
                )}

                <h3>
                  {item.title}
                </h3>

                {item.description && (
                  <p>
                    {item.description}
                  </p>
                )}

                {item.link && (
                  <a
                    href={item.link}
                    aria-label={item.title}
                  >
                    View
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* PROGRESS */}

      

        {/* DOTS */}

        {items.length > 1 && (
          <div className="dots-container">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${
                  index + 1
                }`}
                className={`dot ${
                  index === currentIndex
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  goToSlide(index)
                }
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default CategorySlider;