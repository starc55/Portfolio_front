import React, { useState } from "react";
import { MdWeb } from "react-icons/md";
import { TfiVideoClapper } from "react-icons/tfi";
import { PiNetworkLight } from "react-icons/pi";
import { Modal } from "antd";
import "./Page.css";
import CurvedLoop from "../components/CurvedLoop";

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
      <div className="services_header">
        <div className="service_header-text">
          <p className="service-text">Services</p>
          <span className="service_sub">What I offer</span>
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
                        "Services with more than 3+ years of experience. Providing quality work to clients and companies.",
                      points: [
                        "I develop the user interface.",
                        "Web page development.",
                        "I create UI element interactions.",
                        "I position your company brand.",
                        "Design and mockups of products for companies.",
                        "Creating a responsive design.",
                        "Creating telegram web applications.",
                        "Creating web applications.",
                        "Creating mobile applications.",
                        "Creating desktop applications.",
                        "Creating web tools.",
                      ],
                    })
                  }
                >
                  See More...
                </span>
              </div>
            </div>
          </div>
          <div className="parent">
            <div className="card3">
              <div className="content-box">
                <span className="service_icon">
                  <TfiVideoClapper />
                </span>
                <br />
                <span className="card-title">Web Designing</span>
                <br />
                <span
                  className="see-more"
                  onClick={() =>
                    showModal({
                      title: "Web Designing",
                      description: "2+ years experience with web designing.",
                      points: [
                        "Ability to work with Figma",
                        "Designing web pages",
                        "Creating mockups",
                        "Creating logos",
                        "Creating banners",
                        "Creating business cards",
                        "Creating posters",
                      ],
                    })
                  }
                >
                  See More...
                </span>
              </div>
            </div>
          </div>
          <div className="parent">
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
                        "English tutoring",
                        "Video editing with Capcut",
                        "And many more...",
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
        <CurvedLoop
          marqueeText="WITH ✦ OBRANO ✦ ALWAYS ✦ BE ✦ CREATIVE ✦"
          speed={3}
          curveAmount={500}
          direction="right"
          interactive={true}
          className="custom-text-style"
        />
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
