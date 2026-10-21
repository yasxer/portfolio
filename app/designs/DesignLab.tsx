"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { HiArrowUpRight, HiArrowLeft } from "react-icons/hi2";
import Footer from "../components/Footer";
import { fadeUp, fadeLeft, fadeRight, lineReveal } from "../components/MotionSection";
import izemImg from "@/public/designs/izem.jpg";
import katanaImg from "@/public/designs/katana.jpg";

type Work = {
  n: string;
  title: string;
  kicker: string;
  category: string;
  desc: string;
  tags: string[];
  url: string;
  img: StaticImageData;
};

const WORKS: Work[] = [
  {
    n: "01",
    title: "IZEM Energy",
    kicker: "Réveille le lion.",
    category: "Brand / Product Site",
    desc: "Launch site for an Algerian energy drink: a hero 3D can, a nine-flavour selector, a head-to-head comparison and a bilingual French / Arabic experience.",
    tags: ["3D Product", "FR / AR", "Motion"],
    url: "https://izem-alpha.vercel.app",
    img: izemImg,
  },
  {
    n: "02",
    title: "YSXR Katana",
    kicker: "Forge your craft.",
    category: "Immersive Experience",
    desc: "A scroll-driven dojo. A real-time 3D katana, a guided dialogue and one timeline driving every scene, with no video and no image sequences.",
    tags: ["Real-time 3D", "Scroll-driven", "WebGL"],
    url: "https://katana-omega.vercel.app",
    img: katanaImg,
  },
];

const PRINCIPLES = [
  {
    k: "A",
    title: "Motion with meaning",
    text: "Nothing moves without a reason. Every transition tells you where you are and where you are going.",
  },
  {
    k: "B",
    title: "Real-time, not recorded",
    text: "Geometry and light are computed live in the browser, so the page answers your scroll instead of playing a video.",
  },
  {
    k: "C",
    title: "Code-first, no templates",
    text: "Every layout and easing curve is written by hand for the brand it serves. Light to load, sharp to use.",
  },
];

const EMAIL = "yasser.haoues66@gmail.com";
const heroEase = [0.16, 1, 0.3, 1] as const;

export default function DesignLab() {
  return (
    <div className="dl">
      <Iris />
      <LabNav />
      <main>
        <Hero />
        <WorkSection />
        <Approach />
        <Statement />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

/* The portal on the home page ends on a full orange screen; this opens it back up. */
function Iris() {
  const [done, setDone] = useState(false);
  if (done) return null;
  return (
    <motion.div
      className="dl-iris"
      aria-hidden="true"
      initial={{ width: "0vmax", height: "0vmax" }}
      animate={{ width: "260vmax", height: "260vmax" }}
      transition={{ duration: 1.4, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => setDone(true)}
    >
      <span className="dl-iris-ring" />
    </motion.div>
  );
}

function LabNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " stuck" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <span className="nav-logo-mark">
            <span />
            <span />
            <span />
          </span>
          <span className="gt">YH</span>
        </Link>
        <ul className="nav-links">
          <li><a href="#work" className="nav-a">Work</a></li>
          <li><a href="#approach" className="nav-a">Approach</a></li>
          <li><a href="#contact" className="nav-a">Contact</a></li>
        </ul>
        <Link href="/#projects" className="btn-solid-dark dl-nav-back">
          <HiArrowLeft /> Portfolio
        </Link>
      </div>
    </nav>
  );
}

const STATS = [
  { v: "02", l: "Live brand sites" },
  { v: "3D", l: "Real-time scenes" },
  { v: "100%", l: "Hand-coded" },
];

const MARQUEE = ["Brand sites", "Motion design", "Real-time 3D", "WebGL", "Scroll stories", "Code-first"];

function Orbit() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % WORKS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="dl-orbit">
      <span className="dl-orbit-glow" aria-hidden="true" />
      <svg className="dl-orbit-text" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="dl-orbit-path" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
        </defs>
        <text textLength="574" lengthAdjust="spacing">
          <textPath href="#dl-orbit-path" textLength="574" lengthAdjust="spacing">
            BRAND SITES ✦ MOTION ✦ REAL-TIME 3D ✦ CODE-FIRST ✦ DESIGN LAB ✦
          </textPath>
        </text>
      </svg>
      <span className="dl-orbit-ring dl-orbit-ring-1" aria-hidden="true" />
      <span className="dl-orbit-ring dl-orbit-ring-2" aria-hidden="true" />
      <span className="dl-orbit-ring dl-orbit-ring-3" aria-hidden="true" />
      <div className="dl-orbit-core" aria-hidden="true">
        {WORKS.map((w, i) => (
          <Image
            key={w.n}
            src={w.img}
            alt=""
            fill
            sizes="300px"
            priority={i === 0}
            className={i === active ? "on" : ""}
          />
        ))}
      </div>
      <span className="dl-orbit-sat dl-orbit-sat-0" aria-hidden="true" />
      <span className="dl-orbit-sat dl-orbit-sat-1" aria-hidden="true" />

      {WORKS.map((w, i) => (
        <motion.a
          key={w.n}
          href={w.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`dl-float dl-float-${i}${i === active ? " on" : ""}`}
          // Opacity only: the CSS idle float owns this element's transform.
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: heroEase, delay: 1.3 + i * 0.15 }}
        >
          <span className="dl-float-n">{w.n}</span>
          <span className="dl-float-txt">
            <strong>{w.title}</strong>
            <small>{w.category}</small>
          </span>
          <HiArrowUpRight className="dl-float-icon" />
        </motion.a>
      ))}
    </div>
  );
}

