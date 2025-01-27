import React, { useState } from "react";
import { CiHome, CiUser } from "react-icons/ci";
import { SiHyperskill } from "react-icons/si";
import { MdMedicalServices } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { GrAppsRounded } from "react-icons/gr";
import "./component.css";
import logo from "../imgs/logome.png";
import logoHat from "../new year version img/hat.png"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="nav container">
        <a href="#home" className="nav__logo">
          <div className="logo-container">
            <img src={logo} alt="logo" />
            <img src={logoHat} alt="hat" className="logo-hat"/>
          </div>
        </a>

        <div className={`nav__menu ${isMenuOpen ? "nav__menu--open" : ""}`}>
          <ul className="nav__list grid">
            <li className="nav__item" style={{ "--i": 1 }}>
              <a href="#home" className="nav__link active-link">
                <CiHome className="uil uil-home nav__icon" />
                Home
              </a>
            </li>
            <li>
              <a href="#about">
                <CiUser className="uil uil-home nav__icon" />
                About
              </a>
            </li>
            <li>
              <a href="#skill">
                <SiHyperskill className="uil uil-skill nav__icon" />
                Skills
              </a>
            </li>
            <li className="ser">
              <a href="#service">
                <MdMedicalServices className="uil uil-ser nav__icon" />
                Services
              </a>
            </li>
            <li>
              <a href="#projects">
                <CiImageOn className="uil uil-scenery nav__icon" />
                Projects
              </a>
            </li>
            <li>
              <a href="#contact">
                <IoIosSend className="uil uil-contact nav__icon" />
                Contact
              </a>
            </li>
          </ul>

          <IoClose className="uil uil-times nav__close" onClick={toggleMenu} />
        </div>

        <div className="nav__toggle" onClick={toggleMenu}>
          <GrAppsRounded />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
