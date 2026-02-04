import React, { useEffect } from "react";
import "../styles/Page.css";
import works from "../data/works";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "components/ui/SectionTitle";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const { t } = useTranslation();

  useEffect(() => {
    gsap.utils.toArray(".work_card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const handleCardClick = (e, project) => {
    if (project.link && !e.target.closest("button, a")) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  const renderButtons = (project) => {
    return (
      <div className="overlay_buttons">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project_btn github_btn"
          >
            GitHub
          </a>
        )}
        {project.demoVideo && (
          <a
            href={project.demoVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="project_btn demo_btn"
          >
            Demo Video
          </a>
        )}
        {project.apkLink && (
          <a href={project.apkLink} download className="project_btn apk_btn">
            Download APK
          </a>
        )}
        {project.link &&
          !project.github &&
          !project.apkLink &&
          !project.demoVideo && (
            <button className="project_btn view_btn">
              {t("view_project")} →
            </button>
          )}
      </div>
    );
  };

  return (
    <div className="portfolio" id="projects">
      <div className="portfolio_container">
        <SectionTitle
          title={t("featured_projects.title")}
          subtitle={t("featured_projects.subtitle")}
        />

        <div className="portfolio_masonry">
          {works.map((work) => (
            <div
              className={`work_card ${
                work.link || work.github || work.apkLink ? "clickable" : ""
              }`}
              key={work.titleKey}
              onClick={(e) => handleCardClick(e, work)}
            >
              <div className="work_img_wrapper">
                <img
                  src={work.img}
                  alt={t(work.titleKey)}
                  loading="lazy"
                  className="work_img"
                />

                <div className="work_overlay">
                  <div className="overlay_content">
                    <div className="work_category_badge">
                      {t(`category.${work.category}`)}
                    </div>

                    <h3 className="work_title">{t(work.titleKey)}</h3>

                    {renderButtons(work)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
