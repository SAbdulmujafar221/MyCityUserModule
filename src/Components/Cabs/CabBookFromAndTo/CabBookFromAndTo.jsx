import React, { useState } from "react";
import "./CabBookFromAndTo.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const CabBookFromAndTo = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState(null);
  const [dropOffDate, setDropOffDate] = useState(null);
  const [pickUpHour, setPickUpHour] = useState("");
  const [pickUpMinute, setPickUpMinute] = useState("");
  const [pickUpPeriod, setPickUpPeriod] = useState("");
  const [dropOffHour, setDropOffHour] = useState("");
  const [dropOffMinute, setDropOffMinute] = useState("");
  const [dropOffPeriod, setDropOffPeriod] = useState("");

  const [showPickUpTimeSelectors, setShowPickUpTimeSelectors] = useState(false);
  const [showDropOffTimeSelectors, setShowDropOffTimeSelectors] =
    useState(false);

  const [hoveredVehicle, setHoveredVehicle] = useState(null);

  const handleSwap = () => {
    setPickUpLocation(dropOffLocation);
    setDropOffLocation(pickUpLocation);
  };

  const navigate = useNavigate();

  const vehicles = {
    bike: [
      { name: "Bike 1", price: "₹599/day", capacity: "2 people" },
      { name: "Bike 2", price: "₹599/day", capacity: "2 people" },
    ],
    auto: [
      { name: "Auto 1", price: "₹799/day", capacity: "3 people" },
      { name: "Auto 2", price: "₹799/day", capacity: "3 people" },
    ],
    car: [
      { name: "Sedan", price: "₹999/day", capacity: "4 people" },
      { name: "SUV", price: "₹1299/day", capacity: "6 people" },
      { name: "Hatchback", price: "₹899/day", capacity: "4 people" },
    ],
  };
  // const handleCabBookingClick = () => {
  //   console.log("Cab booking button clicked!");
  // };

  const cities = [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Rajahmundry",
    "Tirupati",
    "Kakinada",
    "Anantapur",
    "Kadapa",
    "Vizianagaram",
    "Eluru",
    "Ongole",
    "Nandyal",
    "Machilipatnam",
    "Adoni",
    "Tenali",
    "Proddatur",
    "Chittoor",
    "Hindupur",
    "Bhimavaram",
    "Madanapalle",
    "Guntakal",
    "Srikakulam",
    "Dharmavaram",
    "Gudivada",
    "Narasaraopet",
    "Tadipatri",
    "Tadepalle",
    "Amaravati",
    "Mangalagiri",
    "Chilakaluripet",
  ];

  const minDate = new Date("2025-03-26");

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const periods = ["AM", "PM"];

  const formatTime = (hour, minute, period) => {
    if (!hour || !minute || !period) return "Select Your Time";
    return `${hour}:${minute} ${period}`;
  };

  return (
    <div className="cab-container">
      <div className="left-section">
        <div className="header">
          <button
            className="cab-booking-button"
            onClick={() => {
              console.log("Navigating to home...");
              navigate("/");
            }}
          >
            <span className="arrow-circle">←</span>
            Cab booking
          </button>
        </div>
        <div className="location-container">
          <div className="location-header">
            <div className="circle"></div>
            <h3>Pick Up</h3>
          </div>
          <div className="location-details">
            <div className="field">
              <label>Location</label>
              <select
                value={pickUpLocation}
                onChange={(e) => setPickUpLocation(e.target.value)}
              >
                <option value="">Select By City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="divider"></div>
            <div className="field">
              <label>Date</label>
              <div className="date-picker-wrapper">
                <DatePicker
                  selected={pickUpDate}
                  onChange={(date) => setPickUpDate(date)}
                  minDate={minDate}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select Your Date"
                  className="date-picker"
                />
              </div>
            </div>
            <div className="divider"></div>
            <div className="field time-field">
              <label>Time</label>
              <select
                value={formatTime(pickUpHour, pickUpMinute, pickUpPeriod)}
                onClick={() => setShowPickUpTimeSelectors(true)}
                onChange={() => {}}
              >
                <option>
                  {formatTime(pickUpHour, pickUpMinute, pickUpPeriod)}
                </option>
              </select>
              {showPickUpTimeSelectors && (
                <div className="time-selectors">
                  <select
                    value={pickUpHour}
                    onChange={(e) => setPickUpHour(e.target.value)}
                  >
                    <option value="">Hour</option>
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <select
                    value={pickUpMinute}
                    onChange={(e) => setPickUpMinute(e.target.value)}
                  >
                    <option value="">Minute</option>
                    {minutes.map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                  <select
                    value={pickUpPeriod}
                    onChange={(e) => {
                      setPickUpPeriod(e.target.value);
                      setShowPickUpTimeSelectors(false); // Hide after selection
                    }}
                  >
                    <option value="">Period</option>
                    {periods.map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="swap-button" onClick={handleSwap}>
          ↑↓
        </div>
        <div className="location-container">
          <div className="location-header">
            <div className="circle"></div>
            <h3>Drop Off</h3>
          </div>
          <div className="location-details">
            <div className="field">
              <label>Location</label>
              <select
                value={dropOffLocation}
                onChange={(e) => setDropOffLocation(e.target.value)}
              >
                <option value="">Select By City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="divider"></div>
            <div className="field">
              <label>Date</label>
              <div className="date-picker-wrapper">
                <DatePicker
                  selected={dropOffDate}
                  onChange={(date) => setDropOffDate(date)}
                  minDate={pickUpDate || minDate}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select Your Date"
                  className="date-picker"
                />
              </div>
            </div>
            <div className="divider"></div>
            <div className="field time-field">
              <label>Time</label>
              <select
                value={formatTime(dropOffHour, dropOffMinute, dropOffPeriod)}
                onClick={() => setShowDropOffTimeSelectors(true)}
                onChange={() => {}} // Prevent default change behavior
              >
                <option>
                  {formatTime(dropOffHour, dropOffMinute, dropOffPeriod)}
                </option>
              </select>
              {showDropOffTimeSelectors && (
                <div className="time-selectors">
                  <select
                    value={dropOffHour}
                    onChange={(e) => setDropOffHour(e.target.value)}
                  >
                    <option value="">Hour</option>
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <select
                    value={dropOffMinute}
                    onChange={(e) => setDropOffMinute(e.target.value)}
                  >
                    <option value="">Minute</option>
                    {minutes.map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                  <select
                    value={dropOffPeriod}
                    onChange={(e) => {
                      setDropOffPeriod(e.target.value);
                      setShowDropOffTimeSelectors(false); // Hide after selection
                    }}
                  >
                    <option value="">Period</option>
                    {periods.map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabBookFromAndTo;
