import React, { useState, lazy, Suspense } from "react";
import "./SwitchingPages.css";
import LoadingSpinner from "../../../../../../OptimizationCodes/LoadingSpinner";

const ExploreAboutPage = lazy(() => import("../../ExploreAboutPage/ExploreAboutPage"));
const ExploreMapPage = lazy(() => import("../../ExploreMapPage/ExploreMapPage"));
const ExploreGalleryPage = lazy(() => import("../../ExploreGalleyPage/ExploreGalleyPage"));

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

      <Suspense fallback={<LoadingSpinner size="medium" />}>
        <div className="explore-switched-components-container">
          <div
            className={`explore-component-transition ${
              activeComponent === "about" ? "active" : ""
            }`}
          >
            {activeComponent === "about" && about && (
              <ExploreAboutPage about={about} images={images} />
            )}
          </div>
          <div
            className={`explore-component-transition ${
              activeComponent === "map" ? "active" : ""
            }`}
          >
            {activeComponent === "map" && about && (
              <ExploreMapPage
                latitude={about.latitude}
                longitude={about.longitude}
                location={location}
              />
            )}
          </div>
          <div
            className={`explore-component-transition ${
              activeComponent === "gallery" ? "active" : ""
            }`}
          >
            {activeComponent === "gallery" && images && (
              <ExploreGalleryPage images={images} />
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default React.memo(SwitchingPage);