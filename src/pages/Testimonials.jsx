import React from "react";
import "./Page.css";
import { Data } from "../data/testimonialsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // To‘liq yulduzlar soni
    const hasHalfStar = rating % 1 !== 0; // Yarim yulduz bormi?
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} style={{ color: "#ffc107", fontSize: "18px" }}>
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} style={{ color: "#ffc107", fontSize: "18px" }}>
            ☆
          </span> // yarimni bildiradigan belgi
        );
      } else {
        stars.push(
          <span key={i} style={{ color: "#e4e5e9", fontSize: "18px" }}>
            ★
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div>
      <div>
        <div className="header_about">
          <p>Testimonials</p>
          <span className="sub_head">My clients saying</span>
        </div>

        <Swiper
          className="testimonial__container"
          loop={true}
          grabCursor={true}
          spaceBetween={20}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 48,
            },
          }}
          modules={[Pagination, Autoplay]}
        >
          {Data.map(({ id, image, title, description, rating, position }) => {
            return (
              <SwiperSlide className="testimonial__card" key={id}>
                <div className="testi_title">
                  <img src={image} alt="" className="testimonial__img" />
                  <div className="testimonial__info">
                    <h3 className="testimonial__name">{title}</h3>
                    <h6 className="testimonial__position">{position}</h6>
                  </div>
                </div>

                <p className="testimonial__description">{description}</p>

                <div className="ratingStar">{renderStars(rating)}</div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
