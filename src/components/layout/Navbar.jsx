import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiChevronDown, FiDownload } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logoWhite from "assets/imgs/logo-white.png";
import "styles/Navbar.css";

const languages = [
  { code: "uz", label: "UZ", full: "O'zbekcha" },
  { code: "ru", label: "RU", full: "Русский" },
  { code: "en", label: "EN", full: "English" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langRef = useRef(null);
  const currentLang = i18n.language?.split("-")[0] || "en";

  const links = [
    { label: t("home"), href: "#top" },
    { label: t("about"), href: "#about" },
    { label: t("projects"), href: "#projects" },
    { label: t("contact"), href: "#contact", accent: true },
  ];

  useEffect(() => {
    let frame;
    const updateNavbar = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIsScrolled(window.scrollY > 42));
    };
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsLangOpen(false);
      }
    };
    const closeLanguage = (event) => {
      if (!langRef.current?.contains(event.target)) setIsLangOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeLanguage);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeLanguage);
    };
  }, []);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 820) setIsMenuOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <div id="top" className="nav-slot">
    <header className={`nav-container ${isScrolled ? "is-scrolled" : ""}`}>
      <Link to="/" className="logo" aria-label={t("home")}>
        <img src={logoWhite} alt="Ogabek Orziyev" className="logo-img" />
      </Link>

      <nav className="desktop-nav" aria-label={t("navigation_toggle")}>
        {links.map((link) => (
          <a key={link.href} href={link.href} className={link.accent ? "nav-link nav-contact" : "nav-link"}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <motion.a
          href="/Resume.pdf"
          download="Ogabek-Orziyev-Resume.pdf"
          className="resume-download"
          aria-label={t("resume.download")}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="resume-download__icon" aria-hidden="true">
            <FiDownload />
          </span>
          <span className="resume-download__copy">
            <small>{t("resume.file_type")}</small>
            <strong>{t("resume.download")}</strong>
          </span>
          <span className="resume-download__shine" aria-hidden="true" />
        </motion.a>

        <div ref={langRef} className="lang-switcher">
          <button type="button" onClick={() => setIsLangOpen((open) => !open)} aria-expanded={isLangOpen} aria-haspopup="listbox" className="lang-button">
            <span>{languages.find((language) => language.code === currentLang)?.label || "EN"}</span>
            <FiChevronDown aria-hidden="true" />
          </button>
          <AnimatePresence>
            {isLangOpen && (
              <motion.ul className="lang-dropdown" role="listbox" initial={{ opacity: 0, scale: 0.96, y: -6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -6 }} transition={{ duration: 0.16 }}>
                {languages.map((language) => (
                  <li key={language.code}>
                    <button type="button" role="option" aria-selected={currentLang === language.code} className={`lang-option ${currentLang === language.code ? "active" : ""}`} onClick={() => { i18n.changeLanguage(language.code); setIsLangOpen(false); }}>
                      <span><small>{language.label}</small>{language.full}</span>
                      {currentLang === language.code && <FiCheck aria-hidden="true" />}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <button type="button" className={`mobile-menu-button ${isMenuOpen ? "open" : ""}`} onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label={t("navigation_toggle")}>
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav id="mobile-navigation" className="mobile-nav" aria-label={t("navigation_toggle")} initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.2 }}>
            {links.map((link, index) => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
                <span>0{index + 1}</span>{link.label}
              </a>
            ))}
            <a
              href="/Resume.pdf"
              download="Ogabek-Orziyev-Resume.pdf"
              className="mobile-resume-download"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mobile-resume-download__icon"><FiDownload aria-hidden="true" /></span>
              <span className="mobile-resume-download__copy">
                <strong>{t("resume.download")}</strong>
                <small>{t("resume.file_type")}</small>
              </span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
    </div>
  );
};

export default Navbar;
