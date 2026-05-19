import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy, FiDownload, FiX } from "react-icons/fi";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "styles/codingPage.css";

export default function CodeModal({ isOpen, onClose, code, language, title }) {
  const codeRef = useRef(null);
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    if (isOpen && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [isOpen, code, language]);

  useEffect(() => {
    setCopyState("idle");
  }, [isOpen, code]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyWithFallback = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      return document.execCommand("copy");
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const handleCopy = async () => {
    const text = code || "";
    let copied = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) {
      copied = copyWithFallback(text);
    }

    setCopyState(copied ? "copied" : "failed");
    window.setTimeout(() => setCopyState("idle"), 1800);
  };

  const fileExtension =
    language === "javascript" ? "js" : language === "css" ? "css" : "html";
  const copied = copyState === "copied";
  const failed = copyState === "failed";

  return (
    <div className="cg-modal-backdrop" onClick={onClose}>
      <div
        className="cg-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Code"}
      >
        <div className="cg-modal-header">
          <h3>{title || "Code"}</h3>
          <button
            type="button"
            className="cg-close-btn"
            onClick={onClose}
            aria-label="Close code modal"
          >
            <FiX size={20} />
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
          <button
            type="button"
            className="cg-btn cg-btn-blue"
            onClick={handleCopy}
          >
            {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
            {copied ? "Copied" : failed ? "Try again" : "Copy"}
          </button>
          <a
            className="cg-btn cg-btn-green"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(
              code || ""
            )}`}
            download={`${(title || "code").replace(/\s+/g, "_")}.${fileExtension}`}
          >
            <FiDownload size={16} />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
