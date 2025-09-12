import React, { useState, useCallback } from "react";
import "./Contact.css";
import { MdOutlineAttachEmail } from "react-icons/md";
import { notification, Progress } from "antd";
import emailjs from "emailjs-com";

const SERVICE_ID = "ogabek67";
const TEMPLATE_ID = "template_ydezhzu";
const PUBLIC_KEY = "Ert7ISwYIs_HL32bW";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    suggestion: "",
  });
  const [progress, setProgress] = useState(0);

  // 🔹 inputlarni umumiy handler orqali boshqarish
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const openNotification = useCallback(() => {
    notification.open({
      message: "Sending Message",
      description: (
        <Progress percent={progress} showInfo={false} status="active" />
      ),
      icon: <MdOutlineAttachEmail style={{ color: "#108ee9" }} />,
      duration: 3,
    });
  }, [progress]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      openNotification();

      const templateParams = { ...form };

      let counter = 0;
      const progressInterval = setInterval(() => {
        counter += 20;
        setProgress(counter);
        if (counter >= 100) clearInterval(progressInterval);
      }, 500);

      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
        () => {
          notification.success({
            message: "Message Sent Successfully",
            description: "Your message has been sent!",
            icon: <MdOutlineAttachEmail style={{ color: "#52c41a" }} />,
            duration: 3,
          });
          setForm({ name: "", email: "", message: "", suggestion: "" });
          setProgress(0);
        },
        () => {
          notification.error({
            message: "Message Failed",
            description: "Failed to send message. Please try again.",
            icon: <MdOutlineAttachEmail style={{ color: "#ff4d4f" }} />,
            duration: 3,
          });
        }
      );
    },
    [form, openNotification]
  );

  return (
    <div id="contact">
      <div className="contact_container">
        <div className="contact_head">
          <p>Hire Me</p>
          <p className="c_s_title">Write me your project</p>
        </div>

        <div className="contact_content">
          <span
            className="contact_lord"
            dangerouslySetInnerHTML={{
              __html: `<lord-icon src="https://cdn.lordicon.com/ipyszerf.json" trigger="loop" delay="500" style="width:250px;height:250px"></lord-icon>`,
            }}
          />
          <div className="contact_input">
            <form onSubmit={handleSubmit} className="form">
              {[
                { label: "Your name", name: "name", type: "text" },
                { label: "Your email", name: "email", type: "email" },
              ].map(({ label, name, type }) => (
                <div className="input-group" key={name}>
                  <input
                    autoComplete="off"
                    required
                    type={type}
                    name={name}
                    className="input"
                    value={form[name]}
                    onChange={handleChange}
                  />
                  <label className="user-label">{label}</label>
                </div>
              ))}

              {[
                { label: "New Project", name: "message" },
                { label: "Your suggestion", name: "suggestion" },
              ].map(({ label, name }) => (
                <div className="input-group" key={name}>
                  <textarea
                    autoComplete="off"
                    required
                    name={name}
                    className="input"
                    value={form[name]}
                    onChange={handleChange}
                  />
                  <label className="user-label">{label}</label>
                </div>
              ))}

              <button type="submit" className="submit-btn">
                <div className="text">
                  <span>Submit</span>
                  <span>Message</span>
                </div>
                <div className="clone">
                  <span>Hire</span>
                  <span>Me</span>
                </div>
                <svg
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
