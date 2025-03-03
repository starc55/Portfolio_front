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
          <a href="#qualification">Qualifications</a>
        </div>

        <div className="footer_social">
          <ul className="wrapper">
            <a href="https://www.facebook.com/profile.php?id=100085257432733&mibextid=ZbWKwL">
              <button class="Btn_footer">
                <div class="sign">
                  <GrFacebook />
                </div>

                <div class="social_tit">Facebook</div>
              </button>
            </a>

            <a href="https://x.com/OrziyevOg?t=nRMafQM50qlie3-pgF4WqQ&s=09">
              <button class="Btn_footer2">
                <div class="sign">
                  <FaXTwitter />
                </div>

                <div class="social_tit">Twitter</div>
              </button>
            </a>

            <a href="https://www.instagram.com/oga_vine25?igsh=b2V1ZWE2NWVzMjNn">
              <button class="Btn_footer3">
                <div class="sign">
                  <PiInstagramLogoLight />
                </div>

                <div class="social_tit">Instagram</div>
              </button>
            </a>
          </ul>
        </div>

        <div className="copy">
          <p>&copy; Ogabek_dev All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
