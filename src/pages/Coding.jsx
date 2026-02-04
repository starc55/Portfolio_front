import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodeModal from "components/sections/CodeModal";
import Notification from "components/ui/Notification";
import { fetchTemplates } from "lib/api";
import { FiSearch, FiArrowUp, FiHome } from "react-icons/fi";
import "styles/codingPage.css";

gsap.registerPlugin(ScrollTrigger);

function Coding() {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [count, setCount] = useState(0);

  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [modalCode, setModalCode] = useState("");
  const [modalLanguage, setModalLanguage] = useState("html");
  const [modalTitle, setModalTitle] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");

  const [notification, setNotification] = useState(null);

  const gridRef = useRef(null);

  const showNotification = useCallback((type, title, message) => {
    setNotification({ type, title, message });
    if (type !== "success") {
      setTimeout(() => setNotification(null), 5000);
    }
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const matchesSearch = tpl.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category ? tpl.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [templates, search, category]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(templates.map((t) => t.category).filter(Boolean))
    );
  }, [templates]);

  const iframeHtmls = useMemo(() => {
    return templates.map((tpl) => {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              :root { --bg: #ffffff; --fg: #0b1220; }
              html, body {
                width: 100%; height: 100%; margin: 0; padding: 0;
                background: var(--bg); color: var(--fg);
                display: flex; justify-content: center; align-items: center;
                overflow: hidden;
              }
              * { box-sizing: border-box; }
              ${tpl.code_css || ""}
            </style>
            ${(tpl.libs || [])
              .map((lib) => `<script src="${lib}"></script>`)
              .join("\n")}
          </head>
          <body>
            <div class="preview-wrapper">${tpl.code_html || ""}</div>
            <script>${tpl.code_js || ""}</script>
          </body>
        </html>`;
      return { id: tpl.id, html };
    });
  }, [templates]);

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);
      showNotification(
        "info",
        "Loading...",
        "Loading templates, please wait a moment."
      );

      try {
        const data = await fetchTemplates();
        setTemplates(data || []);

        if (data && data.length > 0) {
          showNotification(
            "success",
            "Success!",
            `${data.length} template loaded`
          );
        } else {
          showNotification("warning", "Empty", "No templates available yet");
        }
      } catch (err) {
        console.error("Templates loading error:", err);
        setTemplates([]);
        showNotification(
          "error",
          "Error",
          "Unable to load templates. There may be a problem connecting to the server."
        );
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };

    loadTemplates();
  }, [showNotification]);

  useEffect(() => {
    let current = 0;
    const target = filteredTemplates.length;
    if (target === 0) {
      setCount(0);
      return;
    }

    const duration = 900;
    const step = target / (duration / 16);
    let frame;

    const animate = () => {
      current += step;
      if (current < target) {
        setCount(Math.floor(current));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [filteredTemplates.length]);

  useEffect(() => {
    if (!gridRef.current || !filteredTemplates.length) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    const cards = gridRef.current.querySelectorAll(".cg-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [filteredTemplates]);

  const openCodeModal = useCallback((code, lang, title) => {
    setModalCode(code || "");
    setModalLanguage(lang || "markup");
    setModalTitle(title || "Code");
    setCodeModalOpen(true);
  }, []);

  const closeCodeModal = useCallback(() => {
    setCodeModalOpen(false);
  }, []);

  const openPreview = useCallback((html) => {
    setPreviewHtml(html);
    setPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToHome = useCallback(() => {
    window.location.href = "/";
  }, []);

  return (
    <div className="tg-container">
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

      <div className="cg-topbar">
        <button className="home-btn" onClick={goToHome} aria-label="Go to Home">
          <FiHome size={24} />
        </button>
        <div className="cg-search-wrap">
          <FiSearch className="cg-search-icon" />
          <input
            type="text"
            className="tg-search"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {selectedCategory}
          </button>

          {dropdownOpen && (
            <ul className="dropdown-list">
              <li
                className="dropdown-item"
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setCategory("");
                  setDropdownOpen(false);
                }}
              >
                All Categories
              </li>
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCategory(cat);
                    setDropdownOpen(false);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cg-count">
          Showing <span>{count}</span> of <span>{templates.length}</span>{" "}
          templates
        </div>
      </div>

      {loading ? (
        <div className="cg-loading">
          <div className="cg-spinner" />
          <p>Shablonlar yuklanmoqda...</p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="cg-empty">
          No templates found. Try changing your search.
        </div>
      ) : (
        <div className="tg-grid" ref={gridRef}>
          {filteredTemplates.map((tpl) => {
            const iframeSrc =
              iframeHtmls.find((i) => i.id === tpl.id)?.html || "";

            return (
              <div className="cg-card" key={tpl.id}>
                <div className="cg-card-head">
                  <h3 className="cg-title">{tpl.title}</h3>
                </div>

                <p className="cg-desc">{tpl.description}</p>

                <div className="cg-preview-wrap">
                  <iframe
                    title={`preview-${tpl.id}`}
                    srcDoc={iframeSrc}
                    className="cg-iframe"
                    sandbox="allow-scripts"
                  />
                </div>

                <div className="cg-actions">
                  {tpl.code_html && (
                    <button
                      className="cg-btn"
                      onClick={() =>
                        openCodeModal(
                          tpl.code_html,
                          "html",
                          `${tpl.title} — HTML`
                        )
                      }
                    >
                      HTML
                    </button>
                  )}
                  {tpl.code_css && (
                    <button
                      className="cg-btn"
                      onClick={() =>
                        openCodeModal(tpl.code_css, "css", `${tpl.title} — CSS`)
                      }
                    >
                      CSS
                    </button>
                  )}
                  {tpl.code_js && (
                    <button
                      className="cg-btn"
                      onClick={() =>
                        openCodeModal(
                          tpl.code_js,
                          "javascript",
                          `${tpl.title} — JS`
                        )
                      }
                    >
                      JS
                    </button>
                  )}
                  <button
                    className="cg-btn"
                    onClick={() => openPreview(iframeSrc)}
                  >
                    Full Preview
                  </button>

                  {tpl.download_link && (
                    <a
                      className="cg-download"
                      href={tpl.download_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download ZIP
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <CodeModal
        isOpen={codeModalOpen}
        onClose={closeCodeModal}
        code={modalCode}
        language={modalLanguage}
        title={modalTitle}
      />

      {previewOpen && (
        <div className="preview-modal show" onClick={closePreview}>
          <div
            className="preview-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="preview-header">
              <h3>Live Preview</h3>
              <button className="close-btn" onClick={closePreview}>
                ✕
              </button>
            </div>
            <iframe
              title="full-preview"
              srcDoc={previewHtml}
              className="preview-iframe"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      )}

      <div className="floating-action-buttons">
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FiArrowUp size={24} />
        </button>
      </div>
    </div>
  );
}

export default Coding;
