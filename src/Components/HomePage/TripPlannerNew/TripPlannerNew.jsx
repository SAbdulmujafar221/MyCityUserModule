// import React from "react";
// import "./TripPlannerNew.css";
// const sampleImage = "/assets/GalleryImages/TopImages/top1.png";
// const sampleVideo = "/assets/Trip-planner-video.mp4";

// const TripPlannerHomePage = () => {
//   return (
//     <div className="tourism-trip-planner-container">
//       <div className="tourism-trip-planner-left-section">
//         <img
//           src={sampleImage}
//           alt="Trip"
//           className="tourism-trip-planner-image"
//         />
//         <div className="tourism-trip-planner-text-overlay">
//           <h1>Plan Your Dream Trip</h1>
//           <p>Explore the best destinations with personalized experiences.</p>
//         </div>
//       </div>

//       <div className="tourism-trip-planner-right-section">
//       <video
//         className="tourism-trip-planner-video"
//         src={sampleVideo}
//         type="video/mp4"
//         muted
//         controls={true}
//         autoPlay

//       />
//       </div>
//     </div>
//   );
// };

// export default TripPlannerHomePage;

// Example using CSS transitions
import React, { useState, useEffect } from "react";
import "./TripPlannerNew.css";

function Train() {
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMoving((prevMoving) => !prevMoving);
    }, 5000); // Toggle movement every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="tourism-trip-planner-container">
      <div className="train-path">
        <div className={`train ${moving ? "moving" : ""}`}>
          {/* Train visual elements */}
          <div className="train-body"></div>
          <div className="train-wheels"></div>
        </div>
        <div className={`train ${moving ? "moving" : ""}`}>
          {/* Train visual elements */}
          <div className="train-body"></div>
          <div className="train-wheels"></div>
        </div>
        <div className={`train ${moving ? "moving" : ""}`}>
          {/* Train visual elements */}
          <div className="train-body"></div>
          <div className="train-wheels"></div>
        </div>
        <div className={`train ${moving ? "moving" : ""}`}>
          {/* Train visual elements */}
          <div className="train-body"></div>
          <div className="train-wheels"></div>
        </div>
        <div className={`train ${moving ? "moving" : ""}`}>
          {/* Train visual elements */}
          <div className="train-body"></div>
          <div className="train-wheels"></div>
        </div>
      </div>
    </div>
  );
}

export default Train;
