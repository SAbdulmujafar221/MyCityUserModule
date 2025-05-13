import React, { useEffect, useState } from "react";
import "./StraightLine.css";
 
const SLine = () => {
  const totalDots = 30;
  const trailLength = 5;
  const [currentDot, setCurrentDot] = useState(-1);
 
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let dotIndex = 0;
 
      const interval = setInterval(() => {
        setCurrentDot(dotIndex);
        dotIndex = (dotIndex + 1) % (totalDots + trailLength); // loop back with buffer
      }, 150); // speed
    }, 1000); // start after 3 seconds
 
    return () => clearTimeout(startTimeout);
  }, []);
 
  return (
    <div className="dotted-line">
      {Array.from({ length: totalDots }).map((_, index) => {
        let fillClass = "";
 
        if (index >= currentDot - trailLength + 1 && index <= currentDot) {
          fillClass = "fill-down";
        }
 
        return (
          <div key={index} className="dot-wrapper">
            <div className="dot-base" />
            <div className={`dot-fill ${fillClass}`} />
          </div>
        );
      })}
    </div>
  );
};
 
export default SLine;