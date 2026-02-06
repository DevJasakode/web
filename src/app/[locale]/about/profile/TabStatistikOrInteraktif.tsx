import { JSX } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    ThumbsUp,
    Crown,
    Trophy,
    Flame,
    StarHalf,
    Activity,
    TrendingUp,
    BarChart3,
} from "lucide-react";
import { 
    Endorsement,
    ActivityItem,
    SkillPulse,
    Badge,
} from "./types";


// Import Components
import { Stars } from "./Stars";

import { cx } from "./utils";


const ENDORSEMENTS: ReadonlyArray<Endorsement> = [
    {
        id: "maya",
        name: "Maya Ramadhani",
        role: "VP Product",
        company: "OrbitPay",
        quote: "Antonius memimpin dengan empati dan menyeimbangkan visi jangka panjang dengan eksekusi kilat. Tim kami merasakan dampaknya dalam 2 sprint pertama.",
        score: 4.9,
        avatar: "https://i.pravatar.cc/80?img=32",
        relationship: "Stakeholder utama",
    },
    {
        id: "kevin",
        name: "Kevin Tan",
        role: "Head of Engineering",
        company: "Atlas Commerce",
        quote: "Kolaborasi dengan Antonius selalu profesional. Handoff desain yang detail membuat engineer fokus pada kualitas rilis.",
        score: 4.7,
        avatar: "https://i.pravatar.cc/80?img=14",
        relationship: "Partner engineering",
    },
    {
        id: "sarah",
        name: "Sarah Prameswari",
        role: "Lead UX Researcher",
        company: "Nimbus Learning",
        quote: "Kemampuannya memetakan insight pengguna menjadi roadmap visual sangat krusial saat kami pivot strategi.",
        score: 4.8,
        avatar: "https://i.pravatar.cc/80?img=58",
        relationship: "Kolaborator riset",
    },
];

const ACTIVITY_ITEMS: ReadonlyArray<ActivityItem> = [
    {
        id: "atlas-release",
        type: "project",
        title: "Merilis Atlas Journey v1.4",
        description: "Menambahkan integrasi Notion & Supabase untuk menampilkan data karier secara real-time.",
        date: "Jan 2025",
        link: "https://github.com/jasakode/atlas-journey/releases",
    },
    {
        id: "blog-discovery",
        type: "post",
        title: "Artikel: Discovery sprint tanpa burnout",
        description: "Membagikan praktik memadukan kuesioner AI dengan contextual interview.",
        date: "Des 2024",
        link: "https://medium.com/@antonius/discovery-sprint",
    },
    {
        id: "update-mentoring",
        type: "update",
        title: "Batch mentorship #07 dimulai",
        description: "18 mentee bergabung, fokus pada storytelling portfolio dan live prototyping.",
        date: "Nov 2024",
    },
];

const SKILL_PULSE: ReadonlyArray<SkillPulse> = [
    { id: "designops", label: "Design ops", value: 92, trend: "up" },
    { id: "research", label: "UX research", value: 84, trend: "steady" },
    { id: "frontend", label: "Front-end", value: 88, trend: "up" },
    { id: "strategy", label: "Product strategy", value: 90, trend: "up" },
    { id: "mentorship", label: "Mentorship", value: 94, trend: "steady" },
];

