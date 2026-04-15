"use client";

import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";
import {
  MotionSection,
  MotionStagger,
  MotionDiv,
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleUp,
  lineReveal,
} from "./MotionSection";

const EDUCATION = [
  {
    date: "2024 — Present",
    title: "BTS Développement Web et Mobile",
    sub: "INSFP TEYEB BOUSENNA, Alger",
    desc: "Formation en développement web full-stack, mobile, et bases de données. Strictement technique.",
  },
  {
    date: "2022 — Present",
    title: "Licence Informatique",
    sub: "USTHB, Alger",
    desc: "Informatique fondamentale, algorithmique, structures de données.",
  },
];

const EXPERIENCE = [
  {
    date: "Mai 2025 — Janvier 2026",
    title: "Développeur Freelance",
    sub: "Y&I — Alger",
    desc: "Développement d'un logiciel métier pour la gestion de stock et de clientèle. Architecture logicielle complète.",
  },
];

const CERTIFICATES = [
  "1ère place — Qualifications d'État WorldSkills",
  "2ème place — Qualifications Régionales WorldSkills",
  "1ère place — Qualifications Nationales WorldSkills"
];

export default function Timeline() {
  return (
    <MotionSection
      className="sec"
      id="journey"
      style={{ backgroundColor: "var(--bg-cream)" }}
      variants={fadeUp}
      threshold={0.05}
    >
      <div className="con">
        <motion.div className="sec-head" variants={fadeUp}>
          <motion.div
            className="brand-block-line"
            style={{ height: "4px", width: "40px", marginBottom: "40px" }}
            variants={lineReveal}
          />
          <motion.h2 className="heading-lg" variants={fadeUp}>
            EXPERIENCE
          </motion.h2>
        </motion.div>

        <MotionStagger className="about-grid" speed="slow" threshold={0.05}>
          {/* Work Column */}
          <MotionDiv variants={fadeLeft}>
            <h3 className="heading-sm" style={{ marginBottom: "40px", textTransform: "uppercase" }}>Work</h3>
            <div className="tl-path">
              {EXPERIENCE.map((e, i) => (
                <motion.div
                  key={i}
                  className="tl-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                >
                  <div className="tl-marker" />
                  <span className="proj-type" style={{ color: "var(--text-muted)", marginBottom: "8px" }}>{e.date}</span>
                  <h4 className="heading-sm" style={{ fontSize: "clamp(18px, 3vw, 24px)", marginBottom: "8px" }}>{e.title}</h4>
                  <p className="text-body" style={{ color: "var(--mistral-orange)", marginBottom: "16px" }}>{e.sub}</p>
                  <p className="text-body">{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </MotionDiv>

          {/* Education Column */}
          <MotionDiv variants={fadeRight}>
            <h3 className="heading-sm" style={{ marginBottom: "40px", textTransform: "uppercase" }}>Education</h3>
            <div className="tl-path">
              {EDUCATION.map((e, i) => (
                <motion.div
                  key={i}
                  className="tl-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                >
                  <div className="tl-marker" />
                  <span className="proj-type" style={{ color: "var(--text-muted)", marginBottom: "8px" }}>{e.date}</span>
                  <h4 className="heading-sm" style={{ fontSize: "clamp(18px, 3vw, 24px)", marginBottom: "8px" }}>{e.title}</h4>
                  <p className="text-body" style={{ color: "var(--sun-900)", marginBottom: "16px" }}>{e.sub}</p>
                  <p className="text-body">{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </MotionDiv>
        </MotionStagger>

        {/* Certifications */}
        <div style={{ marginTop: "clamp(60px, 10vw, 120px)" }}>
          <MotionStagger speed="normal" threshold={0.1}>
            <MotionDiv variants={fadeUp}>
              <h3 className="heading-sm" style={{ marginBottom: "40px", textTransform: "uppercase" }}>Certifications</h3>
            </MotionDiv>
            <motion.div className="cert-grid" variants={fadeUp}>
              {CERTIFICATES.map((c, i) => (
                <MotionDiv key={i} className="cert-card-premium" variants={scaleUp}>
                  <div className="cert-ribbon" />
                  <div className="cert-content">
                    <div className="cert-icon-wrap">
                      <HiStar className="cert-icon-star" />
                    </div>
                    <div>
                      <span className="cert-label">Official Credential</span>
                      <h4 className="cert-title">{c}</h4>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </motion.div>
          </MotionStagger>
        </div>
      </div>
    </MotionSection>
  );
}
