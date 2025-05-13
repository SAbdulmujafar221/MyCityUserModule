import React , {useState} from "react";
import "./Categories.css";
import { Link } from "react-router";

const items = [
  {
    id: 1,
    title: "Beaches",
    desc: "Andhra Pradesh has stunning coastal beauty, especially Vizag, known for serene beaches and breathtaking sunrise views.",
    size: "item1",
    image: "./assets/GalleryImages/TopImages/Top1.png",
  },
  {
    id: 2,
    title: "Local festivals",
    desc: "Celebrate vibrant local festivals full of colors, music, tradition, and cultural significance all across the region.",
    size: "item2",
    image: "./assets/GalleryImages/TopImages/Top2.png",
  },
  {
    id: 3,
    title: "Religious Sites",
    desc: "Visit sacred temples and spiritual places that reflect deep-rooted beliefs and majestic historical architecture.",
    size: "item3",
    image: "./assets/GalleryImages/TopImages/Top3.png",
  },
  {
    id: 4,
    title: "Ancient Sites",
    desc: "Explore ruins, sculptures, and historical monuments that tell stories of Andhra's rich and ancient legacy.",
    size: "item4",
    image: "./assets/GalleryImages/TopImages/Top4.png",
  },
  {
    id: 5,
    title: "Caves",
    desc: "Discover natural rock formations and ancient cave carvings spread across the beautiful landscapes of Andhra Pradesh.",
    size: "item5",
    image: "./assets/GalleryImages/TopImages/Top5.png",
  },
  {
    id: 6,
    title: "Rivers",
    desc: "Experience the calmness of flowing rivers like Godavari and Krishna, ideal for relaxing and boating.",
    size: "item6",
    image: "./assets/GalleryImages/TopImages/Top6.png",
  },
  {
    id: 7,
    title: "Art forms",
    desc: "From Kuchipudi dance to tribal crafts, Andhra is rich in diverse, traditional, and expressive art forms.",
    size: "item7",
    image: "./assets/GalleryImages/TopImages/Top7.png",
  },
  {
    id: 8,
    title: "Traditional Foods",
    desc: "Indulge in spicy curries, tangy pickles, and authentic Andhra meals packed with unique regional flavors.",
    size: "item8",
    image: "./assets/GalleryImages/TopImages/Top8.png",
  },
  {
    id: 9,
    title: "Textiles",
    desc: "Andhra is home to Kalamkari, Mangalagiri, and other rich handwoven fabrics known for heritage and elegance.",
    size: "item9",
    image: "./assets/GalleryImages/TopImages/Top9.png",
  },
  {
    id: 10,
    title: "Jungles/Trekking",
    desc: "Trek through lush green jungles and explore nature trails full of wildlife, hills, and adventure spots.",
    size: "item10",
    image: "./assets/GalleryImages/TopImages/Top10.png",
  },
];
const Categories = () => {
  const [bgImage, setBgImage] = useState(null);

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
        <h1>Journey Paths</h1>
      </div>

      <div className="categories-grid-container">
        {items.map((item) => (
          <div
            key={item.id}
            className={`categories-grid-item ${item.size}`}
            onMouseEnter={() => setBgImage(item.image)}
            onMouseLeave={() => setBgImage(null)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="categories-grid-img"
            />

            <Link to="/CategoriesExplore">
              <div className="categories-overlay">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Categories;
