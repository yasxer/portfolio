"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image, { type StaticImageData } from "next/image";
import { motion, useAnimate, stagger } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import katanaImg from "@/public/designs/katana.jpg";
import izemImg from "@/public/designs/izem.jpg";
import { fadeUp, lineReveal } from "./MotionSection";

const DESTINATION = "/designs";

type Portal = { rect: DOMRect; img: StaticImageData };

export default function DesignPortal() {
  const router = useRouter();
  const mainRef = useRef<HTMLButtonElement>(null);
  const [portal, setPortal] = useState<Portal | null>(null);

  useEffect(() => {
    router.prefetch(DESTINATION);
  }, [router]);

  const enter = (el: HTMLElement | null, img: StaticImageData) => {
    if (!el || portal) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(DESTINATION);
      return;
    }
    setPortal({ rect: el.getBoundingClientRect(), img });
  };

  return (
    <>
      <motion.div
        className="dlab-teaser"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="dlab-teaser-body">
          <motion.div
            className="brand-block-line"
            style={{ height: "4px", width: "40px", marginBottom: "32px" }}
            variants={lineReveal}
          />
          <motion.span className="dlab-eyebrow" variants={fadeUp}>
            Beyond the dashboards
          </motion.span>
          <motion.h3 className="heading-md dlab-title" variants={fadeUp}>
            DESIGN LAB
          </motion.h3>
          <motion.p className="text-body dlab-desc" variants={fadeUp}>
            The aesthetic side of my work: brand sites, motion systems and
            real-time 3D, built code-first and designed to be felt.
          </motion.p>
          <motion.div variants={fadeUp}>
            <button
              type="button"
              className="btn-solid-cream dlab-cta"
              onClick={() => enter(mainRef.current, katanaImg)}
            >
              Enter the Design Lab <HiArrowUpRight />
            </button>
          </motion.div>
        </div>

        <motion.div className="dlab-media" variants={fadeUp}>
          <button
            type="button"
            className="dlab-shot dlab-shot-back"
            onClick={(e) => enter(e.currentTarget, izemImg)}
            aria-label="Open IZEM Energy in the Design Lab"
          >
            <Image src={izemImg} alt="IZEM Energy website" fill sizes="(max-width: 900px) 80vw, 420px" />
          </button>
          <button
            ref={mainRef}
            type="button"
            className="dlab-shot dlab-shot-front"
            onClick={(e) => enter(e.currentTarget, katanaImg)}
            aria-label="Open YSXR Katana in the Design Lab"
          >
            <Image src={katanaImg} alt="YSXR Katana website" fill sizes="(max-width: 900px) 80vw, 480px" />
          </button>
          <svg className="dlab-badge" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="dlab-badge-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <text>
              <textPath href="#dlab-badge-path">
                CLICK TO ENTER • DESIGN LAB • CLICK TO ENTER • DESIGN LAB •
              </textPath>
            </text>
            <circle cx="60" cy="60" r="6" />
          </svg>
        </motion.div>
      </motion.div>

      {portal && (
        <PortalOverlay
          portal={portal}
          onDone={() => router.push(DESTINATION)}
        />
      )}
    </>
  );
}

function PortalOverlay({ portal, onDone }: { portal: Portal; onDone: () => void }) {
  const [scope, animate] = useAnimate();
  const { rect, img } = portal;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Unmounting stops the animations; bail out so a stopped run never navigates.
    let cancelled = false;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const size = Math.min(240, vw * 0.55);
    const cover = (Math.hypot(vw, vh) / size) * 1.1;
    const easeInOut = [0.76, 0, 0.24, 1] as const;
    const easeIn = [0.7, 0, 0.84, 0] as const;

    const run = async () => {
      // 1. The photo lifts off the page and folds into a circle at the centre.
      animate(".dp-backdrop", { opacity: [0, 1] }, { duration: 0.6, ease: "easeOut" });
      await animate(
        ".dp-orb",
        { left: vw / 2 - size / 2, top: vh / 2 - size / 2, width: size, height: size, borderRadius: size / 2 },
        { duration: 0.7, ease: easeInOut }
      );
      if (cancelled) return;

      // 2. The vortex wakes up around it and the image starts to swirl.
      animate(".dp-ring", { opacity: [0, 1], scale: [0.3, 1] }, { duration: 0.7, delay: stagger(0.07), ease: [0.16, 1, 0.3, 1] });
      animate(".dp-label", { opacity: [0, 1], y: [12, 0] }, { duration: 0.45, delay: 0.15 });
      await animate(".dp-orb-img", { rotate: 220, scale: 1.3 }, { duration: 1, ease: "easeIn" });
      if (cancelled) return;

      // 3. Dive in: the circle swallows the screen.
      animate(".dp-label", { opacity: 0 }, { duration: 0.2 });
      animate(".dp-ring", { scale: 7, opacity: 0 }, { duration: 0.75, delay: stagger(0.04), ease: easeIn });
      animate(".dp-orb-img", { rotate: 480, opacity: 0 }, { duration: 0.6, ease: "easeIn" });
      await animate(".dp-orb", { scale: cover }, { duration: 0.75, ease: easeIn });
      if (!cancelled) onDone();
    };
    run();

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={scope} className="dp-overlay" aria-hidden="true">
      <div className="dp-backdrop" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="dp-ring" style={{ opacity: 0 }}>
          <div className={`dp-ring-spin dp-ring-${i}`} />
        </div>
      ))}
      <div
        className="dp-orb"
        style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
      >
        <div className="dp-orb-img">
          <Image src={img} alt="" fill sizes="240px" priority />
        </div>
      </div>
      <div className="dp-label" style={{ opacity: 0 }}>
        Entering the Design Lab
      </div>
    </div>
  );
}
