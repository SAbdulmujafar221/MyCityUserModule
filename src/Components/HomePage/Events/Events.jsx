import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "./Events.css";
 import { Link } from "react-router-dom";
const events = [
  {
    image: "https://utsav.gov.in/public/uploads/event_picture_image/event_501/16582167301406292907.jpg",
    date: "14 Feb",
    name: "Festival of Colors",
    location: "Hyderabad",
  },
  {
    image: "https://utsav.gov.in/public/uploads/event_picture_image/event_501/16582167301406292907.jpg",
    date: "20 March",
    name: "Spring Fest",
    location: "Mumbai",
  },
  {
    image: "https://utsav.gov.in/public/uploads/event_picture_image/event_501/16582167301406292907.jpg",
    date: "10 April",
    name: "Cultural Carnival",
    location: "Delhi",
  },
  {
    image: "https://utsav.gov.in/public/uploads/event_picture_image/event_501/16582167301406292907.jpg",
    date: "10 April",
    name: "Cultural Carnival",
    location: "Delhi",
  },
  {
    image: "https://utsav.gov.in/public/uploads/event_picture_image/event_501/16582167301406292907.jpg",
    date: "10 April",
    name: "Cultural Carnival",
    location: "Delhi",
  },
  {
    image: "https://utsav.gov.in/public/uploads/event_picture_image/event_501/16582167301406292907.jpg",
    date: "10 April",
    name: "Cultural Carnival",
    location: "Delhi",
  },
];
 
const Carousel = () => {
  const swiperRef = useRef(null);
 
  return (
    <div className="carousel-container">
 
      <h1 className="intro">Events</h1>
      <div className="wrapping-events">
        <div className="intro-nav">
          <p className="introEvents">
            The land of rich culture and traditions! Mark the major events for your next visit.
          </p>
        </div>
 
        <div className="custom-navigation">
          <p className="prev-btn" onClick={() => swiperRef.current?.slidePrev()}>&#8592;</p>
          <p className="next-btn" onClick={() => swiperRef.current?.slideNext()}>&#8594;</p>
        </div>
 
      </div>
 <Link to="/CulturalEvents" >
 <Swiper
        ref={swiperRef}
        modules={[ Autoplay]}
        spaceBetween={5}
        slidesPerView={3}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
        className="carousel"
         onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} className="carousel-slide">
            <div className="event-card" style={{ backgroundImage: `url(${event.image})` }}>
              <div className="event-date">On <span>{event.date}</span></div>
              <div className="event-overlay">
                <div className="event-name">{event.name}</div>
                <div className="event-location">{event.location}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
 </Link>
     
    </div>
  );
};
 
export default Carousel;
 