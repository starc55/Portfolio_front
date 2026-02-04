import React from "react";
import { useTranslation } from "react-i18next";
import profileImg from "assets/imgs/me.webp";
import "styles/Home.css";
import Navbar from "components/layout/Navbar";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="portfolio-hero">
      <Navbar />

      <main className="hero-main">
        <div className="name-stack">
          <h1 className="big-name animate">Ogabek</h1>
          <h1 className="big-name animate delay">Orziyev</h1>

          <div className="profile-circle">
            <img
              src={profileImg}
              alt={t("profile_photo_alt")}
              className="profile-photo"
            />
          </div>
        </div>

        <div className="tagline-container">
          <p className="tagline animate delay-2">{t("tagline")}</p>
        </div>

        <div className="scroll-prompt">
          <a href="#about" className="scroll-link">
            <div className="mouse-icon">
              <div className="scroll-dot" />
            </div>
            <span className="scroll-text">{t("scroll_down")}</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
