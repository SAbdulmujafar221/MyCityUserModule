import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../UserProfile.css"; // Adjust the path as necessary

const ProfilePersonalInfo = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(
              "https://f2fe-2409-408c-2d98-99a0-1903-834d-cae3-323e.ngrok-free.app/client/profile/user",
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  "ngrok-skip-browser-warning": "true"
                }
              }
            );
            setUser(response.data);
            console.log("User data:", response.data);
          } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserData();
      }, []);
    
      if (loading) return <div className="profile-loading">Loading...</div>;
      if (!user) return <div>User not found or not logged in.</div>;
  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <h2 className="user-profile-title">User Profile</h2>
        <div className="user-profile-info">
          <label>
            <strong>ID:</strong>
            <input type="text" value={user.id} readOnly className="user-profile-input" />
          </label>
          <label>
            <strong>Name:</strong>
            <input type="text" value={user.name} readOnly className="user-profile-input" />
          </label>
          <label>
            <strong>Email:</strong>
            <input type="email" value={user.email} readOnly className="user-profile-input" />
          </label>
          <label>
            <strong>Phone:</strong>
            <input type="tel" value={user.phone} readOnly className="user-profile-input" />
          </label>
        </div>
      </div>
    </div>
  )
}

export default ProfilePersonalInfo