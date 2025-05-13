import React, { useState } from 'react';
import './DistrictSubPage.css';
 
const destinations = [
  { name: 'Tirupati', image: '/assets/images/home-images/img2.jpg' },
  { name: 'Amaravathi', image: '/assets/images/home-images/img3.jpg' },
  { name: 'Gandikota', image: '/assets/images/home-images/img4.jpg' },
  { name: 'Vishakapatinam', image: '/assets/images/home-images/img5.jpg' },
  { name: 'Araku Valley', image: '/assets/images/home-images/img6.jpg' },
];
 
const DistrictSubPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
 
  const handlePlayClick = () => {
    setIsPlaying(true);
  };
 
  return (
    <div className="pause-container">
      <div className="video-section">
        <video
          src="/assets/backgroundvideo.mp4"
          alt="Banner"
          className={`banner-image ${isPlaying ? 'animate-banner' : ''}`}
        />
        {!isPlaying && (
          <div className="play-button" onClick={handlePlayClick}>
            &#9658;
          </div>
        )}
      </div>
      <div className="destinations">
        {destinations.map((place, idx) => (
          <div key={idx} className="destination-card">
            <img src={place.image} alt={place.name} className="destination-image" />
            <div className="destination-name">{place.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default DistrictSubPage;
 
 
 