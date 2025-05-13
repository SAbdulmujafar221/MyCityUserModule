import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MainExplorePage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import NearByAttractions from "./ExplorePage/NearByAttractions/NearByAttractions";
import NearByStay from "./ExplorePage/NearByStay/NearByStay";
import ExploreReview from "./ExplorePage/Review/ExploreReview";
import SwitchingPage from "./ExplorePage/SwitchingPages/SwitchingPages";
import LocalTreasures from "./ExplorePage/LocalTreasures/LocalTreasures";
import BackToHome from "../../../BackToHome/BackToHome";

const MainExplorePage = () => {
  const [exploreData, setExploreData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const { slug } = useParams(); // slug is actually placeId here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://383b-122-166-70-72.ngrok-free.app/client/about/place/${slug}`,
          {
            withCredentials: true,
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const sectionData = res.data.sections?.[0]?.data?.about;

        if (!sectionData || !sectionData.placeId) {
          console.error("Invalid section data or placeId not found");
          return;
        }

        const formattedData = {
          location: sectionData.name,
          images: sectionData.placeRelatedImages?.map((img) => ({
            src: img.imageUrl,
            alt: img.imageName || sectionData.name,
          })) || [],
          about: {
            intro: sectionData.about,
            history: sectionData.history,
            openingtime: sectionData.openingTime,
            closingtime: sectionData.cloingTime, // Handle API typo
            latitude: sectionData.latitude,
            longitude: sectionData.longitude,
            rating: sectionData.rating,
          },
          reviews: sectionData.reviews?.map((review) => ({
            image: review.imageUrl,
            text: review.reviewDescription,
            author: review.userName,
            postedOn: review.postedOn,
            circle: {
              img: review.imageUrl,
              alt: review.userName,
              top: "10%",
              left: "10%",
            },
          })) || [],
          localCuisines: sectionData.localCuisines?.map((cuisine) => ({
            title: cuisine.cuisineName,
            images: cuisine.imageUrl?.map((img) => ({
              src: img.imageUrl,
              alt: img.imageName,
            })) || [],
          })) || [],
          nearByPlaces: sectionData.nearByPlaces?.map((place) => {
            const mainImage = place.imageUrls?.find(
              (img) => img.imageName === "placeimagemain"
            );
            return {
              placeId: place.placeId,
              name: place.placeName,
              latitude: place.latitude,
              longitude: place.longitude,
              image: mainImage?.imageUrl || "https://via.placeholder.com/150",
              imageAlt: mainImage?.imageName || place.placeName,
            };
          }) || [],
          events: sectionData.events || [],
        };

        setExploreData(formattedData);
      } catch (error) {
        console.error("Error fetching explore data:", error);
      }
    };

    fetchData();
  }, [slug]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    beforeChange: (_, next) => setCurrentIndex(next),
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    sliderRef.current.slickGoTo(index);
  };

  if (!exploreData) return <div>Loading...</div>;

  return (
    <>
      <div className="main-explore-page-slider-container">
        <BackToHome />
        <Slider ref={sliderRef} {...settings}>
          {exploreData.images.map((image, index) => (
            <div key={index} className="main-explore-page-slide">
              <img
                src={image.src}
                alt={image.alt}
                className="main-explore-page-image"
              />
            </div>
          ))}
        </Slider>
        <p className="main-explore-page-name">{exploreData.location}</p>
        <div className="main-explore-dots-container">
          {exploreData.images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`dot ${currentIndex === index ? "active" : "inactive"}`}
            />
          ))}
        </div>
      </div>

      <SwitchingPage
        about={exploreData.about}
        images={exploreData.images}
        location={exploreData.location}
      />

      <div className="explore-components-container">
        <NearByAttractions nearByPlaces={exploreData.nearByPlaces} />
      </div>
      <div className="explore-components-container">
        <NearByStay />
      </div>
      <div className="explore-components-container">
        <LocalTreasures localCuisines={exploreData.localCuisines} />
      </div>
      <div className="explore-components-container">
        <ExploreReview reviews={exploreData.reviews} />
      </div>
    </>
  );
};

export default MainExplorePage;