import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MainExplorePage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

// Components
import NearByAttractions from "./ExplorePage/NearByAttractions/NearByAttractions";
import NearByStay from "./ExplorePage/NearByStay/NearByStay";
import ExploreReview from "./ExplorePage/Review/ExploreReview";
import SwitchingPage from "./ExplorePage/SwitchingPages/SwitchingPages";
import LocalTreasures from "./ExplorePage/LocalTreasures/LocalTreasures";
import BackToHome from "../../../BackToHome/BackToHome";

const MainExplorePage = () => {
  const [exploreData, setExploreData] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const { placeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://86df-223-196-169-250.ngrok-free.app/client/about/place/${placeId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const sectionData = Array.isArray(res.data.sections)
          ? res.data.sections.find(
              (item) => item.data.about.placeId === Number(placeId)
            )?.data
          : res.data;

        if (!sectionData || !sectionData.about.placeId) {
          setError("Place not found or invalid data");
          return;
        }

        const formattedData = {
          location: sectionData.about.name,
          images: (sectionData.about.placeRelatedImages || []).map((img) => ({
            src:
              img.imageUrl !== "Media service is currently unavailable"
                ? img.imageUrl
                : "/assets/fallback.jpg",
            alt: img.imageName || sectionData.about.name,
          })),
          about: {
            intro: sectionData.about.about,
            history: sectionData.about.history,
            openingtime: sectionData.about.openingTime,
            closingtime:
              sectionData.about.cloingTime || sectionData.about.closingTime,
            latitude: sectionData.about.latitude,
            longitude: sectionData.about.longitude,
            rating: sectionData.about.rating,
          },
          reviews: (sectionData.about.reviews || []).map((review) => ({
            image: review.imageUrl || "https://via.placeholder.com/100",
            text: review.reviewDescription,
            author: review.userName,
            postedOn: review.postedOn,
            circle: {
              img: review.imageUrl || "https://via.placeholder.com/100",
              alt: review.userName,
              top: "10%",
              left: "10%",
            },
          })),
          localCuisines: (sectionData.about.localCuisines || []).map(
            (cuisine) => ({
              title: cuisine.cuisineName,
              images: (cuisine.imageUrl || []).map((img) => ({
                src:
                  img.imageUrl !== "Media service is currently unavailable"
                    ? img.imageUrl
                    : "/assets/fallback.jpg",
                alt: img.imageName,
              })),
            })
          ),
          nearByPlaces: Array.isArray(sectionData.about.nearByPlaces)
            ? sectionData.about.nearByPlaces.map((place) => {
                const mainImage = place.imageUrls?.find(
                  (img) => img.imageName === "placeimagemain"
                );
                return {
                  placeId: place.placeId,
                  name: place.placeName,
                  latitude: place.latitude,
                  longitude: place.longitude,
                  image:
                    mainImage?.imageUrl !==
                    "Media service is currently unavailable"
                      ? mainImage?.imageUrl
                      : "https://via.placeholder.com/150",
                  imageAlt: mainImage?.imageName || place.placeName,
                };
              })
            : [],
          events: sectionData.about.events ?? [],
        };

        console.log(
          "Formatted Explore Data:",
          JSON.stringify(formattedData, null, 2)
        );
        setExploreData(formattedData);
        console.log("Explore data:", formattedData);
      } catch (error) {
        console.error("Error fetching explore data:", error);
        console.error("Error details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          code: error.code,
        });
        setError(
          `Failed to load data: ${error.message}. Please check your network or contact support.`
        );
      }
    };

    fetchData();
  }, [placeId]);

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
    sliderRef.current?.slickGoTo(index);
  };

  if (error) return <div className="main-explore-error">{error}</div>;
  if (!exploreData)
    return <div className="main-explore-loading">Loading...</div>;

  return (
    <>
      <div className="main-explore-page-slider-container">
        <BackToHome />
        {exploreData.images.length > 0 ? (
          <Slider ref={sliderRef} {...settings}>
            {exploreData.images.map((image, index) => (
              <div key={image.src + index} className="main-explore-page-slide">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="main-explore-page-image"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="main-explore-no-images">No Images Available</div>
        )}

        <p className="main-explore-page-name">{exploreData.location}</p>
        <div className="main-explore-dots-container">
          {exploreData.images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`dot ${
                currentIndex === index ? "active" : "inactive"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="main-explore-page">
        <SwitchingPage
          about={exploreData.about}
          images={exploreData.images}
          location={exploreData.location}
        />

        <div className="explore-components-container">
          <NearByAttractions
            nearByPlaces={exploreData.nearByPlaces}
            images={exploreData.images}
          />
        </div>

        <div className="explore-components-container">
          <NearByStay images={exploreData.images} />
        </div>

        <div className="explore-components-container">
          <LocalTreasures localCuisines={exploreData.localCuisines} />
        </div>

        <div className="explore-components-container">
          <ExploreReview reviews={exploreData.reviews} />
        </div>
      </div>
    </>
  );
};

export default MainExplorePage;
