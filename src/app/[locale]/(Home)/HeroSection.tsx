import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import type { Highlight } from "./types";
import { useI18n } from "@/i18n";

interface HeroSectionProps {
  highlights: Highlight[];
}

export function HeroSection({ highlights }: HeroSectionProps) {
  const { t } = useI18n();

  return (
    <section className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 dark:border-indigo-500/40 bg-white/70 dark:bg-slate-900/60 px-4 py-2 text-[0.8rem] md:text-[1rem] font-medium text-indigo-600 dark:text-indigo-300 shadow-sm"
      >
        <ShieldCheck className="h-4 w-4" />
        <span>{ t("home.welcome.tag") }</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 text-3xl md:text-5xl sm:text-6xl font-extrabold tracking-tight"
      >
        {/* Transformasi <span className="text-indigo-600">digital</span> yang
        mendorong pertumbuhan bisnis nyata */}
        { t("home.welcome") }
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300"
      >
        { t("home.welcome.desc") }
      </motion.p>

      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <a
          href="#contact"
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium flex items-center gap-2 hover:bg-indigo-700 transition text-[0.8rem] md:text-[1rem]"
        >
          Mulai proyek
          <ArrowRight size={18} />
        </a>
        <button
          className="px-6 py-3 cursor-pointer rounded-xl border border-slate-300 dark:border-slate-600 font-medium flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-[0.8rem] md:text-[1rem]"
        >
          <Play size={18} /> Lihat demo 3 menit
        </button>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {highlights.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/60 px-6 py-5 text-left shadow-sm transition"
          >
            <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
              {item.title}
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-500 transition group-hover:text-indigo-600">
              Pelajari lebih lanjut
              <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
