import React, { useRef } from "react";
import Slider from "react-slick";

// Import Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../NearByAttractions/NearByAttractions.css";
import "./NearByStay.css"

const exploreStayImages = [
  {
    src: "/assets/NearByImages/nearbyhotels1.png",
  },
  {
    src: "/assets/NearByImages/nearbyhotels2.png",
  },
  {
    src: "/assets/NearByImages/nearbyhotels3.png",
  },
];

const NearByStay = (images) => {
  const swiperRef = useRef(null);

  const settings = {
    infinite: true, // Infinite loop
    speed: 500, // Transition speed in ms
    slidesToShow: 2, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    pauseOnHover: false, // Prevent pausing on hover
  };

   const NearByStayBackGround =
    images && images.length > 0
      ? images[0].src
      : "https://via.placeholder.com/600x400?text=About+Image";
 
 
  return (
    <div className="NearByAttraction-container">
      <img
        src={NearByStayBackGround }
        alt="Loading...."
        className="NearbyStayBack"
        
      />

      <div className="Explore-stay-slider-container ">
        <div className="Explore-intro-heading">
        <div className="explore-intro-dot"></div>
          <h2 className="Explore-intro">Near By Stays</h2>
          
        </div>
        <div className="Explore-custom-navigation">
          <p
            className="Explore-prev-btn"
            onClick={() => swiperRef.current?.slickPrev()}
          >
            &#8592;
          </p>
          <p
            className="Explore-next-btn"
            onClick={() => swiperRef.current?.slickNext()}
          >
            &#8594;
          </p>
        </div>
        <Slider ref={swiperRef} {...settings}>
          {exploreStayImages.map((image) => (
            <div key={image.id} className="explore-near-slide">
              <img src={image.src} alt={image.alt} className="explore-slide-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NearByStay;