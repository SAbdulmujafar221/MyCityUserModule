import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../SubTripPlanner.css"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
 
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
const SubMapComponent = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchPlaces = fetch("/TripPlanner.json")
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

  const createIcon = (iconUrl) => {
    return L.icon({
      iconUrl: iconUrl || markerIcon,
      iconSize: [25, 25],
      iconAnchor: [12.5, 25],
      popupAnchor: [0, -25],
    });
  };

  const filteredPlaces = activeCategory
    ? places.filter((place) => place.category === activeCategory)
    : places;

  if (error) return <div>Error: {error}</div>;
  if (isLoading) return <div>Loading map...</div>;

  return (
    <div className="subpage-map-component">
      <div className="map-container">
        <MapContainer
          center={[15.9129, 79.74]}
          zoom={7}
          scrollWheelZoom={true}
          className="leaflet-map"
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
          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.latitude, place.longitude]}
              icon={createIcon(
                categories.find((cat) => cat.name === place.category)?.icon
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
        <div className="category-list">
          <ul>
            <li
              onClick={() => setActiveCategory(null)}
              className={activeCategory === null ? "active" : ""}
            >
              Show All
            </li>
            {categories.map((category) => (
              <li
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={activeCategory === category.name ? "active" : ""}
              >
                <span>{category.name}</span>
              <img src={category.icon} alt="Loading...." />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubMapComponent;
