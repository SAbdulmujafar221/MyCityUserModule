import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import PageTwo from "./PageTwo";
import PageOne from "../PageOne/PageOne";
import "./MainPage.css";
const StartingHomePage = () => {
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [hasReachedMinSize, setHasReachedMinSize] = useState(false);

  const image = "/assets/images/home-images/img3.jpg";


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewHeight = window.innerHeight;
      const percentage = (scrollY / viewHeight) * 100;
      setScrollPercentage(percentage);

      const currentWidth = Math.max(
        config.minWidth,
        config.maxWidth -
          (percentage / 100) * (config.maxWidth - config.minWidth)
      );

      if (currentWidth === config.minWidth) {
        setHasReachedMinSize(true);
      }

      if (percentage >= hideThreshold && hasReachedMinSize) {
        setShowFirstPage(false);
        setTransitionComplete(true);
      } else if (percentage < shrinkThreshold) {
        setShowFirstPage(true);
        setTransitionComplete(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasReachedMinSize]);


  const config = {
    minWidth: 473,
    maxWidth: 1440,
    minHeight: 370,
    maxHeight: 720,
    minBorderRadius: 20,
    maxBorderRadius: 40,
  };

  const newWidth = Math.max(
    config.minWidth,
    config.maxWidth -
      (scrollPercentage / 80) * (config.maxWidth - config.minWidth)
  );
  const newHeight = Math.max(
    config.minHeight,
    config.maxHeight -
      (scrollPercentage / 80) * (config.maxHeight - config.minHeight)
  );
  const newBorderRadius = Math.max(
    config.minBorderRadius,
    config.maxBorderRadius -
      (scrollPercentage / 80) *
        (config.maxBorderRadius - config.minBorderRadius)
  );


  const shrinkThreshold = 30;
  const moveThreshold = hasReachedMinSize ? 70 : 100;
  const hideThreshold = 85;

  const imageStyle = useSpring({
    width: `${newWidth}px`,
    height: `${newHeight}px`,
    borderRadius: `${newBorderRadius}px`,
    left: hasReachedMinSize && scrollPercentage > moveThreshold ? "29%" : "50%",
    top: "70%",
    transform: `translate(-50%, -50%)`,
    opacity: scrollPercentage > hideThreshold && hasReachedMinSize ? 0 : 1,
    config: {
      tension: 180,
      friction: 24,

      clamp: true,
    },
    onRest: () => {
      if (scrollPercentage > hideThreshold) {
        setShowFirstPage(false);
        setTimeout(() => setTransitionComplete(true), 50);
      }
    },
  });

  return (
    <div className="transition-container">
      <img
        src="./assets/images/home-images/HomePageBackground.jpg"
        alt="background"
        className="main-background-image"
      />
  
      <div className="page-one-wrapper">{showFirstPage && <PageOne />}</div>

      <animated.img
        src={image}
        className="animated-image"
        style={{
          ...imageStyle,
          position: "fixed",
          display:
            scrollPercentage > 0 && !transitionComplete ? "block" : "none",
          zIndex: 5,
        }}
        alt="Shrinking Image"
      />
      <div
        className={`page-two-wrapper ${transitionComplete ? "visible" : ""}`}
      >
        {transitionComplete && <PageTwo initialImage={image} />}
    
      </div>
    </div>
  );
};

export default StartingHomePage;
