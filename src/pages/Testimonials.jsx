import React from "react";
import "./Page.css";
import { Data } from "../data/testimonialsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ScrollReveal from "scrollreveal";
import { useEffect } from "react";

const Testimonials = () => {

  useEffect(() => {
    ScrollReveal().reveal(".testimonial__container", {
      origin: "bottom",
      distance: "40px",
      duration: 1500,
      reset: true,
    });
  }, []);
  return (
    <div>
      <div>
        <div className="header_about">
          <p>Testimonials</p>
          <span className="sub_head">My clieants saying</span>
        </div>

        <Swiper
          className="testimonial__container"
          loop={true}
          grabCursor={true}
          spaceBetween={20}
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
          modules={[Pagination]}
        >
          {Data.map(({ id, image, title, description }) => {
            return (
              <SwiperSlide className="testimonial__card" key={id}>
                <img src={image} alt="" className="testimonial__img" />

                <h3 className="testimonial__name">{title}</h3>
                <p className="testimonial__description">{description}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
