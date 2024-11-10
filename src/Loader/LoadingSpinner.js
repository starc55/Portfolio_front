// components/LoadingSpinner.js
import React from "react";
import "./LoadingSpinner.css"; // Import spinner CSS

const LoadingSpinner = () => {
  return (
    <div class="circ">
      <div class="load">Loading . . . </div>
      <div class="hands"></div>
      <div class="body"></div>
      <div class="head">
        <div class="eye"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
