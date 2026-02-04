import React, { useEffect, useState } from "react";
import "../../App.css";

const LoadingOverlay = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-wrapper ${fadeOut ? "fade-out" : ""}`}>
      <div className="jelly" />

      <svg width="0" height="0" className="jelly-maker" aria-hidden="true">
        <defs>
          <filter id="uib-jelly-ooze">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="6.25"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>

      <h2 className="loading-text">
        You’re in the right place. Getting things ready…
      </h2>
    </div>
  );
};

export default LoadingOverlay;
