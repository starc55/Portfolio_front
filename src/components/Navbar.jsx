import React, { useState, useEffect } from "react";
import { CiHome, CiUser } from "react-icons/ci";
import { SiHyperskill } from "react-icons/si";
import { MdMedicalServices } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import "./component.css";
import logo from "../imgs/logo.svg";
import logo_white from "../imgs/logo_white.svg";
import { IoPersonOutline } from "react-icons/io5";
import { GiSupersonicArrow } from "react-icons/gi";
import { GrProjects } from "react-icons/gr";
import { SiGoogleforms } from "react-icons/si";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scroll pastga — yashirish
        setShowMobileNavbar(false);
      } else {
        // Scroll tepaga — ko'rsatish
        setShowMobileNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  useEffect(() => {
    // Set initial theme from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="header">
      <div className="nav container">
        <a href="#home" className="nav__logo">
          <div className="logo-container">
            <img src={isDarkMode ? logo_white : logo} alt="logo" />
            {/* <img src={logoHat} alt="hat" className="logo-hat" /> */}
          </div>
        </a>

        <div className="nav__menu">
          <ul className="nav__list grid">
            <li className="nav__item" style={{ "--i": 1 }}>
              <a href="#home" className="nav__link active-link navbar-text">
                <CiHome className="uil uil-home nav__icon" />
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="navbar-text">
                <CiUser className="uil uil-home nav__icon" />
                About
              </a>
            </li>
            <li>
              <a href="#skill" className="navbar-text">
                <SiHyperskill className="uil uil-skill nav__icon" />
                Skills
              </a>
            </li>
            <li className="ser">
              <a href="#service" className="navbar-text">
                <MdMedicalServices className="uil uil-ser nav__icon" />
                Services
              </a>
            </li>
            <li>
              <a href="#projects" className="navbar-text">
                <CiImageOn className="uil uil-scenery nav__icon" />
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="navbar-text">
                <IoIosSend className="uil uil-contact nav__icon" />
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div
          className={`button-container2 mobile-navbar ${
            showMobileNavbar ? "show" : "hide"
          }`}
        >
          <button
            className="button2"
            data-tooltip="About me"
            onClick={() => scrollToSection("about")}
          >
            <IoPersonOutline className="mobile_nav-icon" />
          </button>
          <button
            className="button2"
            data-tooltip="My skills"
            onClick={() => scrollToSection("skill")}
          >
            <GiSupersonicArrow className="mobile_nav-icon" />
          </button>
          <button
            className="button2"
            data-tooltip="My projects"
            onClick={() => scrollToSection("projects")}
          >
            <GrProjects className="mobile_nav-icon" />
          </button>
          <button
            className="button2"
            data-tooltip="Contact me"
            onClick={() => scrollToSection("contact")}
          >
            <SiGoogleforms className="mobile_nav-icon" />
          </button>
        </div>

        {/* Dark Mode Toggle Button */}
        <label
          htmlFor="themeToggle"
          className="dark-mode-toggle st-sunMoonThemeToggleBtn"
        >
          <input
            type="checkbox"
            id="themeToggle"
            className="themeToggleInput"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="none"
          >
            <mask id="moon-mask">
              <rect x="0" y="0" width="20" height="20" fill="white"></rect>
              <circle cx="11" cy="3" r="8" fill="black"></circle>
            </mask>
            <circle
              className="sunMoon"
              cx="10"
              cy="10"
              r="8"
              mask="url(#moon-mask)"
            ></circle>
            <g>
              <circle
                className="sunRay sunRay1"
                cx="18"
                cy="10"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay2"
                cx="14"
                cy="16.928"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay3"
                cx="6"
                cy="16.928"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay4"
                cx="2"
                cy="10"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay5"
                cx="6"
                cy="3.1718"
                r="1.5"
              ></circle>
              <circle
                className="sunRay sunRay6"
                cx="14"
                cy="3.1718"
                r="1.5"
              ></circle>
            </g>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
