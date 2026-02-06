import { motion } from "framer-motion";
import { Building2, Cpu, Globe2 } from "lucide-react";
import type { ValueItem } from "./types";

interface ValuesSectionProps {
  values: ValueItem[];
}

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-16">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start">
        <div>
          <h2 className="text-3xl font-bold">Nilai yang menjaga kualitas kerja kami</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-200/80">
            Nilai ini kami jadikan kompas saat mengambil keputusan sulit, memilih prioritas, maupun membangun budaya tim hybrid.
          </p>
          <div className="mt-8 space-y-6">
            {values.map((value) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <value.icon className="h-6 w-6 text-indigo-500 dark:text-cyan-300" />
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-200/80">{value.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <h3 className="text-lg font-semibold text-indigo-600 dark:text-cyan-200">Apa yang kami lakukan setiap minggu?</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-200/80">
            <li className="flex items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 text-indigo-500 dark:text-cyan-300" />
              <span>Office hour lintas klien untuk membahas tantangan produk dan teknologi secara terbuka.</span>
            </li>
            <li className="flex items-start gap-2">
              <Cpu className="mt-0.5 h-4 w-4 text-indigo-500 dark:text-cyan-300" />
              <span>Guild malam hari membahas eksperimen AI, keamanan, dan praktik developer experience.</span>
            </li>
            <li className="flex items-start gap-2">
              <Globe2 className="mt-0.5 h-4 w-4 text-indigo-500 dark:text-cyan-300" />
              <span>Knowledge sharing global dengan mitra komunitas teknologi di Jepang, India, dan Australia.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
