import React, { useState ,  useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LocalTreasures.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cardData = [
  {
    image: "/assets/images/home-images/img2.jpg",
    title: "Maredumilli Special Food",
    description: "Bamboo Chicken",
  },
  {
    image: "/assets/images/home-images/img3.jpg",
    title: "Sankranti Festival",
    description: "13 Jan 2023 - 16 Jan 2023, 8:00 AM - 10:00 PM",
  },
  {
    image: "/assets/images/home-images/img4.jpg",
    title: "Tribal Dance",
    description: "Evening Folk Performance",
  },
  {
    image: "/assets/images/home-images/img5.jpg",
    title: "Forest Trail",
    description: "Guided Nature Walks",
  },
];

const LocalTreasures = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const totalSlides = cardData.length;

  return (
    <div className="local-treasures-wrapper">
      <div
        className="local-treasures-left-section"
        style={{
          backgroundImage: "url('/assets/images/home-images/img1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="local-treasures-overlay" />
        <div className="local-treasure-main-container">
          <div className="local-treasures-left-content">
            <h4>SPOTLIGHT</h4>
            <h2>
              Discover
              <br />
              Maredumilli
              <br />
              Iconic Treasures
            </h2>

            <div className="slider-indicator-wrapper">
              <div className="slider-track">
                <div
                  className="slider-thumb"
                  style={{
                    left: `${(currentSlide / (totalSlides - 1)) * 70}%`,
                  }}
                />
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
          <Slider ref={sliderRef} {...settings} className="local-treasures-right-slider">
            {cardData.map((card, index) => (
              <div className="local-treasures-slider-card">
              <div className="image-mask-container">
                <img src={card.image} alt={card.title} />
                <div className="image-gradient-mask" />
              </div>
              <div className="local-treasures-card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>            
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default LocalTreasures;
