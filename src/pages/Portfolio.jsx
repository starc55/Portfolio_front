import React, { useState, useEffect } from "react";
import "./Page.css";
import { FaArrowRight } from "react-icons/fa";
import works from "../data/woks";
import ScrollReveal from "scrollreveal";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/PPT Perfume.pptx";
    link.download = "PPT Perfume.ppt";
    link.click();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredWorks =
    selectedCategory === "All"
      ? works
      : works.filter((work) => work.category === selectedCategory);

  useEffect(() => {
    ScrollReveal().reveal(".work_card", {
      origin: "bottom",
      distance: "40px",
      duration: 1500,
      reset: true,
    });
  }, []);

  return (
    <div className="portfolio" id="portfolio">
      <div>
        <div className="header_about">
          <p>Portfolio</p>
          <span className="sub_head">Most recent works</span>
        </div>
        <div className="portfolio_btn">
          <button
            className="portfolio_button all"
            onClick={() => handleCategoryChange("All")}
          >
            All
          </button>
          <button
            className="portfolio_button"
            onClick={() => handleCategoryChange("Web")}
          >
            Web
          </button>
          <button
            className="portfolio_button"
            onClick={() => handleCategoryChange("Video")}
          >
            Video
          </button>
          <button
            className="portfolio_button"
            onClick={() => handleCategoryChange("Other")}
          >
            Other
          </button>
        </div>

        <div className="portfolio_works">
          {filteredWorks.map((work, index) => (
            <div className="work_card" key={index}>
              <div className="work_img">
                {work.video ? (
                  <video width="320" height="240" controls>
                    <source src={work.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={work.img} alt={work.title} />
                )}
              </div>
              <span className="work_title">{work.title}</span>
              <br />
              <br />
              {work.isDownload ? (
                <a href="#" className="work_link" onClick={handleDownload}>
                  Download PPT <FaArrowRight className="work_icon" />
                </a>
              ) : work.link ? (
                <a href={work.link} className="work_link">
                  View demo <FaArrowRight className="work_icon" />
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
