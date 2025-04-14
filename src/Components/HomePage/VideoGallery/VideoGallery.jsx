// src/components/VideoGallery.jsx
import React, { useRef, useState } from "react";
import "./VideoGallery.css";

const VideoGallery = () => {
  const scrollContainerRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag to Scroll Functionality
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll Speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="video-gallery">
      <h1>Video Gallery</h1>
      <p>Take a virtual expedition through our video gallery</p>

      {/* Main Video Container */}
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/w-h1a9PHTC4?si=pPYevad7fj7WEouw"
          title="YouTube Video"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Thumbnail Scroll Section */}
      <div
        className="video-thumbnails"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
      >
        {/* Dummy Thumbnails - Replace with Actual Images */}
        {/* {[1, 2, 3, 4, 5, 6].map((index) => (
          <img
            key={index}
            src={`https://via.placeholder.com/200x120?text=Video+${index}`}
            alt={`Thumbnail ${index}`}
            className="thumbnail"
          />
        ))} */}
      </div>
    </div>
  );
};

export default VideoGallery;
