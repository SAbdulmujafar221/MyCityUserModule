import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import { FaLandmark, FaRegFlag, FaUmbrellaBeach } from "react-icons/fa";
import { Places } from "./ApPlaces";
import "./ApPLaces.css";
import * as topojson from "topojson-client";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MapComponent from "../NearByPLaces/NearByPlaces";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../../../../BackToHome/BackToHome";
import Footer from "../../../../Footer/Footer";
const LandmarksMap = () => {
  const [landmarks, setLandmarks] = useState([]);
  const [selectedLandmark, setSelectedLandmark] = useState(
    JSON.parse(localStorage.getItem("selectedLandmark")) || null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apBorder, setApBorder] = useState(null);

  const iconMap = {
    FaLandmark: FaLandmark,
    FaRegFlag: FaRegFlag,
    FaUmbrellaBeach: FaUmbrellaBeach,
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLandmarks = async () => {
      try {
        const flattenedLandmarks = Places.flatMap((district) =>
          district.places.map((place) => ({
            ...place,
            category_name: place.name,
            backgroundColor: getBackgroundColor(place.map_icon),
          }))
        ).filter((place) => place.latitude && place.longitude);

        setLandmarks(flattenedLandmarks);
      } catch (err) {
        console.error("Error processing data:", err);
        setError("Failed to process landmark data");
      } finally {
        setLoading(false);
      }
    };

    fetchLandmarks();
  }, []);

  useEffect(() => {
    fetch("/Districts.json")
      .then((res) => res.json())
      .then((topojsonData) => {
        const geojsonData = topojson.feature(
          topojsonData,
          topojsonData.objects[Object.keys(topojsonData.objects)[0]]
        );
        setApBorder(geojsonData);
      })
      .catch((err) => console.error("Error loading AP border:", err));
  }, []);

  useEffect(() => {
    if (selectedLandmark) {
      localStorage.setItem(
        "selectedLandmark",
        JSON.stringify(selectedLandmark)
      );
    }
  }, [selectedLandmark]);

  const getBackgroundColor = (iconName) => {
    const backgroundColors = {
      FaLandmark: "green",
      FaRegFlag: "blue",
      FaUmbrellaBeach: "pink",
    };
    return backgroundColors[iconName] || "lightgray";
  };

  const getLandmarkIcon = useMemo(() => {
    return (iconName, backgroundColor) => {
      const IconComponent = iconMap[iconName] || FaLandmark;

      const iconColors = {
        FaLandmark: "white",
        FaRegFlag: "white",
        FaUmbrellaBeach: "white",
      };

      const iconColor = iconColors[iconName] || "red";

      return L.divIcon({
        html: ReactDOMServer.renderToString(
          <IconComponent
            style={{
              color: iconColor,
              fontSize: "18px",
              backgroundColor: backgroundColor,
              border: "2px solid white",
              padding: "5px",
              borderRadius: "50%",
            }}
          />
        ),
        className: "custom-icon",
        iconSize: [32, 32],
      });
    };
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <div className="categories-back-home">
        <BackToHome />
      </div>

      <div className="con">
        {/* <div>
        <Link >
          
        </Link>
      </div> */}

        <div>
          <div>
            <Link to="/">
              <h1 className="back" onClick={() => navigate("/")}>
                <IoArrowBackCircleOutline className="iconincBack" />
                Back to Home
              </h1>
            </Link>
          </div>
          <div className="Map-Section-container">
            <div className="Wrapping-mapping-container">
              <div className="map-section">
                <MapContainer
                  center={[15.3, 80.1]}
                  zoom={6.88}
                  style={{ height: "100%", width: "100%" }}
                >
                  {apBorder && (
                    <>
                      <GeoJSON
                        data={apBorder}
                        style={{ color: "red", weight: 1 }}
                      />
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {landmarks.map((place) => (
                        <Marker
                          key={place.id}
                          position={[
                            parseFloat(place.latitude),
                            parseFloat(place.longitude),
                          ]}
                          icon={getLandmarkIcon(
                            place.map_icon,
                            place.backgroundColor
                          )}
                          eventHandlers={{
                            click: () => setSelectedLandmark(place),
                          }}
                        />
                      ))}
                    </>
                  )}
                </MapContainer>
              </div>

              <div className="data-section">
                <h2>Landmark Details</h2>
                <div className="mapping-image-container">
                  {Array.isArray(selectedLandmark?.map_image_path) &&
                  selectedLandmark.map_image_path.length > 0 ? (
                    selectedLandmark.map_image_path.map((image, index) => (
                      <div className="categories-image-place">
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedLandmark.destination_name} ${
                          index + 1
                        }`}
                        className="landmark-image"
                        onClick={() => setSelectedLandmark(null)}
                      />
                      <p className="categories-place-names">Place Name</p> 
                      </div>                   ))
                  ) : (
                    <p className="click-info">
                      Click on a marker to see details here.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map-component-catagory">
        <MapComponent />
      </div>
      <div className="footer-for-page">
        <Footer />
      </div>
    </>
  );
};

export default LandmarksMap;
