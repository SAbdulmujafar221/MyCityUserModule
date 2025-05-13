import React, { useState } from 'react';
import './UserReview.css';
import { useNavigate } from 'react-router-dom';

const UserReview = () => {
  const [showModal, setShowModal] = useState(true); // initially set to true
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [images, setImages] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const navigate = useNavigate();

  const availableTags = ['#Nature', '#perfecttrip', '#sunset', '#adventure', '#chill', '#mountains'];

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...imagePreviews]);
  };

  const handleTagClick = (tag) => {
    if (!selectedHashtags.includes(tag)) {
      setSelectedHashtags([...selectedHashtags, tag]);
    }
  };

  const handleSubmit = () => {
    const reviewData = {
      rating,
      reviewText,
      hashtags: selectedHashtags,
      images,
    };
    console.log('Submitted Review:', reviewData);

    alert("Thanks for giving review!");

    // Reset form
    setShowModal(false);
    setRating(0);
    setReviewText('');
    setImages([]);
    setSelectedHashtags([]);

    navigate('/MainExplorePlorer/:placeSlug');
  };

  return (
    <div className="review-container">
      {showModal && (
        <div className="modal-overlay">
          <div className="review-modal">
            <div className="modal-header">
              <h3>How was the place?</h3>
              <span className="close-button" onClick={() => navigate("/MainExplorePlorer")}>&times;</span>
            </div>

            <div className="modal-body">
              <p className="rating-question">How would you rate the place?</p>
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < rating ? 'filled' : ''}`}
                    onClick={() => handleStarClick(index)}
                  >
                    ★
                  </span>
                ))}
                <span className="rating-count">{rating} / 5</span>
              </div>

              {rating > 0 && (
                <>
                  <div className="review-section">
                    <label>Write a Review</label>
                    <textarea
                      placeholder="Express More"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>

                  <div className="hashtags-section">
                    <p>What do you like about this place?</p>
                    <span className="hint">Express yourself with hashtags</span>
                    <div className="hashtags">
                      {availableTags.map((tag, index) => (
                        <span
                          key={index}
                          className={`tag ${selectedHashtags.includes(tag) ? 'selected' : ''}`}
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {selectedHashtags.length > 0 && (
                      <div className="selected-tags">
                        {selectedHashtags.map((tag, index) => (
                          <span key={index} className="selected-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="upload-box">
                    <label htmlFor="file-upload" className="upload-label">
                      Upload Image <span className="upload-icon">📎</span>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="image-preview">
                      {images.map((src, idx) => (
                        <img key={idx} src={src} alt={`upload-${idx}`} className="preview-img" />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="submit-button"
                disabled={rating === 0}
                onClick={handleSubmit}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReview;
