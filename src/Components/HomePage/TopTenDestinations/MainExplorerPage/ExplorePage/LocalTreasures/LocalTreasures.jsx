import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LocalTreasures.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LocalTreasures = ({ localCuisines }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Transform localCuisines to match expected structure
 const transformedCuisines = localCuisines
  ? localCuisines.map((cuisine) => ({
      title: cuisine.cuisineName,
      description: cuisine.description || "A delicious local specialty",
      images: Array.isArray(cuisine.imageUrl)
        ? cuisine.imageUrl.map((img) => ({ src: img.imageUrl }))
        : [],
    }))
  : [];


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const totalSlides = transformedCuisines.length;

  return (
    <div className="local-treasures-wrapper">
      <div
        className="local-treasures-left-section"
        style={{
          backgroundImage: "url('/assets/images/home-images/img1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      >
        <div className="local-treasures-overlay" />
        <div className="local-treasure-main-container">
          <div className="local-treasures-left-content">
            <h4>SPOTLIGHT</h4>
            <h2>
              Discover
              <br />
              Local
              <br />
              Iconic Treasures
            </h2>

            <div className="slider-indicator-wrapper">
              <div className="slider-track">
                {totalSlides > 0 && (
                  <div
                    className="slider-thumb"
                    style={{
                      left: `${(currentSlide / (totalSlides - 1)) * 70}%`,
                    }}
                  />
                )}
              </div>
            </div>

            <div className="local-treasures-button-container">
              <button onClick={handlePrev}>
                <ChevronLeft />
              </button>
              <button onClick={handleNext}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div className="local-treasures-right-section">
          {transformedCuisines.length > 0 ? (
            <Slider
              ref={sliderRef}
              {...settings}
              className="local-treasures-right-slider"
            >
              {transformedCuisines.map((cuisine, index) => (
                <div key={index} className="local-treasures-slider-card">
                  <div className="image-mask-container">
                    <img
                      src={cuisine.images[0]?.src || "/assets/fallback.jpg"}
                      alt={cuisine.title}
                    />
                    <div className="image-gradient-mask" />
                  </div>
                  <div className="local-treasures-card-content">
                    <h3>{cuisine.title}</h3>
                    <p>{cuisine.description}</p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No local cuisines available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalTreasures;