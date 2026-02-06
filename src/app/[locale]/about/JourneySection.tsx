import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import type { JourneyItem } from "./types";

interface JourneySectionProps {
  journey: JourneyItem[];
}

export function JourneySection({ journey }: JourneySectionProps) {
  const [activeJourney, setActiveJourney] = useState(() => journey[journey.length - 1]?.year ?? "");

  const selectedJourney = useMemo(
    () => journey.find((item) => item.year === activeJourney) ?? journey[journey.length - 1],
    [activeJourney, journey]
  );

  if (!selectedJourney) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold">Perjalanan kami</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-200/80">
            Setiap fase membawa pembelajaran baru dan memperluas cara kami berpartner dengan organisasi teknologi maupun non-teknologi.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {journey.map((item) => (
              <button
                key={item.year}
                onClick={() => setActiveJourney(item.year)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  activeJourney === item.year
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:border-cyan-300 dark:bg-cyan-300/20 dark:text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200/70 dark:hover:border-cyan-300/60 dark:hover:text-white"
                }`}
                type="button"
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedJourney.year}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 mt-10 lg:mt-0 rounded-3xl border border-slate-200/70 bg-gradient-to-br from-indigo-100 via-white to-slate-50 px-6 py-8 shadow-sm dark:border-white/10 dark:bg-gradient-to-br dark:from-white/10 dark:via-white/5 dark:to-white/0"
        >
          <div className="flex items-center gap-3 text-indigo-600 dark:text-cyan-300">
            <CalendarCheck className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-200">{selectedJourney.year}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold">{selectedJourney.title}</h3>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-200/80">{selectedJourney.body}</p>
        </motion.div>
      </div>
    </section>
  );
}
