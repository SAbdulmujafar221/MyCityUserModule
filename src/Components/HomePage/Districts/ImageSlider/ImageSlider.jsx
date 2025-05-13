// src/components/DistrictsImageSlider.jsx
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons


// array of image URLs
const districtSliderImages = [
  {
    id: 1,
    src: "./assets/images/district-images/image-1.jpg",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "/assets/images/district-images/image-3.jpg",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "/assets/images/district-images/image-4.jpg",
    alt: "Image 3",
  },
  {
    id: 4,
    src: "/assets/images/district-images/image-5.jpg",
    alt: "Image 4",
  },
  {
    id: 5,
    src: "/assets/images/district-images/image-6.jpg",
    alt: "Image 5",
  },
];



const DistrictsImageSlider = () => {
  const sliderRef = useRef(null);

  // Slider Settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, 
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        
       
      }
    ]
  };

  // Move Slider to Next Slide
  const slideRight = () => {
    sliderRef.current.slickNext();
  };

  // Move Slider to Previous Slide
  const slideLeft = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="district-slider-container">
      {/* Custom Arrows on Top-Right */}
      <div className="custom-arrows">
        <button onClick={slideLeft} className="arrow-btn left-btn">
          <FaArrowLeft />
        </button>
        <button onClick={slideRight} className="arrow-btn right-btn">
          <FaArrowRight />
        </button>
      </div>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {districtSliderImages.map((img) => (
          <div key={img.id} className="district-slide">
            <img src={img.src} alt="Loading...." className="district-image-slider" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DistrictsImageSlider;
