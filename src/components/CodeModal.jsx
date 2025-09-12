import { useEffect, useRef } from "react";
import { useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "../pages/codingPage.css";

export default function CodeModal({ isOpen, onClose, code, language, title }) {
  const codeRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => {
        if (codeRef.current) {
          Prism.highlightElement(codeRef.current);
        }
      }, 50);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code || "").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  if (!visible) return null;

  return (
    <div
      className="cg-modal-backdrop"
      style={{
        animation: `${isOpen ? "fadeIn" : "fadeOut"} 0.3s ease forwards`,
      }}
      onClick={onClose}
    >
      <div
        className="cg-modal"
        style={{
          animation: `${isOpen ? "zoomIn" : "zoomOut"} 0.3s ease forwards`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
            {copied ? "Copied!" : "Copy"}
          </button>
          <a
            className="cg-btn cg-btn-green"
            href={`data:application/octet-stream,${encodeURIComponent(
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
