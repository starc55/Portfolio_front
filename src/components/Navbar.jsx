import React, { useState, useEffect, useRef } from "react";
import "./component.css";
import Dock from "./Dock";
import { FiHome } from "react-icons/fi";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { GrProjects } from "react-icons/gr";
import { IoIosContact } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiCodeSSlashFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // pastga scroll qilyapti → yashir
        setVisible(false);
      } else {
        // tepaga scroll qilyapti → ko‘rsat
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = [
    { icon: <FiHome size={18} />, label: "Home", onClick: () => navigate("/") },
    {
      icon: <HiOutlineDocumentSearch size={18} />,
      label: "About Us",
      onClick: () => scrollToSection("about"),
    },
    {
      icon: <GrProjects size={18} />,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
    },
    {
      icon: <IoIosContact size={18} />,
      label: "Contact Us",
      onClick: () => scrollToSection("contact"),
    },
    {
      icon: <RiCodeSSlashFill size={18} />,
      label: "Explore Codes",
      onClick: () => navigate("/coding"),
    },
  ];

  return (
    <div className={`header ${visible ? "show" : "hide"}`}>
      <div className="nav-container">
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </div>
  );
};

export default Navbar;