const BADGES: ReadonlyArray<Badge> = [
    {
        id: "design-champion",
        name: "Design Champion",
        level: "Level 6",
        description: "Diraih setelah memimpin >30 product discovery sprint lintas tim.",
        points: 1280,
        icon: Crown,
        accent: "border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
        id: "oss-trophy",
        name: "OSS Builder",
        level: "Level 5",
        description: "Kontributor aktif dengan 300+ merge dan 2 proyek populer.",
        points: 980,
        icon: Trophy,
        accent: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        id: "mentor-pulse",
        name: "Mentor Pulse",
        level: "Level 4",
        description: "Memberi 400+ jam coaching dengan feedback rata-rata 4.9/5.",
        points: 860,
        icon: Flame,
        accent: "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
];

export function TabStatistikOrInteraktif(): JSX.Element {
    const totalEndorsementScore = ENDORSEMENTS.reduce((sum, item) => sum + item.score, 0);
    const averageScore = (totalEndorsementScore / ENDORSEMENTS.length).toFixed(1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-10"
        >
            <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <motion.span
                    aria-hidden
                    className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Endorsement score</p>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Dipercaya rekan & stakeholder</h3>
                        </div>
                        <div className="flex items-center gap-3 rounded-full border border-amber-500/20 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                            <ThumbsUp className="h-4 w-4" />
                            Skor rata-rata {averageScore}/5
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1.1fr_1.1fr_1fr]">
                        <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                    <StarHalf className="h-6 w-6" />
                                </span>
                                <div>
                                    <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{averageScore}</p>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Skor keseluruhan</p>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2">
                                {ENDORSEMENTS.map((endorsement) => (
                                    <div key={endorsement.id} className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                                        <span>{endorsement.name.split(" ")[0]}</span>
                                        <div className="flex items-center gap-1">
                                            <Stars value={endorsement.score} />
                                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{endorsement.score}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2 grid gap-4">
                            {ENDORSEMENTS.map((endorsement, index) => (
                                <motion.div
                                    key={endorsement.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                                    className="flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={endorsement.avatar}
                                            alt={endorsement.name}
                                            className="h-12 w-12 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{endorsement.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{endorsement.role} · {endorsement.company}</p>
                                        </div>
                                        <span className="ml-auto rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-[0.7rem] font-semibold text-slate-600 dark:text-slate-300">
                                            {endorsement.relationship}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">“{endorsement.quote}”</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Aktivitas terbaru</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Jejak kontribusi publik</h3>
                    </div>
                    <Activity className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="relative mt-6 space-y-6">
                    <span className="absolute left-[17px] top-0 h-full w-px bg-slate-200 dark:bg-slate-700/60" aria-hidden />
                    {ACTIVITY_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                            className="relative ml-8 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                        >
                            <span className="absolute -left-8 top-4 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-500 shadow" />
                            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">{item.date}</span>
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300 uppercase">{item.type}</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-2">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.title}</h4>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                                </div>
                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-300"
                                    >
                                        Detail
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Skill pulse</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Grafik perkembangan</h3>
                    </div>
                    <TrendingUp className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700/60 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/85 dark:to-slate-900/70 p-6 shadow-sm dark:shadow-none">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Radar progress</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Menunjukkan fokus kompetensi 12 bulan terakhir.</p>
                        <div className="mt-6 grid grid-cols-5 gap-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                            {SKILL_PULSE.map((skill) => (
                                <div key={skill.id} className="space-y-3">
                                    <div className="mx-auto flex h-24 w-24 items-end justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-3">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${skill.value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="w-8 rounded-full bg-gradient-to-t from-blue-500 via-cyan-400 to-emerald-400"
                                            style={{ boxShadow: "0 10px 25px -15px rgba(59,130,246,1)" }}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <p>{skill.label}</p>
                                        <div className="flex items-center justify-center gap-1 text-xs text-emerald-500 dark:text-emerald-400">
                                            {skill.trend === "up" && <TrendingUp className="h-3 w-3" />}
                                            {skill.trend === "steady" && <BarChart3 className="h-3 w-3" />}
                                            <span>{skill.value}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Snapshot</p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                Growth front-end meningkat setelah eksperimen WebXR dan micro-interaction.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                Design ops stabil berkat pipeline dokumentasi + ritual bulanan.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                Mentorship tetap tinggi seiring batch baru yang dimulai tiap kuartal.
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Recognition</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Badges & level</h3>
                    </div>
                    <Crown className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {BADGES.map((badge, index) => (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                            className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                        >
                            <span className={cx("inline-flex h-11 w-11 items-center justify-center rounded-lg", badge.accent)}>
                                <badge.icon className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{badge.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{badge.level}</p>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{badge.description}</p>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5">{badge.points} XP</span>
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5">Season 2024</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </motion.div>
    )
};
