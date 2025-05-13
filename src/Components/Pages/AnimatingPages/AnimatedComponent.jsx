import React from "react";
import { useInView } from "react-intersection-observer";

const AnimatedComponent = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once when visible
    threshold: 0.5,   // Start animation when 20% visible
  });

  return (
    <div ref={ref} className={`component-wrapper ${inView ? "visible" : "hidden"}`}>
      {children}
    </div>
  );
};

export default AnimatedComponent;
