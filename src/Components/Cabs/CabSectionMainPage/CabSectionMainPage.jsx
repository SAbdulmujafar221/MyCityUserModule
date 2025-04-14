import React, { useState } from "react";
import "./CabSectionMainPage.css";
import Car from "../CabSectionSubPages/Car";
import Bike from "../CabSectionSubPages/Bike";
import Auto from "../CabSectionSubPages/Auto";
import CabBookFromAndTo from "../CabBookFromAndTo/CabBookFromAndTo";

const vehicleType = [
  { id: 1, src: "./assets/images/Cab-section-images/bike1.png", type: "Bike" },
  { id: 2, src: "./assets/images/Cab-section-images/auto1.png", type: "Auto" },
  { id: 3, src: "./assets/images/Cab-section-images/car1.png", type: "Car" },
];

const CabSectionMainPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("Car");

  // Handle vehicle selection
  const handleVehicleClick = (type) => {
    setSelectedVehicle(type);
  };

  return (
    <div className="cab-page">
      <div className="cab-page-top-section">
        <div className="cab-section-from-and-to">
          <CabBookFromAndTo />
        </div>
        
        {/* Right Side: Vehicle Selection Images */}
        <div className="cab-selection-image">
          {vehicleType.map((cab) => (
            <div
              key={cab.id}
              className={`vehicle-card ${
                selectedVehicle === cab.type ? "selected-card" : ""
              }`}
              onClick={() => handleVehicleClick(cab.type)}
            >
              <h3 className="vehicle-card-heading">{cab.type}</h3>
              <img src={cab.src} alt={cab.type} className="cab-selection-img" />
            </div>
          ))}
        </div>
      </div>

      {/* Conditional Rendering of Selected Vehicle Component */}
      {selectedVehicle === "Car" && <Car />}
      {selectedVehicle === "Bike" && <Bike />}
      {selectedVehicle === "Auto" && <Auto />}
    </div>
  );
};

export default CabSectionMainPage;
