import React, { useState } from "react";
import "./Contact.css";
import { MdOutlineAttachEmail } from "react-icons/md";
import { notification, Progress } from "antd";
import emailjs from "emailjs-com";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [progress, setProgress] = useState(0);

  const onChangeName = (e) => setName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangeMessage = (e) => setMessage(e.target.value);
  const onChangeSuggestion = (e) => setSuggestion(e.target.value);

  const openNotification = () => {
    notification.open({
      message: "Sending Message",
      description: (
        <div>
          <Progress percent={progress} showInfo={false} status="active" />
        </div>
      ),
      icon: <MdOutlineAttachEmail style={{ color: "#108ee9" }} />,
      duration: 3, // closes notification after 3 seconds
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openNotification();

    const templateParams = {
      name,
      email,
      message,
      suggestion,
    };

    let counter = 0;
    const progressInterval = setInterval(() => {
      counter += 20;
      setProgress(counter);
      if (counter >= 100) {
        clearInterval(progressInterval);
      } 
    }, 500);

    emailjs
      .send(
        "ogabek67", // EmailJS Service ID
        "template_ydezhzu", // EmailJS Template ID
        templateParams,
        "Ert7ISwYIs_HL32bW" // EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("Message sent:", response.status, response.text);
          notification.success({
            message: "Message Sent Successfully",
            description: "Your message has been sent!",
            icon: <MdOutlineAttachEmail style={{ color: "#52c41a" }} />,
            duration: 3,
          });
          setName("");
          setEmail("");
          setMessage("");
          setSuggestion("");
        },
        (error) => {
          console.error("Error sending message:", error);
          notification.error({
            message: "Message Failed",
            description: "Failed to send message. Please try again.",
            icon: <MdOutlineAttachEmail style={{ color: "#ff4d4f" }} />,
            duration: 3,
          });
        }
      );
  };

  return (
    <div id="contact">
      <div className="contact_container">
        <div className="contact_head">
          <p>Hire Me</p>
          <br />
          <p className="c_s_title">Write me your project</p>
        </div>

        <div className="contact_content">
          <span
            className="contact_lord"
            dangerouslySetInnerHTML={{
              __html: `<lord-icon
              src="https://cdn.lordicon.com/ipyszerf.json"
              trigger="loop"
              delay="500"
              style="width:250px;height:250px">
              </lord-icon>`,
            }}
          />
          <div className="contact_input">
            <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                <input
                  autoComplete="off"
                  required
                  type="text"
                  name="text"
                  className="input"
                  value={name}
                  onChange={onChangeName}
                />
                <label className="user-label">Your name</label>
              </div>

              <div className="input-group">
                <input
                  autoComplete="off"
                  required
                  type="email"
                  name="text"
                  className="input"
                  value={email}
                  onChange={onChangeEmail}
                />
                <label className="user-label">Your email</label>
              </div>

              <div className="input-group">
                <textarea
                  autoComplete="off"
                  required
                  allowClear
                  onChange={onChangeMessage}
                  className="input"
                  value={message}
                />
                <label className="user-label">New Project</label>
              </div>

              <div className="input-group">
                <textarea
                  autoComplete="off"
                  required
                  allowClear
                  onChange={onChangeSuggestion}
                  className="input"
                  value={suggestion}
                />
                <label className="user-label">Your suggestion</label>
              </div>
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
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  ></path>
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
