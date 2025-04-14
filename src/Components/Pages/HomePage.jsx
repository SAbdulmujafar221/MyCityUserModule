import React, { useRef,useState } from "react";
import StartingHomePage from "../HomePage/TopTenDestinations/PageTwo/MainPage";

import Spliting from "../HomePage/Spliting/ImageCards";
import AndhraPradeshMap from "../HomePage/Districts/Districts";
import TripPlanner from "../HomePage/TripPlanner/TripPlanner";
import Carousel from "../HomePage/Events/Events";
import VideoGallery from "../HomePage/VideoGallery/VideoGallery";
import useOnScreen from "../CustomHooks/UseOnScreen";
import Scroller from "../HomePage/Scroller/Scroller/Scroller";

const HomePage = () => {
  const aboutRef = useRef(null);
const [completed, setcompleted] = useState(false)

  const isAboutVisible = useOnScreen(aboutRef, 0.5);

  return (
    <div className="app-container">
      <div
        ref={aboutRef}
        className={`section ${isAboutVisible ? "animate-about" : "hidden"}`}
      >
        <StartingHomePage />
      </div>
      <Spliting />
      <Scroller />
      <AndhraPradeshMap />
      <TripPlanner />
      <Carousel />
      <VideoGallery />
    </div>
  );
};

export default HomePage;
