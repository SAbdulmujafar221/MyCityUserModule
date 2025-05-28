///TRIPHISTORY JSX

import React from "react";
import "./TripHistory.css";
const locationPin = "./Images/Triphistory/location-pin.svg";
const calendarIcon = "./Images/Triphistory/calendar.svg";
const image123 = "./Images/Triphistory/image123.jpg";
const flowers = "./Images/Triphistory/flowers.jpg";
const flowers2 = "./Images/Triphistory/flowers2.webp";

const TripHistory = () => {
  return (
    <div className="trip-history-container">
      <h1>Trip History</h1>
      <div className="trip-grid">
        <div className="trip-card">
          <div className="image-container">
            <img src={image123} alt="Aerial View" className="main-image" />
            <div className="rating">
              <span>4.5</span>
            </div>
            <div className="sub-images">
              <img src={flowers} alt="Waterfall View 1" className="sub-image" />
              <img
                src={flowers2}
                alt="Waterfall View 2"
                className="sub-image"
              />
            </div>
          </div>
          {/* <div className="details">
            <h2 className="place-name">Place Name</h2>
            <div className="location-info">
              <img src={locationPin} alt="Location Pin" />
              <p className="location">Location</p>
            </div>
            <div className="date-info">
              <img src={calendarIcon} alt="Calendar Icon" />
              <p className="date">07/05/2025</p>
            </div>
          </div> */}
        </div>
        <div className="trip-card">
          <div className="image-container">
            <img src={image123} alt="Aerial View" className="main-image" />
            <div className="rating">
              <span>4.5</span>
            </div>
            <div className="sub-images">
              <img src={flowers} alt="Waterfall View 1" className="sub-image" />
              <img
                src={flowers2}
                alt="Waterfall View 2"
                className="sub-image"
              />
            </div>
          </div>
          <div className="details">
            <h2 className="place-name">Place Name</h2>
            <div className="location-info">
              <img src={locationPin} alt="Location Pin" />
              <p className="location">Location</p>
            </div>
            <div className="date-info">
              <img src={calendarIcon} alt="Calendar Icon" />
              <p className="date">07/05/2025</p>
            </div>
          </div>
        </div>
        <div className="trip-card">
          <div className="image-container">
            <img src={image123} alt="Aerial View" className="main-image" />
            <div className="rating">
              <span>4.5</span>
            </div>
            <div className="sub-images">
              <img src={flowers} alt="Waterfall View 1" className="sub-image" />
              <img
                src={flowers2}
                alt="Waterfall View 2"
                className="sub-image"
              />
            </div>
          </div>
          <div className="details">
            <h2 className="place-name">Place Name</h2>
            <div className="location-info">
              <img src={locationPin} alt="Location Pin" />
              <p className="location">Location</p>
            </div>
            <div className="date-info">
              <img src={calendarIcon} alt="Calendar Icon" />
              <p className="date">07/05/2025</p>
            </div>
          </div>
        </div>
        <div className="trip-card">
          <div className="image-container">
            <img src={image123} alt="Aerial View" className="main-image" />
            <div className="rating">
              <span>4.5</span>
            </div>
            <div className="sub-images">
              <img src={flowers} alt="Waterfall View 1" className="sub-image" />
              <img
                src={flowers2}
                alt="Waterfall View 2"
                className="sub-image"
              />
            </div>
          </div>
          <div className="details">
            <h2 className="place-name">Place Name</h2>
            <div className="location-info">
              <img src={locationPin} alt="Location Pin" />
              <p className="location">Location</p>
            </div>
            <div className="date-info">
              <img src={calendarIcon} alt="Calendar Icon" />
              <p className="date">07/05/2025</p>
            </div>
          </div>
        </div>
        <div className="trip-card">
          <div className="image-container">
            <img src={image123} alt="Aerial View" className="main-image" />
            <div className="rating">
              <span>4.5</span>
            </div>
            <div className="sub-images">
              <img src={flowers} alt="Waterfall View 1" className="sub-image" />
              <img
                src={flowers2}
                alt="Waterfall View 2"
                className="sub-image"
              />
            </div>
          </div>
          <div className="details">
            <h2 className="place-name">Place Name</h2>
            <div className="location-info">
              <img src={locationPin} alt="Location Pin" />
              <p className="location">Location</p>
            </div>
            <div className="date-info">
              <img src={calendarIcon} alt="Calendar Icon" />
              <p className="date">07/05/2025</p>
            </div>
          </div>
        </div>
        <div className="trip-card">
          <div className="image-container">
            <img src={image123} alt="Aerial View" className="main-image" />
            <div className="rating">
              <span>4.5</span>
            </div>
            <div className="sub-images">
              <img src={flowers} alt="Waterfall View 1" className="sub-image" />
              <img
                src={flowers2}
                alt="Waterfall View 2"
                className="sub-image"
              />
            </div>
          </div>
          <div className="details">
            <h2 className="place-name">Place Name</h2>
            <div className="location-info">
              <img src={locationPin} alt="Location Pin" />
              <p className="location">Location</p>
            </div>
            <div className="date-info">
              <img src={calendarIcon} alt="Calendar Icon" />
              <p className="date">07/05/2025</p>
            </div>
          </div>
        </div>
        <div className="trip-card">
          <div className="image-container">
            <img src={image123} alt="Aerial View" className="main-image" />
            <div className="rating">
              <span>4.5</span>
            </div>
            <div className="sub-images">
              <img src={flowers} alt="Waterfall View 1" className="sub-image" />
              <img
                src={flowers2}
                alt="Waterfall View 2"
                className="sub-image"
              />
            </div>
          </div>
          <div className="details">
            <h2 className="place-name">Place Name</h2>
            <div className="location-info">
              <img src={locationPin} alt="Location Pin" />
              <p className="location">Location</p>
            </div>
            <div className="date-info">
              <img src={calendarIcon} alt="Calendar Icon" />
              <p className="date">07/05/2025</p>
            </div>
          </div>
        </div>
        <div className="trip-card">
          <div className="image-container">
            <img src={image123} alt="Aerial View" className="main-image" />
            <div className="rating">
              <span>4.5</span>
            </div>
            <div className="sub-images">
              <img src={flowers} alt="Waterfall View 1" className="sub-image" />
              <img
                src={flowers2}
                alt="Waterfall View 2"
                className="sub-image"
              />
            </div>
          </div>
          <div className="details">
            <h2 className="place-name">Place Name</h2>
            <div className="location-info">
              <img src={locationPin} alt="Location Pin" />
              <p className="location">Location</p>
            </div>
            <div className="date-info">
              <img src={calendarIcon} alt="Calendar Icon" />
              <p className="date">07/05/2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripHistory;
