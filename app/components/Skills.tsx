"use client";

import { motion } from "framer-motion";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiTailwindcss, SiBootstrap,
  SiNodedotjs, SiPhp, SiLaravel, SiPython,
  SiMysql, SiPostgresql, SiSupabase,
  SiGit, SiGithub, SiFigma, SiVercel,
} from "react-icons/si";
import {
  MotionSection,
  MotionStagger,
  MotionDiv,
  fadeUp,
  scaleUp,
  blurIn,
  lineReveal,
} from "./MotionSection";

const CATEGORIES = [
  {
    title: "Frontend & Core",
    skills: [
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS", icon: <SiCss /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
    ]
  },
  {
    title: "Backend & Systems",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "PHP", icon: <SiPhp /> },
      { name: "Laravel", icon: <SiLaravel /> },
      { name: "Python", icon: <SiPython /> },
    ]
  },
  {
    title: "Database & Data",
    skills: [
      { name: "Supabase", icon: <SiSupabase /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MySQL", icon: <SiMysql /> },
    ]
  },
  {
    title: "Tools & Deployment",
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Vercel", icon: <SiVercel /> },
      { name: "Figma", icon: <SiFigma /> },
    ]
  }
];

export default function Skills() {
  return (
    <MotionSection
      className="sec"
      id="skills"
      style={{ backgroundColor: "var(--mistral-black)", color: "var(--bg-ivory)" }}
      variants={fadeUp}
      threshold={0.05}
    >
      <div className="con">
        <motion.div className="sec-head" style={{ textAlign: "center" }} variants={fadeUp}>
          <motion.div
            className="brand-block-line"
            style={{ height: "4px", width: "80px", margin: "0 auto 40px auto" }}
            variants={lineReveal}
          />
          <motion.h2
            className="display-huge"
            style={{ letterSpacing: "-3px", textTransform: "uppercase" }}
            variants={blurIn}
          >
            The Arsenal
          </motion.h2>
        </motion.div>

        <div className="skills-artistic-layout">
          {CATEGORIES.map((cat) => (
            <MotionStagger key={cat.title} className="skill-cat-group" speed="fast" threshold={0.1}>
              <MotionDiv variants={fadeUp}>
                <h3 className="skill-cat-title">{cat.title}</h3>
              </MotionDiv>
              <motion.div className="skill-tag-grid" variants={fadeUp}>
                {cat.skills.map((s) => (
                  <MotionDiv key={s.name} className="skill-tag" variants={scaleUp}>
                    <span className="skill-tag-icon">{s.icon}</span>
                    <span className="skill-tag-name">{s.name}</span>
                  </MotionDiv>
                ))}
              </motion.div>
            </MotionStagger>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
