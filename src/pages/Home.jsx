import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import { FaInstagram, FaTelegram, FaGithub } from "react-icons/fa";
import "aos/dist/aos.css";
import "./Page.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { notification } from "antd";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const [showTypewriter, setShowTypewriter] = useState(true); // Effektni faollashtirish
  const wordsRef = useRef(null);

  useEffect(() => {
    import("https://cdn.lordicon.com/lordicon.js");

    // Animatsiyani boshlash
    gsap.fromTo(
      wordsRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wordsRef.current,
          start: "top 80%", // Sahifada 80% joyga kelganda boshlanadi
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const showNotification = () => {
    const key = `open${Date.now()}`;
    notification.open({
      message: "Soon!",
      description: (
        <>
          This Page is coming soon...
        </>
      ),
      icon: <span>❗</span>,
      key,
      closeIcon: <span style={{ cursor: "pointer" }}>✖</span>,
    });
  };

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
                  strings: ["Ogabek Orziyev"],
                  autoStart: true,
                  loop: true,
                  cursorClassName: "typewriter-cursor",
                  cursor: "", // Kursorni olib tashlash
                }}
              />
            )}
          </strong>
          <p className="tit_sub">Web & Frontend developer</p>
          <br />
          <p className="content">
            I craft engaging, high-performance websites that merge aesthetics
            with seamless functionality. With a deep passion for front-end
            development, I transform ideas into interactive digital experiences
            that captivate users and drive results.
            <br />
            <div className="quote_text">
              <span
                className="lordicon"
                dangerouslySetInnerHTML={{
                  __html: `
                <lord-icon
                  src="https://cdn.lordicon.com/bsdkzyjd.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#848484,secondary:#08a88a"
                  style="width: 40px; height: 40px;">
                </lord-icon>
              `,
                }}
              />
              <div ref={wordsRef} className="animated_words">
                <span className="wave-text">Creative.</span>
                <span className="wave-text">Functional.</span>
                <span className="wave-text">Impactful.</span>
              </div>
            </div>
            <p className="quote">Let’s build something remarkable together!</p>
          </p>
          <div className="home_btn">
            <a href="#contact">
              <button className="contact_btn">
                <div className="text">
                  <span className="text1">Contact</span>
                  <span className="text_1">me</span>
                </div>
                <div className="clone">
                  <span className="text2">Contact</span>
                  <span className="text_2">me</span>
                </div>
                <svg
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </button>
            </a>
            <button className="contact_btn contact_btn_1" onClick={showNotification}>
              <div className="text">
                <span className="text1">Explore</span>
                <span className="text_1">CODES</span>
              </div>
              <div className="clone">
                <span className="text2">Explore</span>
                <span className="text_2">CODES</span>
              </div>
              <svg
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 svg_code"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg> 
            </button>
          </div>
        </div>

        <div className="home_img">
          <div className="img"></div>
        </div>
      </div>

      <div className="container_mouse">
        <a href="#about">
          <span className="mouse-btn">
            <span className="mouse-scroll"></span>
          </span>
        </a>
        <p className="scroll_text">Scroll Down</p>
      </div>
    </div>
  );
};

export default Home;
