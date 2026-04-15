"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

const HeroScene = lazy(() => import("./HeroScene"));

const ROLES = [
  "Full-Stack Dev",
  "System Builder",
  "Problem Solver",
];

const heroEase = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentRole = ROLES[idx];

    if (isTyping) {
      if (displayText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 1800);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setIdx((i) => (i + 1) % ROLES.length);
        setIsTyping(true);
      }
    }
  }, [idx, displayText, isTyping]);

  return (
    <section className="hero" id="home">
      <div className="hero-layout">
        <div className="hero-text">
          <motion.div
            className="brand-block-line"
            style={{ width: "80px", marginBottom: "40px" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: heroEase, delay: 0.2 }}
          />

          <motion.h1
            className="hero-h1 display-huge"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: heroEase, delay: 0.3 }}
          >
            YASSER<br />
            <span className="hero-h1-mark">HAOUES</span>
          </motion.h1>

          <motion.p
            className="hero-role heading-sm hero-role-cursor"
            style={{ fontWeight: 400, minHeight: "40px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase, delay: 0.5 }}
          >
            {displayText}
          </motion.p>

          <motion.p
            className="hero-subtitle text-body"
            style={{ maxWidth: "480px", marginBottom: "40px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase, delay: 0.6 }}
          >
            Étudiant en BTS Développement Web &amp; Mobile. Je conçois des interfaces nettes et des architectures robustes, sans fioritures.
          </motion.p>

          <motion.div
            className="hero-status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: heroEase, delay: 0.7 }}
          >
            <span className="hero-status-dot" />
            Available for Projects
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase, delay: 0.8 }}
          >
            <a href="#projects" className="btn-solid-dark">
              See the work <HiArrowRight />
            </a>
            <a href="#contact" className="btn-solid-cream">
              Contact me
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-3d-wrap"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: heroEase, delay: 0.4 }}
        >
          <Suspense
            fallback={
              <div className="text-caption" style={{ color: "var(--text-muted)" }}>
                Loading scene...
              </div>
            }
          >
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
