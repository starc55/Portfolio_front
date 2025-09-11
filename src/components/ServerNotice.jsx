import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import "./component.css";

export default function ServerNotice({ show }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="server-notice">
      <FiAlertTriangle className="notice-icon" />
      <p className="notice-text">
        The server may have gone to sleep. Please wait a moment ⏳
      </p>
    </div>
  );
}
