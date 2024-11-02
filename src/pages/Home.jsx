import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { FaInstagram, FaTelegram, FaGithub } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import "aos/dist/aos.css";
import "./Page.css";

const Home = () => {
  const [showTypewriter, setShowTypewriter] = useState(true); // Effektni faollashtirish

  return (
    <div id="home" className="home">
      <div className="home_f">
        <div className="home_social">
          <a href="https://github.com/starc55">
            <button className="btn">
              <FaGithub className="icon_git" />
            </button>
          </a>
          <a href="https://www.instagram.com/oga_vine25?igsh=b2V1ZWE2NWVzMjNn">
            <button className="btn">
              <FaInstagram className="icon_ins" />
            </button>
          </a>
          <a href="https://t.me/myblogprogramm">
            <button className="btn">
              <FaTelegram className="icon_teg" />
            </button>
          </a>
        </div>

        <div className="home_title">
          <strong className="strong">
            {showTypewriter && (
              <Typewriter
                options={{
                  strings: ["Ogabek Orziyev 🤚"],
                  autoStart: true,
                  loop: true,
                  cursorClassName: "typewriter-cursor",
                  cursor: "", // Kursorni olib tashlash
                }}
              />
            )}
          </strong>
          {/* <br /> */}
          <p className="tit_sub">Web developer</p>
          <br />
          <p className="content">
            I'm a web developer and it's both my interest, hobby, and job. I've
            been in this field for a long time and I'm still doing many projects.
          </p>
          <br />

          <a href="#contact">
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">Say Hello!</span>
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
