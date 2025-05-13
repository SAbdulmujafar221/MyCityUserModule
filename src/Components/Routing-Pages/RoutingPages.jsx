import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import PageTwo from "../HomePage/TopTenDestinations/PageTwo/PageTwo";
import Footer from "../Footer/Footer";

import UserReview from "../UserReview/UserReview";
import GalleryUpload from "../HomePage/TopTenDestinations/MainExplorerPage/ExploreGalleyPage/GalleryUploadPage/GalleryUploadPage";
import ProfilePage from "../UserProfile/UserProfile";
import ProfilePersonalInfo from "../UserProfile/ProfilePersonalInfo/ProfilePersonalInfo";
import ProfileManageAddress from "../UserProfile/ProfilePersonalInfo/ProfileManageAddress";
import DistrictSubPage from "../HomePage/Districts/DistrictSubPage/DistrictSubPage";
import ProfileLayout from "../UserProfile/UserProfile";

const RoutingPages = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Routes where both Navbar and Footer should be hidden
  const hiddenRoutes = [
    "/login",
    "/Register",
    "/forgot-password",
    "/UserReview",
    "/Explore/Gallery/PhotoUpload",
    "/profile",
    "/profile/personal-info",
    "/profile/manage-address",
    "/event/:id",
  ];

  const hideFooter = ["/CategoriesExplore", "/event/:id"];

  // Determine if Navbar and Footer should be shown
  const showNavbarAndFooter = !hiddenRoutes.includes(location.pathname);
  const showFooter = !hideFooter.includes(location.pathname);

  return (
    <>
      {showNavbarAndFooter && <Navbar key={window.location.pathname} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/CabSection" element={<CabSectionMainPage />} />
        <Route path="/MainExplorePlorer/:slug" element={<MainExplorePage />} />
        <Route path="/event/:id" element={<CulturalEvents />} />
        <Route path="/CategoriesExplore" element={<LandmarksMap />} />
        <Route path="/SubTripPlanner" element={<FullMap />} />
        <Route path="/PageTwo" element={<PageTwo />} />
        <Route path="/UserReview" element={<UserReview />} />
        <Route path="Explore/Gallery/PhotoUpload" element={<GalleryUpload />} />

        <Route path="/Districts" element={<DistrictSubPage />} />

       
          <Route path="/profile/personal-info" element={<ProfilePersonalInfo />} />
          <Route path="/profile/manage-address" element={<ProfileManageAddress />} />
        
      </Routes>
      {showNavbarAndFooter && showFooter && <Footer />}
    </>
  );
};

export default RoutingPages;
