import React, { useState, useEffect } from "react";
import { Modal, Tag, Button, Pagination } from "antd";
import "./Page.css";
import works from "../data/works";
import { SyncOutlined } from "@ant-design/icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
 
const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleImageClick = (work) => {
    resetModalState();
    setSelectedImage(work.img);
    setSelectedTags(work.tags);
    setSelectedLink(work.link);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
    setSelectedTags([]);
    setSelectedLink(null);
    resetModalState();
  };

  const resetModalState = () => {
    setSelectedImage(null);
    setSelectedTags([]);
    setSelectedLink(null);
  };

  useEffect(() => {
    if (isModalVisible) {
      document.body.classList.add("modal-open");
      document.querySelector(".portfolio").classList.add("blur");
    } else {
      document.body.classList.remove("modal-open");
      document.querySelector(".portfolio").classList.remove("blur");
    }
  }, [isModalVisible]);

  useEffect(() => {
    gsap.utils.toArray(".work_card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            stagger: 0.1,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        }
      );
    });
  }, [currentPage, selectedCategory]);

  const filteredWorks =
    selectedCategory === "All"
      ? works
      : works.filter((work) => work.category === selectedCategory);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWorks = filteredWorks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleLinkClick = () => {
    if (selectedLink) {
      setLoading(true);
      setTimeout(() => {
        window.open(selectedLink, "_blank");
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="portfolio" id="projects">
      <div className="portfolio_container">
        <div className="portfolio_header">
          <p className="portfolio_text">Projects</p>
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
            Sites
          </button>
          <button
            className="portfolio_button"
            onClick={() => handleCategoryChange("Figma")}
          >
            Figma
          </button>
          <button
            className="portfolio_button"
            onClick={() => handleCategoryChange("Other")}
          >
            Other
          </button>
        </div>

        <div className="portfolio_works">
          {paginatedWorks.map((work, index) => (
            <div className="work_card" key={index}>
              <div className="work_img">
                <div
                  className="image_container"
                  onClick={() => handleImageClick(work)}
                >
                  <img src={work.img} alt={work.title} loading="lazy" />
                </div>
              </div>
              <button
                className="button_overlay"
                onClick={() => handleImageClick(work)}
              >
                <p className="button__text">
                  <span style={{ "--index": 0 }}>O</span>
                  <span style={{ "--index": 1 }}>B</span>
                  <span style={{ "--index": 2 }}>R</span>
                  <span style={{ "--index": 3 }}>A</span>
                  <span style={{ "--index": 4 }}>N</span>
                  <span style={{ "--index": 5 }}>O</span>
                  <span style={{ "--index": 6 }}> </span>
                  <span style={{ "--index": 7 }}>M</span>
                  <span style={{ "--index": 8 }}>A</span>
                  <span style={{ "--index": 9 }}>G</span>
                  <span style={{ "--index": 10 }}>I</span>
                  <span style={{ "--index": 11 }}>C</span>
                  <span style={{ "--index": 12 }}> </span>
                  <span style={{ "--index": 13 }}>V</span>
                  <span style={{ "--index": 14 }}>I</span>
                  <span style={{ "--index": 15 }}>E</span>
                  <span style={{ "--index": 16 }}>W</span>
                </p>

                <div className="button__circle">
                  <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="button__icon"
                    width="14"
                  >
                    <path
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                      fill="currentColor"
                    ></path>
                  </svg>

                  <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="button__icon button__icon--copy"
                  >
                    <path
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>

        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredWorks.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "50px", textAlign: "center" }}
          className="project_pagination"
          showLessItems
        />

        <Modal
          className="custom_modal"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          width={700}
          bodyStyle={{ padding: "20px", borderRadius: "20px" }}
          closeIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          <img
            src={selectedImage}
            alt="Selected Work"
            style={{ width: "100%", borderRadius: "20px" }}
            loading="lazy"
          />

          <div className="project_over">
            <div className="tags-container">
              {selectedTags.map((tag, idx) => (
                <Tag color="cyan" key={idx} bordered={false}>
                  <SyncOutlined spin /> {tag}
                </Tag>
              ))}
            </div>

            {selectedLink && (
              <Button
                type="dashed"
                onClick={handleLinkClick}
                loading={loading}
                style={{ marginTop: "16px" }}
              >
                {loading
                  ? "Loading..."
                  : selectedCategory === "Web"
                  ? "Site overview"
                  : selectedCategory === "Stickers"
                  ? "Watch Sticker"
                  : "Overview"}
              </Button>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Portfolio;
