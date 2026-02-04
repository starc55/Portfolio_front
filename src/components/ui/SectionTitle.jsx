import React from "react";
import { motion } from "framer-motion";
import "styles/ui/section.css";

const titleVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div>
      <div className="title-container">
        <motion.h2
          className="section-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="subtitle"
          variants={subtitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default SectionTitle;
