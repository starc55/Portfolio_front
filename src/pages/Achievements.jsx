import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import "styles/Page.css";
import SectionTitle from "components/ui/SectionTitle";
import { useTranslation } from "react-i18next";

const items = [
  {
    textKey: "achievements.react_state_events",
    image: require("assets/imgs/1.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/DC43U48J?sharingId=F3BA35B3751C3983",
  },
  {
    textKey: "achievements.react_data_properties",
    image: require("assets/imgs/2.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/YQN4P9PR?sharingId=F3BA35B3751C3983",
  },
  {
    textKey: "achievements.get_started_react",
    image: require("assets/imgs/3.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/J9KH3Y8T?sharingId=F3BA35B3751C3983",
  },
  {
    textKey: "achievements.web_accessibility_basics",
    image: require("assets/imgs/4.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/B6PUGKCD?sharingId=F3BA35B3751C3983",
  },
  {
    textKey: "achievements.vs_code_web_dev",
    image: require("assets/imgs/5.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/4LQC57HK?sharingId=F3BA35B3751C3983",
  },
  {
    textKey: "achievements.first_react_apps",
    image: require("assets/imgs/6.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/2BATJALV?sharingId=F3BA35B3751C3983",
  },
  {
    textKey: "achievements.monday_academy",
    image: require("assets/imgs/achieve.webp"),
    link: "",
  },
  {
    textKey: "achievements.ms365_copilot_intro",
    image: require("assets/imgs/7.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/CFLEGBH9?sharingId=F3BA35B3751C3983",
  },
];

const pageSize = 4;

export default function HoverImageEffect() {
  const { t } = useTranslation();
  const imageRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsRef = useRef([]);

  const totalPages = Math.ceil(items.length / pageSize);
  const paginatedItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    gsap.set(imageRef.current, { autoAlpha: 0, scale: 0.8 });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const line = entry.target.querySelector(".line");
            if (line) {
              gsap.to(line, {
                scaleX: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.2,
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  const handleMouseEnter = useCallback((image) => {
    gsap.to(imageRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    imageRef.current.src = image;
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(imageRef.current, {
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    const { offsetWidth, offsetHeight } = imageRef.current;
    gsap.to(imageRef.current, {
      x: e.clientX - offsetWidth / 2,
      y: e.clientY - offsetHeight / 2 - 200,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  const handleClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="achievement-container" id="achievements">
      <SectionTitle
        title={t("achievements_section.title")}
        subtitle={t("achievements_section.subtitle")}
      />

      {paginatedItems.map((item, index) => (
        <div
          key={`${currentPage}-${index}`}
          className="hover-item"
          ref={(el) => (itemsRef.current[index] = el)}
          onMouseEnter={() => handleMouseEnter(item.image)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={() => handleClick(item.link)}
        >
          {t(item.textKey)}
          <span className="line"></span>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="testimonial__pagination">
          {Array.from({ length: totalPages }, (_, i) => {
            const pageNum = i + 1;
            return (
              <motion.button
                key={pageNum}
                className={`pagination__button ${
                  currentPage === pageNum ? "active" : ""
                }`}
                onClick={() => setCurrentPage(pageNum)}
                whileHover={{ scale: 1.22 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {pageNum}
              </motion.button>
            );
          })}
        </div>
      )}

      <img
        ref={imageRef}
        className="hover-image"
        alt={t("achievements.hover_preview")}
      />
    </div>
  );
}
