"use client";

import { motion } from "framer-motion";
import {
  MotionSection,
  MotionStagger,
  MotionDiv,
  fadeUp,
  fadeLeft,
  fadeRight,
  lineReveal,
} from "./MotionSection";

export default function About() {
  return (
    <MotionSection className="sec" id="about" variants={fadeUp} threshold={0.1}>
      <div className="con">
        <motion.div className="sec-head" variants={fadeUp}>
          <motion.div
            className="brand-block-line"
            style={{ height: "4px", width: "40px", marginBottom: "40px" }}
            variants={lineReveal}
          />
          <motion.h2 className="heading-lg" variants={fadeUp}>
            ABOUT THE WORK
          </motion.h2>
        </motion.div>

        <MotionStagger className="about-grid" speed="slow" threshold={0.1}>
          <MotionDiv
            className="sharp-card"
            style={{
              padding: "64px 40px",
              backgroundColor: "var(--mistral-black)",
              color: "var(--text-light)",
            }}
            variants={fadeLeft}
          >
            <div
              className="brand-block-line"
              style={{ height: "4px", width: "40px", marginBottom: "40px" }}
            />
            <h3 className="heading-sm" style={{ marginBottom: "24px" }}>
              Crafting digital experiences with precision and warmth.
            </h3>
            <p
              className="text-body"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Je développe des applications rigoureuses, sans fioritures. Mon
              approche est brute : des interfaces nettes, une architecture
              solide et des performances maximales. Compétiteur WorldSkills,
              j&apos;ai appris à livrer sous pression et à respecter les
              standards les plus exigeants.
            </p>
          </MotionDiv>

          <MotionDiv variants={fadeRight}>
            <div className="about-stats idle-anim-float">
              <div className="stat-box">
                <span className="stat-num">5+</span>
                <span className="stat-lbl">Projects</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">4</span>
                <span className="stat-lbl">Certificates</span>
              </div>
              <div className="stat-box" style={{ gridColumn: "1 / -1" }}>
                <span
                  className="stat-num"
                  style={{ color: "var(--mistral-orange)" }}
                >
                  100%
                </span>
                <span className="stat-lbl">Commitment</span>
              </div>
            </div>
          </MotionDiv>
        </MotionStagger>
      </div>
    </MotionSection>
  );
}
