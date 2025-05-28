import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import MonthSelector from "./MonthSelector";
import "./TourismHomePage.css";

// Move months array outside the component to prevent re-creation
const months = [
  { label: "January", value: "jan" },
  { label: "February", value: "feb" },
  { label: "March", value: "mar" },
  { label: "April", value: "apr" },
  { label: "May", value: "may" },
  { label: "June", value: "jun" },
  { label: "July", value: "jul" },
  { label: "August", value: "aug" },
  { label: "September", value: "sep" },
  { label: "October", value: "oct" },
  { label: "November", value: "nov" },
  { label: "December", value: "dec" },
];

const monthName = months.map((month) => month.label);

console.log("Months:", monthName);


const TourismHomePage = () => {
  const videoRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(0); // Default to May
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [monthData, setMonthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Fetch data when currentMonth changes or on initial load
  useEffect(() => {
    const fetchMonthData = async () => {
      setLoading(true);
      setError(null);
      setCurrentPlaceIndex(0); // Reset place index on month change
      try {
        const baseUrl = "https://57ab-2401-4900-1cb1-f1a1-f4fe-e1ea-847e-6fe2.ngrok-free.app";
        const url = isInitialLoad
          ? `${baseUrl}/client/video/currentmonth`
          : `${baseUrl}/client/video/get/${monthName[currentMonth]}`;
        
        const response = await axios.get(url, {
          params: { monthName: months[currentMonth] },
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        
        // Transform response: expect [{ monthName, videos }], extract videos
        const videos = response.data[0]?.videos || [];
        console.log("Month Data:", videos);
        setMonthData({ videos });
        setIsInitialLoad(false); // Switch to specific month fetching after initial load
      } catch (err) {
        console.error("Failed to fetch month data:", err);
        setError("Failed to load video data. Please try again later.");
        setMonthData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthData();
  }, [currentMonth, isInitialLoad]);

  // Handle video end to advance to next place or month
  const handleVideoEnd = () => {
    if (!monthData?.videos) return;
    const nextPlaceIndex = (currentPlaceIndex + 1) % monthData.videos.length;
    if (nextPlaceIndex === 0) {
      // Reached end of videos for this month, move to next month
      setCurrentMonth((prev) => (prev + 1) % monthName.length);
    } else {
      setCurrentPlaceIndex(nextPlaceIndex);
    }
  };

  const currentVideoUrl = monthData?.videos?.[currentPlaceIndex]?.videoUrl || "";
  const currentPlaceName = monthData?.videos?.[currentPlaceIndex]?.placeName || "";

  return (
    <div className="home-page">
      {loading && (
        <div className="video-loader-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message text-red-500 text-center p-4">
          {error}
        </div>
      )}

      {currentVideoUrl ? (
        <video
          key={currentVideoUrl}
          ref={videoRef}
          className="background-video"
          src={currentVideoUrl}
          type="video/mp4"
          autoPlay
          muted
          controls={false}
          playsInline
          onLoadStart={() => setLoading(true)}
          onLoadedData={() => setLoading(false)}
          onEnded={handleVideoEnd}
        />
      ) : (
        !error && (
          <div className="text-white text-center p-4">
            No video available for this month.
          </div>
        )
      )}

      <MonthSelector
        months={months.map((month) => month.value)}
        selectedMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        currentPlaceName={currentPlaceName}
        monthData={monthData}
        currentPlaceIndex={currentPlaceIndex}
        onPlaceChange={setCurrentPlaceIndex}
      />
    </div>
  );
};

export default TourismHomePage;