import { motion } from "framer-motion";
import type { Metric } from "./types";

interface MetricsSectionProps {
  metrics: Metric[];
}

export function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className="border-y border-slate-200/60 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-white/70 dark:bg-slate-900/60 px-6 py-8 shadow-sm"
          >
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
