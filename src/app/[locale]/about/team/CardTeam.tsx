"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { AboutTeam, AboutTeamSocialMedia } from "@/api/about/team/models";

const positionColorCode: Record<AboutTeam["position"], string> = {
    CEO: "from-fuchsia-500/30 to-indigo-500/30 text-fuchsia-600 dark:text-fuchsia-300",
    CTO: "from-cyan-500/30 to-teal-500/30 text-cyan-600 dark:text-cyan-300",
    COO: "from-amber-500/30 to-orange-500/30 text-amber-700 dark:text-amber-300",
    PM: "from-violet-500/30 to-purple-500/30 text-violet-600 dark:text-violet-300",
    ENG: "from-sky-500/30 to-blue-500/30 text-sky-700 dark:text-sky-300",
    DS: "from-emerald-500/30 to-teal-500/30 text-emerald-700 dark:text-emerald-300",
};

function getJobBadgeClasses(position: AboutTeam["position"]) {
    return (
        positionColorCode[position.toUpperCase()] ??
        "from-slate-400/20 to-slate-500/20 text-slate-700 dark:text-slate-200"
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
};

function truncate(s: string, n: number) {
    return s.length > n ? s.slice(0, n - 1) + "…" : s;
};

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
};

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
};

function SocialIcon({ item }: { item: AboutTeamSocialMedia }) {
    const [hover, setHover] = useState(false);
    // const label = item.name || item.code || "Social";

    return (
        <div className="relative">
            <a
                href={item.url || "#"}
                aria-label={item.platform}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onFocus={() => setHover(true)}
                onBlur={() => setHover(false)}
                className="outline-none"
            >
                <motion.img
                    src={item.platform_logo || "/assets/Logo.png"}
                    alt={item.platform_url || item.platform}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain opacity-90"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
            </a>
            <AnimatePresence>{hover && <Tooltip label={item.platform} />}</AnimatePresence>
        </div>
    );
};

interface CardTeamProps {
    team: AboutTeam;
    loading?: boolean;
    onClick?: () => void;
};

export function CardTeam({
    team,
    loading,
    onClick,
}: CardTeamProps) {
    if (loading) {
        return (
            <div className="animate-pulse rounded-xl border border-slate-200/70 p-4 dark:border-white/10">
                <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
            </div>
        );
    }

    const ref = useRef<HTMLDivElement | null>(null);
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
                    {
                        team.avatar ?
                            <img src={team.avatar} alt={team.name} className="h-full w-full object-cover" /> :
                            <AvatarFallback name={team.name} />
                    }
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{truncate(team.name, 64)}</h3>
                    <div
                        className={clsx(
                            "inline-flex rounded-full bg-gradient-to-br px-2 py-0.5 text-[11px] font-semibold",
                            getJobBadgeClasses(team.position)
                        )}
                    >
                        {team.position}
                    </div>
                    {team.position_desc && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{team.position_desc}</p>}
                </div>
            </div>
            {
                team.focus ?
                    <div className="mt-3 flex flex-wrap gap-2">
                        {
                            team.focus.split(",").map((item, i) => (<FocusChip key={i} text={truncate(item, 15)} />))
                        }
                    </div>
                    : null
            }
            <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2">
                    {team.social_media?.map((s) => (
                        <SocialIcon key={s.id} item={s} />
                    ))}
                </div>
                {
                    team.profile && (
                        <a
                            href={`/about/profile/@${team.profile}`}
                            className="text-sm font-semibold text-indigo-600 hover:underline dark:text-cyan-300 flex items-center"
                        >
                            <span className="mr-2">Lihat Profil</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                <path fill="currentColor" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
                            </svg>
                        </a>
                    )
                }
            </div>
        </motion.div>
    )
};