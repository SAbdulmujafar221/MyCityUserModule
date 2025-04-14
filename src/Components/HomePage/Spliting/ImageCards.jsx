import React, { useEffect, useState } from "react";
import "./ImageCards.css";
const imageSources = [
  "./assets/images/Scroller-images/Papikondalu.png",
  "./assets/images/Scroller-images/Caves.jfif",
  "./assets/images/Scroller-images/Guntur.png",
  "./assets/images/Scroller-images/Belgum-Caves.jfif",
  "./assets/images/Scroller-images/Srisailam.jfif",
];
const Spliting = () => {
  const [scrollEffect, setScrollEffect] = useState(0);
  const [visibleFirst, setVisibleFirst] = useState(true);
  const [visibleSecond, setVisibleSecond] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [showScrolling, setShowScrolling] = useState(false);
  const [hideGallery, setHideGallery] = useState(false);
 
  useEffect(() => {
    const updateScrollEffect = () => {
      const section = document.querySelector(".gallery-wrapper");
      if (!section) return;
 
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
 
      let progress = Math.min(
        Math.max(1 - rect.top / (viewportHeight * 1.2), 0),
        1
      );
      setScrollEffect(progress);
    };
 
    window.addEventListener("scroll", updateScrollEffect);
    return () => window.removeEventListener("scroll", updateScrollEffect);
  }, []);
 
  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setTransitioning(true);
 
      const secondTimer = setTimeout(() => {
        setVisibleFirst(false);
        setVisibleSecond(true);
        setTransitioning(false);
 
        const thirdTimer = setTimeout(() => {
          setShowScrolling(true);
          setVisibleSecond(false);
 
          const hideTimer = setTimeout(() => {
            setHideGallery(true);
          }, 1000);
 
          return () => clearTimeout(hideTimer);
        }, 1000);
 
        return () => clearTimeout(thirdTimer);
      }, 1000);
 
      return () => clearTimeout(secondTimer);
    }, 1000);
 
    return () => clearTimeout(firstTimer);
  }, []);
 
  return (
    <section>
      {!hideGallery && (
        <div className="gallery-wrapper">
          <div className="gallery-container">
            {visibleFirst &&
              !showScrolling && 
              imageSources.map((source, idx) => {
                const totalImages = imageSources.length;
                const centerIdx = Math.floor(totalImages / 2);
 
                const verticalOffset = 250;
                const translateY =
                  verticalOffset - scrollEffect * verticalOffset;
 
                const spreadAmount = 9;
                const translateX =
                  (idx - centerIdx) * scrollEffect * spreadAmount + "vw";
 
                const rotation = (idx - centerIdx) * 4 * (2.3 - scrollEffect);
 
                return (
                  <div
                    key={idx}
                    className={`gallery-card ${
                      transitioning ? "fade-out" : ""
                    }`}
                    style={{
                      transform: `translate(${translateX}, ${translateY}px) rotate(${rotation}deg)`,
                      opacity: 0.3 + scrollEffect * 0.7,
                    }}
                  >
                    <img src={source} alt={`Image ${idx}`} />
                  </div>
                );
              })}
            {visibleSecond &&
              !showScrolling &&
              imageSources.map((source, idx) => {
                const totalImages = imageSources.length;
                const centerIdx = Math.floor(totalImages / 2);
 
                const verticalOffset = 250;
                const translateY =
                  verticalOffset - scrollEffect * verticalOffset;
 
                const spreadAmount = 9;
                const translateX =
                  (idx - centerIdx) * scrollEffect * spreadAmount + "vw";
 
                const rotation = (idx - centerIdx) * 4 * (2.3 - scrollEffect);
                const verticalBelowSet = 350;
                const translateD = scrollEffect * verticalBelowSet;
 
                return (
                  <div
                    key={idx}
                    className={`gallery-card ${transitioning ? "fade-in" : ""}`}
                    style={{
                      transform: `translate(${translateX}, ${
                        translateY + translateD
                      }px) rotate(${rotation}deg)`,
                      opacity: 0.3 + scrollEffect * 0.7,
                    }}
                  >
                    <img src={source} alt={`Image ${idx}`} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
 
      {/* {showScrolling && <Scroller />} */}
    </section>
  );
};
 
export default Spliting;
 