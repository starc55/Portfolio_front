import React from "react";
import "styles/notification.css";

const Notification = ({
  type = "info",
  title = "Notification",
  message,
  onClose,
  showProgress = false,
  autoClose = false,
}) => {
  const notificationStyles = {
    success: {
      bg: "#00c853",
      icon: "✓",
      iconBg: "#fff",
      iconColor: "#00c853",
    },
    info: {
      bg: "#0a84ff",
      icon: "?",
      iconBg: "#fff",
      iconColor: "#0a84ff",
    },
    warning: {
      bg: "#ffab00",
      icon: "!",
      iconBg: "#fff",
      iconColor: "#ffab00",
    },
    error: {
      bg: "#d50000",
      icon: "×",
      iconBg: "#fff",
      iconColor: "#d50000",
    },
  };

  const style = notificationStyles[type] || notificationStyles.info;

  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoClose * 1000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className="notification-container">
      <div className="notification" style={{ background: style.bg }}>
        <div className="header">
          <div
            className="icon-circle"
            style={{
              background: style.iconBg,
              color: style.iconColor,
            }}
          >
            {style.icon}
          </div>
          <span className="sender">{title}</span>
          {onClose && (
            <span className="close" onClick={onClose}>
              ×
            </span>
          )}
        </div>

        <div className="message">{message}</div>

        {showProgress && (
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
