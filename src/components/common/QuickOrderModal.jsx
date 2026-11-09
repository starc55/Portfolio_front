import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiChevronDown, FiSend, FiX, FiZap } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "styles/QuickOrderModal.css";

const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/7f13avvybn3qljhmb1dccg8esvfcce5k";
const INITIAL_FORM = { firstName: "", phone: "", projectType: "website", message: "" };
const PROJECT_TYPES = ["website", "webapp", "redesign", "other"];
const copy = {
  uz: { button: "Tez buyurtma", eyebrow: "Yangi loyiha", title: "G'oyangizni tezda boshlaymiz", subtitle: "4 ta qisqa maydonni to'ldiring — loyiha bo'yicha tez orada bog'lanaman.", name: "Ismingiz", phone: "Telefon raqamingiz", project: "Loyiha turi", website: "Web-sayt", webapp: "Web-ilova", redesign: "Redizayn", other: "Boshqa", message: "Qisqacha nima kerak?", send: "Buyurtma yuborish", sending: "Yuborilmoqda...", success: "So'rov yuborildi!", successCopy: "Tez orada siz bilan bog'lanaman.", error: "Yuborilmadi. Qayta urinib ko'ring.", close: "Modalni yopish" },
  ru: { button: "Быстрый заказ", eyebrow: "Новый проект", title: "Быстро запустим вашу идею", subtitle: "Заполните 4 коротких поля — я скоро свяжусь с вами.", name: "Ваше имя", phone: "Номер телефона", project: "Тип проекта", website: "Веб-сайт", webapp: "Веб-приложение", redesign: "Редизайн", other: "Другое", message: "Кратко опишите задачу", send: "Отправить заказ", sending: "Отправка...", success: "Заявка отправлена!", successCopy: "Я скоро свяжусь с вами.", error: "Не удалось отправить. Попробуйте снова.", close: "Закрыть окно" },
  en: { button: "Quick order", eyebrow: "New project", title: "Let's launch your idea quickly", subtitle: "Complete 4 short fields and I'll get back to you soon.", name: "Your name", phone: "Phone number", project: "Project type", website: "Website", webapp: "Web app", redesign: "Redesign", other: "Other", message: "What do you need?", send: "Send order", sending: "Sending...", success: "Request sent!", successCopy: "I'll get back to you soon.", error: "Could not send. Please try again.", close: "Close modal" },
};

const QuickOrderModal = () => {
  const { i18n } = useTranslation();
  const text = copy[i18n.language?.split("-")[0]] || copy.en;
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const firstInputRef = useRef(null);
  const projectSelectRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => firstInputRef.current?.focus(), 180);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      if (isProjectOpen) setIsProjectOpen(false);
      else setIsOpen(false);
    };
    const closeProjectSelect = (event) => {
      if (!projectSelectRef.current?.contains(event.target)) setIsProjectOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeProjectSelect);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeProjectSelect);
    };
  }, [isOpen, isProjectOpen]);

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch(MAKE_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "quick-order-modal" }) });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <motion.button type="button" className="quick-order-trigger" onClick={() => { setStatus("idle"); setIsOpen(true); }} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, type: "spring" }} whileHover="hover" whileTap={{ scale: .95 }} aria-haspopup="dialog">
        <motion.span className="quick-order-icon" variants={{ hover: { rotate: -8, scale: 1.08 } }}><FiZap aria-hidden="true" /></motion.span>
        <span className="quick-order-label">{text.button}</span>
        <FiArrowUpRight className="quick-order-arrow" aria-hidden="true" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="quick-order-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
            <motion.div className="quick-order-modal" role="dialog" aria-modal="true" aria-labelledby="quick-order-title" initial={{ opacity: 0, y: 28, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .97 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}>
              <button type="button" className="quick-order-close" onClick={() => setIsOpen(false)} aria-label={text.close}><FiX /></button>
              {status === "success" ? (
                <div className="quick-order-success">
                  <span><FiCheck /></span><h2>{text.success}</h2><p>{text.successCopy}</p>
                  <button type="button" onClick={() => setIsOpen(false)}>{text.close}</button>
                </div>
              ) : (
                <>
                  <div className="quick-order-heading">
                    <span className="quick-order-eyebrow"><FiZap /> {text.eyebrow}</span>
                    <h2 id="quick-order-title">{text.title}</h2><p>{text.subtitle}</p>
                  </div>
                  <form className="quick-order-form" onSubmit={handleSubmit}>
                    <div className="quick-order-row">
                      <label><span>{text.name}</span><input ref={firstInputRef} required name="firstName" value={form.firstName} onChange={handleChange} autoComplete="name" placeholder={text.name} /></label>
                      <label><span>{text.phone}</span><input required name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" placeholder="+998 90 123 45 67" /></label>
                    </div>
                    <div className="quick-order-field" ref={projectSelectRef}>
                      <span>{text.project}</span>
                      <button type="button" className="quick-order-select" onClick={() => setIsProjectOpen((open) => !open)} aria-expanded={isProjectOpen} aria-haspopup="listbox">
                        <span>{text[form.projectType]}</span><FiChevronDown aria-hidden="true" />
                      </button>
                      <AnimatePresence>
                        {isProjectOpen && (
                          <motion.div className="quick-order-options" role="listbox" initial={{ opacity: 0, y: -8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .98 }} transition={{ duration: .18 }}>
                            {PROJECT_TYPES.map((type) => (
                              <button key={type} type="button" role="option" aria-selected={form.projectType === type} className={form.projectType === type ? "active" : ""} onClick={() => { setForm((current) => ({ ...current, projectType: type })); setIsProjectOpen(false); }}>
                                <span>{text[type]}</span>{form.projectType === type && <FiCheck aria-hidden="true" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <label><span>{text.message}</span><textarea required name="message" value={form.message} onChange={handleChange} rows="3" placeholder={text.message} /></label>
                    {status === "error" && <p className="quick-order-error" role="alert">{text.error}</p>}
                    <button className="quick-order-submit" type="submit" disabled={status === "sending"}><span>{status === "sending" ? text.sending : text.send}</span><FiSend /></button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickOrderModal;
