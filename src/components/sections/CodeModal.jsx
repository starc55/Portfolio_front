import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "styles/codingPage.css";

export default function CodeModal({ isOpen, onClose, code, language, title }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (isOpen && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [isOpen, code, language]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code || "");
      alert("Code copied!");
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Failed to copy code");
    }
  };

  return (
    <div className="cg-modal-backdrop" onClick={onClose}>
      <div className="cg-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cg-modal-header">
          <h3>{title || "Code"}</h3>
          <button className="cg-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="cg-modal-body">
          <pre className="cg-pre">
            <code ref={codeRef} className={`language-${language || "markup"}`}>
              {code || ""}
            </code>
          </pre>
        </div>

        <div className="cg-modal-footer">
          <button className="cg-btn cg-btn-blue" onClick={handleCopy}>
            Copy
          </button>
          <a
            className="cg-btn cg-btn-green"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              code || ""
            )}`}
            download={`${(title || "code").replace(/\s+/g, "_")}.${
              language === "javascript"
                ? "js"
                : language === "css"
                ? "css"
                : "html"
            }`}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
