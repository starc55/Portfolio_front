import React from "react";
import "./Page.css";
import { Data } from "../data/testimonialsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const STAR_STYLE = { fontSize: "18px" };

const Testimonials = () => {
  // ⭐ Star rendering helper
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} style={{ ...STAR_STYLE, color: "#ffc107" }}>
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} style={{ ...STAR_STYLE, color: "#ffc107" }}>
            ☆
          </span>
        );
      } else {
        stars.push(
          <span key={i} style={{ ...STAR_STYLE, color: "#e4e5e9" }}>
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <section className="testimonial section" id="testimonials">
      <header className="testimonial_header">
        <p>Testimonials</p>
        <span className="testimonial_sub">My clients saying</span>
      </header>

      <Swiper
        className="testimonial__container"
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
            rotate: [0, 0, -15],
          },
          next: {
            translate: ["120%", 0, -500],
            rotate: [0, 0, 15],
          },
        }}
        loop
        grabCursor
        speed={1000}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, EffectCreative]}
      >
        {Data.map(({ id, image, title, description, rating, position }) => (
          <SwiperSlide className="testimonial__card" key={id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="testi_title">
                <motion.img
                  src={image}
                  alt={title}
                  className="testimonial__img"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <div className="testimonial__info">
                  <h3 className="testimonial__name">{title}</h3>
                  <hr />
                  <h6 className="testimonial__position">{position}</h6>
                </div>
              </div>

              <motion.p
                className="testimonial__description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {description}
              </motion.p>

              <div className="ratingStar">{renderStars(rating)}</div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
