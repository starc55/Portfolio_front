import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import SectionTitle from "components/ui/SectionTitle";
import Notification from "components/ui/Notification";
import "styles/Contact.css";

const MAKE_WEBHOOK_URL = "https://hook.eu2.make.com/7f13avvybn3qljhmb1dccg8esvfcce5k";
const INITIAL_FORM = { firstName: "", email: "", phone: "", projectType: "website", budget: "", message: "" };
const PROJECT_TYPES = ["website", "webapp", "redesign", "other"];
const BUDGET_OPTIONS = [
  { value: "starter", label: "$300 — $700" },
  { value: "growth", label: "$700 — $1,500" },
  { value: "custom", label: "$1,500+" },
];

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState(INITIAL_FORM);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const budgetSelectRef = useRef(null);

  const completion = useMemo(() => {
    const filled = [form.firstName, form.email, form.phone, form.message].filter(Boolean).length;
    return Math.round((filled / 4) * 100);
  }, [form]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }, []);

  const showNotification = useCallback((type, title, message) => {
    setNotification({ type, title, message });
    if (type !== "info") setTimeout(() => setNotification(null), 5000);
  }, []);

  useEffect(() => {
    const closeBudgetSelect = (event) => {
      if (!budgetSelectRef.current?.contains(event.target)) setIsBudgetOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsBudgetOpen(false);
    };
    document.addEventListener("pointerdown", closeBudgetSelect);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeBudgetSelect);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const selectedBudget = BUDGET_OPTIONS.find((option) => option.value === form.budget);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    showNotification("info", t("contactPage.sending"), t("contactPage.sendingDesc"));

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      showNotification("success", t("contactPage.success"), t("contactPage.successDesc"));
      setForm(INITIAL_FORM);
    } catch (error) {
      showNotification("error", t("contactPage.error"), t("contactPage.errorDesc"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <SectionTitle title={t("contactPage.title")} subtitle={t("contactPage.subtitle")} centered />

        {notification && (
          <div className="contact-notification">
            <Notification type={notification.type} title={notification.title} message={notification.message} showProgress={notification.type === "info"} onClose={() => setNotification(null)} autoClose={notification.type !== "info" ? 5 : undefined} />
          </div>
        )}

        <motion.div className="contact-card" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7 }}>
          <aside className="contact-intro">
            <span className="contact-eyebrow">{t("contactPage.eyebrow")}</span>
            <h3>{t("contactPage.formTitle")}</h3>
            <p>{t("contactPage.formCopy")}</p>
            <div className="contact-promise">
              <span>01</span><p><strong>{t("contactPage.fastReply")}</strong>{t("contactPage.fastReplyCopy")}</p>
              <span>02</span><p><strong>{t("contactPage.clearPlan")}</strong>{t("contactPage.clearPlanCopy")}</p>
              <span>03</span><p><strong>{t("contactPage.directContact")}</strong>{t("contactPage.directContactCopy")}</p>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-progress" aria-label={`${completion}%`}>
              <span style={{ width: `${completion}%` }} />
            </div>
            <div className="form-heading"><span>{t("contactPage.step")}</span><small>{completion}%</small></div>

            <fieldset className="project-type-fieldset">
              <legend>{t("contactPage.projectType")}</legend>
              <div className="project-type-options">
                {PROJECT_TYPES.map((type) => (
                  <button type="button" key={type} className={form.projectType === type ? "active" : ""} onClick={() => setForm((current) => ({ ...current, projectType: type }))}>
                    {t(`contactPage.types.${type}`)}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="form-row">
              <label className="form-field"><span>{t("contactPage.firstName")}</span><input type="text" name="firstName" required autoComplete="name" value={form.firstName} onChange={handleChange} placeholder={t("contactPage.namePlaceholder")} /></label>
              <label className="form-field"><span>{t("contactPage.phone")}</span><input type="tel" name="phone" required autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="+998 90 123 45 67" /></label>
            </div>
            <div className="form-row">
              <label className="form-field"><span>{t("contactPage.email")}</span><input type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} placeholder="name@company.com" /></label>
              <div className="form-field budget-field" ref={budgetSelectRef}>
                <span>{t("contactPage.budget")}</span>
                <button type="button" className={`budget-select${form.budget ? " has-value" : ""}`} onClick={() => setIsBudgetOpen((open) => !open)} aria-expanded={isBudgetOpen} aria-haspopup="listbox">
                  <span>{selectedBudget?.label || t("contactPage.budgetPlaceholder")}</span>
                  <FiChevronDown aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {isBudgetOpen && (
                    <motion.div className="budget-options" role="listbox" initial={{ opacity: 0, y: -8, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .98 }} transition={{ duration: .18 }}>
                      {BUDGET_OPTIONS.map((option) => (
                        <button key={option.value} type="button" role="option" aria-selected={form.budget === option.value} className={form.budget === option.value ? "active" : ""} onClick={() => { setForm((current) => ({ ...current, budget: option.value })); setIsBudgetOpen(false); }}>
                          <span>{option.label}</span>{form.budget === option.value && <FiCheck aria-hidden="true" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <label className="form-field"><span>{t("contactPage.message")}</span><textarea name="message" required value={form.message} onChange={handleChange} placeholder={t("contactPage.messagePlaceholder")} rows="4" /></label>

            <button type="submit" className="order-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? t("contactPage.sending") : t("contactPage.submit")}</span>
              <span className="submit-arrow" aria-hidden="true">↗</span>
            </button>
            <p className="form-privacy">{t("contactPage.privacy")}</p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
