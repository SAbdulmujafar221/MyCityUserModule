import React, { useState, useEffect } from "react";
import "./ExploreReview.css";
import { Link } from "react-router-dom";

const ExploreReview = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Transform reviews to match expected structure
  const transformedReviews = reviews
    ? reviews.map((review) => ({
        image: review.imageUrl,
        text: review.reviewDescription,
        author: review.userName,
        postedOn: review.postedOn,
        circle: {
          img: review.imageUrl || "https://via.placeholder.com/100?text=Circle", // Fallback image
          alt: "Review Circle",
          left: "auto",
          right: "20px",
          top: "20px",
          bottom: "auto",
        },
      }))
    : [];

  useEffect(() => {
    if (!transformedReviews || transformedReviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === transformedReviews.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [transformedReviews]);

  if (!transformedReviews || transformedReviews.length === 0) {
    return (
      <div className="explore-review-slider-container">
        <div className="explore-review-heading-btn">
          <h2 className="explore-review-heading">Reviews</h2>
          <Link to="/UserReview">
            <button className="explore-review-btn">Add Review</button>
          </Link>
        </div>
        <p>No reviews available.</p>
      </div>
    );
  }

  const { image, text, author, postedOn, circle } = transformedReviews[currentIndex];

  return (
    <div className="explore-review-slider-container">
      <div className="explore-review-heading-btn">
        <h2 className="explore-review-heading">Reviews</h2>
        <Link to="/UserReview">
          <button className="explore-review-btn">Add Review</button>
        </Link>
      </div>
      <div className="explore-review-slide">
        <img
          src={image}
          alt="Review Background"
          className="explore-review-background"
        />
        <div className="explore-review-text-container">
          <p className="explore-review-author">{author}</p>
          <p className="explore-review-quote">{text}</p>
          <p className="explore-review-date">Posted on: {postedOn}</p>
        </div>
        <img
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
      </div>
    </div>
  );
};

export default ExploreReview;