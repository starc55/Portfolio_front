import React, { useState, useCallback } from "react";
import "styles/Contact.css";
// import { MdOutlineAttachEmail } from "react-icons/md";
import { motion } from "framer-motion";
import SectionTitle from "components/ui/SectionTitle";
import { useTranslation } from "react-i18next";
import Notification from "components/ui/Notification";

const MAKE_WEBHOOK_URL =
  "https://hook.eu2.make.com/7f13avvybn3qljhmb1dccg8esvfcce5k";

const Contact = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    suggestion: "",
  });

  const [notification, setNotification] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const showNotification = useCallback((type, title, message) => {
    setNotification({ type, title, message });

    if (type !== "info") {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      showNotification(
        "info",
        t("contactPage.sending") || "Yuborilmoqda...",
        t("contactPage.sendingDesc") ||
          "Ma'lumotlaringiz yuborilmoqda, biroz kuting"
      );

      try {
        const response = await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          showNotification(
            "success",
            t("contactPage.success") || "Muvaffaqiyat!",
            t("contactPage.successDesc") ||
              "Xabaringiz muvaffaqiyatli yuborildi"
          );

          setForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
            suggestion: "",
          });
        } else {
          throw new Error("Server response not ok");
        }
      } catch (err) {
        showNotification(
          "error",
          t("contactPage.error") || "Xatolik yuz berdi",
          t("contactPage.errorDesc") ||
            "Xabarni yuborishda muammo yuz berdi. Iltimos qayta urinib ko‘ring."
        );
      }
    },
    [form, showNotification, t]
  );

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <SectionTitle
          title={t("contactPage.title")}
          subtitle={t("contactPage.subtitle")}
          centered={true}
        />

        {notification && (
          <div
            style={{
              position: "fixed",
              top: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <Notification
              type={notification.type}
              title={notification.title}
              message={notification.message}
              showProgress={notification.type === "info"}
              onClose={() => setNotification(null)}
              autoClose={notification.type !== "info" ? 5 : undefined}
            />
          </div>
        )}

        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="card-content">
            {/* <div className="image-side">
              <img
                src="https://thumbs.dreamstime.com/b/digital-collaboration-futuristic-handshake-symbolizing-technology-partnership-composed-interconnected-lines-glowing-nodes-346712703.jpg"
                alt="Collaboration & Connection"
                className="contact-hero-img"
              />
            </div> */}

            <div className="form-side">
              <form onSubmit={handleSubmit} className="compact-form">
                <div className="input-group">
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder=" "
                    className="compact-input"
                  />
                  <label>{t("contactPage.firstName")}</label>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder=" "
                    className="compact-input"
                  />
                  <label>{t("contactPage.lastName")}</label>
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="compact-input"
                  />
                  <label>{t("contactPage.email")}</label>
                </div>

                <div className="input-group">
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder=" "
                    className="compact-input"
                  />
                  <label>{t("contactPage.phone")}</label>
                </div>

                <div className="input-group">
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder=" "
                    className="compact-textarea"
                  />
                  <label>{t("contactPage.message")}</label>
                </div>

                <div className="input-group">
                  <textarea
                    name="suggestion"
                    value={form.suggestion}
                    onChange={handleChange}
                    placeholder=" "
                    className="compact-textarea small"
                  />
                  <label>{t("contactPage.suggestion")}</label>
                </div>

                <motion.button
                  type="submit"
                  className="compact-submit"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 12px 32px rgba(96,165,250,0.45)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t("contactPage.submit")}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
