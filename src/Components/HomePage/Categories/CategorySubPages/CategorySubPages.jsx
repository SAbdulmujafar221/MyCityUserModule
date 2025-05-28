import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoriesSubPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://7372-122-166-70-72.ngrok-free.app';

const CategoriesSubPage = () => {
  const { categoryName } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPlaces([]);

    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/client/bycategory/${categoryName}/places`,
          {
            headers: { 'ngrok-skip-browser-warning': 'true' },
            withCredentials: true,
          }
        );

        const placesData = response.data[0]?.places || [];
        setPlaces(placesData);
      } catch (err) {
        setError('Failed to load places. Please try again later.');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [categoryName]);
  const parsePhotoUrls = (photoUrls) => {
    try {
     
      const urlString = photoUrls[0];
      return JSON.parse(urlString); 
    } catch (err) {
      console.error('Error parsing photoUrls:', err);
      return [];
    }
  };

  if (loading) {
    return (
      <div className="category">
        <div className="blog-layout-image-container">
          <p style={{ textAlign: 'center', padding: '20px' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category">
        <div className="blog-layout-image-container">
          <p style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }


  const headerImage = places.length > 0 ? parsePhotoUrls(places[0].photoUrls)[0] : null;

  return (
    <div className="category">

    
      <div className="category-header">
        <img
          src={headerImage}
          alt={`${categoryName} header`}
          className="blog-layout-main-image"
        />
        <h1 style={{color:"red",zIndex:"-999"}}>{places.placeName}</h1>
      </div>
      {/* <div className="button-group">
        <button onClick={() => changeCategory('temple')}>Temple</button>
        <button onClick={() => changeCategory('beaches')}>Beaches</button>
        <button onClick={() => changeCategory('caves')}>Caves</button>
      </div> */}
      <div className="category-cards">
        {places.length > 0 ? (
          places.map((item) => {
            const photoUrl = parsePhotoUrls(item.photoUrls)[0] || ''; 
            return (
              <div
                className="card"
                key={item.placeId}
                style={{ backgroundImage: `url(${photoUrl})` }}
              >
                <div className="card-overlay">
                  <h2 className="title">{item.placeName}</h2>
                  <p className="description">{item.aboutPlace}</p>
                  <div className="card-bottom">
                    <Link to={`/place/${item.placeId}`}>
                      <button
                        className="Explore"
                        aria-label={`Explore ${item.placeName}`}
                      >
                        Explore
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', padding: '20px' }}>
            No places available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoriesSubPage;