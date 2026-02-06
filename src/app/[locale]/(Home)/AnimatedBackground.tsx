"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";


type BackgroundOrb = {
  className: string;
  initial: { x: number; y: number };
  animate: { x: number; y: number };
  duration: number;
  delay: number;
};

const lightBackgroundOrbs: BackgroundOrb[] = [
  {
    className:
      "absolute -top-28 -left-28 h-[26rem] w-[26rem] rounded-full bg-indigo-400/20 blur-3xl mix-blend-screen",
    initial: { x: -120, y: -80 },
    animate: { x: 40, y: 60 },
    duration: 26,
    delay: 0,
  },
  {
    className:
      "absolute top-[18%] right-[-12rem] h-[30rem] w-[30rem] rounded-full bg-fuchsia-400/20 blur-3xl mix-blend-screen",
    initial: { x: 120, y: -40 },
    animate: { x: -60, y: 40 },
    duration: 32,
    delay: 2,
  },
  {
    className:
      "absolute bottom-[-14rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-3xl mix-blend-screen",
    initial: { x: -80, y: 80 },
    animate: { x: 60, y: -40 },
    duration: 30,
    delay: 3,
  },
  {
    className:
      "absolute bottom-[-18rem] right-[-10rem] h-[24rem] w-[24rem] rounded-full bg-purple-400/20 blur-3xl mix-blend-screen",
    initial: { x: 90, y: 90 },
    animate: { x: -40, y: -60 },
    duration: 28,
    delay: 1.5,
  },
];

const darkBackgroundOrbs: BackgroundOrb[] = [
  {
    className:
      "absolute -top-32 -left-24 h-[30rem] w-[30rem] rounded-full bg-indigo-500/30 blur-3xl mix-blend-screen",
    initial: { x: -110, y: -70 },
    animate: { x: 30, y: 50 },
    duration: 28,
    delay: 0.4,
  },
  {
    className:
      "absolute top-[14%] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/25 blur-3xl mix-blend-screen",
    initial: { x: 100, y: -30 },
    animate: { x: -50, y: 30 },
    duration: 34,
    delay: 1.2,
  },
  {
    className:
      "absolute bottom-[-16rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/25 blur-3xl mix-blend-screen",
    initial: { x: -70, y: 90 },
    animate: { x: 50, y: -30 },
    duration: 30,
    delay: 2.1,
  },
  {
    className:
      "absolute bottom-[-18rem] right-[-12rem] h-[26rem] w-[26rem] rounded-full bg-violet-500/25 blur-3xl mix-blend-screen",
    initial: { x: 80, y: 80 },
    animate: { x: -35, y: -50 },
    duration: 29,
    delay: 1.8,
  },
];



export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  // ✅ hooks SELALU dipanggil
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const glowX = useTransform(pointerX, [0, 1], [-160, 160]);
  const glowY = useTransform(pointerY, [0, 1], [-120, 140]);

  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);

    const root = document.documentElement;
    const syncTheme = () =>
      setIsDarkMode(root.classList.contains("dark"));

    syncTheme();

    const obs = new MutationObserver(syncTheme);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted || shouldReduceMotion) return;

    const move = (e: PointerEvent) => {
      pointerX.set(e.clientX / window.innerWidth);
      pointerY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mounted, shouldReduceMotion]);

  // ⛔ return null BOLEH, karena hook sudah dipanggil
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className={`absolute inset-0 transition-colors duration-700 ${isDarkMode
            ? "bg-[radial-gradient(circle_at_top,_rgba(8,47,73,0.55),transparent_72%)]"
            : "bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%)]"
          }`}
      />

      <motion.div
        className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem]
                   -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          x: shouldReduceMotion ? 0 : glowX,
          y: shouldReduceMotion ? 0 : glowY,
        }}
      />
    </div>
  );
}
