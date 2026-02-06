"use client";

import { useEffect, useState, RefObject } from "react";

export interface ButtonBackToTopProps {
  scrollRef?: RefObject<HTMLElement | null>;
  threshold?: number;
}

export function ButtonBackToTop({
  scrollRef,
  threshold = 300,
}: ButtonBackToTopProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const target = scrollRef?.current ?? window;

    const getScrollTop = () => {
      if (target === window) {
        return window.scrollY || document.documentElement.scrollTop;
      }
      return (target as HTMLElement).scrollTop;
    };

    const onScroll = () => {
      setVisible(getScrollTop() > threshold);
    };

    target.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      target.removeEventListener("scroll", onScroll);
    };
  }, [mounted, scrollRef, threshold]);

  const handleClick = () => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!mounted) return null;

  return (
    <button
      title="Back to top"
      onClick={handleClick}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className={`
        fixed bottom-6 right-6 z-50
        bg-blue-600 text-white p-3 rounded-full shadow-xl
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4l-8 8h5v8h6v-8h5z" />
      </svg>
    </button>
  );
}
