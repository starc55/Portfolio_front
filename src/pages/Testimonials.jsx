import React from "react";
import "./Page.css";
import { Data } from "../data/testimonialsData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => { 
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
          {Data.map(({ id, image, title, description }) => {
            return (
              <SwiperSlide className="testimonial__card" key={id}>
                <div className="testi_title">
                  <img src={image} alt="" className="testimonial__img" />
                  <h3 className="testimonial__name">{title}</h3>
                </div>

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
