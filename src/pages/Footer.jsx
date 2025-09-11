import React from "react";
import "./footer.css";
import { FaXTwitter } from "react-icons/fa6";
import { GrFacebook } from "react-icons/gr";
import { PiInstagramLogoLight } from "react-icons/pi";

export const Footer = () => {
  return (
    <div id="footer">
      <div className="footer">
        <a className="footer_title" href="#home">
          --Ogabek--
        </a>

        <div className="footer_links">
          <a href="#projects">Projects</a>
          <a href="#achievements">Achievements</a>
          <a href="#about">About me</a>
        </div>

        <div className="footer_social">
          <ul className="wrapper">
            <a href="https://www.facebook.com/profile.php?id=100085257432733&mibextid=ZbWKwL">
              <button className="Btn_footer">
                <div className="sign">
                  <GrFacebook />
                </div>

                <div className="social_tit">Facebook</div>
              </button>
            </a>

            <a href="https://x.com/OrziyevOg?t=nRMafQM50qlie3-pgF4WqQ&s=09">
              <button className="Btn_footer2">
                <div className="sign">
                  <FaXTwitter />
                </div>

                <div className="social_tit">Twitter</div>
              </button>
            </a>

            <a href="https://www.instagram.com/obrano_coding?igsh=ZjdhMTB6Z2R4ems5">
              <button className="Btn_footer3">
                <div className="sign">
                  <PiInstagramLogoLight />
                </div>

                <div className="social_tit">Instagram</div>
              </button>
            </a>
          </ul>
        </div>

        <div className="copy">
          <p>&copy; OBRANO_coding All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
