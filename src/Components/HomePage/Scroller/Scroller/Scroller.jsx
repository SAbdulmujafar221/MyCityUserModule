import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Scroller.css";
import { Link } from "react-router";
const images = [
  {
    url: "./assets/images/Scroller-images/Papikondalu.png",
    text: "PapiKondalu",
  },
  {
    url: "./assets/images/Scroller-images/Caves.jfif",
    text: "Caves",
  },
  {
    url: "./assets/images/Scroller-images/Guntur.png",
    text: "Guntur",
  },
  {
    url: "./assets/images/Scroller-images/Belgum-Caves.jfif",
    text: "Belgum Caves",
  },
  {
    url: "./assets/images/Scroller-images/Srisailam.jfif",
    text: "Srisailam",
  },
  {
    url: "./assets/images/Scroller-images/Papikondalu.png",
    text: "PapiKondalu",
  },
  {
    url: "./assets/images/Scroller-images/Caves.jfif",
    text: "Caves",
  },
  {
    url: "./assets/images/Scroller-images/Guntur.png",
    text: "Guntur",
  },
  {
    url: "./assets/images/Scroller-images/Belgum-Caves.jfif",
    text: "Belgum Caves",
  },
  {
    url: "./assets/images/Scroller-images/Srisailam.jfif",
    text: "Srisailam",
  },
];

const backgroundImages = [
  "./assets/images/Scroller-images/Papikondalu.png",
  "./assets/images/Scroller-images/Caves.jfif",
  "./assets/images/Scroller-images/Guntur.png",
  "./assets/images/Scroller-images/Belgum-Caves.jfif",
  "./assets/images/Scroller-images/Srisailam.jfif",
];

const Scroller = () => {
  const scrollRef = useRef(null);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  //  useEffect(() => {
  //     const interval = setInterval(() => {
  //       setProgress((prev) => (prev < 1 ? prev + 8.02 : 1));
  //     }, 100);

  //     return () => clearInterval(interval);
  //   }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div
        className="background-container"
        style={{
          backgroundImage: `url(${backgroundImages[currentBackgroundIndex]})`,
        }}
      >
        <div className="Title-name">
          <div className="title">
            Explore Andhra Pradesh - As per your Interest
          </div>
          <div className="name" id="imageName">
            Rama Krishna Beach
          </div>
        </div>
        <div>
          <div className="exploring">
            <Link to="/CategoriesExplore">
              <button class="button" style={{ background: " #7808d0" }}>
                <span class="button__icon-wrapper">
                  <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="button__icon-svg"
                    width="10"
                  >
                    <path
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                      fill="currentColor"
                    ></path>
                  </svg>

                  <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    width="10"
                    xmlns="http://www.w3.org/2000/svg"
                    class="button__icon-svg button__icon-svg--copy"
                  >
                    <path
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                View All
              </button>
            </Link>
          </div>
          <div>
            <div className="scroller">
              <button
                onClick={() => handleScroll("left")}
                className="scroll-button"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="scroll-button"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="scroller-wrapper">
          <div ref={scrollRef} className="scroller-container">
            {images.map((img, index) => (
              <div key={index} className="scroller-item">
                <img
                  src={img.url}
                  alt="loading..."
                  className="scroller-image"
                />
                <span className="image-text">{img.text}</span>
              </div>
              // <div>

              // </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroller;
