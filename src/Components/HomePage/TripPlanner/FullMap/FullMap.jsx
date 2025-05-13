import React from "react";
import SubTripPlanner from "./TripPlannerPage/SubTripPlanner";
import SubMapComponent from "./MapComponent/SubMapComponent";
import "./SubTripPlanner.css"
const FullMap = () => {
  return (
    <div className="page-wrapper">
      <SubTripPlanner />
      {/* <div className="map-section">
        <SubMapComponent />
      </div> */}
    </div>
  );
};

export default FullMap;
