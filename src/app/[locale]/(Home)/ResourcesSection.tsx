import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ResourceHighlight } from "./types";

interface ResourcesSectionProps {
  resources: ResourceHighlight[];
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="rounded-3xl border border-slate-200/60 dark:border-slate-800/70 bg-gradient-to-r from-indigo-500/10 via-white to-indigo-500/10 dark:from-indigo-400/10 dark:via-slate-900 dark:to-indigo-400/10 p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold"
            >
              Materi strategi untuk tim Anda
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 text-sm text-slate-600 dark:text-slate-300"
            >
              Kami membagikan resource eksklusif setiap bulan berisi studi kasus, template, dan insight terbaru.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              href="#newsletter"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Dapatkan akses
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
          <div className="grid gap-5">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 p-5 shadow-sm"
              >
                <resource.icon className="mt-1 h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                <div>
                  <h3 className="text-sm font-semibold">{resource.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {resource.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
