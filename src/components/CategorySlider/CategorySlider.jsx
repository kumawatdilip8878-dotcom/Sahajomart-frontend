import React, { useEffect, useRef, useState } from "react";
import "./CategorySlider.css";

function CategorySlider({
  id,
  title,
  description,
  items = [],
}) {
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const animationRef = useRef(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const originalLength = items.length;

  const extendedItems = [
    ...items,
    ...items,
    ...items,
  ];

  const getSlideWidth = () => {
    const track = trackRef.current;

    if (!track) return 0;

    const card =
      track.querySelector(".slide-card");

    if (!card) return 0;

    const cardWidth =
      card.getBoundingClientRect().width;

    const gap =
      parseFloat(
        window.getComputedStyle(track).gap
      ) || 0;

    return cardWidth + gap;
  };

  useEffect(() => {
    const track = trackRef.current;

    if (!track || !originalLength) {
      return;
    }

    let running = true;
    let lastTime = performance.now();

    const speed = 20;

    const animate = (time) => {
      if (!running) return;

      const delta =
        time - lastTime;

      lastTime = time;

      const width =
        getSlideWidth();

      if (width) {
        const oneSetWidth =
          width * originalLength;

        positionRef.current +=
          (speed * delta) / 1000;

        if (
          positionRef.current >=
          oneSetWidth * 2
        ) {
          positionRef.current -=
            oneSetWidth;
        }

        if (
          positionRef.current <
          0
        ) {
          positionRef.current +=
            oneSetWidth;
        }

        track.style.transform =
          `translate3d(${-positionRef.current}px, 0, 0)`;

        const index =
          Math.floor(
            positionRef.current /
              width
          ) % originalLength;

        setCurrentIndex(
          index < 0
            ? 0
            : index
        );
      }

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    const initialize = () => {
      const width =
        getSlideWidth();

      if (!width) return;

      positionRef.current =
        width * originalLength;

      track.style.transform =
        `translate3d(${-positionRef.current}px, 0, 0)`;

      lastTime =
        performance.now();

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    const timer = setTimeout(
      initialize,
      100
    );

    const handleResize = () => {
      const width =
        getSlideWidth();

      if (!width) return;

      positionRef.current =
        width * originalLength;

      track.style.transform =
        `translate3d(${-positionRef.current}px, 0, 0)`;
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      running = false;

      clearTimeout(timer);

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (
        animationRef.current
      ) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      track.style.transform =
        "translate3d(0, 0, 0)";
    };
  }, [originalLength]);

  const goToSlide = (index) => {
    const track =
      trackRef.current;

    if (!track) return;

    const width =
      getSlideWidth();

    if (!width) return;

    if (
      animationRef.current
    ) {
      cancelAnimationFrame(
        animationRef.current
      );
    }

    const start =
      positionRef.current;

    const target =
      (originalLength + index) *
      width;

    const distance =
      target - start;

    const duration = 600;

    const startTime =
      performance.now();

    const animateTo =
      (time) => {
        const progress =
          Math.min(
            (time - startTime) /
              duration,
            1
          );

        const eased =
          1 -
          Math.pow(
            1 - progress,
            3
          );

        positionRef.current =
          start +
          distance * eased;

        track.style.transform =
          `translate3d(${-positionRef.current}px, 0, 0)`;

        if (progress < 1) {
          animationRef.current =
            requestAnimationFrame(
              animateTo
            );
        } else {
          setCurrentIndex(index);

          let last =
            performance.now();

          const continueAnimation =
            (currentTime) => {
              const delta =
                currentTime - last;

              last = currentTime;

              const currentWidth =
                getSlideWidth();

              if (currentWidth) {
                const setWidth =
                  currentWidth *
                  originalLength;

                positionRef.current +=
                  (20 * delta) / 1000;

                if (
                  positionRef.current >=
                  setWidth * 2
                ) {
                  positionRef.current -=
                    setWidth;
                }

                track.style.transform =
                  `translate3d(${-positionRef.current}px, 0, 0)`;
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
        animateTo
      );
  };

  if (!items.length) {
    return null;
  }

  return (
    <section
      className="section category-section"
      id={id}
    >
      <div className="container">

        <div className="section-head">
          <div>
            <span className="section-kicker">
              Category
            </span>

            <h2>{title}</h2>

            <p>{description}</p>
          </div>
        </div>

        <div className="category-slider">
          <div
            className="category-track"
            ref={trackRef}
          >
            {extendedItems.map(
              (item, index) => (
                <article
                  className="slide-card"
                  key={`${
                    item.title || "item"
                  }-${index}`}
                >
                  <img
                    src={item.image}
                    alt={
                      item.title ||
                      "Category"
                    }
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
                      <a href={item.link}>
                        View
                      </a>
                    )}
                  </div>
                </article>
              )
            )}
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" />
        </div>

        <div className="dots-container">
          {items.map(
            (_, index) => (
              <button
                key={index}
                type="button"
                className={`dot ${
                  index === currentIndex
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  goToSlide(index)
                }
              />
            )
          )}
        </div>

      </div>
    </section>
  );
}

export default CategorySlider;