import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodeModal from "components/sections/CodeModal";
import Notification from "components/ui/Notification";
import { fetchTemplates } from "lib/api";
import {
  FiArrowUp,
  FiChevronDown,
  FiCode,
  FiDownload,
  FiEye,
  FiFilter,
  FiHome,
  FiRefreshCw,
  FiSearch,
  FiX,
} from "react-icons/fi";
import "styles/codingPage.css";

gsap.registerPlugin(ScrollTrigger);

const ALL_CATEGORY = "All Categories";

const getTemplateField = (template, field, fallback = "") => {
  const value = template?.[field] ?? template?.attributes?.[field];
  return value ?? fallback;
};

const getTemplateId = (template, index) =>
  template?.id ??
  template?.documentId ??
  template?.attributes?.slug ??
  `template-${index}`;

const normalizeText = (value) => String(value || "").toLowerCase().trim();

function Coding() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [count, setCount] = useState(0);

  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [modalCode, setModalCode] = useState("");
  const [modalLanguage, setModalLanguage] = useState("html");
  const [modalTitle, setModalTitle] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");

  const [notification, setNotification] = useState(null);

  const dropdownRef = useRef(null);
  const gridRef = useRef(null);
  const triggersRef = useRef([]);

  const showNotification = useCallback((type, title, message) => {
    setNotification({ type, title, message });

    if (type !== "info") {
      window.setTimeout(() => setNotification(null), 4200);
    }
  }, []);

  const loadTemplates = useCallback(
    async (signal) => {
      setLoading(true);
      setError("");
      showNotification(
        "info",
        "Loading...",
        "Templates are loading from the server."
      );

      try {
        const data = await fetchTemplates({ signal });

        if (signal?.aborted) return;

        setTemplates(Array.isArray(data) ? data : []);

        if (data?.length) {
          showNotification("success", "Ready", `${data.length} templates loaded`);
        } else {
          showNotification("warning", "Empty", "No templates available yet.");
        }
      } catch (err) {
        if (err?.name === "AbortError") return;

        console.error("Templates loading error:", err);
        setTemplates([]);
        setError(
          "Templates could not be loaded. Please check the connection and try again."
        );
        showNotification(
          "error",
          "Error",
          "Unable to load templates from the server."
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [showNotification]
  );

  useEffect(() => {
    const controller = new AbortController();
    loadTemplates(controller.signal);

    return () => controller.abort();
  }, [loadTemplates]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        templates
          .map((template) => getTemplateField(template, "category"))
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    const query = normalizeText(search);

    return templates.filter((template) => {
      const templateCategory = getTemplateField(template, "category");
      const searchableText = [
        getTemplateField(template, "title"),
        getTemplateField(template, "description"),
        templateCategory,
      ]
        .map(normalizeText)
        .join(" ");

      const matchesSearch = query ? searchableText.includes(query) : true;
      const matchesCategory = category ? templateCategory === category : true;

      return matchesSearch && matchesCategory;
    });
  }, [templates, search, category]);

  const iframeHtmls = useMemo(() => {
    return templates.map((template, index) => {
      const libs = getTemplateField(template, "libs", []);
      const safeLibs = Array.isArray(libs) ? libs : [];
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
              .preview-wrapper {
                width: 100%;
                min-height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              ${getTemplateField(template, "code_css")}
            </style>
            ${safeLibs
              .map((lib) => `<script src="${lib}"></script>`)
              .join("\n")}
          </head>
          <body>
            <div class="preview-wrapper">${getTemplateField(
              template,
              "code_html"
            )}</div>
            <script>${getTemplateField(template, "code_js")}</script>
          </body>
        </html>`;

      return { id: getTemplateId(template, index), html };
    });
  }, [templates]);

  useEffect(() => {
    let current = 0;
    const target = filteredTemplates.length;

    if (target === 0) {
      setCount(0);
      return undefined;
    }

    const duration = 720;
    const step = Math.max(1, target / (duration / 16));
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
    triggersRef.current.forEach((trigger) => trigger?.kill());
    triggersRef.current = [];

    if (!gridRef.current || !filteredTemplates.length) return undefined;

    const cards = gridRef.current.querySelectorAll(".cg-card");

    cards.forEach((card) => {
      const tween = gsap.fromTo(
        card,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (tween.scrollTrigger) {
        triggersRef.current.push(tween.scrollTrigger);
      }
    });

    return () => {
      triggersRef.current.forEach((trigger) => trigger?.kill());
      triggersRef.current = [];
    };
  }, [filteredTemplates]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      setDropdownOpen(false);
      setPreviewOpen(false);
      setCodeModalOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

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

  const clearFilters = useCallback(() => {
    setSearch("");
    setCategory("");
    setDropdownOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const retryLoad = useCallback(() => {
    loadTemplates();
  }, [loadTemplates]);

  const activeCategoryLabel = category || ALL_CATEGORY;
  const hasActiveFilters = Boolean(search.trim() || category);

  return (
    <div className="tg-container">
      {notification && (
        <div className="cg-notification-slot">
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            showProgress={notification.type === "info"}
            onClose={() => setNotification(null)}
            autoClose={notification.type !== "info" ? 4 : undefined}
          />
        </div>
      )}

      <div className="cg-topbar">
        <button
          type="button"
          className="home-btn"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <FiHome size={22} />
        </button>

        <div className="cg-toolbar-title">
          <span className="cg-toolbar-kicker">
            <FiCode size={16} />
            Codes
          </span>
          <h1>Code Library</h1>
        </div>

        <div className="cg-controls">
          <div className="cg-search-wrap">
            <FiSearch className="cg-search-icon" />
            <input
              type="text"
              className="tg-search"
              placeholder="Search templates..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search templates"
            />
            {search && (
              <button
                type="button"
                className="cg-input-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
            >
              <FiFilter size={16} />
              <span>{activeCategoryLabel}</span>
              <FiChevronDown
                className={dropdownOpen ? "dropdown-chevron is-open" : "dropdown-chevron"}
                size={16}
              />
            </button>

            {dropdownOpen && (
              <ul className="dropdown-list">
                <li>
                  <button
                    type="button"
                    className={!category ? "dropdown-item is-active" : "dropdown-item"}
                    onClick={() => {
                      setCategory("");
                      setDropdownOpen(false);
                    }}
                  >
                    {ALL_CATEGORY}
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      className={category === cat ? "dropdown-item is-active" : "dropdown-item"}
                      onClick={() => {
                        setCategory(cat);
                        setDropdownOpen(false);
                      }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {hasActiveFilters && (
            <button type="button" className="cg-clear-btn" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>

        <div className="cg-count" aria-live="polite">
          Showing <span>{count}</span> / <span>{templates.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="cg-loading">
          <div className="cg-spinner" />
          <p>Templates are loading...</p>
        </div>
      ) : error ? (
        <div className="cg-empty cg-state-panel">
          <h2>Templates did not load</h2>
          <p>{error}</p>
          <button type="button" className="cg-btn cg-state-btn" onClick={retryLoad}>
            <FiRefreshCw size={16} />
            Retry
          </button>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="cg-empty cg-state-panel">
          <h2>No templates found</h2>
          <p>Try another keyword or reset the active category.</p>
          {hasActiveFilters && (
            <button type="button" className="cg-btn cg-state-btn" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="tg-grid" ref={gridRef}>
          {filteredTemplates.map((template, index) => {
            const templateId = getTemplateId(template, index);
            const title =
              getTemplateField(template, "title") || `Template ${index + 1}`;
            const description =
              getTemplateField(template, "description") ||
              "Reusable frontend component prepared for quick preview and copy.";
            const templateCategory =
              getTemplateField(template, "category") || "Component";
            const codeHtml = getTemplateField(template, "code_html");
            const codeCss = getTemplateField(template, "code_css");
            const codeJs = getTemplateField(template, "code_js");
            const downloadLink = getTemplateField(template, "download_link");
            const iframeSrc =
              iframeHtmls.find((item) => item.id === templateId)?.html || "";

            return (
              <article className="cg-card" key={templateId}>
                <div className="cg-card-head">
                  <div>
                    <span className="cg-category">{templateCategory}</span>
                    <h2 className="cg-title">{title}</h2>
                  </div>
                </div>

                <p className="cg-desc">{description}</p>

                <div className="cg-preview-wrap">
                  <iframe
                    title={`preview-${templateId}`}
                    srcDoc={iframeSrc}
                    className="cg-iframe"
                    sandbox="allow-scripts"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="cg-actions">
                  {codeHtml && (
                    <button
                      type="button"
                      className="cg-btn"
                      onClick={() =>
                        openCodeModal(codeHtml, "html", `${title} - HTML`)
                      }
                    >
                      <FiCode size={15} />
                      HTML
                    </button>
                  )}
                  {codeCss && (
                    <button
                      type="button"
                      className="cg-btn"
                      onClick={() => openCodeModal(codeCss, "css", `${title} - CSS`)}
                    >
                      <FiCode size={15} />
                      CSS
                    </button>
                  )}
                  {codeJs && (
                    <button
                      type="button"
                      className="cg-btn"
                      onClick={() =>
                        openCodeModal(codeJs, "javascript", `${title} - JS`)
                      }
                    >
                      <FiCode size={15} />
                      JS
                    </button>
                  )}
                  <button
                    type="button"
                    className="cg-btn cg-preview-btn"
                    onClick={() => openPreview(iframeSrc)}
                  >
                    <FiEye size={15} />
                    Preview
                  </button>

                  {downloadLink && (
                    <a
                      className="cg-download"
                      href={downloadLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FiDownload size={15} />
                      ZIP
                    </a>
                  )}
                </div>
              </article>
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
            onClick={(event) => event.stopPropagation()}
          >
            <div className="preview-header">
              <h3>Live Preview</h3>
              <button
                type="button"
                className="close-btn"
                onClick={closePreview}
                aria-label="Close preview"
              >
                <FiX size={20} />
              </button>
            </div>
            <iframe
              title="full-preview"
              srcDoc={previewHtml}
              className="preview-iframe"
              sandbox="allow-scripts"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      <div className="floating-action-buttons">
        <button
          type="button"
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FiArrowUp size={22} />
        </button>
      </div>
    </div>
  );
}

export default Coding;
