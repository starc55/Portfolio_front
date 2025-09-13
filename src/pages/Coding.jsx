import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CodeModal from "../components/CodeModal";
import { FiSun, FiMoon, FiSearch, FiArrowUp } from "react-icons/fi";
import "./codingPage.css";
import ServerNotice from "../components/ServerNotice";

gsap.registerPlugin(ScrollTrigger);

function Coding() {
  const [serverSleep, setServerSleep] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All Categories");
  const [count, setCount] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCode, setModalCode] = useState("");
  const [modalLang, setModalLang] = useState("html");
  const [modalTitle, setModalTitle] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewTheme, setPreviewTheme] = useState({});

  const gridRef = useRef(null);

  // 🌀 Filtered templates optimized
  const filtered = useMemo(() => {
    return templates.filter((tpl) => {
      const titleMatch = tpl.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const catMatch = category ? tpl.category === category : true;
      return titleMatch && catMatch;
    });
  }, [templates, search, category]);

  // 🌀 Scroll to top
  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let start = 0;
    const end = filtered.length;
    const duration = 800; // ms
    const stepTime = 1000 / 60;
    const increment = end / (duration / stepTime);

    let current = start;
    function animate() {
      current += increment;
      if (current < end) {
        setCount(Math.floor(current));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }
    animate();
  }, [filtered.length]);

  // 🌀 Fetch templates
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://portfolio-strapi-backend-kjih.onrender.com/api/templates"
        );
        const data = await res.json();
        setTemplates(data.data || []);
      } catch (err) {
        console.error("Failed to load templates:", err);
        setTemplates([]);
        setServerSleep(true);
      } finally {
        setTimeout(() => setLoading(false), 350);
      }
    };
    loadTemplates();
  }, []);

  // 🌀 GSAP animation
  useEffect(() => {
    if (!gridRef.current) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    const cards = gridRef.current.querySelectorAll(".cg-card");

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: window.innerWidth < 768 ? "top 95%" : "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, [templates]);

  // 🌀 Categories optimized
  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          templates.map((t) => t.category).filter((c) => c && c.trim() !== "")
        )
      ),
    [templates]
  );

  // 🌀 Modal openers
  const openCodeModal = useCallback((code, lang, title) => {
    setModalCode(code || "");
    setModalLang(lang || "markup");
    setModalTitle(title || "Code");
    setModalOpen(true);
  }, []);

  const openPreviewModal = useCallback((iframeHtml) => {
    setPreviewHtml(iframeHtml);
    setPreviewOpen(true);
  }, []);

  const togglePreviewTheme = useCallback((id) => {
    setPreviewTheme((p) => ({
      ...p,
      [id]: p[id] === "dark" ? "light" : "dark",
    }));
  }, []);

  // 🌀 Iframe HTML'larni oldindan hisoblab olish
  const iframeHtmls = useMemo(() => {
    return templates.map((tpl) => {
      const theme = previewTheme[tpl.id] || "light";
      const html = `
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            :root { --bg: ${theme === "dark" ? "#0b1220" : "#ffffff"};
                    --fg: ${theme === "dark" ? "#e6eef8" : "#0b1220"}; }
            html, body {
              width : 100%;
              height: 100%;
              margin: 0;
              background: var(--bg);
              color: var(--fg);
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              transition: background 0.4s ease, color 0.4s ease;
            }
            * { box-sizing: border-box; }
            ${tpl.code_css || ""}
          </style>
          ${(tpl.libs || [])
            .map((lib) => `<script src="${lib}"></script>`)
            .join("\n")}
        </head>
        <body>
          <div class="preview-wrapper">
            ${tpl.code_html || ""}
          </div>
          <script>${tpl.code_js || ""}</script>
        </body>
      </html>`;
      return { id: tpl.id, html };
    });
  }, [templates, previewTheme]);

  return (
    <div className="tg-container">
      <ServerNotice show={serverSleep} />

      {/* 🔍 Search + Categories */}
      <div className="cg-topbar">
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

        <div className="flex-in__mobile">
          <div className="dropdown">
            <button className="dropdown-btn" onClick={() => setOpen((o) => !o)}>
              {selected}
            </button>
            {open && (
              <ul className="dropdown-list">
                {["All Categories", ...categories].map((c, i) => (
                  <li
                    key={i}
                    className="dropdown-item"
                    onClick={() => {
                      setSelected(c);
                      setCategory(c === "All Categories" ? "" : c);
                      setOpen(false);
                    }}
                  >
                    {c}
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
      </div>

      {/* 🌀 Loading / Empty / Grid */}
      {loading ? (
        <div className="cg-loading">
          <div className="cg-spinner" />
          <p>Loading templates...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="cg-empty">No templates found.</div>
      ) : (
        <div className="tg-grid" ref={gridRef}>
          {filtered.map((tpl) => {
            const theme = previewTheme[tpl.id] || "light";

            const iframeHtml =
              iframeHtmls.find((i) => i.id === tpl.id)?.html ||
              ""(
                () => `
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style>
                    :root { --bg: ${
                      theme === "dark" ? "#0b1220" : "#ffffff"
                    }; --fg: ${theme === "dark" ? "#e6eef8" : "#0b1220"}; }
                    html, body {
                      width : 100%;
                      height: 100%;
                      margin: 0;
                      background: var(--bg);
                      color: var(--fg);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      overflow: hidden;
                      transition: background 0.4s ease, color 0.4s ease;
                    }
                    * { box-sizing: border-box; }
                    ${tpl.code_css || ""}
                  </style>
                  ${(tpl.libs || [])
                    .map((lib) => `<script src="${lib}"></script>`)
                    .join("\n")}
                </head>
                <body>
                  <div class="preview-wrapper">
                    ${tpl.code_html || ""}
                  </div>
                  <script>${tpl.code_js || ""}</script>
                </body>
              </html>`,
                [tpl, theme]
              );

            return (
              <div className="cg-card" key={tpl.id}>
                <div className="cg-card-head">
                  <h3 className="cg-title">{tpl.title}</h3>
                  <div className="cg-head-actions">
                    <button
                      className="cg-small"
                      onClick={() => togglePreviewTheme(tpl.id)}
                      aria-label="Toggle preview theme"
                    >
                      {theme === "dark" ? <FiSun /> : <FiMoon />}
                    </button>
                  </div>
                </div>

                <p className="cg-desc">{tpl.description}</p>

                <div className="cg-preview-wrap">
                  <iframe
                    title={`preview-${tpl.id}`}
                    srcDoc={iframeHtml}
                    className="cg-iframe"
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
                    onClick={() => openPreviewModal(iframeHtml)}
                  >
                    Full Preview
                  </button>

                  {tpl.download_link && (
                    <div className="cg-right-actions">
                      <a
                        className="cg-download"
                        href={tpl.download_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download ZIP
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🌀 Code Modal */}
      <CodeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        code={modalCode}
        language={modalLang}
        title={modalTitle}
      />

      {/* 🌀 Preview Modal */}
      {previewOpen && (
        <div
          className={`preview-modal ${previewOpen ? "show" : "hide"}`}
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="preview-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="preview-header">
              <h3>Live Preview</h3>
              <button
                className="close-btn"
                onClick={() => setPreviewOpen(false)}
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>
            <iframe
              title="full-preview"
              srcDoc={previewHtml}
              className="preview-iframe"
            />
          </div>
        </div>
      )}

      <button
        className="scroll-top-btn"
        onClick={scrollTop}
        aria-label="Scroll to top"
      >
        <FiArrowUp size={22} />
      </button>
    </div>
  );
}

export default Coding;
