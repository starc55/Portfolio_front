import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "styles/FloatingCodingButton.css";
import myLogo from "assets/imgs/logo-white.png";

const FloatingCodingButton = () => {
  const navigate = useNavigate();

  const variants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.15,
      rotate: 10,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    tap: {
      scale: 0.9,
      rotate: -8,
      transition: { duration: 0.2 },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.45, 1],
      opacity: [0.35, 0.75, 0.35],
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="floating-coding-btn-wrapper"
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 1, type: "spring" }}
    >
      <motion.div
        className="glow-ring"
        variants={glowVariants}
        animate="animate"
      />

      <motion.button
        className="floating-coding-btn"
        variants={variants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => navigate("/coding")}
      >
        <div className="btn-content">
          <img
            src={myLogo}
            alt="Logo"
            className="code-icon"
            style={{ width: 20, height: 20 }}
          />
          <span className="text">Codes</span>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default FloatingCodingButton;
