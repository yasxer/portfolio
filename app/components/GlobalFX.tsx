"use client";

import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";

export default function GlobalFX() {
  const [scroll, setScroll] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScroll(scrolled);
      setShowTop(winScroll > 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scroll}%` }} />
      <button
        className={`back-to-top${showTop ? " visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <HiArrowUp />
      </button>
    </>
  );
}
