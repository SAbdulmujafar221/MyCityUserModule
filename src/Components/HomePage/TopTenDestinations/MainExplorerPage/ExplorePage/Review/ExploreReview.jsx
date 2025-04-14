import React, { useState, useEffect } from "react";
import "./ExploreReview.css";

const reviewSlides = [
  {
    image: "/assets/images/ExploreImages/explorereview1.png",
    text: "“Exceptional place to visit has truly redefined my experience!”",
    author: "Abhraham Khalil",
    circles: [
      {
        img: "/assets/images/ExploreImages/reviewperson1.png",
        alt: "Person 1",
        left: "48%",
        top: "22%",
      },
    ],
  },
  {
    image: "./assets/images/ExploreImages/explorereview1.png",
    text: "“A must-see destination that amazed me beyond words!”",
    author: "Sophia Loren",
    circles: [
      {
        img: "./assets/images/ExploreImages/reviewperson2.png",
        alt: "Person 3",
        left: "48%",
        top: "22%",
      },
    ],
  },
  {
    image: "./assets/images/ExploreImages/explorereview1.png",
    text: "“Exploring this place was the highlight of my year!”",
    author: "Michael Smith",
    circles: [
      {
        img: "./assets/images/ExploreImages/reviewperson1.png",
        alt: "Person 2",
        left: "48%",
        top: "22%",
      },
    ],
  },
];

const ExploreReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviewSlides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const { image, text, author, circles } = reviewSlides[currentIndex];

  return (
    <div className="explore-review-slider-container">
      <div className="explore-review-slide">
        <img
          src={image}
          alt="Loading...."
          className="explore-review-background"
        />
        <div className="explore-review-text-container">
          <p className="explore-review-author">{author}</p>
          <p className="explore-review-quote">{text}</p>
        </div>

        {/* Circular Images */}
        {circles.map((circle, index) => (
          <img
            key={index}
            src={circle.img}
            alt={circle.alt}
            className="explore-review-circle-image"
            style={{
              left: circle.left,
              right: circle.right,
              top: circle.top,
              bottom: circle.bottom,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreReview;
