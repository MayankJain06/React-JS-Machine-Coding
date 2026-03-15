import React, { useState, useEffect, Suspense, lazy } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Carousel.css";

// LazyLoad DynamicImage Component

const DynamicImage = lazy(() => import("./DynamicImage"));

const Carousel = ({ data }) => {
  console.log(data);
  const [slide, setSlide] = useState(0);

  const prevSlide = () => {
    setSlide(slide == 0 ? data.slides.length - 1 : slide - 1);
  };

  const NextSlide = () => {
    setSlide(slide == data.slides.length - 1 ? 0 : slide + 1);
  };

  useEffect(() => {
    if (!data?.slides?.length) return;

    const nextIndex = (slide + 1) % data.slides.length;
    const prevIndex = (slide - 1 + data.slides.length) % data.slides.length;

    [nextIndex, prevIndex].forEach((i) => {
      const img = new Image();
      img.src = data.slides[i].src;
    });
  }, [slide, data]);

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide} />
      {data?.slides?.map((imageData, index) => (
        <Suspense
          fallback={<div className="slide-loading">Loading...</div>}
          key={index}
        >
          <DynamicImage
            url={imageData.src}
            alt={imageData.alt}
            className={slide == index ? "slide" : "slide slide-hidden"}
          />
        </Suspense>
      ))}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={NextSlide}
      />
      <span className="indicators">
        {data?.slides?.map((_, index) => (
          <button
            className={
              slide === index ? "indicator" : "indicator indicator-inactive"
            }
            key={index}
            onClick={() => setSlide(index)}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default Carousel;
