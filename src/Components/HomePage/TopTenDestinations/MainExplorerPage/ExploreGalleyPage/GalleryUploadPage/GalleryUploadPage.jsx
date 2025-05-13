import React, { useState } from "react";
import "./GalleryUploadPage.css";
import { useNavigate } from "react-router-dom";

 
const districtsAndCities = {
  Anantapur: ["Anantapur", "Tadipatri", "Gooty"],
  Chittoor: ["Chittoor", "Tirupati", "Madanapalle"],
  "East Godavari": ["Kakinada", "Rajahmundry", "Amalapuram"],
  Guntur: ["Guntur", "Tenali", "Mangalagiri"],
  Kadapa: ["Kadapa", "Proddatur", "Pulivendula"],
  Krishna: ["Machilipatnam", "Vijayawada", "Nuzvid"],
  Kurnool: ["Kurnool", "Nandyal", "Adoni"],
  Nellore: ["Nellore", "Kavali", "Gudur"],
  Prakasam: ["Ongole", "Chirala", "Markapur"],
  Srikakulam: ["Srikakulam", "Palasa", "Tekkali"],
  Visakhapatnam: ["Visakhapatnam", "Bheemunipatnam", "Anakapalle"],
  Vizianagaram: ["Vizianagaram", "Bobbili", "Parvathipuram"],
  "West Godavari": ["Eluru", "Tadepalligudem", "Bhimavaram"],
  NTR: ["Vijayawada", "Mylavaram", "Nandigama"],
  Palnadu: ["Narasaraopet", "Sattenapalle", "Chilakaluripet"],
  Bapatla: ["Bapatla", "Chirala", "Repalle"],
  Annamayya: ["Rayachoti", "Rajampet", "Madanapalle"],
  "Sri Sathya Sai": ["Puttaparthi", "Hindupur", "Penukonda"],
  Tirupati: ["Tirupati", "Srikalahasti", "Renigunta"],
  Nandyal: ["Nandyal", "Atmakur", "Allagadda"],
  Anakapalli: ["Anakapalle", "Narsipatnam", "Chodavaram"],
  Kakinada: ["Kakinada", "Pithapuram", "Samalkot"],
  Konaseema: ["Amalapuram", "Razole", "Mummidivaram"],
  Eluru: ["Eluru", "Jangareddygudem", "Nuzvid"],
  "Parvathipuram Manyam": ["Parvathipuram", "Salur", "Bobbili"],
  "Alluri Sitharama Raju": ["Paderu", "Rampachodavaram", "Chintapalle"],
};
 
const GalleryUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    district: "",
  });
 
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();


  
 

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "district" && { city: "" }),
    });
  };
 
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 30) {
      alert("You can only upload up to 30 images.");
      return;
    }
 
    const newImageURLs = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
 
    setSelectedImages((prev) => [...prev, ...newImageURLs]);
  };
 
  const handleImageDelete = (indexToDelete) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.city || !formData.district || selectedImages.length === 0) {
      alert("Please fill all fields and upload at least one image.");
      return;
    }
  
    alert("Gallery successfully uploaded!");
    navigate("/MainExplorePlorer");
  };
  
  
 
  return (
    <div className="photo-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name Of The Place"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>
 
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select District</option>
            {Object.keys(districtsAndCities).map((district, idx) => (
              <option key={idx} value={district}>
                {district}
              </option>
            ))}
          </select>
 
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input-field"
            disabled={!formData.district}
          >
            <option value="">Select City</option>
            {formData.district &&
              districtsAndCities[formData.district].map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
          </select>
 
          <div className="photo-note">
            <label htmlFor="imageUpload">
              Upload up to 30 images
              <br />
              (Click here)
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="file-input"
            />
          </div>
 
          {selectedImages.length > 0 && (
            <div className="preview-grid">
              {selectedImages.map((img, index) => (
                <div className="image-wrapper" key={index}>
                  <img
                    src={img.url}
                    alt={`preview-${index}`}
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleImageDelete(index)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          )}
 
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default GalleryUpload;
 
 