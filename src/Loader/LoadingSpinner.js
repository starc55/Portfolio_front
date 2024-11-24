import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div class="typewriter">
      <div class="slide">
        <i></i>
      </div>
      <div class="paper"></div>
      <div class="keyboard"></div>
    </div>
  );
};

export default LoadingSpinner;
