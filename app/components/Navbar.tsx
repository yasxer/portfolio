"use client";

import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const secs = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
      for (let i = secs.length - 1; i >= 0; i--) {
        if (secs[i].getBoundingClientRect().top <= 150) {
          setActive(LINKS[i].href.replace("#", ""));
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`nav${scrolled ? " stuck" : ""}`}>
        <div className="nav-inner">
          <a href="#home" className="nav-logo">
            <span className="nav-logo-mark">
              <span />
              <span />
              <span />
            </span>
            <span className="gt">YH</span>
          </a>
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`nav-a${active === l.href.replace("#", "") ? " on" : ""}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>
      <div className={`mobile-shade${open ? " on" : ""}`} onClick={() => setOpen(false)} />
      <div className={`mobile-panel${open ? " open" : ""}`}>
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className="mobile-a"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
