import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="feliz">Happy New Year</div>
      <div className="ano_novo">
        <span>202</span>
        <span className="seis">4</span>
        <span className="sete">5</span>
        <div className="balao"></div>
      </div>
      <div className="fogos">
        <div className="f1">
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
        </div>
        <div className="f2">
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
        </div>
        <div className="f3">
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
        </div>
        <div className="f4">
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
          <span>
            <i></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
