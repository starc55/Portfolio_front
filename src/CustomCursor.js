// src/components/CustomCursor.js
import React, { useEffect, useState } from "react";
import "./CustomCursor.css";
import cursorImage from "./new year version img/cursor.png"; // Fayl manzili

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0); // Aylanish burchagi

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setRotation((prevRotation) => prevRotation + 5); // Har bir harakatda aylanish
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      <img src={cursorImage} alt="Custom Cursor" />
    </div>
  );
};

export default CustomCursor;
