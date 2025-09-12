import React from "react";
import "./footer.css";
import { FaXTwitter } from "react-icons/fa6";
import { GrFacebook } from "react-icons/gr";
import { PiInstagramLogoLight } from "react-icons/pi";

export const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=100085257432733&mibextid=ZbWKwL",
      label: "Facebook",
      icon: <GrFacebook />,
      className: "Btn_footer",
    },
    {
      href: "https://x.com/OrziyevOg?t=nRMafQM50qlie3-pgF4WqQ&s=09",
      label: "Twitter",
      icon: <FaXTwitter />,
      className: "Btn_footer2",
    },
    {
      href: "https://www.instagram.com/obrano_coding?igsh=ZjdhMTB6Z2R4ems5",
      label: "Instagram",
      icon: <PiInstagramLogoLight />,
      className: "Btn_footer3",
    },
  ];

  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#achievements", label: "Achievements" },
    { href: "#about", label: "About me" },
  ];

  return (
    <footer id="footer" className="footer">
      <a className="footer_title" href="#home">
        --Ogabek--
      </a>

      <nav className="footer_links">
        {navLinks.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="footer_social">
        <ul className="wrapper">
          {socialLinks.map(({ href, label, icon, className }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <button className={className}>
                  <div className="sign">{icon}</div>
                  <div className="social_tit">{label}</div>
                </button>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="copy">
        <p>
          &copy; {new Date().getFullYear()} OBRANO_coding. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
