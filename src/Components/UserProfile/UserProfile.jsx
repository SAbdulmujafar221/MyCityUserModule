import React from "react";
import NavBar from "../NavBar/Navbar";
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar";

import Footer from "../Footer/Footer";

const UserProfile = () => {
  return (
    <div>
      <NavBar />
      <div className="user-profile-content">
        <ProfileSidebar />{" "}  
      </div>
      <div className="user-footer">
         <Footer />
      </div>
     
    </div>
  );
};

export default UserProfile;
