import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NearByAttractions.css";

const NearByAttractions = ({ nearByPlaces , images }) => {
  const sliderRef = useRef(null);

    const NearByAttractionsBackGround =
    images && images.length > 0
      ? images[2].src
      : "https://via.placeholder.com/600x400?text=About+Image";

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  return (
    <div className="NearByAttraction-container">
      <img
        src={NearByAttractionsBackGround}
        alt="Background"
        className="NearbyAttractionBack"
      />

      <div className="Explore-slider-container">
        <div className="Explore-intro-heading">
          <div className="explore-intro-dot"></div>
          <h2 className="Explore-intro">Near By Attractions</h2>
        </div>

        <div className="Explore-custom-navigation">
          <p
            className="Explore-prev-btn"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            ←
          </p>
          <p
            className="Explore-next-btn"
            onClick={() => sliderRef.current?.slickNext()}
          >
            →
          </p>
        </div>

        {nearByPlaces && nearByPlaces.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
            {nearByPlaces.map((place) => (
              <div key={place.placeId} className="explore-near-slide">
                <img
                  src={place.image}
                  alt={place.imageAlt}
                  className="explore-slide-image"
                />
                <p className="explore-near-place-name">{place.name}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No nearby attractions available.</p>
        )}
      </div>
    </div>
  );
};

export default NearByAttractions;