import React from "react";
import "./Page.css";
import LogoLoop from "../components/LogoLoop";
import { PiFigmaLogoFill } from "react-icons/pi";
import { FaReact } from "react-icons/fa6";
import { BiLogoTypescript } from "react-icons/bi";
import { FaJsSquare } from "react-icons/fa";
import { MdCss } from "react-icons/md";
import { SiCanva } from "react-icons/si";
import logoWhite from "../imgs/logo_white.svg";
import MagicBento from "../components/MagicBento";

const techLogos = [
  { node: <FaReact aria-label="React" />, title: "React" },
  { node: <PiFigmaLogoFill aria-label="Figma" />, title: "Figma" },
  { node: <BiLogoTypescript aria-label="TypeScript" />, title: "TypeScript" },
  { node: <MdCss aria-label="CSS3" />, title: "CSS3" },
  { node: <FaJsSquare aria-label="JavaScript" />, title: "JS" },
  { node: <SiCanva aria-label="Canva" />, title: "Canva" },
  {
    node: <img src={logoWhite} alt="OBRANO Coding Logo" className="logo-img" />,
    title: "OBRANO Coding",
  },
];
const magicBentoProps = {
  textAutoHide: true,
  enableStars: true,
  enableSpotlight: true,
  enableBorderGlow: true,
  enableTilt: true,
  enableMagnetism: true,
  clickEffect: true,
  spotlightRadius: 300,
  particleCount: 12,
  glowColor: "132, 0, 255",
};

const About = () => {
  return (
    <div id="about" className="about">
      <div>
        <div className="logo-loop-container">
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={70}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="black"
            ariaLabel="Technology partners"
          />
        </div>

        <div className="header_about">
          <p className="head_icon_">About</p>
          <span className="sub_head">My introduction</span>
        </div>

        <MagicBento {...magicBentoProps} />
      </div>
    </div>
  );
};

export default About;
