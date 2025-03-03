import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="ld-ripple">
      <div className="riple"></div>
      <div className="riple"></div>
    </div>
  );
};

export default LoadingSpinner;
