import React, { useState } from "react";
import "./Contact.css";
import { MdOutlineAttachEmail } from "react-icons/md";
import { Input, notification, Progress } from "antd";
import emailjs from "emailjs-com";
import emailIcon from "../imgs/email.png";
import whatsapp from "../imgs/whatsapp.png";
import linkedIn from "../imgs/linked.png";

const { TextArea } = Input;

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
      <div>
        <div className="header_about">
          <p>Contact Me</p>
          <span className="sub_head">Get in touch</span>
        </div>

        <div className="contact_content">
          <div className="contact_social">
            <p className="c_s_title">Talk to me</p>
            <br />

            <div className="card5">
              <div className="bg">
                <img src={emailIcon} alt="" className="card5_icon" />
                <p className="card5_content">Email</p>
                <a
                  href="mailto:orziyevogabek67@gmail.com"
                  className="contact_write_me"
                >
                  <p>Write me</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="blob"></div>
            </div>
            <br />
            <div className="card5">
              <div className="bg">
                <img src={whatsapp} alt="" className="card5_icon" />
                <p className="card5_content">Whatsapp</p>
                <p className="c5">+998 93 110 26 81</p>
              </div>
              <div className="blob"></div>
            </div>
            <br />
            <div className="card5">
              <div className="bg">
                <img src={linkedIn} alt="" className="card5_icon" />
                <p className="card5_content">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/og-abek-orziyev-b2a84729b/"
                  className="contact_write_me"
                >
                  <p>Write me</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="blob"></div>
            </div>
          </div>

          <div className="contact_input">
            <p className="c_s_title">Write me your project</p>
            <br />
            <form onSubmit={handleSubmit} className="form">
              <input
                required
                placeholder="Insert your name"
                type="text"
                name="text"
                className="input"
                value={name}
                onChange={onChangeName}
              />
              <input
                required
                placeholder="Insert your email"
                type="email"
                name="text"
                className="input"
                value={email}
                onChange={onChangeEmail}
              />
              <TextArea
                required
                placeholder="Write me your project"
                allowClear
                onChange={onChangeMessage}
                className="textarea"
                value={message}
              />
              <TextArea
                required
                placeholder="Enter your suggestions"
                allowClear
                onChange={onChangeSuggestion}
                className="textarea"
                value={suggestion}
              />
              <button type="submit" className="button">
                <div className="outline"></div>
                <div className="state state--default">
                  <div className="icon">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g style={{ filter: "url(#shadow)" }}>
                        <path
                          d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.02 9.67999C13.31 9.38999 13.79 9.38999 14.08 9.67999C14.37 9.96999 14.37 10.45 14.08 10.74L10.64 14.18C10.49 14.33 10.3 14.4 10.11 14.4Z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <p>
                    <span style={{ "--i": 0 }}>S</span>
                    <span style={{ "--i": 1 }}>u</span>
                    <span style={{ "--i": 2 }}>b</span>
                    <span style={{ "--i": 3 }}>mit</span>
                  </p>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
