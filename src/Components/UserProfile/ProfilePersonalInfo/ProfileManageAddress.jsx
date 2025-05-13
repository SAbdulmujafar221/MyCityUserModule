//MANAGE ADDRESS JSX
 
import React, { useState } from 'react';
import './ProfileManageAddress.css';
 
const Manage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    street: '',
    village: '',
    state: '',
    landmark: '',
  });
 
  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
          alert(`Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`);
        },
        (error) => {
          console.error(error);
          alert('Unable to fetch location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Form Submitted Successfully!');
  };
 
  const handleCancel = () => {
    setFormData({
      name: '',
      contact: '',
      street: '',
      village: '',
      state: '',
      landmark: '',
    });
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  return (
    <div className="manage-container">
      <div className="manage-form">
 
        {/* Image above address */}
        <div className="location-image">
          <img src="/images/location-icon.png" alt="Location Icon" />
        </div>
 
        {/* Address section */}
        <div className="address-section">
          <p><strong><span className="dot"></span>No 123, main road, Andhra Pradesh 600001</strong></p>
          <span className="add-new">Add New Address</span>
        </div>
 
        {/* Use Current Location Button */}
        <button className="location-btn" onClick={handleUseLocation}>
          Use current Location
        </button>
 
        {/* Input Fields */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Contact Number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
 
        <div className="input-group">
          <input
            type="text"
            placeholder="Street no"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="village/town/district"
            name="village"
            value={formData.village}
            onChange={handleChange}
          />
        </div>
 
        <div className="input-group">
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
          </select>
          <input
            type="text"
            placeholder="Landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
          />
        </div>
 
        {/* Submit and Cancel Buttons */}
        <div className="button-group">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
 
      </div>
    </div>
  );
};
 
export default Manage;
 
 

 