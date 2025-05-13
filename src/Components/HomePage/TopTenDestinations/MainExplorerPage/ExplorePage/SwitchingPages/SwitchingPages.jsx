import React, { useState } from "react";
import ExploreAboutPage from "../../ExploreAboutPage/ExploreAboutPage";
import ExploreMapPage from "../../ExploreMapPage/ExploreMapPage";

import "./SwitchingPages.css";
import ExploreGalleryPage from "../../ExploreGalleyPage/ExploreGalleyPage";

const SwitchingPage = ({ about, images, location }) => {
  const [activeComponent, setActiveComponent] = useState("about");

  return (
    <div className="explore-switching-page">
      <div className="explore-switching-headings">
        {["about", "map", "gallery"].map((key) => (
          <p
            key={key}
            className={activeComponent === key ? "active-heading" : ""}
            onClick={() => setActiveComponent(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </p>
        ))}
      </div>

      <div className="explore-switched-components-container">
        <div
          className={`explore-component-transition ${
            activeComponent === "about" ? "active" : ""
          }`}
        >
          {activeComponent === "about" && <ExploreAboutPage about={about} />}
        </div>
        <div
          className={`explore-component-transition ${
            activeComponent === "map" ? "active" : ""
          }`}
        >
          {activeComponent === "map" && (
            <ExploreMapPage latitude={about.latitude} longitude={about.longitude} location={location} />
          )}
        </div>
        <div
          className={`explore-component-transition ${
            activeComponent === "gallery" ? "active" : ""
          }`}
        >
          {activeComponent === "gallery" && <ExploreGalleryPage images={images} />}
        </div>
      </div>
    </div>
  );
};

export default SwitchingPage;