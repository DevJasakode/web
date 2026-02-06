import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users2 } from "lucide-react";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
};

interface TeamSectionProps {
  teamMembers: TeamMember[];
}


export function TeamSection({ teamMembers }: TeamSectionProps) {
  const [highlightedMember, setHighlightedMember] = useState(() => teamMembers[0]?.id ?? "");

  const selectedMember = useMemo(
    () => teamMembers.find((member) => member.id === highlightedMember) ?? teamMembers[0],
    [highlightedMember, teamMembers]
  );

  if (!selectedMember) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="text-3xl font-bold">Tim inti yang akan bekerja bersama Anda</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-200/80">
            Pilih nama mereka untuk melihat fokus utama dan kompetensi yang dibawa ke proyek.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {teamMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => setHighlightedMember(member.id)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  highlightedMember === member.id
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-700 shadow-lg shadow-indigo-300/40 dark:border-cyan-300 dark:bg-cyan-300/20 dark:text-white dark:shadow-cyan-500/10"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200/80 dark:hover:border-cyan-300/60 dark:hover:text-white"
                }`}
              >
                <p className="text-base font-semibold">{member.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-indigo-500 dark:text-cyan-200/80">{member.role}</p>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedMember.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-indigo-200/40 via-white to-indigo-50 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gradient-to-br dark:from-cyan-400/10 dark:via-white/5 dark:to-transparent"
        >
          <div className="flex items-center gap-3 text-indigo-500 dark:text-cyan-200">
            <Users2 className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-[0.3em]">Squad lead</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold">{selectedMember.name}</h3>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-200/60">{selectedMember.role}</p>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-200/80">{selectedMember.bio}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {selectedMember.expertise.map((item) => (
              <span
                key={item}
                className="rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-cyan-300/50 dark:bg-cyan-300/10 dark:text-cyan-100"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
