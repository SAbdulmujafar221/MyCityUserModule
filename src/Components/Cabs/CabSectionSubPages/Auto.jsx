

import React from 'react';
import './CabSection.css';

const Auto = () => {
  const carData = [
    {
      id: 1,
      name: 'Sedan',
      price: 599,
      people: 4,
      img: './assets/images/Cab-section-images/auto1.png',
    },
    {
      id: 2,
      name: 'Sedan',
      price: 599,
      people: 4,
      img: './assets/images/Cab-section-images/auto2.png',
    },
    {
      id: 3,
      name: 'SUV',
      price: 999,
      people: 6,
      img: './assets/images/Cab-section-images/car3.png',
    },
    {
      id: 4,
      name: 'SUV',
      price: 999,
      people: 6,
      img: './assets/images/Cab-section-images/car4.png',
    },
  ];

  return (
    <div className="cab-book-slider-container">
      <div className="cab-book-grid">
        {carData.map((car) => (
          <div key={car.id} className="cab-book-car-card">
            <div className="cab-book-car-info">
              <div className="cab-book-header">
                <div className="cab-book-model">
                  <h3>Car Name</h3>
                  <p className="car-type">{car.name}</p>
                </div>
                <span className="cab-book-heart-icon">❤️</span>
              </div>
              <div className="cab-book-car-image">
              <img src={car.img} alt={car.name}  className='cab-book-car-img'/>
              </div>
              <p className="people-count">👥 {car.people} people</p>
              <div className="cab-book-details">
                <p className="cab-book-price">₹{car.price}/<span>day</span></p>
                <button className="cab-book-btn">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auto;