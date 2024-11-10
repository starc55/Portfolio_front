import React, { useState, useEffect } from "react";
import { Modal, Tag, Button, Pagination } from "antd";
import "./Page.css";
import works from "../data/works";
import { SyncOutlined } from "@ant-design/icons";
import { useRef } from "react";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]); // Tags state
  const [selectedLink, setSelectedLink] = useState(null); // Link state
  const [loading, setLoading] = useState(false); // Loading state for the button

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  const videoRef = useRef(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when changing category
  };




  const handleImageClick = (work) => {
    resetModalState();
    setSelectedImage(work.img);
    setSelectedTitle(work.title);
    setSelectedTags(work.tags); // Store the tags
    setSelectedLink(work.link); // Store the link
    setIsModalVisible(true);
  };

  const handleVideoClick = (work) => {
    resetModalState();
    setSelectedVideo(work.video);
    setSelectedTitle(work.title);
    setSelectedTags(work.tags); // Store the tags
    setSelectedLink(work.link); // Store the link
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
    setSelectedVideo(null);
    setSelectedTitle("");
    setSelectedTags([]); // Clear tags
    setSelectedLink(null); // Clear link
    resetModalState();
  };

  const resetModalState = () => {
    setSelectedImage(null);
    setSelectedVideo(null);
    setSelectedTitle("");
    setSelectedTags([]);
    setSelectedLink(null);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video to start
    }
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
      setLoading(true); // Set loading to true when button is clicked
      setTimeout(() => {
        window.open(selectedLink, "_blank"); // Open the link in a new tab
        setLoading(false); // Set loading to false after opening the link
      }, 1500); // 1.5 seconds delay
    }
  };

  return (
    <div className="portfolio" id="projects">
      <div>
        <div className="header_about">
          <p>Projects</p>
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
          {paginatedWorks.map((work, index) => (
            <div className="work_card" key={index}>
              <div className="work_img">
                {work.video ? (
                  <div
                    className="video_container"
                    onClick={() => handleVideoClick(work)}
                  >
                    <video width="320" height="240" autoPlay loop muted ref={videoRef}>
                      <source src={work.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div
                    className="image_container"
                    onClick={() => handleImageClick(work)}
                  >
                    <img src={work.img} alt={work.title} />
                    <button className="button_overlay">
                      <p className="button__text">
                        <span style={{ "--index": 0 }}>O</span>
                        <span style={{ "--index": 1 }}>G</span>
                        <span style={{ "--index": 2 }}>A</span>
                        <span style={{ "--index": 3 }}>B</span>
                        <span style={{ "--index": 4 }}>E</span>
                        <span style={{ "--index": 5 }}>K</span>
                        <span style={{ "--index": 6 }}>_</span>
                        <span style={{ "--index": 7 }}> </span>
                        <span style={{ "--index": 8 }}>L</span>
                        <span style={{ "--index": 9 }}>E</span>
                        <span style={{ "--index": 10 }}>T</span>
                        <span style={{ "--index": 11 }}> </span>
                        <span style={{ "--index": 12 }}>I</span>
                        <span style={{ "--index": 13 }}>T</span>
                        <span style={{ "--index": 14 }}> </span>
                        <span style={{ "--index": 15 }}>G</span>
                        <span style={{ "--index": 16 }}>O</span>
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
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={filteredWorks.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "16px", textAlign: "center" }}
          className="project_pagination"
        />

        <Modal
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          width={700}
          title={
            <span style={{ textDecoration: "underline" }}>{selectedTitle}</span>
          }
        >
          {selectedVideo ? (
            <video controls autoPlay style={{ width: "95%" }} ref={videoRef}>
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={selectedImage}
              alt="Selected Work"
              style={{ width: "95%" }}
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
                {loading ? "Loading..." : "Site overview"}
              </Button>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Portfolio;
