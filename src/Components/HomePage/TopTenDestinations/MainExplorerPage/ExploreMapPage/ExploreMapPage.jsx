import React from "react";
import "./ExploreMapPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Link } from "react-router-dom";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const ExploreMapPage = ({ latitude, longitude, location }) => {
  return (
    <div className="explore-map-page">
      <div className="explore-map-main-container">
        <div className="explore-map-left-container">
          <img
            src="https://via.placeholder.com/600x400?text=Map+Background"
            alt="Beautiful Landscape"
          />
          <div className="explore-map-map-overlay">
            <MapContainer
              center={[latitude, longitude]}
              zoom={7}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={[latitude, longitude]}>
                <Popup>{location}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      <div className="explore-map-image-container">
        <img
          src="https://via.placeholder.com/600x400?text=Cab+Booking"
          alt="Beautiful Landscape"
        />
        <div className="explore-map-content-overlay">
          <h1>Book a Cab</h1>
          <h2>“Hassle-free travel starts here “</h2>
          <p>Book your cab for a smooth and reliable journey.</p>
          <Link to="/CabSection">
            <button className="explore-map-book-btn">Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreMapPage;