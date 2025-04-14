import React, {useState} from 'react'
import ExploreAboutPage from '../../ExploreAboutPage/ExploreAboutPage';
import ExploreMapPage from '../../ExploreMapPage/ExploreMapPage';
import ExploreGalleryPage from '../../ExploreGalleyPage/ExploreGalleyPage';
import "./SwitchingPages.css"


const SwitchingPage = () => {

    const [activeComponent , setActiveComponent] = useState("about");
  return (
    <div className="explore-swtching-page">
        <div className="explore-switching-headings">
            <p onClick={() => setActiveComponent("about")}>About</p>
            <p onClick={() => setActiveComponent("map")}>Map</p>
            <p onClick={() => setActiveComponent("gallery")}>Gallery</p>
        </div>
        <div className="explore-switched-components-container">
            {activeComponent === "about" && <ExploreAboutPage />}
            {activeComponent === "map" && <ExploreMapPage />}
            {activeComponent === "gallery" && <ExploreGalleryPage />}
        </div>
    </div>
  )
}

export default SwitchingPage