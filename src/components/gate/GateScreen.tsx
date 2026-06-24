"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Clapperboard, ScanLine } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useSound } from "@/hooks/useSound";
import Atmosphere from "@/components/gate/Atmosphere";
import MemoryPrism from "@/components/gate/MemoryPrism";

type WorldType = "creator" | "cyber";

const QUESTIONS = [
  {
    question: "What brings you here?",
    options: [
      { label: "I need cinematic / creative work", value: "creator" },
      { label: "I need cybersecurity / technical work", value: "cyber" },
    ],
  },
  {
    question: "Which side of Bhuwan do you want to explore first?",
    options: [
      { label: "Visual storytelling, edits and films", value: "creator" },
      { label: "Ethical hacking, labs and research", value: "cyber" },
    ],
  },
  {
    question: "What kind of proof matters more right now?",
    options: [
      { label: "Showreels, videos and visual projects", value: "creator" },
      { label: "Tools, reports, certificates and GitHub", value: "cyber" },
    ],
  },
];

export default function GateScreen() {
  const [selected, setSelected] = useState<WorldType | null>(null);
  const [creatorScore, setCreatorScore] = useState(50);
  const [cyberScore, setCyberScore] = useState(50);
  const [scanStarted, setScanStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [recommendation, setRecommendation] = useState<WorldType | null>(null);

  const { playSound } = useSound();

  const normalizedScores = useMemo(() => {
    const total = creatorScore + cyberScore;
    return {
      creator: Math.round((creatorScore / total) * 100),
      cyber: Math.round((cyberScore / total) * 100),
    };
  }, [creatorScore, cyberScore]);

  const trackIntent = (type: WorldType) => {
    if (selected || scanStarted) return;

    if (type === "creator") {
      setCreatorScore((prev) => Math.min(prev + 4, 130));
      playSound("hoverCreator");
    } else {
      setCyberScore((prev) => Math.min(prev + 4, 130));
      playSound("hoverCyber");
    }
  };

  const startScan = () => {
    if (selected) return;
    setScanStarted(true);
    setRecommendation(null);
    setQuestionIndex(0);
  };

  const answerQuestion = (value: WorldType) => {
    if (value === "creator") {
      setCreatorScore((prev) => prev + 35);
      playSound("hoverCreator");
    } else {
      setCyberScore((prev) => prev + 35);
      playSound("hoverCyber");
    }

    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setTimeout(() => {
        const finalCreator =
          value === "creator" ? creatorScore + 35 : creatorScore;
        const finalCyber = value === "cyber" ? cyberScore + 35 : cyberScore;

        setRecommendation(finalCreator >= finalCyber ? "creator" : "cyber");
        setScanStarted(false);
      }, 350);
    }
  };

  const enterWorld = (type: WorldType) => {
    if (selected) return;

    setSelected(type);
    playSound(type === "creator" ? "selectCreator" : "selectCyber");

    setTimeout(() => {
      window.location.href = type === "creator" ? ROUTES.creator : ROUTES.cyber;
    }, 4800);
  };

  const currentQuestion = QUESTIONS[questionIndex];

  return (
    <section className={`gate-screen ${selected ? `is-${selected}` : ""}`}>
      <div className="gate-bg" />
      <Atmosphere />
      <div className="gate-noise" />

      <motion.div
        className="gate-header"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p>DUALITY GATE</p>
        <h1>Enter the version of Bhuwan you came to discover.</h1>
        <span>Choose manually, or let Gatekeeper-B guide the route.</span>
      </motion.div>

      <div className="gate-center">
        <button
          className={`identity-card creator ${
            recommendation === "creator" ? "recommended" : ""
          }`}
          onMouseEnter={() => trackIntent("creator")}
          onClick={() => enterWorld("creator")}
        >
          <Clapperboard size={34} />
          <h2>Creator World</h2>
          <p>Films, edits, visuals, stories and cinematic identity.</p>
          <span>Enter Creative Reality</span>

          {recommendation === "creator" && (
            <strong className="recommend-badge">Recommended Route</strong>
          )}
        </button>

        <div className="gate-core-area">
          <MemoryPrism recommendation={recommendation} />

          <div className="intent-panel">
            <p>GATEKEEPER-B</p>

            {!scanStarted && !recommendation && (
              <>
                <span>
                  I can read your purpose through a few quick choices.
                </span>

                <button className="scan-button" onClick={startScan}>
                  <ScanLine size={16} />
                  Begin Intent Scan
                </button>
              </>
            )}

            {scanStarted && (
              <motion.div
                key={questionIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="question-box"
              >
                <small>
                  Question {questionIndex + 1} / {QUESTIONS.length}
                </small>

                <h3>{currentQuestion.question}</h3>

                <div className="answer-list">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => answerQuestion(option.value as WorldType)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {recommendation && !scanStarted && (
              <>
                <span>
                  Intent Match:{" "}
                  {recommendation === "creator"
                    ? `${normalizedScores.creator}% Creator`
                    : `${normalizedScores.cyber}% Cyber`}
                </span>

                <button
                  className="scan-button"
                  onClick={() => enterWorld(recommendation)}
                >
                  Enter Recommended World
                </button>

                <button
                  className="scan-button ghost"
                  onClick={() => {
                    setRecommendation(null);
                    setScanStarted(true);
                    setQuestionIndex(0);
                    setCreatorScore(50);
                    setCyberScore(50);
                  }}
                >
                  Scan Again
                </button>
              </>
            )}

            <div className="score-grid">
              <div>
                <label>Creator</label>
                <div className="score-bar">
                  <i style={{ width: `${normalizedScores.creator}%` }} />
                </div>
                <small>{normalizedScores.creator}%</small>
              </div>

              <div>
                <label>Cyber</label>
                <div className="score-bar">
                  <i style={{ width: `${normalizedScores.cyber}%` }} />
                </div>
                <small>{normalizedScores.cyber}%</small>
              </div>
            </div>
          </div>
        </div>

        <button
          className={`identity-card cyber ${
            recommendation === "cyber" ? "recommended" : ""
          }`}
          onMouseEnter={() => trackIntent("cyber")}
          onClick={() => enterWorld("cyber")}
        >
          <Shield size={34} />
          <h2>Cyber World</h2>
          <p>Security research, ethical hacking, labs and digital defense.</p>
          <span>Enter Secure Reality</span>

          {recommendation === "cyber" && (
            <strong className="recommend-badge">Recommended Route</strong>
          )}
        </button>
      </div>

      {selected && (
        <motion.div
          className={`redirect-overlay ${selected}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <div className="transition-orbit" />
          <div className="transition-grid" />
          <div className="transition-vignette" />

          {selected === "creator" ? (
            <>
              <motion.div
                className="film-strip strip-one"
                initial={{ x: "-120%", rotate: -12 }}
                animate={{ x: "120%", rotate: -12 }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
              />
              <motion.div
                className="film-strip strip-two"
                initial={{ x: "120%", rotate: 14 }}
                animate={{ x: "-120%", rotate: 14 }}
                transition={{ duration: 3.2, ease: "easeInOut", delay: 0.25 }}
              />
            </>
          ) : (
            <>
              <motion.div
                className="terminal-rain"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.8] }}
                transition={{ duration: 2.4 }}
              />
              <motion.div
                className="cyber-scan"
                initial={{ y: "-20%" }}
                animate={{ y: "120%" }}
                transition={{ duration: 3.4, ease: "easeInOut" }}
              />
            </>
          )}

          <motion.div
            className="redirect-core premium"
            initial={{ scale: 0.72, opacity: 0, filter: "blur(28px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.15, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {selected === "creator" ? "CREATIVE ROUTE" : "SECURE ROUTE"}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              {selected === "creator"
                ? "Rendering Creative Reality..."
                : "Establishing Secure Route..."}
            </motion.h2>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.65, 1] }}
              transition={{ duration: 1.8, delay: 1.05 }}
            >
              {selected === "creator"
                ? "Frames aligning. Memory opening. Story loading."
                : "Identity verified. Tunnel encrypted. Access granted."}
            </motion.span>
          </motion.div>

          <motion.div
            className="redirect-line premium-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4.15, ease: "easeInOut" }}
          />

          <motion.div
            className="final-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.9] }}
            transition={{ duration: 4.75, times: [0, 0.86, 1] }}
          />
        </motion.div>
      )}
    </section>
  );
}
