"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

/* ════════════════════════════════════════════════════════
   ANIMATION VARIANTS — Reusable motion configs
   ════════════════════════════════════════════════════════ */

// Fade up (default section entrance)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Fade in from left
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Fade in from right
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Scale up
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Blur in
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 30 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Stagger container (wraps children to stagger them)
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

// Stagger container faster
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

// Stagger container slower  
export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Reveal line (for decorative lines)
export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ════════════════════════════════════════════════════════
   MOTION SECTION — Wrapper that animates on scroll
   ════════════════════════════════════════════════════════ */
interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  /** Amount of element visible before triggering (0 to 1) */
  threshold?: number;
}

export function MotionSection({
  children,
  className,
  id,
  style,
  variants = fadeUp,
  threshold = 0.15,
}: MotionSectionProps) {
  return (
    <motion.section
      className={className}
      id={id}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}

/* ════════════════════════════════════════════════════════
   MOTION DIV — Generic animated wrapper
   ════════════════════════════════════════════════════════ */
interface MotionDivProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  /** Amount of element visible before triggering */
  threshold?: number;
  /** If true, observes its own viewport (useful for items in a list) */
  selfTrigger?: boolean;
}

export function MotionDiv({
  children,
  className,
  style,
  variants = fadeUp,
  threshold = 0.15,
  selfTrigger = false,
}: MotionDivProps) {
  const viewportProps = selfTrigger
    ? { once: true, amount: threshold }
    : undefined;

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      {...(selfTrigger
        ? {
            initial: "hidden",
            whileInView: "visible",
            viewport: viewportProps,
          }
        : {})}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   MOTION STAGGER — Container that staggers children
   ════════════════════════════════════════════════════════ */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  speed?: "fast" | "normal" | "slow";
  threshold?: number;
}

export function MotionStagger({
  children,
  className,
  style,
  speed = "normal",
  threshold = 0.1,
}: StaggerProps) {
  const variant =
    speed === "fast"
      ? staggerFast
      : speed === "slow"
        ? staggerSlow
        : staggerContainer;

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variant}
    >
      {children}
    </motion.div>
  );
}
