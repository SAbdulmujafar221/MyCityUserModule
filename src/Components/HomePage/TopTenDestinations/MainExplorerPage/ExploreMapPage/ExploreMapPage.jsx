import React from 'react';
import './ExploreMapPage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
 
// Fixing marker icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link } from 'react-router';
 
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;
 
const MapImageComponent = () => {
    return (
        <>
            {/* Map & Image Overlay Component */}
            <div className="main-container">
                <div className="left-container">
                    <img src="./assets/images/ExploreImages/explorebg1.jpeg" alt="Beautiful Landscape" />
                    <div className="map-overlay">
                        <MapContainer center={[15.9129, 79.7400]} zoom={7} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                            />
                            <Marker position={[15.9129, 79.7400]}>
                                <Popup>Andhra Pradesh, India.</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
 
            {/* Content Overlay on Image */}
            <div className="image-container">
                <img src="./assets/images/ExploreImages/explorebg2.jpeg" alt="Beautiful Landscape" />
                <div className="content-overlay">
                    <h1>Book a Cab</h1>
                    <h2>“Hassle-free travel starts here “</h2>
                   
                    <p>Book your cab for a smooth and reliable journey.</p>
                    <Link to="/CabSection">
                    <button className='book-btn'>Book Now</button>
                    </Link>
                </div>
            </div>
        </>
    );
};
 
export default MapImageComponent;