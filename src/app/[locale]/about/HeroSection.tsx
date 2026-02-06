import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { IntroStat } from "./types";
import { useI18n } from "@/i18n";

interface HeroSectionProps {
  stats: IntroStat[];
}

export function HeroSection({ stats }: HeroSectionProps) {
  const { t } = useI18n();
  return (
    <section className="pt-12 md:pt-18 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1 text-[0.6rem] md:text-[0.8rem] font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:border-cyan-400/40 dark:bg-white/10 dark:text-cyan-200">
          <Sparkles className="h-4 w-4" /> {t("about.tag")}
        </span>
        <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
          {t("about.welcome.second")} <span className="text-indigo-600 dark:text-cyan-300">{t("about.welcome.first")}</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-200/80">
          {t("about.welcome.desc")}
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-200/70 bg-white/90 px-5 py-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-3xl font-bold text-indigo-600 dark:text-cyan-300">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-200/70">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
