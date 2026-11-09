import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionTitle from "components/ui/SectionTitle";
import { Data } from "../data/testimonialsData";
import "../styles/Page.css";
import "../styles/Testimonials.css";

const ITEMS_PER_PAGE = 6;

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Data.length / ITEMS_PER_PAGE);
  const paginatedData = Data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section className="testimonial section" id="testimonials">
      <SectionTitle title={t("testimonials_section.title")} subtitle={t("testimonials_section.subtitle")} />

      <motion.div className="testimonial__grid" layout>
        <AnimatePresence mode="popLayout">
          {paginatedData.map(({ id, image, titleKey, descriptionKey, rating, positionKey, audioUrl, videoUrl }) => (
            <motion.article
              key={id}
              className="testimonial__card"
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.36 }}
            >
              <span className="testimonial__quote" aria-hidden="true">“</span>
              <div className="testi_title">
                <img src={image} alt="" className="testimonial__img" loading="lazy" />
                <div className="testimonial__info">
                  <h3 className="testimonial__name">{t(titleKey)}</h3>
                  <p className="testimonial__position">{t(positionKey)}</p>
                </div>
                <div className="ratingStar" aria-label={`${rating} / 5`}>
                  <span aria-hidden="true">★</span> {rating}
                </div>
              </div>

              {videoUrl ? (
                <video src={videoUrl} controls className="testimonial__media" />
              ) : audioUrl ? (
                <audio src={audioUrl} controls className="testimonial__media" />
              ) : (
                <p className="testimonial__description">{t(descriptionKey)}</p>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <nav className="testimonial__pagination" aria-label={t("testimonials_pages")}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              type="button"
              key={index + 1}
              className={`pagination__button ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
              aria-current={currentPage === index + 1 ? "page" : undefined}
              aria-label={`${t("page_label")} ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      )}
    </section>
  );
};

export default Testimonials;
