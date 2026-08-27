import React, { useEffect, useRef, useState } from "react";
import "./CategorySlider.css";

function CategorySlider({ id, title, description, items }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const animationRef = useRef(null);
  const progressRef = useRef(null);

  // Duplicate items for infinite loop
  const extendedItems = [...items, ...items, ...items];
  const originalLength = items.length;

  // Calculate items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        setItemsPerView(1);
      } else if (width <= 720) {
        setItemsPerView(1);
      } else if (width <= 1000) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();

    window.addEventListener("resize", updateItemsPerView);

    return () => {
      window.removeEventListener("resize", updateItemsPerView);
    };
  }, []);

  // =====================================================
  // Get REAL slide width from DOM
  // =====================================================

  const getSlideWidth = () => {
    const slider = sliderRef.current;

    if (!slider) return 0;

    const card = slider.querySelector(".slide-card");

    if (!card) return 0;

    const cardWidth = card.getBoundingClientRect().width;

    const styles = window.getComputedStyle(slider);

    const gap = parseFloat(styles.gap) || 0;

    return cardWidth + gap;
  };


  // =====================================================
  // CONTINUOUS SMOOTH SLIDER
  // =====================================================

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || originalLength === 0) return;

    let lastTime = performance.now();

    // Speed of continuous movement
    // 35 = slow
    // 45 = recommended
    // 60 = fast
    const speed = 40;

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;

      lastTime = currentTime;

      /*
        Continuous movement
      */

      slider.scrollLeft +=
        (speed * deltaTime) / 1000;


      const slideWidth = getSlideWidth();

      if (slideWidth) {
        const oneSetWidth =
          slideWidth * originalLength;


        /*
          SET 1
          SET 2
          SET 3

          Always stay around SET 2
        */

        if (
          slider.scrollLeft >=
          oneSetWidth * 2
        ) {
          slider.scrollLeft -= oneSetWidth;
        }


        if (
          slider.scrollLeft <= 0
        ) {
          slider.scrollLeft += oneSetWidth;
        }


        // Current active dot
        const index =
          Math.floor(
            slider.scrollLeft / slideWidth
          ) % originalLength;

        setCurrentIndex(index);
      }


      animationRef.current =
        requestAnimationFrame(animate);
    };


    // =====================================================
    // INITIALIZE SLIDER
    // =====================================================

    const initializeSlider = () => {
      const slideWidth = getSlideWidth();

      if (!slideWidth) return;

      // Start from middle copy
      slider.scrollLeft =
        originalLength * slideWidth;

      lastTime = performance.now();

      animationRef.current =
        requestAnimationFrame(animate);
    };


    const timer = setTimeout(
      initializeSlider,
      150
    );


    return () => {
      clearTimeout(timer);

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );

        animationRef.current = null;
      }
    };

  }, [originalLength, itemsPerView]);


  // =====================================================
  // Progress Bar
  // =====================================================

  useEffect(() => {
    if (!progressRef.current) return;

    progressRef.current.style.transition =
      "none";

    progressRef.current.style.width =
      "0%";

    requestAnimationFrame(() => {
      if (!progressRef.current) return;

      progressRef.current.style.transition =
        "width 4s linear";

      progressRef.current.style.width =
        "100%";
    });

  }, []);


  // =====================================================
  // GO TO SPECIFIC SLIDE
  // =====================================================

  const goToSlide = (index) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const slideWidth =
      getSlideWidth();

    if (!slideWidth) return;


    /*
      Always target the MIDDLE copy.
    */

    const targetIndex =
      originalLength + index;

    const targetPosition =
      targetIndex * slideWidth;


    /*
      Temporarily stop continuous animation
      and smoothly move to selected dot.
    */

    if (animationRef.current) {
      cancelAnimationFrame(
        animationRef.current
      );

      animationRef.current = null;
    }


    const startPosition =
      slider.scrollLeft;

    const distance =
      targetPosition -
      startPosition;

    const duration = 700;

    const startTime =
      performance.now();


    const animateDot = (currentTime) => {
      const progress =
        Math.min(
          (currentTime - startTime) /
            duration,
          1
        );


      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      slider.scrollLeft =
        startPosition +
        distance * eased;


      if (progress < 1) {

        animationRef.current =
          requestAnimationFrame(
            animateDot
          );

      } else {

        slider.scrollLeft =
          targetPosition;

        setCurrentIndex(index);


        /*
          Continuous movement restart
        */

        let lastTime =
          performance.now();

        const speed = 40;


        const continueAnimation = (
          currentTime
        ) => {

          const delta =
            currentTime - lastTime;

          lastTime = currentTime;


          slider.scrollLeft +=
            (speed * delta) / 1000;


          const width =
            getSlideWidth();


          if (width) {

            const oneSetWidth =
              width * originalLength;


            if (
              slider.scrollLeft >=
              oneSetWidth * 2
            ) {
              slider.scrollLeft -=
                oneSetWidth;
            }


            if (
              slider.scrollLeft <= 0
            ) {
              slider.scrollLeft +=
                oneSetWidth;
            }


            const newIndex =
              Math.floor(
                slider.scrollLeft / width
              ) % originalLength;


            setCurrentIndex(
              newIndex
            );
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
        animateDot
      );


    // Restart progress bar

    if (progressRef.current) {

      progressRef.current.style.transition =
        "none";

      progressRef.current.style.width =
        "0%";


      requestAnimationFrame(() => {

        if (!progressRef.current) return;

        progressRef.current.style.transition =
          "width 4s linear";

        progressRef.current.style.width =
          "100%";

      });
    }
  };


  // =====================================================
  // Render
  // =====================================================

  return (
    <section
      className="section"
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

          {extendedItems.map(
            (item, index) => (

              <article
                className="slide-card"
                key={`${item.title || "item"}-${index}`}
              >

                <img
                  src={item.image}
                  alt={item.title}
                  draggable="false"
                />


                <div className="slide-content">

                  {/* <span className="slide-label">{item.label}</span> */}


                  {/* <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a href={item.link || "#"}></a> */}

                </div>

              </article>

            )
          )}

        </div>


        {/* Progress Bar */}

        <div className="progress-bar-container">

          <div
            className="progress-bar"
            ref={progressRef}
          ></div>

        </div>


        {/* Dots indicator */}

        <div className="dots-container">

          {items.map(
            (_, index) => (

              <span
                key={index}
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