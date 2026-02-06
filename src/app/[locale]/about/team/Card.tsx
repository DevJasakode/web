// "use client";

// import * as React from "react";
// import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
// import clsx from "clsx";
// import { SocialMedia, Role, Job, Team } from "@api/models/about";

// /* ===================== Utilities ===================== */

// const jobColorByCode: Record<string, string> = {
//   CEO: "from-fuchsia-500/30 to-indigo-500/30 text-fuchsia-600 dark:text-fuchsia-300",
//   CTO: "from-cyan-500/30 to-teal-500/30 text-cyan-600 dark:text-cyan-300",
//   COO: "from-amber-500/30 to-orange-500/30 text-amber-700 dark:text-amber-300",
//   PM: "from-violet-500/30 to-purple-500/30 text-violet-600 dark:text-violet-300",
//   ENG: "from-sky-500/30 to-blue-500/30 text-sky-700 dark:text-sky-300",
//   DS: "from-emerald-500/30 to-teal-500/30 text-emerald-700 dark:text-emerald-300",
// };

// function getJobBadgeClasses(job?: Job | null) {
//   if (!job?.code) return "from-slate-400/20 to-slate-500/20 text-slate-700 dark:text-slate-200";
//   return jobColorByCode[job.code.toUpperCase()] ?? "from-slate-400/20 to-slate-500/20 text-slate-700 dark:text-slate-200";
// }

// function truncate(s: string, n: number) {
//   return s.length > n ? s.slice(0, n - 1) + "…" : s;
// }

// /* Simple tooltip */
// function Tooltip({ label }: { label: string }) {
//   return (
//     <motion.span
//       role="tooltip"
//       initial={{ opacity: 0, y: 4 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 4 }}
//       className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow dark:bg-white dark:text-slate-900"
//     >
//       {label}
//     </motion.span>
//   );
// }

// /* Fallback avatar (emoji) */
// function AvatarFallback({ name }: { name: string }) {
//   const initials = name
//     .split(" ")
//     .slice(0, 2)
//     .map((n) => n[0]?.toUpperCase())
//     .join("");
//   return (
//     <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 dark:from-slate-700 dark:to-slate-800 dark:text-slate-200">
//       <span className="text-sm font-semibold">{initials || "?"}</span>
//     </div>
//   );
// }

// /* Social icon with tooltip */
// function SocialIcon({ item }: { item: SocialMedia }) {
//   const [hover, setHover] = React.useState(false);
//   const label = item.name || item.code || "Social";
//   return (
//     <div className="relative">
//       <a
//         href={item.link || "#"}
//         aria-label={label}
//         target="_blank"
//         rel="noreferrer"
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//         onFocus={() => setHover(true)}
//         onBlur={() => setHover(false)}
//         className="outline-none"
//       >
//         <motion.img
//           src={item.logo || "/icons/link.svg"}
//           alt={label}
//           width={24}
//           height={24}
//           className="h-6 w-6 object-contain opacity-90"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           transition={{ type: "spring", stiffness: 400, damping: 20 }}
//         />
//       </a>
//       <AnimatePresence>{hover && <Tooltip label={label} />}</AnimatePresence>
//     </div>
//   );
// }

// /* Focus chip */
// function FocusChip({ text }: { text: string }) {
//   return (
//     <motion.span
//       layout
//       className="rounded-full border border-slate-200/70 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-slate-700 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
//       whileHover={{ y: -1 }}
//       transition={{ type: "spring", stiffness: 450, damping: 20 }}
//     >
//       {text}
//     </motion.span>
//   );
// }

// /* Skeleton shimmer */
// function Skeleton() {
//   return (
//     <div className="animate-pulse rounded-xl border border-slate-200/70 p-4 dark:border-white/10">
//       <div className="mb-3 flex items-center gap-3">
//         <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
//         <div className="flex-1">
//           <div className="mb-2 h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" />
//           <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
//         </div>
//       </div>
//       <div className="mb-2 h-3 w-10 rounded bg-slate-200 dark:bg-slate-700" />
//       <div className="flex flex-wrap gap-2">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <div key={i} className="h-6 w-16 rounded-full border border-slate-200/70 dark:border-white/10" />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* BioClamp: expandable bio with animation */
// function BioClamp({ text, maxChars = 140 }: { text: string; maxChars?: number }) {
//   const [open, setOpen] = React.useState(false);
//   const short = text.length > maxChars ? text.slice(0, maxChars) + "…" : text;
//   const shown = open ? text : short;

//   return (
//     <div className="mt-2 text-sm text-slate-600 dark:text-slate-300/90">
//       <AnimatePresence initial={false} mode="wait">
//         <motion.p
//           key={open ? "open" : "closed"}
//           initial={{ opacity: 0, y: 4 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -4 }}
//         >
//           {shown}
//         </motion.p>
//       </AnimatePresence>
//       {text.length > maxChars && (
//         <button
//           type="button"
//           onClick={() => setOpen((v) => !v)}
//           className="mt-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-cyan-300"
//         >
//           {open ? "Tutup" : "Selengkapnya"}
//         </button>
//       )}
//     </div>
//   );
// }

