import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CulturalEvents.css";
import BackToHome from "../../../../BackToHome/BackToHome";
import SimilarEvents from "./SimilarEvents";
import UpcomingEvents from "./UpcomingEvents";

function CulturalEvents() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `https://7372-122-166-70-72.ngrok-free.app/client/event/fetch/${id}`,
          {
            headers: { "ngrok-skip-browser-warning": "true" },
            withCredentials: true,
          }
        );
        const data = res.data.data;

        console.log("Event data:", res.data.data);

        setEvent({
          name: data.eventName,
          date: data.date,
          time: data.time,
          description: data.description,
          images: data.eventImages || [],
          schedule: data.schedule || [],
          similarEvents: data.similarEvents || [],
        });
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (!event) return;
    const target = new Date(`${event.date}T${event.time}`);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [event]);

  if (!event) return <div>Loading...</div>;

  const isEventEnded =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <>
      <BackToHome />
      <section
        className="event-subpage-hero"
        style={{
          backgroundImage: `url(${
            event.images[0] || "https://via.placeholder.com/1200x400"
          })`,
        }}
      >
        <h1>{event.name}</h1>
        {isEventEnded ? (
          <p className="event-subpage-event-ended">This event has ended.</p>
        ) : (
          <div className="event-subpage-countdown">
            <div>
              <span>{String(timeLeft.days).padStart(2, "0")}</span> Days
            </div>
            <div>
              <span>{String(timeLeft.hours).padStart(2, "0")}</span> Hours
            </div>
            <div>
              <span>{String(timeLeft.minutes).padStart(2, "0")}</span> Min
            </div>
            <div>
              <span>{String(timeLeft.seconds).padStart(2, "0")}</span> Sec
            </div>
          </div>
        )}
      </section>

      <section className="event-subpage-about">
        <div className="event-subpage-about-content">
          <div className="event-subpage-about-left">
            {event.images.map((img, i) => (
              <img key={i} src={img} alt={`Event ${i + 1}`} />
            ))}
          </div>
          <div className="event-subpage-about-right">
            <h1>About</h1>
            <p>{event.description}</p>
          </div>
        </div>
      </section>

      <section className="event-subpage-highlights">
        <h2>Schedule</h2>
        <ul className="event-subpage-schedule-list">
          {event.schedule.map((item, i) => (
            <li key={i}>
              <strong>{item.activityName}</strong> — {item.date} at {item.time}
            </li>
          ))}
        </ul>
      </section>

      <div className="event-subpage-similar-upcoming-block">
        <SimilarEvents similarEvents={event.similarEvents} />
        <UpcomingEvents />
      </div>
    </>
  );
}

export default CulturalEvents;