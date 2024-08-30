import React, { useEffect } from "react";
import { FaInstagram, FaTelegram, FaGithub } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import "aos/dist/aos.css";
import "./Page.css";
import ScrollReveal from "scrollreveal";

const Home = () => {
  useEffect(() => {
    ScrollReveal().reveal(".home_social", {
      origin: "left",
      distance: "40px",
      duration: 1500,
      reset: true,
    });
    ScrollReveal().reveal(".home_title", {
      origin: "top",
      distance: "40px",
      duration: 1500,
      reset: true,
    });
    ScrollReveal().reveal(".home_img", {
      origin: "right",
      distance: "40px",
      duration: 1600,
      reset: true,
    });
    ScrollReveal().reveal(".scroll-d", {
      origin: "bottom",
      distance: "40px",
      duration: 1700,
      reset: true,
    });
  }, []);
  return (
    <div id="home" className="home">
      <div className="home_f">
        <div className="home_social">
          <button className="btn">
            <a href="https://github.com/starc55">
              <FaGithub className="icon_git" />
            </a>
          </button>
          <button className="btn">
            <a href="https://www.instagram.com/oga_vine25?igsh=b2V1ZWE2NWVzMjNn">
              <FaInstagram className="icon_ins" />
            </a>
          </button>
          <button className="btn">
            <a href="https://t.me/myblogprogramm">
              <FaTelegram className="icon_teg" />
            </a>
          </button>
        </div>

        <div className="home_title">
          <strong className="strong">Ogabek Orziyev 🤚</strong>
          <br />
          <p className="tit_sub">Web developer</p>
          <br />
          <p className="content">
            I'm a web developer and it's both my interest and my hobby and my
            job. I've been in this field for a long time and I'm still doing
            many projects.
          </p>
          <br />

          <a href="#contact">
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Say Hello !</span>
            </button>
          </a>
        </div>

        <div className="home_img">
          <div className="img"></div>
        </div>
      </div>

      <div className="scroll-d">
        <button className="mouse">
          <div className="scroll"></div>
        </button>
        <span>
          Scroll down
          <FaArrowDown className="sc" />
        </span>
      </div>
    </div>
  );
};

export default Home;
