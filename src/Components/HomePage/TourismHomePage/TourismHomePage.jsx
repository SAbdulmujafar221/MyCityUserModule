import React, { useRef, useState, useEffect } from "react";
import MonthSelector from "./MonthSelector";
import "./TourismHomePage.css";
const backgroundVideo = "./assets/backgroundvideo.mp4"; // Import the video file

const TourismHomePage = () => {
  const videoRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11

  // Update video time based on selected month
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startTime = currentMonth * 30; // 30s per month

    // Wait for the video to be ready
    const handleCanPlay = () => {
      video.currentTime = startTime;
      video
        .play()
        .catch((error) => {
          console.error("Video playback failed:", error);
        });
    };

    // Check if video is ready to play
    if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
      handleCanPlay();
    } else {
      video.addEventListener("canplay", handleCanPlay);
    }

    // Cleanup event listener and pause video on unmount or month change
    return () => {
      video.pause();
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [currentMonth]);

  return (
    <div className="home-page">
      <video
        ref={videoRef}
        className="background-video"
        src={backgroundVideo}
        type="video/mp4"
        muted
        controls={false}
        playsInline
      />
      <MonthSelector
        selectedMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />
    </div>
  );
};

export default TourismHomePage;