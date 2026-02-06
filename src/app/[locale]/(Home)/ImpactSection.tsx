import { motion } from "framer-motion";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { ChartPoint } from "./types";

interface ImpactSectionProps {
  chartData: ChartPoint[];
}

export function ImpactSection({ chartData }: ImpactSectionProps) {
  return (
    <section className="bg-slate-50 dark:bg-slate-800/80 py-20">
      <div className="max-w-6xl mx-auto px-6 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            Dampak nyata dari kolaborasi kami
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-base text-slate-600 dark:text-slate-300"
          >
            Grafik pertumbuhan pengguna memperlihatkan percepatan aktivasi dan retensi sejak integrasi solusi Jasakode.
          </motion.p>
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300"
          >
            <li>• Implementasi data warehouse terpusat meningkatkan visibilitas funnel.</li>
            <li>• Automasi onboarding mengurangi waktu aktivasi pengguna baru hingga 48%.</li>
            <li>• Eksperimen growth mingguan membantu menjaga NPS konsisten di atas 65.</li>
          </motion.ul>
        </div>
        <div className="w-full h-[320px] rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-md">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
