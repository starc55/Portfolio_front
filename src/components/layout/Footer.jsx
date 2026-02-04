import React from "react";
import "../../styles/footer.css";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaLinkedinIn,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      href: "https://www.facebook.com/share/155Cme1Kye/",
      label: t("footer.social.facebook"),
      icon: <FaFacebookF />,
    },
    {
      href: "https://x.com/obrano_store",
      label: t("footer.social.twitter"),
      icon: <FaXTwitter />,
    },
    {
      href: "https://www.instagram.com/obrano_coding?igsh=ZjdhMTB6Z2R4ems5",
      label: t("footer.social.instagram"),
      icon: <FaInstagram />,
    },
    {
      href: "https://t.me/obrano_coding",
      label: t("footer.social.telegram"),
      icon: <FaTelegramPlane />,
    },
    {
      href: "https://www.linkedin.com/in/og-abek-orziyev-b2a84729b/",
      label: t("footer.social.linkedin"),
      icon: <FaLinkedinIn />,
    },
    {
      href: "https://github.com/starc55",
      label: t("footer.social.github"),
      icon: <FaGithub />,
    },
  ];

  const navLinks = [
    { href: "#projects", label: t("footer.links.projects") },
    { href: "#achievements", label: t("footer.links.achievements") },
    { href: "#about", label: t("footer.links.about") },
    { href: "#contact", label: t("footer.links.contact") },
  ];

  const socialVariants = {
    hover: {
      scale: 1.15,
      rotate: 8,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.92 },
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-section brand-section">
          <a href="#home" className="footer-logo">
            OBRANO<span className="accent">_coding</span>
          </a>
          <p className="footer-tagline">{t("footer.tagline")}</p>
        </div>

        <div className="footer-section links-section">
          <h4 className="footer-heading">{t("footer.quickLinks")}</h4>
          <div className="footer-grid">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="footer-link">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section social-section">
          <h4 className="footer-heading">{t("footer.connect")}</h4>
          <div className="social-grid">
            {socialLinks.map(({ href, label, icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item"
                aria-label={label}
                variants={socialVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="bottom-content">
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label={t("footer.backToTop")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp /> {t("footer.top")}
          </motion.button>

          <p className="copyright">
            © {new Date().getFullYear()} OBRANO_coding. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
