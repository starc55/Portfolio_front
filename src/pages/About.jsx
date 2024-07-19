import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import me from "../imgs/me.jpg";
import { PiMedalFill, PiProjectorScreenChartFill } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";

const About = () => {
  const cvLink = "/CV.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvLink;
    link.download = "CV.pdf";
    link.click(); 
  };

  useEffect(() => {
    ScrollReveal().reveal(".about_img", {
      origin: "left",
      distance: "40px",
      duration: 1300,
      reset: true,
    });
    ScrollReveal().reveal(".about_text", {
      origin: "right",
      distance: "40px",
      duration: 1400,
      reset: true,
    });
    ScrollReveal().reveal(".about_btn", {
      origin: "bottom",
      distance: "40px",
      duration: 1500,
      reset: true,
    });
  }, []);

  return (
    <div id="about" className="about">
      <div>
        <div className="header_about">
          <p>About</p>
          <span className="sub_head">My introduction</span>
        </div>
        <div className="about_content">
          <div className="about_img" data-sr>
            <img src={me} alt="" />
          </div>
          <div className="add_about about_text" data-sr>
            <div className="about_card">
              <div className="card">
                <PiMedalFill className="icon_about" />
                <p>Experience</p>
                <p className="about_s">+ 1 year</p>
              </div>
              <div className="card">
                <PiProjectorScreenChartFill className="icon_about" />
                <p>Completed</p>
                <p className="about_s">10 + projects</p>
              </div>
              <div className="card">
                <BiSupport className="icon_about" />
                <p>Support</p>
                <p className="about_s">Online 24/7</p>
              </div>
            </div>
            <div className="about_sub">
              <p>
                I have a lot of knowledge and skills in the field of frontend
                and I am currently working on several projects.
              </p>
            </div>
            <div className="about_btn" data-sr>
              <button className="Documents-btn" onClick={handleDownload}>
                <span className="folderContainer">
                  <svg
                    className="fileBack"
                    width="146"
                    height="113"
                    viewBox="0 0 146 113"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                      fill="url(#paint0_linear_117_4)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_117_4"
                        x1="0"
                        y1="0"
                        x2="72.93"
                        y2="95.4804"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#8F88C2"></stop>
                        <stop offset="1" stopColor="#5C52A2"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg
                    className="filePage"
                    width="88"
                    height="99"
                    viewBox="0 0 88 99"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="88"
                      height="99"
                      fill="url(#paint0_linear_117_6)"
                    ></rect>
                    <defs>
                      <linearGradient
                        id="paint0_linear_117_6"
                        x1="0"
                        y1="0"
                        x2="81"
                        y2="160.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white"></stop>
                        <stop offset="1" stopColor="#686868"></stop>
                      </linearGradient>
                    </defs>
                  </svg>

                  <svg
                    className="fileFront"
                    width="160"
                    height="79"
                    viewBox="0 0 160 79"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                      fill="url(#paint0_linear_117_5)"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_117_5"
                        x1="38.7619"
                        y1="8.71323"
                        x2="66.9106"
                        y2="82.8317"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#C3BBFF"></stop>
                        <stop offset="1" stopColor="#51469A"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <p className="text">Documents</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
