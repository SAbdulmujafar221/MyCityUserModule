import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../SubTripPlanner.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import TripPlannerimg1 from "../../TripPlannerImages/cards/image1.png";
import TripPlannerimg2 from "../../TripPlannerImages/cards/image2.png";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../../../../BackToHome/BackToHome";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
 
const SubTripPlanner = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isTripPlanned, setIsTripPlanned] = useState(false);
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapUrl, setMapUrl] = useState("");
 
  const districts = [
    { value: "", label: "Select District" },
    { value: "Visakhapatnam", label: "Visakhapatnam" },
    { value: "Vijayawada", label: "Vijayawada" },
    { value: "Guntur", label: "Guntur" },
    { value: "Chittoor", label: "Chittoor" },
  ];
 
  const GOOGLE_MAPS_API_KEY = "AIzaSyC3KeEEm78TviKybHIdwbHIKi5_lgavUMg";
 
  useEffect(() => {
    setIsButtonEnabled(source && destination && startDate && endDate);
  }, [source, destination, startDate, endDate]);
 
  useEffect(() => {
    setIsLoading(true);
 
    const fetchPlaces = fetch("/placesData.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch places data");
        return response.json();
      })
      .then((data) => {
        setPlaces(data.places);
        setCategories(data.categories);
      });
 
    const fetchGeoJson = fetch(
      "https://nominatim.openstreetmap.org/search?q=Andhra+Pradesh,India&format=geojson&polygon_geojson=1"
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch GeoJSON data");
        return response.json();
      })
      .then((data) => {
        const andhraPradeshData = data.features.filter((feature) =>
          feature.properties.display_name.includes("Andhra Pradesh")
        );
        setGeoJsonData({
          andhraPradesh: {
            type: "FeatureCollection",
            features: andhraPradeshData,
          },
          otherStates: { type: "FeatureCollection", features: [] },
        });
      });
 
    Promise.all([fetchPlaces, fetchGeoJson])
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);
 
  useEffect(() => {
    if (isTripPlanned) {
      if (source && destination) {
        const encodedSource = encodeURIComponent(
          `${source}, Andhra Pradesh, India`
        );
        const encodedDestination = encodeURIComponent(
          `${destination}, Andhra Pradesh, India`
        );
        const url = `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${encodedSource}&destination=${encodedDestination}&mode=driving&zoom=8®ion=IN`;
        setMapUrl(url);
      } else if (source) {
        const encodedSource = encodeURIComponent(
          `${source}, Andhra Pradesh, India`
        );
        const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedSource}&zoom=10®ion=IN`;
        setMapUrl(url);
      } else {
        const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=Andhra+Pradesh,+India¢er=15.9129,79.7400&zoom=6®ion=IN`;
        setMapUrl(url);
      }
    }
  }, [source, destination, isTripPlanned]);
 
  const today = new Date().toISOString().split("T")[0];
 
  const handlePlanTrip = () => {
    setIsTripPlanned(true);
  };
 
  const navigate = useNavigate();
  const mainContainerClass =
    "tp-main-container tp-main-container--with-background";
 
  const createIcon = (iconUrl) => {
    return L.icon({
      iconUrl: iconUrl || markerIcon,
      iconSize: [25, 25],
      iconAnchor: [12.5, 25],
      popupAnchor: [0, -25],
    });
  };
 
  return (
    <div className="tp-wrapper">
      <BackToHome />
      <div className={mainContainerClass}>
      
        <div className="tp-container">
          <h1 className="tp-heading">Trip Planner</h1>
          {!isTripPlanned ? (
            <>
              <div className="tp-map-container">
                {error ? (
                  <div>Error: {error}</div>
                ) : isLoading ? (
                  <div>Loading map...</div>
                ) : (
                  <MapContainer
                    center={[15.9129, 79.74]}
                    zoom={6}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="© OpenStreetMap contributors"
                    />
                    {geoJsonData && (
                      <>
                        <GeoJSON
                          data={geoJsonData.otherStates}
                          style={{
                            color: "grey",
                            weight: 1,
                            fillOpacity: 0,
                          }}
                        />
                        <GeoJSON
                          data={geoJsonData.andhraPradesh}
                          style={{
                            color: "red",
                            weight: 2,
                            dashArray: "4, 4",
                            fillOpacity: 0,
                          }}
                        />
                      </>
                    )}
                    {places.map((place) => (
                      <Marker
                        key={place.id}
                        position={[place.latitude, place.longitude]}
                        icon={createIcon(
                          categories.find((cat) => cat.name === place.category)
                            ?.icon
                        )}
                      >
                        <Popup>
                          <strong>{place.name}</strong>
                          <br />
                          {place.description}
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>
 
              <div className="tp-left-section">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="tp-dropdown"
                >
                  <option value="">Select Districts</option>
                  {districts.map(
                    (option) =>
                      option.value && (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )
                  )}
                </select>
 
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="tp-dropdown"
                >
                  <option value="">Select Districts</option>
                  {districts.map(
                    (option) =>
                      option.value && (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )
                  )}
                </select>
                <div className="tp-date-container">
                  <div className="tp-date-box">
                    <label className="tp-date-label">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={today}
                      className="tp-date-input"
                    />
                  </div>
                  <div className="tp-date-box">
                    <label className="tp-date-label">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || today}
                      className="tp-date-input"
                    />
                  </div>
                </div>
                <button
                  className="tp-trip-button"
                  disabled={!isButtonEnabled}
                  onClick={handlePlanTrip}
                >
                  Trip Plan
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="tp-left-section">
                <div className="tp-images-container">
                  <div className="place-name-wrapper">
                    <img
                      src={TripPlannerimg1}
                      alt="Loading"
                      className="tp-image"
                    />
                    <h4>Place Name</h4>
                  </div>
 
                  <div className="admin-tourism-list-rating-icon">
                    <h4>+ Add Stop</h4>
                  </div>
 
                  <div className="second-place-image-wrapper">
                    <div className="place-name-wrapper">
                      <img
                        src={TripPlannerimg2}
                        alt="Image 2"
                        className="tp-image"
                      />
                      <h4>Place Name</h4>
                    </div>
                  </div>
 
                  <div className="admin-tourism-list-rating-icon">
                    <h4>+ Add Stop </h4>
                  </div>
                </div>
              </div>
              <div className="tp-map-container">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Trip Planner Map"
                ></iframe>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default SubTripPlanner;
 
 