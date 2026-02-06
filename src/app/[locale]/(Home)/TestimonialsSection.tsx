import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Testimonial } from "./types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.scrollWidth / el.children.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-slate-950 text-white py-14 sm:py-16 lg:py-20" id="demo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold sm:text-3xl"
            >
              Klien kami bicara
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-2 text-[0.9rem] leading-relaxed text-slate-300 sm:text-sm"
            >
              Dari startup hingga enterprise, kami hadir untuk mempercepat inovasi yang terukur.
            </motion.p>
          </div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/20 sm:w-auto"
          >
            Jadwalkan sesi strategi
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>

        <div
          ref={scrollRef}
          className="mt-10 grid grid-flow-col auto-cols-[85%] gap-4 overflow-x-auto pb-2
                     snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden
                     sm:auto-cols-auto sm:grid-flow-row sm:gap-6 sm:overflow-visible sm:snap-none sm:grid-cols-2
                     lg:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="relative h-full snap-start rounded-2xl border border-white/10 bg-white/8 p-5 sm:rounded-3xl sm:p-6 backdrop-blur"
            >
              <p className="text-[0.95rem] leading-relaxed text-slate-100 sm:text-sm">
                “{t.quote}”
              </p>
              <figcaption className="mt-5 text-sm font-semibold text-white">
                {t.name}
                <span className="block text-xs font-normal text-slate-300">{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === activeIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
