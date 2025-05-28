import React, { useState, useEffect } from "react";
import "./ProfileSidebar.css";
import { FaUserCog, FaShoppingCart, FaFileAlt, FaPhone, FaSignOutAlt } from "react-icons/fa";
import ProfilePersonalInfo from "../ProfilePersonalInfo/ProfilePersonalInfo";
import Manage from "../ProfilePersonalInfo/ProfileManageAddress";
import TripHistory from "../ProfilePersonalInfo/TripHistory";
import Policy from "../ProfilePersonalInfo/PrivacyPolicy";
import HelpCenter from "../ProfilePersonalInfo/HelpCenter";

const ProfileSidebar = () => {
  const [activeComponent, setActiveComponent] = useState("Personal Information");

  const handleLogout = async () => {
    try {
      const response = await fetch("https://f5d5-122-166-70-72.ngrok-free.app/client/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/login";
    }
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "Personal Information":
        return <ProfilePersonalInfo />;
      case "Manage Address":
        return <Manage />;
      case "Trip History":
        return <TripHistory />;
      case "My Orders":
        return <div>This is My Orders content.</div>;
      case "My Bookings":
        return <div>This is My Bookings content.</div>;
      case "My Tickets":
        return <div>This is My Tickets content.</div>;
      case "My Services":
        return <div>This is My Services content.</div>;
      case "Privacy Policy":
        return <Policy />;
      case "Help Center":
        return <HelpCenter />;
      default:
        return <ProfilePersonalInfo />;
    }
  };

  return (
    <div className="profile-sidebar-wrapper">
      <div className="profile-sidebar-container">
        <div className="profile-sidebar-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="Profile"
            className="profile-sidebar-avatar"
          />
          <h2 className="profile-sidebar-username">Username</h2>
        </div>

        <div className="profile-sidebar-section">
          <p className="profile-sidebar-section-title">
            <FaUserCog className="profile-sidebar-icon" /> Account Settings
          </p>
          <div className={`profile-sidebar-link ${activeComponent === "Personal Information" ? "active" : ""}`} onClick={() => setActiveComponent("Personal Information")}>
            Personal Information
          </div>
          <div className={`profile-sidebar-link ${activeComponent === "Manage Address" ? "active" : ""}`} onClick={() => setActiveComponent("Manage Address")}>
            Manage Address
          </div>
        </div>

        <div className="profile-sidebar-section">
          <p className="profile-sidebar-section-title">
            <FaShoppingCart className="profile-sidebar-icon" /> My Cart
          </p>
          <div className={`profile-sidebar-link ${activeComponent === "Trip History" ? "active" : ""}`} onClick={() => setActiveComponent("Trip History")}>
            Trip History
          </div>
          <div className={`profile-sidebar-link ${activeComponent === "My Orders" ? "active" : ""}`} onClick={() => setActiveComponent("My Orders")}>
            My Orders
          </div>
          <div className={`profile-sidebar-link ${activeComponent === "My Bookings" ? "active" : ""}`} onClick={() => setActiveComponent("My Bookings")}>
            My Bookings
          </div>
          <div className={`profile-sidebar-link ${activeComponent === "My Tickets" ? "active" : ""}`} onClick={() => setActiveComponent("My Tickets")}>
            My Tickets
          </div>
          <div className={`profile-sidebar-link ${activeComponent === "My Services" ? "active" : ""}`} onClick={() => setActiveComponent("My Services")}>
            My Services
          </div>
        </div>

        <div className="profile-sidebar-section">
          <div className={`profile-sidebar-link ${activeComponent === "Privacy Policy" ? "active" : ""}`} onClick={() => setActiveComponent("Privacy Policy")}>
            <FaFileAlt className="profile-sidebar-icon" /> Privacy Policy
          </div>
          <div className={`profile-sidebar-link ${activeComponent === "Help Center" ? "active" : ""}`} onClick={() => setActiveComponent("Help Center")}>
            <FaPhone className="profile-sidebar-icon" /> Help Center
          </div>
          <div className="profile-sidebar-link logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
            <FaSignOutAlt className="profile-sidebar-icon" /> Logout
          </div>
        </div>
      </div>

      <div className="profile-sidebar-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileSidebar;
