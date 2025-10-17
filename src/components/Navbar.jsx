import React, { useState, useEffect, useRef, useCallback } from "react";
import "./component.css";
import { FiHome } from "react-icons/fi";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { GrProjects } from "react-icons/gr";
import { IoIosContact } from "react-icons/io";
import { RiCodeSSlashFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setVisible(currentScrollY <= lastScrollY.current);
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const items = [
    { icon: <FiHome size={22} />, label: "Home", onClick: () => navigate("/") },
    {
      icon: <HiOutlineDocumentSearch size={22} />,
      label: "About",
      onClick: () => scrollToSection("about"),
    },
    {
      icon: <GrProjects size={22} />,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
    },
    {
      icon: <IoIosContact size={22} />,
      label: "Contact",
      onClick: () => scrollToSection("contact"),
    },
    {
      icon: <RiCodeSSlashFill size={22} />,
      label: "Codes",
      onClick: () => navigate("/coding"),
    },
  ];

  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className={`navbar ${visible ? "show" : "hide"}`}>
        <div className="liquidGlass-wrapper dock">
          <div className="liquidGlass-effect"></div>
          <div className="liquidGlass-tint"></div>
          <div className="liquidGlass-shine"></div>
          <div className="liquidGlass-text">
            <div className="dock">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="dock-item"
                  onClick={item.onClick}
                  title={item.label}
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
