import React, { useState } from "react";
import "../styles/Page.css";
import { Data } from "../data/testimonialsData";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "components/ui/SectionTitle";
import { useTranslation } from "react-i18next";

const STAR_STYLE = { fontSize: "18px" };

const ITEMS_PER_PAGE = 7;

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <motion.span
            key={i}
            style={{ ...STAR_STYLE, color: "#c3e41d" }}
            whileHover={{ scale: 1.3, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ★
          </motion.span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <motion.span
            key={i}
            style={{ ...STAR_STYLE, color: "#c3e41d" }}
            whileHover={{ scale: 1.3, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ☆
          </motion.span>
        );
      } else {
        stars.push(
          <motion.span
            key={i}
            style={{ ...STAR_STYLE, color: "#e4e5e9" }}
            whileHover={{ scale: 1.3, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ★
          </motion.span>
        );
      }
    }
    return stars;
  };

  const totalPages = Math.ceil(Data.length / ITEMS_PER_PAGE);
  const paginatedData = Data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <section className="testimonial section" id="testimonials">
      <SectionTitle
        title={t("testimonials_section.title")}
        subtitle={t("testimonials_section.subtitle")}
      />

      <div className="testimonial__grid">
        <AnimatePresence>
          {paginatedData.map(
            ({
              id,
              image,
              titleKey,
              descriptionKey,
              rating,
              positionKey,
              audioUrl,
              videoUrl,
            }) => (
              <motion.div
                key={id}
                className="testimonial__card"
                initial={{ opacity: 0, scale: 0.92, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -40 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.3)",
                  transition: { duration: 0.3 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="testi_title">
                  <motion.img
                    src={image}
                    alt={t(titleKey)}
                    className="testimonial__img"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 180 }}
                  />
                  <div className="testimonial__info">
                    <h3 className="testimonial__name">{t(titleKey)}</h3>
                    <hr className="testimonial__hr" />
                    <h6 className="testimonial__position">{t(positionKey)}</h6>
                  </div>
                </div>

                {videoUrl ? (
                  <motion.video
                    src={videoUrl}
                    controls
                    className="testimonial__media"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  />
                ) : audioUrl ? (
                  <motion.audio
                    src={audioUrl}
                    controls
                    className="testimonial__media"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  />
                ) : (
                  <motion.p
                    className="testimonial__description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    {t(descriptionKey)}
                  </motion.p>
                )}

                <div className="ratingStar">{renderStars(rating)}</div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="testimonial__pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i + 1}
              className={`pagination__button ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
              whileHover={{
                scale: 1.25,
                backgroundColor: "#f0f0f0",
                color: "#1f1f1f",
              }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonials;
