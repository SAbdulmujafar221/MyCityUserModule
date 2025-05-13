import React, { useEffect, useState } from "react";
import "./CurvyLine.css";
 
const Line = () => {
  const totalDots = 40;
  const [currentDot, setCurrentDot] = useState(0);
 
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let dotIndex = 0;
 
      const interval = setInterval(() => {
        setCurrentDot(dotIndex);
        dotIndex++;
 
        if (dotIndex > totalDots) {
          dotIndex = 0; // Loop back to start
        }
      }, 150);
    }, 1000);
 
    return () => clearTimeout(startTimeout);
  }, []);
 
 
  return (
    <div className="full-page">
      <div className="dotted-line-horizontal">
  {Array.from({ length: totalDots }).map((_, index) => {
    let fillClass = "";
 
    if (index >= currentDot - 8 && index < currentDot) {
      fillClass = "fill-right";
    } else if (index < currentDot - 8) {
      fillClass = "empty-left";
    }
 
    const waveOffset = Math.sin(index / 6) * 70;
    const waveAngle = Math.cos(index / 6) * 20;
 
    return (
      <div
        key={index}
        className="dot-wrapper-horizontal"
        style={{ transform: `translateY(${waveOffset}px) rotate(${waveAngle}deg)` }}
      >
        <div className="dot-base-horizontal" />
        <div className={`dot-fill-horizontal ${fillClass}`} />
      </div>
    );
  })}
</div>
 
    </div>
  );
};
 
export default Line;