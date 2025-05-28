import React from "react";
import "./ExploreAboutPage.css";

const ExploreAboutPage = ({ about, images }) => {
  if (!about) {
    return (
      <div className="explore-about-container">
        <p>No information available.</p>
      </div>
    );
  }

  // Use the first available image from placeRelatedImages if provided, else fallback
  const aboutImage =
    images && images.length > 0
      ? images[0].src
      : "https://via.placeholder.com/600x400?text=About+Image";
  const historyImage =
    images && images.length > 1
      ? images[1].src
      : "https://via.placeholder.com/600x400?text=History+Image";

  return (
    <div className="explore-about-container">
      <div className="explore-about-main-container">
        <div className="explore-about-left-container">
          <img src={aboutImage} alt="About Background" />
        </div>
        <div className="explore-about-right-container">
          <div>
            <h1>
              <div className="explore-intro-dot"></div>
              <p>About</p>
            </h1>
            <br />
            <div className="explore-about-content">
              {about.intro || "No description available."}
              <br />
              <br />
              <br />
              <div>
                <h2>Visiting Hours</h2>
                <p>
                  {about.openingtime && about.closingtime
                    ? `${about.openingtime} to ${about.closingtime}`
                    : "Visiting hours not specified."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="explore-about-main-container-2">
        <div className="explore-about-left-container-2">
          <div className="explore-about-history-container">
            <h1>
              <p>History</p>
              <div className="explore-intro-dot"></div>
            </h1>
            <br />
            <p>{about.history || "No history available."}</p>
          </div>
        </div>
        <div className="explore-about-right-container-2">
          <img src={historyImage} alt="History Background" />
        </div>
        
      </div>
    </div>
  );
};

export default ExploreAboutPage;