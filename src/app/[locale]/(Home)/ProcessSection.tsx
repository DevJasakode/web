import { motion } from "framer-motion";
import type { ProcessStep } from "./types";

interface ProcessSectionProps {
  steps: ProcessStep[];
}

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            Metodologi kolaborasi yang transparan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-base text-slate-600 dark:text-slate-300"
          >
            Setiap fase proyek memiliki indikator keberhasilan, rencana komunikasi, dan dokumentasi yang bisa diakses kapan pun.
          </motion.p>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-600" />
          <div className="space-y-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative ml-12 rounded-2xl border border-slate-200/60 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 px-6 py-6 shadow-sm"
              >
                <div className="absolute -left-12 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
