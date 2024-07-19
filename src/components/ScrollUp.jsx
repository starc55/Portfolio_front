import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import "./component.css";

const ScrollUp = () => {
    window.addEventListener("scroll",function() {
        const scrollUp = this.document.querySelector(".scrollup");
        if(this.scrollY >= 460) scrollUp.classList.add("show-scroll");
        else scrollUp.classList.remove("show-scroll");
    })
  return (
    <div>
      <a href="#home" className="scrollup">
        <IoIosArrowUp className="scrollup__icon" />
      </a>
    </div>
  );
};

export default ScrollUp;
