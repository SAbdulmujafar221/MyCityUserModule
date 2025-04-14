import React, { useState } from "react";
import "./MainExplorePage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NearByAttractions from "./ExplorePage/NearByAttractions/NearByAttractions";
import NearByStay from "./ExplorePage/NearByStay/NearByStay";
import ExploreReview from "./ExplorePage/Review/ExploreReview";
import SwitchingPage from "./ExplorePage/SwitchingPages/SwitchingPages";

const mainExplorePageImages = [
  { id: 1, src: "./assets/images/ExploreImages/explore1.jpeg", alt: "Image 1" },
  { id: 2, src: "./assets/images/ExploreImages/explore2.jpeg", alt: "Image 2" },
  { id: 3, src: "./assets/images/ExploreImages/explore3.jpeg", alt: "Image 3" },
];

const MainExplorePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
  };

  return (
    <>
      <div className="main-explore-page-slider-container">
        <Slider {...settings}>
          {mainExplorePageImages.map((image) => (
            <div key={image.id} className="main-explore-page-slide">
              <img
                src={image.src}
                alt={image.alt}
                className="main-explore-page-image"
              />
            </div>
          ))}
        </Slider>
        <p className="main-explore-page-name">Maredumilli</p>
        <div className="main-explore-dots-container">
          {mainExplorePageImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`dot ${
                currentIndex === index ? "active" : " inactive"
              }`}
            />
          ))}
        </div>
      </div>
      <SwitchingPage />

      <div className="explore-components-container">
        <NearByAttractions />
      </div>
      <div className="explore-components-container">
        <NearByStay />
      </div>
      <div className="explore-components-container">
        <ExploreReview />
      </div>
    </>
  );
};

export default MainExplorePage;