// /* ===================== Main Card ===================== */

// type Props = {
//   data?: Team;
//   hrefBase?: string; // default /about
//   loading?: boolean;
//   onClick?: () => void;
// };

// export function TeamCardInteractive({ data, hrefBase = "/about", loading, onClick }: Props) {
//   if (loading || !data) return <Skeleton />;

//   const { name, picture, bio, profile, focus = [], job, social_media = [] } = data;

//   // 3D tilt via mouse position
//   const ref = React.useRef<HTMLDivElement | null>(null);
//   const rx = useMotionValue(0);
//   const ry = useMotionValue(0);
//   const rotateX = useTransform(rx, [-0.5, 0.5], [8, -8]); // clamp
//   const rotateY = useTransform(ry, [-0.5, 0.5], [-12, 12]);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const el = ref.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const px = (e.clientX - rect.left) / rect.width - 0.5;
//     const py = (e.clientY - rect.top) / rect.height - 0.5;
//     rx.set(py);
//     ry.set(px);
//   };
//   const resetTilt = () => {
//     rx.set(0);
//     ry.set(0);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={resetTilt}
//       whileHover={{ scale: 1.01 }}
//       whileTap={{ scale: 0.995 }}
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d" as any }}
//       initial={{ opacity: 0, y: 16 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.4 }}
//       transition={{ type: "spring", stiffness: 260, damping: 24 }}
//       className={clsx(
//         "group relative rounded-xl border border-slate-200/70 bg-white/60 p-4 shadow-lg transition dark:border-white/10 dark:bg-slate-900/40",
//         "backdrop-blur-md"
//       )}
//       onClick={onClick}
//       role={onClick ? "button" : undefined}
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
//       }}
//     >
//       {/* Glow on hover */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 blur-2xl transition group-hover:opacity-100"
//         style={{
//           background:
//             "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(168,85,247,0.18), transparent 40%)",
//         }}
//       />
//       {/* update glow position */}
//       <div
//         aria-hidden
//         className="absolute inset-0 -z-10"
//         onMouseMove={(e) => {
//           const el = e.currentTarget.parentElement as HTMLElement;
//           const rect = el.getBoundingClientRect();
//           const mx = ((e.clientX - rect.left) / rect.width) * 100 + "%";
//           const my = ((e.clientY - rect.top) / rect.height) * 100 + "%";
//           el.style.setProperty("--mx", mx);
//           el.style.setProperty("--my", my);
//         }}
//       />

//       <div className="flex items-start gap-3">
//         <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-cyan-400/10 dark:text-cyan-200 overflow-hidden">
//           {picture ? (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img
//               src={picture}
//               alt={name}
//               className="h-12 w-12 object-cover"
//               loading="lazy"
//               decoding="async"
//             />
//           ) : (
//             <AvatarFallback name={name} />
//           )}
//         </div>

//         <div className="flex-1">
//           <h3 className="mb-0.5 text-[1.15rem] font-semibold md:text-[1.25rem]">
//             {truncate(name, 64)}
//           </h3>

//           {/* Job badge */}
//           <div
//             className={clsx(
//               "inline-flex items-center gap-1 rounded-full bg-gradient-to-br px-2 py-0.5 text-[11px] font-semibold",
//               getJobBadgeClasses(job)
//             )}
//           >
//             { job?.logo ? ( job.logo ) : null }
//             <span className="uppercase tracking-wide">{job?.name ?? "—"}</span>
//           </div>

//           {/* Bio (collapsible if long) */}
//           {bio ? <BioClamp text={bio} maxChars={160} /> : null}
//         </div>
//       </div>

//       {/* Focus tags */}
//       {focus?.length ? (
//         <div className="mt-3">
//           <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-300/80">
//             Fokus
//           </p>
//           <motion.div
//             layout
//             className="flex max-h-24 flex-wrap gap-2 overflow-y-auto pr-1"
//             style={{ transform: "translateZ(40px)" }}
//           >
//             {focus.map((f) => (
//               <FocusChip key={f} text={f} />
//             ))}
//           </motion.div>
//         </div>
//       ) : null}

//       {/* Footer actions */}
//       <div className="mt-3 flex items-center justify-between">
//         <div className="inline-flex items-center gap-2">
//           {social_media?.map((s) => (
//             <SocialIcon key={s.id} item={s} />
//           ))}
//         </div>

//         <a
//           href={`${hrefBase}/${profile ?? data.id}`}
//           className={clsx(
//             "relative inline-flex items-center gap-2 rounded-lg border border-slate-200/70 bg-white/70 px-3 py-1.5 text-sm font-semibold text-slate-800 transition",
//             "hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
//           )}
//         >
//           <span>Lihat Profil</span>
//           <motion.svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             className="h-4 w-4"
//             initial={{ x: 0 }}
//             whileHover={{ x: 2 }}
//             aria-hidden
//           >
//             <path
//               fillRule="evenodd"
//               d="M10.293 3.293a1 1 0 011.414 0l5 5a.997.997 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </motion.svg>
//         </a>
//       </div>

