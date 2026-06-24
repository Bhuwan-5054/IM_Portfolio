"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Atmosphere() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 18 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100);
      mouseY.set((e.clientY / window.innerHeight) * 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="dynamic-spotlight"
        style={{
          background: `radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(255,255,255,0.13), transparent 34%)`,
        }}
      />

      <div className="film-grain" />

      <div className="dust-layer">
        {Array.from({ length: 42 }).map((_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 61) % 100}%`,
              animationDelay: `${(index % 9) * 0.8}s`,
              animationDuration: `${8 + (index % 7)}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
