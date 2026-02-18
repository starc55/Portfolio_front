import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaRegMoon } from "react-icons/fa";

const MoonCursor = () => {
  const cursorRef = useRef(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 1000, damping: 80 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 80 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cursorRef}
      className="moon-cursor"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <FaRegMoon />
    </motion.div>
  );
};

export default MoonCursor;
