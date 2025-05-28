import React from "react";
import AndhraPradeshMap from "../HomePage/Districts/Districts";
import Carousel from "../HomePage/Events/Events";
import VideoGallery from "../HomePage/VideoGallery/VideoGallery";
import PageTwo from "../HomePage/TopTenDestinations/PageTwo/PageTwo";
import Categories from "../HomePage/Categories/Categories";
import TourismHomePage from "../HomePage/TourismHomePage/TourismHomePage";

const HomePage = () => {


  return (
    <div className="app-container">
      <TourismHomePage />
      <PageTwo />
      <Categories />
      <AndhraPradeshMap />
      <Carousel />
      <VideoGallery />
    </div>
  );
};

export default HomePage;
