"use client";

import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import {
  SiNextdotjs, SiReact, SiJavascript, SiHtml5, SiCss,
} from "react-icons/si";
import {
  MotionSection,
  MotionDiv,
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleUp,
  lineReveal,
} from "./MotionSection";

const PROJECTS = [
  {
    title: "AlgServ",
    sub: "Services Platform",
    desc: "A full-featured services marketplace connecting clients with professionals across Algeria. Streamlined booking, provider management, and a polished responsive interface.",
    type: "Full-Stack Platform",
    url: "https://algserv.app/",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    icon: <SiNextdotjs />,
  },
  {
    title: "Shipix",
    sub: "Shipping & Logistics",
    desc: "A modern shipping and delivery management platform handling shipment tracking, logistics workflows, and multilingual support for a seamless customer experience.",
    type: "Web Application",
    url: "https://shipix.app/fr",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    icon: <SiReact />,
  },
  {
    title: "Storix",
    sub: "Hanot Dashboard",
    desc: "A comprehensive store management dashboard for inventory tracking, sales analytics, and business operations. Robust backend architecture with a crisp interface.",
    type: "Full-Stack System",
    url: "https://storix.yasserhs.me",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    icon: <SiNextdotjs />,
  },
  {
    title: "YacineSMS",
    sub: "Facilité Manager",
    desc: "Business management platform streamlining administrative tasks, client management, and operational workflows for enterprise efficiency.",
    type: "Web Application",
    url: "https://yacinesms.yasserhs.me",
    tags: ["Next.js", "React", "Supabase"],
    icon: <SiReact />,
  },
  {
    title: "Assafi2",
    sub: "Stories of the Prophets",
    desc: "Educational platform featuring interactive content with a beautiful, clean UI designed for accessible learning.",
    type: "Frontend App",
    url: "https://assafi2.vercel.app",
    tags: ["React", "JavaScript", "CSS"],
    icon: <SiJavascript />,
  },
  {
    title: "ZeroDays",
    sub: "Cyber Security & IT",
    desc: "A professional cybersecurity and IT services platform. Brutalist design emphasizing security, penetration testing, and IT consulting.",
    type: "Corporate Platform",
    url: "https://zerodayss.vercel.app",
    tags: ["React", "Tailwind CSS"],
    icon: <SiCss />,
  },
  {
    title: "Hangman Game",
    sub: "Interactive Logic",
    desc: "A classic hangman word-guessing game built from scratch enforcing strict game logic and states.",
    type: "Game Logic",
    github: "https://github.com/YasserHaoues/Hangman-Game",
    tags: ["HTML5", "CSS3", "Vanilla JS"],
    icon: <SiHtml5 />,
  },
];

export default function Projects() {
  return (
    <MotionSection
      className="sec"
      id="projects"
      style={{ backgroundColor: "var(--bg-white)" }}
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
            SELECTED PROJECTS
          </motion.h2>
        </motion.div>

        <div className="proj-list">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              className="proj-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.05 },
                },
              }}
            >
              <MotionDiv
                className="proj-media idle-anim-float-rev"
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
              >
                <div className="proj-icon-massive idle-anim-pulse">{p.icon}</div>
              </MotionDiv>

              <MotionDiv className="proj-body" variants={i % 2 === 0 ? fadeRight : fadeLeft}>
                <span className="proj-type">{p.type}</span>
                <h3 className="heading-sm" style={{ marginBottom: "8px" }}>{p.title}</h3>
                <p className="text-body" style={{ color: "var(--text-muted)", marginBottom: "24px" }}>{p.sub}</p>
                <p className="text-body" style={{ marginBottom: "24px" }}>{p.desc}</p>

                <div className="proj-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="proj-tag">{t}</span>
                  ))}
                </div>

                <div className="proj-links">
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-solid-dark" style={{ padding: "12px 24px" }}>
                      View Live <HiArrowUpRight />
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-solid-cream" style={{ padding: "12px 24px" }}>
                      Source Code
                    </a>
                  )}
                </div>
              </MotionDiv>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
