"use client";

import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import {
  MotionSection,
  MotionStagger,
  MotionDiv,
  fadeUp,
  scaleUp,
  lineReveal,
} from "./MotionSection";

const CONTACTS = [
  { label: "Email", val: "yasser.haoues66@gmail.com", href: "mailto:yasser.haoues66@gmail.com", icon: <HiMail /> },
  { label: "Phone", val: "+213 562451840", href: "tel:+213562451840", icon: <HiPhone /> },
  { label: "GitHub", val: "yasxer", href: "https://github.com/yasxer", icon: <SiGithub /> },
  { label: "Location", val: "City Ben Zarga, Alger", href: "#", icon: <HiLocationMarker /> },
];

export default function Contact() {
  return (
    <MotionSection
      className="sec"
      id="contact"
      style={{ backgroundColor: "var(--bg-white)" }}
      variants={fadeUp}
      threshold={0.1}
    >
      <div className="con">
        <motion.div className="sec-head" variants={fadeUp}>
          <motion.div
            className="brand-block-line"
            style={{ height: "4px", width: "40px", marginBottom: "40px" }}
            variants={lineReveal}
          />
          <motion.h2 className="heading-lg" variants={fadeUp}>
            CONTACT
          </motion.h2>
          <motion.p
            className="text-body"
            style={{ marginTop: "16px", color: "var(--text-muted)", maxWidth: "400px" }}
            variants={fadeUp}
          >
            Open to new opportunities and collaborations. Let&apos;s build something sharp.
          </motion.p>
        </motion.div>

        <MotionStagger className="contact-grid" speed="normal" threshold={0.1}>
          {CONTACTS.map((c) => (
            <MotionDiv key={c.label} variants={scaleUp}>
              <a
                href={c.href}
                className="contact-block"
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <div className="contact-icon">{c.icon}</div>
                <div>
                  <div className="contact-lbl">{c.label}</div>
                  <div className="contact-val">{c.val}</div>
                </div>
              </a>
            </MotionDiv>
          ))}
        </MotionStagger>
      </div>
    </MotionSection>
  );
}
