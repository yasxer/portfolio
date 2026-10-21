"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { HiArrowUpRight, HiCheckBadge, HiOutlineDocumentText } from "react-icons/hi2";

const HeroScene = lazy(() => import("./HeroScene"));

const ROLES = [
  "Full-Stack Dev",
  "System Builder",
  "Problem Solver",
];

const BADGES = [
  {
    id: "74347ead-5db2-4ec2-97e2-ac96ca15d401",
    img: "/badges/worldskills-champion.png",
    title: "Champion",
    sub: "Mobile Applications Development",
  },
  {
    id: "8c580dcc-a7f1-4426-9b71-1d696243e16f",
    img: "/badges/worldskills-best-of-nation.png",
    title: "Best of Nation",
    sub: "Algeria",
  },
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
        const timeout = setTimeout(() => {
          setIdx((i) => (i + 1) % ROLES.length);
          setIsTyping(true);
        }, 300);
        return () => clearTimeout(timeout);
      }
    }
  }, [idx, displayText, isTyping]);

  return (
    <section className="hero" id="home">
      <div className="hero-layout">
        <div className="hero-text">
          <motion.div
            className="hero-status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: heroEase, delay: 0.2 }}
          >
            <span className="hero-status-dot" />
            Available for Projects
          </motion.div>

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
            transition={{ duration: 0.6, ease: heroEase, delay: 0.45 }}
          >
            {displayText}
          </motion.p>

          <motion.p
            className="hero-subtitle text-body"
            style={{ maxWidth: "480px", marginBottom: "40px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase, delay: 0.55 }}
          >
            Étudiant en BTS Développement Web &amp; Mobile. Je conçois des interfaces nettes et des architectures robustes, sans fioritures.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase, delay: 0.65 }}
          >
            <a href="#projects" className="btn-solid-dark">
              See the work <HiArrowRight />
            </a>
            <a href="#contact" className="btn-solid-cream">
              Contact me
            </a>
          </motion.div>

          <motion.div
            className="hero-creds"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase, delay: 0.8 }}
          >
            <div className="hero-creds-head">
              <span className="hero-creds-lbl">
                <HiCheckBadge /> WorldSkills Shanghai 2026
              </span>
              <a
                href="/Certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-creds-all"
              >
                <HiOutlineDocumentText /> All certificates
              </a>
            </div>
            <div className="hero-creds-list">
              {BADGES.map((b) => (
                <a
                  key={b.id}
                  href={`https://www.credly.com/badges/${b.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cred"
                  aria-label={`${b.title} — verify on Credly`}
                >
                  <Image src={b.img} alt="" width={64} height={64} className="hero-cred-img" priority />
                  <span className="hero-cred-txt">
                    <span className="hero-cred-title">{b.title}</span>
                    <span className="hero-cred-sub">{b.sub}</span>
                    <span className="hero-cred-verify">
                      Verified on Credly <HiArrowUpRight />
                    </span>
                  </span>
                </a>
              ))}
            </div>
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
