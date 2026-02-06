import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Solution } from "./types";

interface SolutionsSectionProps {
  solutions: Solution[];
}

export function SolutionsSection({ solutions }: SolutionsSectionProps) {
  return (
    <section id="solutions" className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold"
        >
          Pilar layanan untuk mewujudkan produk kelas dunia
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-4 text-base text-slate-600 dark:text-slate-300"
        >
          Kami memadukan riset pengguna, engineering, dan intelligence untuk mengantar ide Anda ke pasar dan menjaga momentum pertumbuhan.
        </motion.p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {solutions.map((solution, i) => (
          <motion.div
            key={solution.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group relative h-full rounded-3xl border border-slate-200/60 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 p-8 shadow-md"
          >
            <solution.icon className="h-11 w-11 text-indigo-600 dark:text-indigo-300" />
            <h3 className="mt-6 text-xl font-semibold">{solution.title}</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              {solution.desc}
            </p>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-300">
              Jadwalkan konsultasi
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
