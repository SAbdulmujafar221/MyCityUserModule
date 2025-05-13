import React, { useEffect, useRef, useState } from "react";
import "./MonthSelector.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Updated place names (30 total)
const placeNamesByMonth = {
  0: ["Tirumala Temple", "Sri Venkateswara Museum", "Silathoranam", "Akasa Ganga", "Papavinasam Theertham"],
  1: ["Kapila Theertham", "Talakona Waterfalls", "Chandragiri Fort", "Sri Vari Museum", "ISKCON Tirupati"],
  2: ["Sri Govindarajaswami Temple", "Sri Padmavathi Ammavari Temple", "Sri Kalyana Venkateswara Swamy Temple", "Regional Science Centre", "Deer Park Tirupati"],
  3: ["Japali Teertham", "Tumburu Teertham", "Sri Venkateswara Zoological Park", "Sri Venugopala Swamy Temple", "Srinivasa Mangapuram"],
  4: ["Kalyani Dam", "Tirupati Rock Garden", "Sri Prasanna Venkateswara Swamy Temple", "Asthana Mandapam", "TTD Gardens"],
  5: ["Sri Bedi Anjaneyaswami Temple", "Sri Varahaswami Temple", "Alamelu Mangapuram", "Sri Kodandarama Swamy Temple", "Tirupati View Point"]
};

const MonthSelector = ({ selectedMonth, onMonthChange }) => {
  const containerRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  const extendedMonths = [...months, ...months, ...months];

  // Scroll selected month into view
  useEffect(() => {
    const container = containerRef.current;
    const itemHeight = container.offsetHeight / 5;
    const selectedIndex = selectedMonth + months.length;
    const scrollOffset = selectedIndex * itemHeight - (container.offsetHeight - itemHeight) / 2;

    isProgrammaticScroll.current = true;
    container.scrollTo({
      top: scrollOffset,
      behavior: "smooth",
    });
  }, [selectedMonth]);

  // Loop scroll logic
  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      if (isProgrammaticScroll.current) {
        isProgrammaticScroll.current = false;
        return;
      }

      const itemHeight = container.offsetHeight / 5;
      const scrollTop = container.scrollTop;
      const middleSetOffset = months.length * itemHeight;

      if (scrollTop < middleSetOffset - itemHeight) {
        isProgrammaticScroll.current = true;
        container.scrollTop = scrollTop + months.length * itemHeight;
      } else if (scrollTop > middleSetOffset + months.length * itemHeight - itemHeight) {
        isProgrammaticScroll.current = true;
        container.scrollTop = scrollTop - months.length * itemHeight;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Update place every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceIndex((prev) => {
        const next = (prev + 1) % 30;
        const nextMonth = Math.floor(next / 5);
        onMonthChange(nextMonth);
        return next;
      });
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, [onMonthChange]);

  // Typing animation effect
  useEffect(() => {
    const month = Math.floor(currentPlaceIndex / 5);
    const place = placeNamesByMonth[month][currentPlaceIndex % 5];

    let index = -1;
    setTypedText(""); // Reset text

    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + place.charAt(index));
      index++;
      if (index >= place.length) clearInterval(typingInterval);
    }, 100); // Typing speed

    return () => clearInterval(typingInterval);
  }, [currentPlaceIndex]);

  const handleMonthClick = (index) => {
    const newMonth = index % months.length;
    onMonthChange(newMonth);
    setCurrentPlaceIndex(newMonth * 5); // Reset to first place in that month
  };

  return (
    <div className="month-selector-wrapper">
      <div className="month-selector-container">
        <div className="month-list" ref={containerRef}>
          {extendedMonths.map((month, index) => (
            <div
              key={index}
              className={`month-item ${selectedMonth === index % months.length ? "active" : ""}`}
              onClick={() => handleMonthClick(index)}
            >
              <span>{month}</span>
            </div>
          ))}
        </div>
        <div className="vertical-timeline">
          {months.map((_, index) => (
            <div key={index} className="timeline-segment" />
          ))}
          <div className="timeline-dot" style={{ top: `calc(${selectedMonth * (100 / 12)}% + 8px)` }} />
        </div>
      </div>

      {/* Typing animation in bottom-left */}
      <div className="place-name-bottom-left">
        <span className="typing-text">{typedText}</span>
      </div>
    </div>
  );
};

export default MonthSelector;
