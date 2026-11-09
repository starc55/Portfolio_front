import React from "react";
import { motion } from "framer-motion";
import { FiCode } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "styles/FloatingCodingButton.css";

const FloatingCodingButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div className="floating-code-wrap" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, type: "spring" }}>
      <span className="floating-code-pulse" aria-hidden="true" />
      <motion.button type="button" className="floating-code-button" onClick={() => navigate("/coding")} whileHover={{ y: -3 }} whileTap={{ scale: 0.94 }} aria-label={t("codes")}>
        <FiCode aria-hidden="true" />
        <span>{t("codes")}</span>
      </motion.button>
    </motion.div>
  );
};

export default FloatingCodingButton;