function Hero() {
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: heroEase, delay },
  });
  const line = (delay: number) => ({
    initial: { y: "110%" },
    animate: { y: "0%" },
    transition: { duration: 0.9, ease: heroEase, delay },
  });

  return (
    <section className="hero dl-hero" id="lab">
      <div className="hero-layout">
        <div className="hero-text">
          <motion.div className="hero-status" {...enter(0.6)}>
            <span className="hero-status-dot" />
            Design Lab, Vol. 01
          </motion.div>
          <h1 className="display-huge dl-title">
            <span className="dl-line"><motion.span {...line(0.7)}>DESIGN</motion.span></span>
            <span className="dl-line">
              <motion.span className="dl-orange" {...line(0.82)}>
                LAB<span className="dl-title-dot">.</span>
              </motion.span>
            </span>
          </h1>
          <motion.div
            className="brand-block-line dl-title-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: heroEase, delay: 1 }}
          />
          <motion.p className="heading-sm dl-hero-sub" {...enter(1.05)}>
            Crafted interfaces <span className="dl-orange">for brands.</span>
          </motion.p>
          <motion.p className="text-body dl-hero-text" {...enter(1.15)}>
            Away from dashboards and data, this is where I design for feeling:
            brand sites, motion systems and real-time 3D, built code-first.
          </motion.p>
          <motion.div className="hero-actions" {...enter(1.25)}>
            <a href="#work" className="btn-solid-dark">
              See the work <HiArrowRight />
            </a>
            <Link href="/#projects" className="btn-solid-cream">
              Back to portfolio
            </Link>
          </motion.div>
          <motion.div className="dl-stats" {...enter(1.4)}>
            {STATS.map((s) => (
              <div key={s.l} className="dl-stat">
                <span className="dl-stat-v">{s.v}</span>
                <span className="dl-stat-l">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="dl-hero-visual"
          initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: heroEase, delay: 0.5 }}
        >
          <Orbit />
        </motion.div>
      </div>

      <div className="dl-marquee" aria-hidden="true">
        <div className="dl-marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="dl-marquee-group">
              {MARQUEE.map((m) => (
                <span key={m}>{m}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecHead({ n, label, title, children }: { n: string; label: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <motion.div
      className="sec-head dl-sec-head"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div
        className="brand-block-line"
        style={{ height: "4px", width: "40px", marginBottom: "32px" }}
        variants={lineReveal}
      />
      <motion.span className="dl-sec-num" variants={fadeUp}>
        {n} — {label}
      </motion.span>
      <motion.h2 className="heading-lg" variants={fadeUp}>
        {title}
      </motion.h2>
      {children && (
        <motion.p className="text-body dl-sec-lead" variants={fadeUp}>
          {children}
        </motion.p>
      )}
    </motion.div>
  );
}

function WorkCard({ w, i }: { w: Work; i: number }) {
  const mediaRef = useRef<HTMLAnchorElement>(null);

  const track = (e: React.MouseEvent) => {
    const el = mediaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      className="dl-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={i % 2 === 0 ? fadeLeft : fadeRight}
    >
      <div className="dl-card-head">
        <span className="proj-type" style={{ margin: 0 }}>{w.category}</span>
        <span className="dl-card-n">{w.n}</span>
      </div>
      <a
        ref={mediaRef}
        href={w.url}
        target="_blank"
        rel="noopener noreferrer"
        className="dl-card-media"
        onMouseMove={track}
        aria-label={`Visit ${w.title}`}
      >
        <Image src={w.img} alt={`${w.title} website`} fill sizes="(max-width: 900px) 100vw, 50vw" />
        <span className="dl-card-chip">View live <HiArrowUpRight /></span>
      </a>
      <div className="dl-card-body">
        <h3 className="heading-sm">{w.title}</h3>
        <p className="text-body dl-card-kicker">{w.kicker}</p>
        <p className="text-body">{w.desc}</p>
        <div className="proj-tags">
          {w.tags.map((t) => (
            <span key={t} className="proj-tag">{t}</span>
          ))}
        </div>
        <a href={w.url} target="_blank" rel="noopener noreferrer" className="btn-solid-dark dl-card-btn">
          View live <HiArrowUpRight />
        </a>
      </div>
    </motion.article>
  );
}

function WorkSection() {
  return (
    <section className="sec" id="work" style={{ backgroundColor: "var(--bg-white)" }}>
      <div className="con">
        <SecHead n="01" label="Selected work" title={<>SITES THAT FEEL<br /><span className="dl-orange">LIKE BRANDS</span></>} />
        <div className="dl-grid">
          {WORKS.map((w, i) => (
            <WorkCard key={w.n} w={w} i={i} />
          ))}
          <motion.div
            className="dl-forge"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="dl-card-n">{String(WORKS.length + 1).padStart(2, "0")}</span>
            <div>
              <span className="proj-type" style={{ marginBottom: 8 }}>In the forge</span>
              <p className="heading-sm">NEXT DROP, COMING SOON</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="sec dl-dark" id="approach">
      <div className="con">
        <SecHead n="02" label="Approach" title={<>BUILT TO BE <span className="dl-orange">FELT</span></>}>
          Each piece starts from the brand, not a template. The result is light,
          sharp and driven by the scroll under your hand.
        </SecHead>
        <motion.div
          className="dl-cols"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {PRINCIPLES.map((p) => (
            <motion.div key={p.k} className="dl-col" variants={fadeUp}>
              <span className="dl-col-k">{p.k}</span>
              <h3 className="dl-col-title">{p.title}</h3>
              <p className="text-body dl-col-text">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="dl-statement">
      <div className="con">
        <motion.p
          className="display-huge"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
        >
          MADE WITH <span className="dl-gradient-text">INTENT.</span>
        </motion.p>
      </div>
      <div className="brand-block-line" />
    </section>
  );
}

function ContactSection() {
  return (
    <section className="sec" id="contact" style={{ backgroundColor: "var(--bg-cream)" }}>
      <div className="con dl-cta">
        <SecHead
          n="03"
          label="Contact"
          title={<>HAVE A BRAND THAT<br />DESERVES <span className="dl-orange">A STAGE?</span></>}
        />
        <div className="hero-actions">
          <a href={`mailto:${EMAIL}`} className="btn-solid-dark">
            Start a project <HiArrowRight />
          </a>
          <Link href="/#contact" className="btn-solid-cream dl-cta-alt">
            All contact info
          </Link>
        </div>
      </div>
    </section>
  );
}
