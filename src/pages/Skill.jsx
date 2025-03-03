import React from "react";
import "./Page.css";
import { FaCode } from "react-icons/fa6";
import { SiGoogledisplayandvideo360 } from "react-icons/si";
import { MdOutlineVerified } from "react-icons/md";

export const Skill = () => {
  return (
    <div id="skill" className="skill_page">
      <div>
        <div className="header_about">
          <p className="head_icon_">
            Skill 
          </p>
          <span className="sub_head">My technical level</span>
        </div>
        <div className="card_text">
          <div className="cards_skill anima1">
            <article className="card2">
              <div className="temporary_text">
                <FaCode />
              </div>
              <p className="click">Click</p>
              <div className="card_content">
                <span className="card_title">Frontend</span>
                <span className="card_subtitle">My frontend skill</span>
                <p className="card_description">
                  <div className="skill1">
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      HTML
                    </span>
                    <p className="card_text_sub">Basic</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      JS
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      React
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      Wordpress
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                  </div>
                  <div className="skill2">
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      CSS
                    </span>
                    <p className="card_text_sub">Advanced</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      Bulma
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      Angular
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      Other libraries
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                  </div>
                </p>
              </div>
            </article>
          </div>
          <div className="cards_skill anima2">
            <article className="card2">
              <div className="temporary_text">
                <SiGoogledisplayandvideo360 />
              </div>
              <p className="click">Click</p>
              <div className="card_content">
                <span className="card_title">Video Editing</span>
                <span className="card_subtitle">My video editor skills</span>
                <p className="card_description">
                  <div className="skill1">
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      CapCut
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      Piscart
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      Adobe Premier
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      Canva
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                  </div>
                  <div className="skill1">
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      Presentation
                    </span>
                    <p className="card_text_sub">Advanced</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      VN
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                    <span>
                      <MdOutlineVerified className="card_icon" />
                      Other video editors
                    </span>
                    <p className="card_text_sub">Intermediate</p>
                  </div>
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};
