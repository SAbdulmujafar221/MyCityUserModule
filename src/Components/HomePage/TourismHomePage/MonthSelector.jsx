import React, { useEffect, useRef, useState } from "react";
import "./MonthSelector.css";

const MonthSelector = ({
  months,
  selectedMonth,
  onMonthChange,
  currentPlaceName,
  monthData,
  currentPlaceIndex,
  onPlaceChange,
}) => {
  const [typedText, setTypedText] = useState("");
  const typingIntervalRef = useRef(null);
  const monthListRef = useRef(null);
  const timelineRef = useRef(null);

  // Typing animation for place name
  useEffect(() => {
    if (!currentPlaceName) {
      setTypedText("");
      return;
    }

    setTypedText("");
    let index = 0;

    typingIntervalRef.current = setInterval(() => {
      setTypedText((prev) => prev + currentPlaceName.charAt(index));
      index++;
      if (index >= currentPlaceName.length) {
        clearInterval(typingIntervalRef.current);
      }
    }, 400);

    return () => clearInterval(typingIntervalRef.current);
  }, [currentPlaceName]);

  // Auto-advance places every 10 seconds
  useEffect(() => {
    if (!monthData || !monthData.videos || monthData.videos.length === 0) return;

    const interval = setInterval(() => {
      const nextPlace = (currentPlaceIndex + 1) % monthData.videos.length;
      onPlaceChange(nextPlace);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentPlaceIndex, monthData, onPlaceChange]);

  // Scroll to center the active month
  useEffect(() => {
    if (monthListRef.current && timelineRef.current) {
      const monthHeight = monthListRef.current.clientHeight / 5; // Height of one month item (5 visible)
      const scrollPosition = (selectedMonth - 2) * monthHeight; // Center the active month
      monthListRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });

      // Scroll timeline to center active month’s dot
      const dotHeight = timelineRef.current.clientHeight / months.length;
      const dotPosition = selectedMonth * dotHeight;
      timelineRef.current.scrollTo({
        top: dotPosition - timelineRef.current.clientHeight / 2 + dotHeight / 2,
        behavior: "smooth",
      });
    }
  }, [selectedMonth, months.length]);

  // Handle mouse wheel scrolling
  const handleWheelScroll = (e) => {
    e.preventDefault(); // Prevent default scroll
    const delta = e.deltaY;
    let newMonth = selectedMonth;

    if (delta > 0) {
      // Scroll down: next month
      newMonth = (selectedMonth + 1) % months.length;
    } else if (delta < 0) {
      // Scroll up: previous month
      newMonth = (selectedMonth - 1 + months.length) % months.length;
    }

    onMonthChange(newMonth);
  };

  // Calculate visible months (5 at a time, centered on selectedMonth)
  const getVisibleMonths = () => {
    const totalMonths = months.length;
    const half = Math.floor(5 / 2); // 2 months before and after
    let start = selectedMonth - half;
    let end = selectedMonth + half + 1;

    // Handle wrapping for looping
    if (start < 0) {
      start += totalMonths;
      end += totalMonths;
    } else if (end > totalMonths) {
      start -= totalMonths;
      end -= totalMonths;
    }

    const visibleIndices = [];
    for (let i = start; i < end; i++) {
      const index = (i + totalMonths) % totalMonths; // Ensure positive index
      visibleIndices.push(index);
    }
    return visibleIndices;
  };

  const visibleMonthIndices = getVisibleMonths();

  return (
    <div className="month-selector-wrapper">
      <div className="month-selector-container">
        <div
          className="months-list"
          ref={monthListRef}
          onWheel={handleWheelScroll}
        >
          {visibleMonthIndices.map((idx) => (
            <div
              key={months[idx]}
              className={`month-item ${idx === selectedMonth ? "active" : ""}`}
              onClick={() => onMonthChange(idx)}
            >
              {months[idx].toUpperCase()}
            </div>
          ))}
        </div>
        <div className="vertical-timeline" ref={timelineRef}>
          {months.map((_, idx) => (
            <div
              key={idx}
              className="timeline-segment"
              onClick={() => onMonthChange(idx)}
            >
              {idx === selectedMonth && (
                <div className="timeline-dot active" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="place-name-display">
        {typedText || "No place selected"}
      </div>
    </div>
  );
};

export default MonthSelector;