import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import BubbleMenu from "components/sections/BubbleMenu";
import logo_white from "assets/imgs/logo-white.png";

const languages = [
  { code: "uz", label: "Uz", full: "O‘zbekcha" },
  { code: "ru", label: "Ру", full: "Русский" },
  { code: "en", label: "En", full: "English" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLang = i18n.language ? i18n.language.split("-")[0] : "en";

  const handleHome = () => {
    navigate("/");
  };

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  const items = [
    {
      label: t("home"),
      href: "/",
      ariaLabel: "Home",
      rotation: -6,
      hoverStyles: {
        bgColor: "#c3e41d",
        textColor: "#ffffff",
      },
    },
    {
      label: t("about"),
      href: "#about",
      ariaLabel: "About",
      rotation: 6,
      hoverStyles: {
        bgColor: "#047857",
        textColor: "#ffffff",
      },
    },
    {
      label: t("projects"),
      href: "#projects",
      ariaLabel: "Projects",
      rotation: 6,
      hoverStyles: {
        bgColor: "#b45309",
        textColor: "#ffffff",
      },
    },
    {
      label: t("contact"),
      href: "#contact",
      ariaLabel: "Contact",
      rotation: -6,
      hoverStyles: {
        bgColor: "#991b1b",
        textColor: "#ffffff",
      },
    },
    {
      label: t("codes"),
      href: "/coding",
      ariaLabel: "My Codes & Repositories",
      rotation: -8,
      hoverStyles: {
        bgColor: "#6d28d9",
        textColor: "#ffffff",
      },
    },
  ];

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -12 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -12,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 + 0.1 },
    }),
  };

  return (
    <div>
      <header className="nav-container">
        <BubbleMenu
          logo={<span style={{ fontWeight: 700 }}>RB</span>}
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={false}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />

        <Link onClick={handleHome} className="logo">
          <img src={logo_white} alt="Logo" className="logo-img" />
        </Link>

        <div
          className="lang-switcher"
          style={{
            position: "relative",
            marginLeft: "auto",
            marginRight: "2rem",
            zIndex: 9999,
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLangOpen((prev) => !prev);
            }}
            className="lang-button"
            aria-expanded={isLangOpen}
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {languages.find((l) => l.code === currentLang)?.label || "EN"}
          </button>

          <AnimatePresence>
            {isLangOpen && (
              <motion.ul
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "8px",
                  background: "rgba(20, 20, 20, 0.98)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  minWidth: "140px",
                  padding: "0.5rem 0",
                  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.5)",
                  listStyle: "none",
                  zIndex: 10000,
                  overflow: "hidden",
                }}
              >
                {languages.map((lang, index) => (
                  <motion.li
                    key={lang.code}
                    custom={index}
                    variants={itemVariants}
                    whileHover={{ background: "rgba(255, 255, 255, 0.08)" }}
                    style={{ margin: 0 }}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLangChange(lang.code);
                      }}
                      style={{
                        width: "100%",
                        padding: "0.7rem 1.2rem",
                        background: "none",
                        border: "none",
                        color:
                          currentLang === lang.code ? "#c3e41d" : "#ffffff",
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        transition: "color 0.2s",
                      }}
                    >
                      {lang.full}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
