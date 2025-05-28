import  { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const [items, setItems] = useState([]);
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://c8dd-2409-408c-1585-b028-e074-c140-9f5a-113.ngrok-free.app/client/bycategory/unique/images",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
            withCredentials: true,
          }
        );
        console.log(response);
        setItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="categories-container"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease",
      }}
    >
      <div className="categories-overlay-effect" />
      <div className="categories-header">
        <h1>Local Highlights</h1>
      </div>

      <div className="categories-grid-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`categories-grid-item item${item.placeId}`}
            onMouseEnter={() => setBgImage(item.imageUrl)}
            onMouseLeave={() => setBgImage(null)}>
            <Link to={`/CategoriesExplore/${item.categoryName}`} >
              <img
                src={item.imageUrl}
                alt={item.categoryName}
                className="categories-grid-img"
              />

              <div className="categories-overlay">
                <h3>{item.categoryName}</h3>
                <p>{item.placeDescription}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;