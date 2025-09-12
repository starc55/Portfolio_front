import React, { useState, useEffect, useRef, useCallback } from "react";
import "./component.css";
import Dock from "./Dock";
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

  // scroll logikasi
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current) {
      // pastga → yashir
      setVisible(false);
    } else {
      // tepaga → ko‘rsat
      setVisible(true);
    }

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

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
