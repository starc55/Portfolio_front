import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Pagination } from "antd";
import "./Page.css";
import "antd/dist/reset.css";

const items = [
  {
    text: "React state and events",
    image: require("../imgs/1.png"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/DC43U48J?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Working with data and properties in React components",
    image: require("../imgs/2.png"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/YQN4P9PR?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Get started with React",
    image: require("../imgs/3.png"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/J9KH3Y8T?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Learn the basics of web accessibility",
    image: require("../imgs/4.png"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/B6PUGKCD?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Get started with web development using Visual Studio Code",
    image: require("../imgs/5.png"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/4LQC57HK?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Creating your first web apps with React",
    image: require("../imgs/6.png"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/2BATJALV?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Monday Academy Certificate",
    image: require("../imgs/achieve1.jpg"),
    link: "#",
  },
];
const pageSize = 4;

export default function HoverImageEffect() {
  const imageRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    gsap.set(imageRef.current, { autoAlpha: 0, scale: 0.8 });
  }, []);

  const handleMouseEnter = (image) => {
    gsap.to(imageRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    imageRef.current.src = image;
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    gsap.to(imageRef.current, {
      x: e.clientX - 100,
      y: e.clientY - 600,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="hover-container" id="achievements">
      <div className="header_about">
        <p className="header_about">Achievements</p>
        <span className="sub_head">My achievements</span>
      </div>
      {paginatedItems.map((item, index) => (
        <div
          key={index}
          className="hover-item"
          onMouseEnter={() => handleMouseEnter(item.image)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={() => handleClick(item.link)}
        >
          {item.text}
        </div>
      ))}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={items.length}
        onChange={handlePageChange}
        className="project_pagination achievements_pagination"
      />
      <img ref={imageRef} className="hover-image" alt="hover preview" />
    </div>
  );
}
