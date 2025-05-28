import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "../../Events.css";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const SimilarEvents = ({ currentEventName }) => {
  const swiperRef = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://7372-122-166-70-72.ngrok-free.app/client/event/fetch",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
            withCredentials: true,
          }
        );
        console.log("API Response:", res.data);
        const fetchedEvents = res.data.data || [];
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="carousel-container">
      <h3 className="intro">Similar Events</h3>
      <div className="wrapping-events">
        <div className="custom-navigation">
          <p
            className="prev-btn"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaArrowLeft />
          </p>
          <p
            className="next-btn"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaArrowRight />
          </p>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        spaceBetween={3}
        slidesPerView={3}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
        className="carousel"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {events
          .filter((event) => event.eventName !== currentEventName)
          .map((event) => (
            <SwiperSlide key={event.eventId}>
              <Link to={`/event/${event.eventId}`} className="carousel-slide">
                <div
                  className="event-card"
                  style={{
                    backgroundImage: `url(${event.images?.[0]})`,
                  }}
                >
                  <div className="event-date">
                    On <br /> <span>{event.date}</span>
                  </div>
                  <div className="event-overlay">
                    <div className="event-name">{event.eventName}</div>
                    <div className="event-location">{event.city}</div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SimilarEvents;
