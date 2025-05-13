import React, { useRef, useState } from "react";


import AndhraPradeshMap from "../HomePage/Districts/Districts";
import TripPlanner from "../HomePage/TripPlanner/TripPlanner";
import Carousel from "../HomePage/Events/Events";
import VideoGallery from "../HomePage/VideoGallery/VideoGallery";
import useOnScreen from "../CustomHooks/UseOnScreen";

import PageTwo from "../HomePage/TopTenDestinations/PageTwo/PageTwo";
import Categories from "../HomePage/Categories/Categories";
import TourismHomePage from "../HomePage/TourismHomePage/TourismHomePage";
import TripPlannerHomePage from "../HomePage/TripPlannerNew/TripPlannerNew";
import Train from "../HomePage/TripPlannerNew/TripPlannerNew";

const HomePage = () => {
  const aboutRef = useRef(null);
  const [completed, setcompleted] = useState(false);

  const isAboutVisible = useOnScreen(aboutRef, 0.5);

  return (
    <div className="app-container">
      <TourismHomePage />

      <PageTwo />

      <Categories />
      <AndhraPradeshMap />
      {/* <TripPlanner /> */}
      <Train />
      <Carousel />
      <VideoGallery />
    </div>
  );
};

export default HomePage;
