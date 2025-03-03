import React, { useState } from "react";
import { MdWeb } from "react-icons/md";
import { TfiVideoClapper } from "react-icons/tfi";
import { PiNetworkLight } from "react-icons/pi";
import { Modal } from "antd";
import "./Page.css";

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    points: [],
  });

  const showModal = (content) => {
    setModalContent(content);
    document.body.classList.add("modal-open");
    setModalOpen(true);
  };

  const handleOk = () => {
    document.body.classList.remove("modal-open");
    setModalOpen(false);
  };

  const handleCancel = () => {
    document.body.classList.remove("modal-open");
    setModalOpen(false);
  };

  return (
    <div id="service">
      <div>
        <div className="header_about">
          <p className="header_about">Services</p>
          <span className="sub_head">What I offer</span>
        </div>
        <div className="service_card">
          <div className="parent">
            <div className="card3">
              <div className="content-box">
                <span className="service_icon">
                  <MdWeb />
                </span>
                <br />
                <span className="card-title">Frontend</span>
                <br />
                <span
                  className="see-more"
                  onClick={() =>
                    showModal({
                      title: "Frontend Development",
                      description:
                        "Services with more than + 2 years of experience. Providing quality work to clients and companies.",
                      points: [
                        "I develop the user interface.",
                        "Web page development.",
                        "I create UI element interactions.",
                        "I position your company brand.",
                        "Design and mockups of products for companies.",
                      ],
                    })
                  }
                >
                  See More...
                </span>
              </div>
            </div>
          </div>
          <div className="parent2">
            <div className="card3">
              <div className="content-box">
                <span className="service_icon">
                  <TfiVideoClapper />
                </span>
                <br />
                <span className="card-title">Video Editing</span>
                <br />
                <span
                  className="see-more"
                  onClick={() =>
                    showModal({
                      title: "Video Editing",
                      description: "4 years experience with video editing.",
                      points: [
                        "Ability to work with Capcut",
                        "Quality and standard videos",
                        "Very bright and smooth videos",
                        "Proficiency with AI",
                      ],
                    })
                  }
                >
                  See More...
                </span>
              </div>
            </div>
          </div>
          <div className="parent3">
            <div className="card3">
              <div className="content-box">
                <span className="service_icon">
                  <PiNetworkLight />
                </span>
                <br />
                <span className="card-title">Other</span>
                <br />
                <span
                  className="see-more"
                  onClick={() =>
                    showModal({
                      title: "Other Services",
                      description: "I can do a lot more computer work!",
                      points: [
                        "Preparing a wonderful and attractive presentation",
                        "Ability to work with Canva",
                        "Lots of computer work",
                        "Word, Excel, Power Point",
                        "Computer tutoring",
                      ],
                    })
                  }
                >
                  See More...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={modalContent.title}
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <p>{modalContent.description}</p>
        <ul>
          {modalContent.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Services;
