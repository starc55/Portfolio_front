import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import SectionTitle from "components/ui/SectionTitle";
import works from "../data/works";
import "../styles/Page.css";
import "../styles/Projects.css";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray(".work_card").forEach((card, index) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.04,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
          onComplete: () => gsap.set(card, { clearProps: "transform" }),
        });
      });
    });
    return () => context.revert();
  }, []);

  return (
    <section className="portfolio" id="projects">
      <div className="portfolio_container">
        <SectionTitle title={t("featured_projects.title")} subtitle={t("featured_projects.subtitle")} />

        <div className="portfolio_masonry">
          {works.map((work, index) => (
            <a
              className="work_card"
              key={work.titleKey}
              href={work.link || work.github || work.demoVideo || work.apkLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t(work.titleKey)} — ${t("projects_open")}`}
            >
              <div className="work_img_wrapper">
                <img src={work.img} alt={t(work.titleKey)} loading="lazy" className="work_img" />
                <div className="work_overlay">
                  <div className="overlay_content">
                    <div className="project-meta">
                      <span className="work_category_badge">{t(`category.${work.category}`)}</span>
                      <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="work_title">{t(work.titleKey)}</h3>
                    <div className="project-tags">
                      {work.tags?.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
