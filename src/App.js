import React from "react";
import "./App.css";
import RoutingPages from "./Components/Routing-Pages/RoutingPages";
import FullMap from "./Components/HomePage/TripPlanner/FullMap/FullMap";
import SubTripPlanner from "./Components/HomePage/TripPlanner/FullMap/TripPlannerPage/SubTripPlanner";
import RegisterPage from "./Components/Register/Register";
import HomePage from "./Components/Pages/HomePage";
import MerchantRegistrationForm from "./Components/MerchantRegisteration/MerchantRegisterForm/MerchantRegistrationForm";

function App() {
  return (
    <>
      <RoutingPages />
      {/* <MerchantRegistrationForm /> */}
      {/* <SubTripPlanner/> */}
      {/* <FullMap/> */}
      {/* <RegisterPage/> */}
      {/* <HomePage/> */}
    </>
  );
}

export default App;
