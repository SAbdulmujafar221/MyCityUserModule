import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./ProfileSidebar.css";
import { FaUserCog, FaShoppingCart, FaFileAlt, FaPhone, FaSignOutAlt } from "react-icons/fa";

const ProfileSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://f5d5-122-166-70-72.ngrok-free.app/client/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  return (
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
        <NavLink to="/profile/personal-info" className={({ isActive }) => `profile-sidebar-link${isActive ? " active" : ""}`}>
          Personal Information
        </NavLink>
        <NavLink to="/profile/manage-address" className={({ isActive }) => `profile-sidebar-link${isActive ? " active" : ""}`}>
          Manage Address
        </NavLink>
      </div>

      <div className="profile-sidebar-section">
        <p className="profile-sidebar-section-title">
          <FaShoppingCart className="profile-sidebar-icon" /> My Cart
        </p>
        <NavLink to="/profile/trip-history" className={({ isActive }) => `profile-sidebar-link${isActive ? " active" : ""}`}>
          Trip History
        </NavLink>
        <NavLink to="/profile/orders" className={({ isActive }) => `profile-sidebar-link${isActive ? " active" : ""}`}>
          My Orders
        </NavLink>
        <NavLink to="/profile/bookings" className={({ isActive }) => `profile-sidebar-link${isActive ? " active" : ""}`}>
          My Bookings
        </NavLink>
        <NavLink to="/profile/tickets" className={({ isActive }) => `profile-sidebar-link${isActive ? " active" : ""}`}>
          My Tickets
        </NavLink>
        <NavLink to="/profile/services" className={({ isActive }) => `profile-sidebar-link${isActive ? " active" : ""}`}>
          My Services
        </NavLink>
      </div>

      <div className="profile-sidebar-section">
        <NavLink to="/profile/privacy-policy" className="profile-sidebar-link">
          <FaFileAlt className="profile-sidebar-icon" /> Privacy Policy
        </NavLink>
        <NavLink to="/profile/help-center" className="profile-sidebar-link">
          <FaPhone className="profile-sidebar-icon" /> Help Center
        </NavLink>
        <div className="profile-sidebar-link logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
          <FaSignOutAlt className="profile-sidebar-icon" /> Logout
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
