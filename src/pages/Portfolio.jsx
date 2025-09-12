import React, { useState, useEffect, useCallback } from "react";
import { Modal, Tag, Button, Pagination } from "antd";
import "./Page.css";
import works from "../data/works";
import { SyncOutlined } from "@ant-design/icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Web", "Figma", "Other"];

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

  const resetModalState = useCallback(() => {
    setSelectedImage(null);
    setSelectedTags([]);
    setSelectedLink(null);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleImageClick = useCallback(
    (work) => {
      resetModalState();
      setSelectedImage(work.img);
      setSelectedTags(work.tags);
      setSelectedLink(work.link);
      setIsModalVisible(true);
    },
    [resetModalState]
  );

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    resetModalState();
  }, [resetModalState]);

  useEffect(() => {
    if (isModalVisible) {
      document.body.classList.add("modal-open");
      document.querySelector(".portfolio")?.classList.add("blur");
    } else {
      document.body.classList.remove("modal-open");
      document.querySelector(".portfolio")?.classList.remove("blur");
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
          delay: i * 0.1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
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

  const handleLinkClick = useCallback(() => {
    if (selectedLink) {
      setLoading(true);
      setTimeout(() => {
        window.open(selectedLink, "_blank");
        setLoading(false);
      }, 1500);
    }
  }, [selectedLink]);

  return (
    <div className="portfolio" id="projects">
      <div className="portfolio_container">
        <div className="portfolio_header">
          <p className="portfolio_text">Projects</p>
          <span className="sub_head">Most recent works</span>
        </div>

        {/* Category buttons */}
        <div className="portfolio_btn">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`portfolio_button ${cat === "All" ? "all" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat === "Web" ? "Sites" : cat}
            </button>
          ))}
        </div>

        {/* Work cards */}
        <div className="portfolio_works">
          {paginatedWorks.map((work) => (
            <div className="work_card" key={work.title}>
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
                  {"OBRANO MAGIC VIEW".split("").map((ch, i) => (
                    <span key={i} style={{ "--index": i }}>
                      {ch}
                    </span>
                  ))}
                </p>
                <div className="button__circle">
                  {[...Array(2)].map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`button__icon ${
                        i === 1 ? "button__icon--copy" : ""
                      }`}
                      width="14"
                    >
                      <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                      />
                    </svg>
                  ))}
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredWorks.length}
          onChange={setCurrentPage}
          style={{ marginTop: "50px", textAlign: "center" }}
          className="project_pagination"
          showLessItems
        />

        {/* Modal */}
        <Modal
          className="custom_modal"
          open={isModalVisible}
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
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected Work"
              style={{ width: "100%", borderRadius: "20px" }}
              loading="lazy"
            />
          )}

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
                {loading ? "Loading..." : "Open Project"}
              </Button>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Portfolio;
