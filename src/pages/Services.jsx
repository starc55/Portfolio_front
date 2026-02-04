import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionTitle from "components/ui/SectionTitle";
import CurvedLoop from "../components/sections/CurvedLoop";

import comp from "assets/icon/comp.png";
import comp2 from "assets/icon/comp2.png";
import comp3 from "assets/icon/comp3.png";
import comp4 from "assets/icon/comp4.png";
import computer from "assets/icon/computer.png";
import front from "assets/icon/front.png";
import site from "assets/icon/site.png";
import web from "assets/icon/web.png";

const services = [
  { image: comp, key: "frontend_development" },
  { image: comp2, key: "react_development" },
  { image: comp3, key: "ui_ux_implementation" },
  { image: comp4, key: "responsive_design" },
  { image: computer, key: "performance_optimization" },
  { image: front, key: "api_integration" },
  { image: site, key: "website_maintenance" },
  { image: web, key: "technical_consulting" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Services() {
  const { t } = useTranslation();

  return (
    <div id="service">
      <div className="services_header">
        <SectionTitle
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />
      </div>

      <motion.div
        className="services-hero-grid-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="services-icon-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-icon-item"
              variants={itemVariants}
            >
              <div className="image-wrapper">
                <img
                  src={service.image}
                  alt={t(`services.items.${service.key}.alt`)}
                  className="service-image"
                  loading="lazy"
                />
              </div>
              <span className="service-label">
                {t(`services.items.${service.key}.title`)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <CurvedLoop
        marqueeText={t("services.marquee")}
        speed={3}
        curveAmount={500}
        direction="right"
        interactive={true}
        className="custom-text-style"
      />
    </div>
  );
}
