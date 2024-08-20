import React from "react";
import achievements1 from "../imgs/achieve1.jpg";
import "./Page.css";
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

const Achievements = () => {
  useEffect(() => {
    ScrollReveal().reveal(".header_about", {
      origin: "left",
      distance: "40px",
      duration: 1300,
      reset: true,
    });
    ScrollReveal().reveal(".achievements_img", {
      origin: "bottom",
      distance: "40px",
      duration: 2000,
      reset: true,
    });
  }, []);
  return (
    <div>
      <div className="header_about">
        <p>My achievements</p>
        <span className="sub_head">
          In this page you can see my achievements
        </span>
      </div>

      <div className="achievements_container">
        <div className="achievements_img">
          <img src={achievements1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Achievements;
