import React from "react";
import "./ExploreAboutPage.css";

const ExploreAboutPage = ({ about }) => {
  return (
    <div className="explore-about-container">
      <div className="explore-about-main-container">
        <div className="explore-about-left-container">
          <img
            src="https://via.placeholder.com/600x400?text=About+Image"
            alt="Background"
          />
        </div>
        <div className="explore-about-right-container">
          <div>
            <h1>
              <div className="explore-intro-dot"></div>
              <p>About</p>
            </h1>
            <br />
            <p>
              {about.intro}
              <br />
              <br />
              <br />
              <div>
                <h2>Visiting Hours</h2>
                <p>
                  {about.openingtime} to {about.closingtime}
                </p>
              </div>
            </p>
          </div>
        </div>
      </div>

      <div className="explore-about-main-container-2">
        <div className="explore-about-right-container-2">
          <img
            src="https://via.placeholder.com/600x400?text=History+Image"
            alt="Background"
          />
        </div>
        <div className="explore-about-left-container-2">
          <div>
            <h1>
              <p>History</p>
              <div className="explore-intro-dot"></div>
            </h1>
            <br />
            <p>{about.history}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreAboutPage;