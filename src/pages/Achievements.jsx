import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Pagination } from "antd";
import "./Page.css";
import "antd/dist/reset.css";

const items = [
  {
    text: "React state and events",
    image: require("../imgs/1.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/DC43U48J?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Working with data and properties in React components",
    image: require("../imgs/2.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/YQN4P9PR?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Get started with React",
    image: require("../imgs/3.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/J9KH3Y8T?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Learn the basics of web accessibility",
    image: require("../imgs/4.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/B6PUGKCD?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Get started with web development using Visual Studio Code",
    image: require("../imgs/5.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/4LQC57HK?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Creating your first web apps with React",
    image: require("../imgs/6.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/2BATJALV?sharingId=F3BA35B3751C3983",
  },
  {
    text: "Monday Academy Certificate",
    image: require("../imgs/achieve.webp"),
    link: "",
  },
  {
    text: "Introduction to Microsoft 365 Copilot",
    image: require("../imgs/7.webp"),
    link: "https://learn.microsoft.com/api/achievements/share/en-us/OrziyevOgabek-6974/CFLEGBH9?sharingId=F3BA35B3751C3983",
  },
];

const pageSize = 4;

export default function HoverImageEffect() {
  const imageRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsRef = useRef([]);

  // Initial image state
  useEffect(() => {
    gsap.set(imageRef.current, { autoAlpha: 0, scale: 0.8 });
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const line = entry.target.querySelector(".line");
            if (line) {
              gsap.to(line, {
                scaleX: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.2,
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]); // Page o‘zgarganda qayta kuzatadi

  // Event Handlers optimized with useCallback
  const handleMouseEnter = useCallback((image) => {
    gsap.to(imageRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    imageRef.current.src = image;
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(imageRef.current, {
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    const { offsetWidth, offsetHeight } = imageRef.current;
    gsap.to(imageRef.current, {
      x: e.clientX - offsetWidth / 2,
      y: e.clientY - offsetHeight / 2 - 200,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="achievement-container" id="achievements">
      <div className="achievements_header">
        <p>Achievements</p>
        <span className="achievements_sub">My achievements</span>
      </div>

      {paginatedItems.map((item, index) => (
        <div
          key={`${currentPage}-${index}`} // unique key
          className="hover-item"
          ref={(el) => (itemsRef.current[index] = el)}
          onMouseEnter={() => handleMouseEnter(item.image)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={() => handleClick(item.link)}
        >
          {item.text}
          <span className="line"></span>
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
