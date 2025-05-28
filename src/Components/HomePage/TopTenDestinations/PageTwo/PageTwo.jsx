import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PageTwo.css";
import { Link } from "react-router-dom";
import axios from "axios";

const tourismBackground = "/assets/tourismbg.jpg";

const PageTwo = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [places, setPlaces] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(
          "https://86df-223-196-169-250.ngrok-free.app/client/discovery/getall",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        console.log("API Response:", res.data);
        const fetchedPlaces = res.data || [];
        setPlaces(fetchedPlaces);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const getVisiblePlaces = () => {
    const visiblePlaces = [
      ...places.slice(startIndex, Math.min(startIndex + 5, places.length)),
      ...places.slice(0, Math.max(0, startIndex + 5 - places.length)),
    ];
    console.log("Visible Places:", visiblePlaces);
    return visiblePlaces;
  };

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % places.length);
  };

  const prevSlide = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + places.length) % places.length
    );
  };

  return (
    <>
      <div className="tourism-module-background">
        <img
          src={tourismBackground}
          alt="tourism background"
          className="tourism-background-image"
        />
      </div>

      <div className="top-ten-destinations">
        <h2 className="ten-destinations-heading">
          Bucket List Worthy: <span>10 Destinations You Can't Miss!</span>
        </h2>

        <div className="slider-navigation">
          <button onClick={prevSlide}>
            <FaArrowLeft className="arrow left" />
          </button>
          <button onClick={nextSlide}>
            <FaArrowRight className="arrow right" />
          </button>
        </div>

        <div className="page-two-slider-container" ref={sectionRef}>
          <motion.div className="page-two-image-wrapper">
            {getVisiblePlaces().map((place, index) => (
              <motion.div
                key={place.placeId}
                className={`page-two-image-container ${
                  index === activeIndex ? "active" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(0)}
                initial={{ width: "20%" }}
                animate={{
                  width: index === activeIndex ? "100%" : "20%",
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
              >
                <Link to={`/MainExplore/${encodeURIComponent(place.placeId)}`}>
                  <motion.img
                    src={
                      (place.placeRelatedImages &&
                        place.placeRelatedImages.length > 0 &&
                        place.placeRelatedImages[0].imageUrl !==
                          "Media service is currently unavailable" &&
                        place.placeRelatedImages[0].imageUrl) ||
                      "/assets/fallback.jpg"
                    }
                    alt={place.placeName}
                    initial={{
                      y: index % 2 === 0 ? "-100%" : "100%",
                      opacity: 0,
                    }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className={`page-two-slider-image ${
                      index === activeIndex ? "active" : "inactive"
                    }`}
                  />
                </Link>
                {index === activeIndex && (
                  <div className="top-image-text">{place.placeName}</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PageTwo;