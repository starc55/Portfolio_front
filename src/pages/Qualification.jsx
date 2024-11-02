import React, { useState } from "react";
import "./Page.css";
import { MdCastForEducation } from "react-icons/md";
import { CgWorkAlt } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";

const Qualification = () => {
  const [toggleState, SetToggleState] = useState(1);

  const toggleTab = (index) => {
    SetToggleState(index);
  };

  return (
    <div>
      <section className="qualification section">
        <div className="header_about">
          <p>Qualification</p>
          <span className="sub_head">My personal journey</span>
        </div>
        <div className="qualification__container container">
          <div className="qualification__tabs">
            <div
              className={
                toggleState === 1
                  ? "qualification__button qualification__active button--flex"
                  : "qualification__button button--flex"
              }
              onClick={() => toggleTab(1)}
            >
              <MdCastForEducation className="qualification__icon" />
              Education
            </div>

            <div
              className={
                toggleState === 2
                  ? "qualification__button qualification__active button--flex"
                  : "qualification__button button--flex"
              }
              onClick={() => toggleTab(2)}
            >
              <CgWorkAlt className="qualification__icon" />
              Experience
            </div>
          </div>
          <div className="qualification__sections">
            <div
              className={
                toggleState === 1
                  ? "qualification__content qualification__content-active"
                  : "qualification__content"
              }
            >
              <div className="qualification__data">
                <div>
                  <h3 className="qualification__title">Web developer</h3>
                  <span className="qualification__subtitle">
                    Monday Academy
                  </span>
                  <div className="qualification__calendar">
                    <FaRegCalendarAlt /> 2023 - Present
                  </div>
                </div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>

              <div className="qualification__data">
                <div></div>

                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
                <div>
                  <h3 className="qualification__title">Video editing</h3>
                  <span className="qualification__subtitle">
                    YouTube channels
                  </span>
                  <div className="qualification__calendar">
                    <FaRegCalendarAlt /> 2020 - Present
                  </div>
                </div>
              </div>

              <div className="qualification__data">
                <div>
                  <h3 className="qualification__title">Computer works</h3>
                  <span className="qualification__subtitle">Free</span>
                  <div className="qualification__calendar">
                    <FaRegCalendarAlt /> 2022 - Present
                  </div>
                </div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>
            </div>

            <div
              className={
                toggleState === 2
                  ? "qualification__content qualification__content-active"
                  : "qualification__content"
              }
            >
              <div className="qualification__data">
                <div>
                  <h3 className="qualification__title">React</h3>
                  <span className="qualification__subtitle">
                    Monday academy
                  </span>
                  <div className="qualification__calendar">
                    <FaRegCalendarAlt /> 2022 - Present
                  </div>
                </div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>

              <div className="qualification__data">
                <div></div>

                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
                <div>
                  <h3 className="qualification__title">Video editing</h3>
                  <span className="qualification__subtitle">Freelancer</span>
                  <div className="qualification__calendar">
                    <FaRegCalendarAlt /> 2020 - Present
                  </div>
                </div>
              </div>

              <div className="qualification__data">
                <div>
                  <h3 className="qualification__title">Presentation</h3>
                  <span className="qualification__subtitle">Freelancer</span>
                  <div className="qualification__calendar">
                    <FaRegCalendarAlt /> 2022 - Present
                  </div>
                </div>
                <div>
                  <span className="qualification__rounder"></span>
                  <span className="qualification__line"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Qualification;
