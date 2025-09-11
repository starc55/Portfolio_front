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
  { node: <FaReact />, title: "React" },
  { node: <PiFigmaLogoFill />, title: "Figma" },
  {
    node: <BiLogoTypescript />,
    title: "TypeScript",
  },
  {
    node: <MdCss />,
    title: "CSS3",
  },
  {
    node: <FaJsSquare />,
    title: "JS",
  },
  {
    node: <SiCanva />,
    title: "Canva",
  },
  {
    node: (
      <img
        src={logoWhite}
        alt="Logo"
        style={{ width: "48px", height: "48px" }}
      />
    ),
    title: "OBRANO Coding",
  },
];

const About = () => {
  return (
    <div id="about" className="about">
      <div>
        <div
          style={{ height: "300px", position: "relative", overflow: "hidden" }}
        >
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
          <span className="sub_head">My introduction </span>
        </div>
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>
    </div>
  );
};

export default About;