//       {/* Subtle border highlight on hover */}
//       <span
//         aria-hidden
//         className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition group-hover:border-fuchsia-400/50 group-hover:shadow-fuchsia-400/30"
//       />
//     </motion.div>
//   );
// }



// /* ===================== Example usage ===================== */
// // <TeamCardInteractive data={team} hrefBase="/about" />

"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import clsx from "clsx";

/* ===================== Local Types ===================== */

export interface Job {
  id: number;
  name: string;
  code?: string;
  logo?: React.ReactNode | string;
}

export interface SocialMedia {
  id: number;
  name?: string;
  code?: string;
  logo?: string;
  link?: string;
}

export interface Team {
  id: number;
  name: string;
  bio?: string;
  picture?: string;
  profile?: string | number;
  focus?: string[];
  job?: Job | null;
  social_media?: SocialMedia[];
}

/* ===================== Utilities ===================== */

const jobColorByCode: Record<string, string> = {
  CEO: "from-fuchsia-500/30 to-indigo-500/30 text-fuchsia-600 dark:text-fuchsia-300",
  CTO: "from-cyan-500/30 to-teal-500/30 text-cyan-600 dark:text-cyan-300",
  COO: "from-amber-500/30 to-orange-500/30 text-amber-700 dark:text-amber-300",
  PM: "from-violet-500/30 to-purple-500/30 text-violet-600 dark:text-violet-300",
  ENG: "from-sky-500/30 to-blue-500/30 text-sky-700 dark:text-sky-300",
  DS: "from-emerald-500/30 to-teal-500/30 text-emerald-700 dark:text-emerald-300",
};

function getJobBadgeClasses(job?: Job | null) {
  if (!job?.code) {
    return "from-slate-400/20 to-slate-500/20 text-slate-700 dark:text-slate-200";
  }
  return (
    jobColorByCode[job.code.toUpperCase()] ??
    "from-slate-400/20 to-slate-500/20 text-slate-700 dark:text-slate-200"
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

/* ===================== Small Components ===================== */

function Tooltip({ label }: { label: string }) {
  return (
    <motion.span
      role="tooltip"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow dark:bg-white dark:text-slate-900"
    >
      {label}
    </motion.span>
  );
}

function AvatarFallback({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

  return (
    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 dark:from-slate-700 dark:to-slate-800 dark:text-slate-200">
      <span className="text-sm font-semibold">{initials || "?"}</span>
    </div>
  );
}

function SocialIcon({ item }: { item: SocialMedia }) {
  const [hover, setHover] = React.useState(false);
  const label = item.name || item.code || "Social";

  return (
    <div className="relative">
      <a
        href={item.link || "#"}
        aria-label={label}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="outline-none"
      >
        <motion.img
          src={item.logo || "/icons/link.svg"}
          alt={label}
          width={24}
          height={24}
          className="h-6 w-6 object-contain opacity-90"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />
      </a>
      <AnimatePresence>{hover && <Tooltip label={label} />}</AnimatePresence>
    </div>
  );
}

function FocusChip({ text }: { text: string }) {
  return (
    <motion.span
      layout
      className="rounded-full border border-slate-200/70 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-slate-700 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 450, damping: 20 }}
    >
      {text}
    </motion.span>
  );
}

/* ===================== Main Card ===================== */

type Props = {
  data?: Team;
  hrefBase?: string;
  loading?: boolean;
  onClick?: () => void;
};

export function TeamCardInteractive({
  data,
  hrefBase = "/about",
  loading,
  onClick,
}: Props) {
  if (loading || !data) {
    return (
      <div className="animate-pulse rounded-xl border border-slate-200/70 p-4 dark:border-white/10">
        <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
    );
  }

  const { name, picture, bio, profile, focus = [], job, social_media = [] } = data;

  const ref = React.useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useTransform(rx, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(ry, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rx.set((e.clientY - rect.top) / rect.height - 0.5);
    ry.set((e.clientX - rect.left) / rect.width - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" as any }}
      className={clsx(
        "group relative rounded-xl border border-slate-200/70 bg-white/60 p-4 shadow-lg",
        "dark:border-white/10 dark:bg-slate-900/40 backdrop-blur-md"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-xl">
          {picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={picture} alt={name} className="h-full w-full object-cover" />
          ) : (
            <AvatarFallback name={name} />
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">{truncate(name, 64)}</h3>

          <div
            className={clsx(
              "inline-flex rounded-full bg-gradient-to-br px-2 py-0.5 text-[11px] font-semibold",
              getJobBadgeClasses(job)
            )}
          >
            {job?.name ?? "—"}
          </div>

          {bio && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{bio}</p>}
        </div>
      </div>

      {focus.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {focus.map((f) => (
            <FocusChip key={f} text={f} />
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2">
          {social_media.map((s) => (
            <SocialIcon key={s.id} item={s} />
          ))}
        </div>

        <a
          href={`${hrefBase}/profile?abc=${profile ?? data.id}`}
          className="text-sm font-semibold text-indigo-600 hover:underline dark:text-cyan-300"
        >
          Lihat Profil →
        </a>
      </div>
    </motion.div>
  );
}