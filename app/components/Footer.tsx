"use client";

import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { HiMail, HiHeart, HiPhone } from "react-icons/hi";

const footerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Footer() {
  return (
    <motion.footer
      className="foot"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className="con">
        <motion.div className="foot-links" variants={itemVariants}>
          <a
            href="mailto:yasser.haoues66@gmail.com"
            className="foot-a"
            aria-label="Email"
          >
            <HiMail />
          </a>
          <a
            href="tel:+213562451840"
            className="foot-a"
            aria-label="Phone"
          >
            <HiPhone />
          </a>
          <a
            href="https://github.com/yasxer"
            className="foot-a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <SiGithub />
          </a>
        </motion.div>
        <motion.p className="foot-txt" variants={itemVariants}>
          © {new Date().getFullYear()} Yasser Haoues. Designed & Built with{" "}
          <HiHeart
            className="foot-heart"
            style={{ display: "inline", verticalAlign: "middle" }}
          />
        </motion.p>
      </div>
    </motion.footer>
  );
}
