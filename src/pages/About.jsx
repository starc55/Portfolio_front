import React from "react";
import about from "../imgs/about.svg";
import "./Page.css";

const About = () => {
  const cvLink = process.env.PUBLIC_URL + "/Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvLink;
    link.download = "/Resume.pdf";
    link.click();
  };

  return (
    <div id="about" className="about">
      <div>
        <div className="header_about">
          <p className="head_icon_">About</p>
          <span className="sub_head">My introduction</span>
        </div>
        <div className="about_content">
          <div className="about_img">
            <img src={about} alt="" />
          </div>
          <div className="add_about about_text">
            <div className="card_container">
              <div className="card_hover">
                <div className="part part-1"></div>
                <div className="part part-2"></div>
                <div className="part part-3"></div>
                <div className="part part-4"></div>
                <div className="part part-5"></div>
                <div className="part part-6"></div>
                <div className="part part-7"></div>
                <div className="part part-8"></div>
                <div className="part part-9"></div>
                <div className="part part-10"></div>
                <div className="part part-11"></div>
                <div className="part part-12"></div>
                <div className="part part-13"></div>
                <div className="part part-14"></div>
                <div className="part part-15"></div>
              </div>
              <div className="card">
                <div className="say-hi">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 71 74"
                    className="icon_say-hi"
                  >
                    <path
                      fill="black"
                      d="M43.6574 32.6925C46.2318 27.3745 42.4638 8.00882 50.0978 4.62384C53.3046 3.19858 56.1818 5.55916 57.0637 8.98869C58.7918 15.723 56.7074 24.034 54.9793 30.5011C54.712 31.5166 53.8925 33.7525 54.0261 34.7413C58.5781 27.5437 59.4243 18.9209 63.0587 16.3644C65.9894 14.2978 68.9201 15.4647 70.372 18.7339C72.8573 24.3369 65.6776 37.2266 62.4084 41.7963C67.0227 52.1917 65.9538 64.93 54.9347 70.4083C51.7814 71.21 49.0734 71.2813 45.9556 70.2569C45.9378 70.2569 45.6973 70.1767 45.6706 70.1678C41.0741 73.2588 30.358 73.7309 27.4362 72.3502C20.6395 68.8138 18.2522 61.8479 6.11974 55.3273C4.40052 54.4098 1.96868 53.2518 0.721583 51.0159C-2.53869 45.1902 6.16428 41.0748 14.3773 44.5666C16.7023 45.5554 20.5772 48.1565 22.2251 50.624C23.7395 49.7688 22.9556 47.9071 22.047 44.4954C19.3479 34.4206 8.0082 21.9763 9.7096 14.7699C10.8676 9.85275 16.0965 7.11804 20.0338 10.984C25.5923 16.4535 29.0574 27.9624 31.7031 35.2045C32.8166 34.4117 32.7453 35.2668 31.5873 30.9554C30.2689 26.0472 28.6388 21.1657 27.6322 16.3377C26.492 10.8415 24.746 2.69084 31.4091 0.321349C40.1744 -2.80531 42.2232 18.4132 42.8201 23.6421L43.6841 32.7014L43.6574 32.6925ZM46.5881 69.5888H46.8197C47.5769 69.5977 48.3608 69.6155 49.0823 69.66C51.8615 69.8293 52.8859 69.2146 55.2109 68.1813C63.9584 64.2975 64.6087 52.2452 61.0455 43.5155C60.3685 41.8497 60.6447 41.3509 61.3128 40.2285C64.4661 34.9016 71.343 24.8714 68.6439 18.8051C67.7442 16.792 64.8314 16.2129 63.032 18.333C60.9297 20.8094 59.3976 28.4702 57.0815 32.2916C56.5114 33.2358 55.7275 34.1444 55.2554 34.9818C56.0839 35.5163 55.9859 35.3114 56.4134 36.3981C55.1396 36.3001 51.6299 35.828 50.9886 35.0352C53.1086 34.0821 53.2423 31.8195 54.0885 27.9891C54.6764 25.3079 55.2554 22.9918 55.6385 20.0879C55.9859 17.46 56.3333 14.5116 56.0126 11.7412C55.6117 8.29387 53.9905 4.63275 50.1512 6.34305C44.6105 8.80162 47.7728 25.9314 44.8689 33.6456C45.8131 34.2068 45.8398 33.9039 46.5792 35.2312L39.9696 34.67C41.9738 32.9063 42.152 35.1332 41.083 26.3768C40.602 22.4574 39.3906 11.0019 38.1969 7.79503C36.2728 2.62848 34.4467 0.704387 30.5629 2.43251C27.2135 3.92012 28.9862 13.9414 29.4939 16.8098C29.9571 19.402 30.7856 22.4039 31.5427 25.1208L34.0013 33.8238C34.3754 34.6611 34.8119 34.2603 35.774 35.1421C33.4134 36.1933 31.0973 36.3269 28.8347 37.1731C28.8169 35.8904 29.6365 36.1487 30.3045 35.1154C28.4517 30.51 20.5415 8.29387 15.0009 10.7524C2.31609 16.3822 24.8975 35.7122 24.4165 49.3056C31.9347 45.8048 38.1078 49.4927 42.2678 54.9532C39.542 54.971 36.3708 48.3792 28.2736 49.9559C25.8417 50.428 24.5501 51.4257 22.3142 52.2096C19.7398 50.9357 16.5776 46.8203 12.088 45.3951C10.44 44.8695 -0.391898 43.8985 2.18247 49.7065C3.58991 52.8777 8.96134 54.6681 11.3576 56.1112C15.179 58.4094 17.0497 60.4048 20.2743 63.7898C34.028 78.2294 44.9669 67.54 47.6036 67.8339C47.3898 68.4842 46.9711 69.0721 46.3743 69.5977L46.5703 69.5888H46.5881ZM53.6698 46.5798L43.31 44.914C37.5644 44.3617 35.6938 45.1724 33.7608 45.1545C32.291 45.1456 33.1907 45.3951 32.5048 44.6379C34.0102 42.9454 41.6531 43.1948 43.693 43.2839C47.2295 43.4353 50.9708 44.2994 53.6698 46.5798Z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="title">
                  <span>About me</span>
                </div>
                <div className="paragraph">
                  <span>
                    2+ years of experience, 50+ projects completed, 100+ happy
                    clients, 100% satisfaction rate
                  </span>
                </div>
              </div>
            </div>

            <div className="about_sub">
              <p>
                Hello! I’m Ogabek (Jony), a frontend developer passionate about
                building modern, user-friendly web applications. Currently, I’m
                expanding into full-stack development, mastering both frontend
                and backend technologies. With expertise in JavaScript, React,
                and CSS, I focus on seamless design and functionality. Let’s
                grow and create together! 🚀
              </p>
            </div>
            <button className="continue-application" onClick={handleDownload}>
              <div>
                <div className="pencil"></div>
                <div className="folder">
                  <div className="top">
                    <svg viewBox="0 0 24 27">
                      <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                    </svg>
                  </div>
                  <div className="paper"></div>
                </div>
              </div>
              Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
