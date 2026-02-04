import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "styles/Page.css";
import MagicBento from "components/sections/MagicBento";
import SectionTitle from "components/ui/SectionTitle";

const magicBentoProps = {
  textAutoHide: true,
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableTilt: true,
  enableMagnetism: true,
  clickEffect: true,
  spotlightRadius: 300,
  particleCount: 12,
  glowColor: "195, 228, 29",
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const bentoVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut",
      type: "spring",
      stiffness: 85,
      damping: 17,
    },
  },
};

export default function About() {
  const { t } = useTranslation();

  return (
    <motion.div
      id="about"
      className="about"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <SectionTitle
        title={
          <motion.span variants={titleVariants}>{t("aboutPage.title")}</motion.span>
        }
        subtitle={
          <motion.span variants={subtitleVariants}>
            {t("aboutPage.subtitle")}
          </motion.span>
        }
      />

      <motion.div variants={bentoVariants}>
        <MagicBento {...magicBentoProps} />
      </motion.div>
    </motion.div>
  );
}
