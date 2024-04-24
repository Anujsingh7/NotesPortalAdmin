import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, type, onClose }) => {
  // Automatically close the notification after 0.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
