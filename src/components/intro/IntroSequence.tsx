"use client";

import { motion } from "framer-motion";

type Props = {
  onComplete: () => void;
};

export default function IntroSequence({ onComplete }: Props) {
  return (
    <section className="intro-screen">
      <motion.div
        className="intro-ambient-pulse"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 0.45, 0.15], scale: [0.7, 1.25, 1.6] }}
        transition={{ duration: 3.2, ease: "easeOut" }}
      />

      <motion.p
        className="intro-line"
        initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [16, 0, 0, -10],
          filter: ["blur(12px)", "blur(0px)", "blur(0px)", "blur(10px)"],
        }}
        transition={{ duration: 3.2, delay: 1.2, times: [0, 0.25, 0.75, 1] }}
      >
        Every mind contains worlds.
      </motion.p>

      <motion.p
        className="intro-line"
        initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [16, 0, 0, -10],
          filter: ["blur(12px)", "blur(0px)", "blur(0px)", "blur(10px)"],
        }}
        transition={{ duration: 3.2, delay: 4.6, times: [0, 0.25, 0.75, 1] }}
      >
        Some create them.
      </motion.p>

      <motion.p
        className="intro-line"
        initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [16, 0, 0, -10],
          filter: ["blur(12px)", "blur(0px)", "blur(0px)", "blur(10px)"],
        }}
        transition={{ duration: 3.2, delay: 8.0, times: [0, 0.25, 0.75, 1] }}
      >
        Some protect them.
      </motion.p>

      <motion.div
        className="intro-name glitch-name"
        initial={{ opacity: 0, y: 34, scale: 0.96, filter: "blur(22px)" }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [34, 0, 0, 0],
          scale: [0.96, 1, 1, 1],
          filter: ["blur(22px)", "blur(0px)", "blur(0px)", "blur(0px)"],
        }}
        transition={{
          duration: 4,
          delay: 11.4,
          times: [0, 0.25, 0.92, 1],
          ease: "easeOut",
        }}
      >
        <h1 data-text="BHUWAN KIRNAPURE">BHUWAN KIRNAPURE</h1>
        <span>Two Worlds. One Mind.</span>
      </motion.div>

      <motion.div
        className="intro-final-glitch"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 0.95,
          delay: 15.45,
          times: [0, 0.18, 0.82, 1],
        }}
        onAnimationComplete={onComplete}
      />
    </section>
  );
}
