import React, {  useState } from "react";
import { Route, Routes, useLocation } from "react-router";
// import { Route } from "react-router";
import HomePage from "../Pages/HomePage";
import RegisterPage from "../Register/Register";
import SignInPage from "../Register/Login/Signin";
import ForgotPassword from "../Register/Forgot Password/ForgotPassword";
import LandmarksMap from "../HomePage/Scroller/ApPlaces/ApPlaces/LandMarksMap";
import Navbar from "../NavBar/Navbar";
import MainExplorePage from "../HomePage/TopTenDestinations/MainExplorerPage/MainExplorePage";
import FullMap from "../HomePage/TripPlanner/FullMap/FullMap";
import CulturalEvents from "../HomePage/Events/CulturalEvents/CulturalEvents/CulturalEvents";
import CabSectionMainPage from "../Cabs/CabSectionMainPage/CabSectionMainPage";
const RoutingPages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const navbarHidden = ["/Login", "/Register","MainExplorePlorer","forgot-password","CategoriesExplore","SubTripPlanner","/CabSection"];

  const showNavbar = !navbarHidden.includes(location.pathname);
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route
          path="/Login"
          element={
            <SignInPage
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          }
        />
        <Route path="/CabSection" element={<CabSectionMainPage/>}/>
        <Route path="/MainExplorePlorer" element={<MainExplorePage />}></Route>
        <Route path="/CulturalEvents" element={<CulturalEvents/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/CategoriesExplore" element={<LandmarksMap />}></Route>
        <Route path="/SubTripPlanner" element={<FullMap />}></Route>
      </Routes>
    </>
  );
};

// ../CulturalEvents//CulturalEventsImages/background.png
export default RoutingPages;
