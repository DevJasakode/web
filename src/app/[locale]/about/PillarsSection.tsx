import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import type { Pillar } from "./types";

interface PillarsSectionProps {
  pillars: Pillar[];
}

export function PillarsSection({ pillars }: PillarsSectionProps) {
  const [activePillar, setActivePillar] = useState(() => pillars[0]?.id ?? "");

  const selectedPillar = useMemo(
    () => pillars.find((pillar) => pillar.id === activePillar) ?? pillars[0],
    [activePillar, pillars]
  );

  if (!selectedPillar) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold">Cara kami berkolaborasi</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-200/80">
            Tiga pilar ini jadi panduan ketika kami membentuk squad bersama klien. Klik setiap pilar untuk melihat detail dan ritual utama kami.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {pillars.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activePillar === pillar.id
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-700 shadow-sm dark:border-cyan-300 dark:bg-cyan-300/10 dark:text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-200/70 dark:hover:border-cyan-300/60 dark:hover:text-white"
                }`}
                type="button"
              >
                {pillar.title}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedPillar.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 mt-10 lg:mt-0 rounded-3xl border border-slate-200/70 bg-white/90 px-6 py-8 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
        >
          <h3 className="text-xl font-semibold">{selectedPillar.title}</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-200/80">{selectedPillar.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-200/80">
            {selectedPillar.metrics.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Compass className="mt-0.5 h-4 w-4 text-indigo-500 dark:text-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
