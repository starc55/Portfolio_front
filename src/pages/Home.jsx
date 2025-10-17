import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaTelegram, FaGithub } from "react-icons/fa";
import "./Page.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, Link } from "react-router-dom";
import logo_white from "../imgs/logo_white.svg";
import DarkVeil from "../components/DarkVeil";
import me from "../imgs/me.webp";
import TextType from "../components/TextType";
import ShinyText from "../components/ShinyText";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const wordsRef = useRef(null);
  const navigate = useNavigate();

  // Animate words on scroll
  useEffect(() => {
    // Add lordicon script dynamically (better: move to public/index.html)
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    if (wordsRef.current) {
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="home">
      <div style={{ width: "100%", height: "670px", position: "absolute" }}>
        <DarkVeil />
      </div>

      <Link to="/" className="nav__logo">
        <div className="logo-container">
          <img src={logo_white} alt="logo" />
        </div>
      </Link>

      <div className="home_f">
        {/* Social links */}
        <div className="home_social">
          <a href="https://github.com/starc55" aria-label="GitHub">
            <button className="btn">
              <FaGithub className="icon_git" />
            </button>
          </a>
          <a
            href="https://www.instagram.com/oga_vine25?igsh=b2V1ZWE2NWVzMjNn"
            aria-label="Instagram"
          >
            <button className="btn">
              <FaInstagram className="icon_ins" />
            </button>
          </a>
          <a href="https://t.me/myblogprogramm" aria-label="Telegram">
            <button className="btn">
              <FaTelegram className="icon_teg" />
            </button>
          </a>
        </div>

        {/* Hero text */}
        <div className="home_title">
          <TextType
            className="tit_sub"
            text={["Web Developer", "Frontend Developer", "Web designer"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />

          <div className="content">
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
                    colors="primary:#fff,secondary:#08a88a"
                    style="width: 40px; height: 40px;">
                  </lord-icon>
                `,
                }}
              />
              <div ref={wordsRef} className="animated_words">
                <span className="wave-text">Creative /</span>
                <span className="wave-text">Functional /</span>
                <span className="wave-text">Impactful</span>
              </div>
            </div>

            <ShinyText
              text="Let’s build something remarkable together!"
              disabled={false}
              speed={2}
              className="custom-class quote"
            />

            <button className="available-for-btn">
              <div className="circle_ava">
                <div className="dot_ava"></div>
                <div className="outline_ava"></div>
              </div>
              Available for new project
            </button>
          </div>

          {/* Buttons */}
          <div className="home_btn">
            <a href="#contact">
              <button className="contact_btn">
                <div className="text">
                  <span className="text1">Hire</span>
                  <span className="text_1">me</span>
                </div>
                <div className="clone">
                  <span className="text2">Contact</span>
                  <span className="text_2">me</span>
                </div>
                <svg
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </a>

            <button
              className="contact_btn contact_btn_1"
              onClick={() => navigate("/coding")}
            >
              <div className="text">
                <span className="text1">Explore</span>
                <span className="text_1">CODES</span>
              </div>
              <div className="clone">
                <span className="text2">Explore</span>
                <span className="text_2">CODES</span>
              </div>
              <svg
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 svg_code"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <img src={me} alt="Profile" className="home_img" />
      </div>

      {/* Scroll indicator */}
      <div className="container_mouse">
        <a href="#about">
          <span className="mouse-btn">
            <span className="mouse-scroll"></span>
          </span>
        </a>
        <p className="scroll_text">Scroll Down</p>
      </div>

      {/* <a
        href="https://obrano.store/"
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-shop-btn"
      >
        <FaStore className="shop-icon" />
        <span className="shop-text">OBRANO shop</span>
      </a>   */}
    </div>
  );
};

export default Home;
