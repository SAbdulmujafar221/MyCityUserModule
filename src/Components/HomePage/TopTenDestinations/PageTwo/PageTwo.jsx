import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PageTwo.css";
import { Link } from "react-router";
// import { useSpring, animated } from "@react-spring/web";

const images = [
  {
    src: "/assets/images/home-images/img3.jpg",
    alt: "Beautiful mountain view",
    title: "Maredupalli",
  },
  {
    src: "/assets/images/home-images/img4.jpg",
    alt: "Serene beach landscape",
    title: "Beachside Bliss",
  },
  {
    src: "/assets/images/home-images/img5.jpg",
    alt: "Historical city architecture",
    title: "Historic Wonders",
  },
  {
    src: "/assets/images/home-images/img6.jpg",
    alt: "Peaceful countryside scenery",
    title: "Countryside Retreat",
  },
  {
    src: "/assets/images/home-images/img7.jpg",
    alt: "Vibrant sunset over the ocean",
    title: "Ocean Sunset",
  },
];

const PageTwo = ({ initialImage }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [displayImages, setDisplayImages] = useState([
    {
      src: initialImage,
      alt: "Beautiful mountain view",
      title: "Maredupalli",
    },
    ...images.slice(1),
  ]);
  const sectionRef = useRef(null);

  useEffect(() => {
    setInView(true);

    const timer = setTimeout(() => {
      setDisplayImages(images);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getVisibleImages = () => {
    return [
      ...images.slice(startIndex, Math.min(startIndex + 5, images.length)),
      ...images.slice(0, Math.max(0, startIndex + 5 - images.length)),
    ];
  };

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div>
      <Link to="/MainExplorePlorer">
        {inView && (
          <div className="top-ten-destinations">
            <h2 className="ten-destinations-heading">
              Discover Top 10 Destinations
            </h2>
            {/* <MovingImage /> */}
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
                {getVisibleImages().map((img, index) => (
                  <motion.div
                    key={index}
                    className={`page-two-image-container ${
                      index === activeIndex ? "active" : ""
                    }`}
                    onMouseEnter={() => {
                      setActiveIndex(index);
                    }}
                    onMouseLeave={() => setActiveIndex(0)}
                    animate={{
                      width: index === activeIndex ? "100%" : "20%",
                      transition: { duration: 0.5, ease: "easeInOut" },
                    }}
                  >
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      initial={
                        index === 0
                          ? {
                              scale: 0.8,

                              opacity: 1,
                            }
                          : {
                              y: index % 2 === 0 ? "-100%" : "100%",
                              opacity: 0,
                            }
                      }
                      animate={
                        index === 0
                          ? {
                              scale: 1,
                              x: "0%",
                              y: "0%",
                              opacity: 1,
                            }
                          : {
                              y: 0,
                              opacity: 1,
                            }
                      }
                      transition={
                        index === 0
                          ? {
                              duration: 0.5,
                              delay: 0.2,
                            }
                          : {
                              duration: 1,
                              delay: 0.5,
                            }
                      }
                      className={`page-two-slider-image ${
                        index === activeIndex ? "active" : "inactive"
                      } ${index === 0 ? "first-image" : ""}`}
                    />
                    {index === activeIndex && (
                      <div className="image-text">{img.title}</div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default PageTwo;
