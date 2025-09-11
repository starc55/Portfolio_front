import React, { useEffect, useState } from "react";
import "../App.css";

export default function LoadingOverlay() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-wrapper ${fadeOut ? "fade-out" : ""}`}>
      <div className="jelly"></div>

      <svg width="0" height="0" className="jelly-maker">
        <defs>
          <filter id="uib-jelly-ooze">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="6.25"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 18 -7"
              result="ooze"
            ></feColorMatrix>
            <feBlend in="SourceGraphic" in2="ooze"></feBlend>
          </filter>
        </defs>
      </svg>

      <h2 className="loading-text">You have arrived correctly.</h2>
    </div>
  );
}
