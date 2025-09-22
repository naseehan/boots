import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link, useNavigate } from "react-router-dom";

import "../stylePages/bestSeller/App.css";
import products from "./products";

const animation = { duration: 30000, easing: (t) => t };

const BestSeller = () => {
  // Keen slider setup
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",
    origin: "center",
    drag: true,
    slides: {
      perView: 3,
      spacing: 80,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      "(max-width: 640px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });

  // Pause on hover
  React.useEffect(() => {
    if (!instanceRef.current) return;
    const sliderEl = instanceRef.current.container;

    const stop = () => instanceRef.current?.animator.stop();
    const resume = () =>
      instanceRef.current?.moveToIdx(
        instanceRef.current.track.details.abs + 5,
        true,
        animation
      );

    sliderEl.addEventListener("mouseover", stop);
    sliderEl.addEventListener("mouseleave", resume);

    return () => {
      sliderEl.removeEventListener("mouseover", stop);
      sliderEl.removeEventListener("mouseleave", resume);
    };
  }, [instanceRef]);


  let navigate = useNavigate();
  const handleClick = (slug) => {
     navigate(`/products/${slug}`);
  };

  return (
    <div className="">
      {/* heading */}
      <div className="best-seller-heading">
        <h1 className="h1-heading">Our Best Sellers</h1>
      </div>

      {/* carousel */}
      <div ref={sliderRef} className="keen-slider home-slider" id="slider">
        {products.shoes.map((item) => (
          <div
            key={item.id}
            className="keen-slider__slide number-slide1 group"
            onClick={() => handleClick(item.slug)}
          >
            <div className="keenslider-image-container">
              <img
                className=""
                src={item.image}
                loading="lazy"
                alt={item.name}
              />
            </div>

            {/* overlay */}
            <div
              className="custom-overlay"
            >
              <h3>
                {item.name}
              </h3>
              <p>
                LEARN MORE
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* button */}
      <div className="button-container pb-20">
        <Link to="/products">MORE PRODUCTS</Link>
      </div>
    </div>
  );
};

export default BestSeller;
