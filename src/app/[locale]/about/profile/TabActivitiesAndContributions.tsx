import { JSX } from "react";
import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    Video,
    Linkedin,
    Instagram,
    Twitter,
    ArrowUpRight,
    Sparkles,
    Target,
    Flag,
    BookOpen,
    Compass,
    Heart,
    Code2,
    Lightbulb,
    Coffee,
    Sun,
    Moon,
    Award,
    Rocket,
    GraduationCap,
    Briefcase,
    Leaf,
    BadgeCheck,
    Brain,
    Languages,
    PenTool,
    Server,
    Users,
    Workflow,
    GitBranch,
    Mic,
    HeartHandshake,
    Crown,
    Trophy,
    Flame,
} from "lucide-react";

import { 
    TimelineTab,
    TimelineEvent,
    StatusTone,
    ContactChannel,
    SocialLink,
    AvailabilitySlot,
    ContactHighlight,
    PersonalFact,
    LifeGoal,
    ProfileLensKey,
    ProfileLens,
    DailyRhythm,
    CoreValue,
    HeroHighlight,
    JourneyMilestoneCategory,
    JourneyChapter,
    JourneyMilestone,
    JourneySnapshot,
    Experience,
    EducationEntry,
    Certification,
    SkillGroup,
    CommunityInitiative,
    OpenSourceProject,
    SpeakingEngagement,
    MentoringProgram,
    ActivityStat,
    Endorsement,
    ActivityItem,
    SkillPulse,
    Badge,
} from "./types";
import { IconWhatsapp, IconTelegram } from "./Icons";
import { cx } from "./utils";


const COMMUNITY_INITIATIVES: ReadonlyArray<CommunityInitiative> = [
    {
        id: "kodecolor-circle",
        name: "Kodecolor Circle",
        role: "Founder & host",
        location: "Palembang • Remote",
        year: "2018 – Sekarang",
        description: "Komunitas kreator digital dengan sesi studi kasus, critique jam, dan kolaborasi lintas kota.",
        impact: "600+ anggota aktif, 48 sesi sharing, dan 9 proyek kolaboratif",
        icon: Users,
        accent: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        id: "design-sprint",
        name: "APAC Product Sprint Guild",
        role: "Co-facilitator",
        location: "Hybrid • Singapore & Jakarta",
        year: "2021 – Sekarang",
        description: "Guild lintas perusahaan untuk eksperimen metodologi design sprint dan continuous discovery.",
        impact: "Menginisiasi 12 eksperimen lintas organisasi dengan dokumentasi publik.",
        icon: Workflow,
        accent: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
        id: "edu-maker",
        name: "Edu Maker Lab",
        role: "Volunteer product coach",
        location: "Jakarta",
        year: "2020 – 2023",
        description: "Program inkubasi pendidikan yang mendampingi guru membuat platform belajar mandiri.",
        impact: "Mentoring 35 guru, 7 platform micro-learning diluncurkan.",
        icon: HeartHandshake,
        accent: "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
];

const OPEN_SOURCE_PROJECTS: ReadonlyArray<OpenSourceProject> = [
    {
        id: "kodecolor-ui",
        name: "Kodecolor UI",
        description: "Sistem komponen React + Figma token yang berfokus pada aksesibilitas dan performa.",
        role: "Maintainer",
        highlights: [
            "Merilis 40+ komponen dengan dokumentasi Storybook interaktif.",
            "Integrasi token ke Style Dictionary dan Tailwind plugin custom.",
        ],
        repoUrl: "https://github.com/jasakode/kodecolor-ui",
        accent: "border border-slate-500/20 bg-slate-500/10 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300",
    },
    {
        id: "atlas-journey",
        name: "Atlas Journey",
        description: "Template open-source untuk memvisualisasikan career journey dengan React + Framer Motion.",
        role: "Creator",
        highlights: [
            "Digunakan oleh 1.2k+ kreator untuk halaman portfolio.",
            "Memperkenalkan pattern micro-interaction accessible-ready.",
        ],
        repoUrl: "https://github.com/jasakode/atlas-journey",
        accent: "border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
];

const SPEAKING_ENGAGEMENTS: ReadonlyArray<SpeakingEngagement> = [
    {
        id: "decode-2024",
        event: "Decode Product Conference",
        format: "Keynote",
        location: "Jakarta",
        year: "2024",
        topic: "Design ops: Scaling empathy in hybrid teams",
        takeaway: "Berbagi kerangka 'ritual, rhythm, repository' untuk sinkronisasi tim lintas zona waktu.",
    },
    {
        id: "figma-community",
        event: "Figma Community Meetup",
        format: "Workshop",
        location: "Singapore",
        year: "2023",
        topic: "Design tokens to production in 60 minutes",
        takeaway: "Hands-on workflow yang menyatukan Figma Tokens, GitHub Actions, dan Storybook.",
    },
    {
        id: "uxid",
        event: "UX Indonesia Circle",
        format: "Fireside chat",
        location: "Online",
        year: "2022",
        topic: "Narrative prototyping for stakeholder buy-in",
        takeaway: "Studi kasus bagaimana storytelling mempercepat approval roadmap fitur.",
    },
];

const MENTORING_PROGRAMS: ReadonlyArray<MentoringProgram> = [
    {
        id: "kodecolor-mentorship",
        program: "Kodecolor Mentorship",
        focus: "Career transition ke product design",
        cadence: "Grup mingguan + 1:1",
        participants: "120+ kreator",
        outcomes: "67% mentee berhasil masuk industri dalam 6 bulan",
        icon: Users,
        accent: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        id: "women-tech",
        program: "Women Techmakers",
        focus: "Confidence building & portfolio review",
        cadence: "Kelas intensif 8 pekan",
        participants: "45 peserta",
        outcomes: "37 proyek demo dipublikasikan, 8 pembicara baru",
        icon: HeartHandshake,
        accent: "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
        id: "campus-sprint",
        program: "Campus Sprint Coach",
        focus: "Tim mahasiswa membangun MVP sosial",
        cadence: "Bootcamp 3 minggu",
        participants: "18 tim",
        outcomes: "5 MVP masuk tahap inkubasi lanjutan",
        icon: GraduationCap,
        accent: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
];

const ACTIVITY_STATS: ReadonlyArray<ActivityStat> = [
    {
        id: "community-hours",
        label: "Jam kontribusi komunitas",
        value: "820+",
        description: "Facilitation, coaching, dan sesi live building sejak 2018.",
        icon: Sparkles,
        accent: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        id: "oss-merge",
        label: "Merge OSS",
        value: "310",
        description: "Kontribusi ke repositori internal & publik terkait design tooling.",
        icon: GitBranch,
        accent: "border border-slate-500/20 bg-slate-500/10 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300",
    },
    {
        id: "talks",
        label: "Sesi publik",
        value: "58",
        description: "Diskusi, keynote, dan workshop di ekosistem APAC.",
        icon: Mic,
        accent: "border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
];


export function TabActivitiesAndContributions(): JSX.Element {
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
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Kontribusi yang berarti</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Impact snapshot</h3>
                    </div>
                    <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                        Updated 2024
                    </span>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {ACTIVITY_STATS.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                            whileHover={{ y: -3, scale: 1.01 }}
                            className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-5 shadow-sm"
                        >
                            <span className={cx("inline-flex h-11 w-11 items-center justify-center rounded-lg", stat.accent)}>
                                <stat.icon className="h-5 w-5" />
                            </span>
                            <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{stat.value}</p>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{stat.label}</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{stat.description}</p>
                        </motion.div>
                    ))}
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Community building</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Inisiatif yang digerakkan</h3>
                    </div>
                    <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {COMMUNITY_INITIATIVES.map((initiative, index) => (
                        <motion.div
                            key={initiative.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                            className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                        >
                            <span className={cx("inline-flex h-11 w-11 items-center justify-center rounded-lg", initiative.accent)}>
                                <initiative.icon className="h-5 w-5" />
                            </span>
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{initiative.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{initiative.role}</p>
                                </div>
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-[0.7rem] font-semibold text-slate-600 dark:text-slate-300">
                                    {initiative.year}
                                </span>
                            </div>
                            <p className="text-xs font-medium uppercase tracking-wide text-blue-500 dark:text-blue-400">Lokasi</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{initiative.location}</p>
                            <p className="text-xs font-medium uppercase tracking-wide text-blue-500 dark:text-blue-400">Aktivitas</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{initiative.description}</p>
                            <p className="text-xs font-medium uppercase tracking-wide text-blue-500 dark:text-blue-400">Dampak</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{initiative.impact}</p>
                        </motion.div>
                    ))}
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Open source</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Kode yang dibagikan</h3>
                    </div>
                    <GitBranch className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {OPEN_SOURCE_PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                            className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{project.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{project.role}</p>
                                </div>
                                <span className={cx("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold", project.accent)}>
                                    OSS
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                                {project.highlights.map((highlight) => (
                                    <li key={highlight} className="flex items-start gap-2">
                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-300"
                                >
                                    Lihat repo
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Speaking & sharing</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Berbagi di panggung</h3>
                    </div>
                    <Mic className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                </div>
                <div className="relative mt-6 space-y-6">
                    <span className="absolute left-[15px] top-0 h-full w-px bg-slate-200 dark:bg-slate-700/60" aria-hidden />
                    {SPEAKING_ENGAGEMENTS.map((engagement, index) => (
                        <motion.div
                            key={engagement.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                            className="relative ml-8 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                        >
                            <span className="absolute -left-8 top-4 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-purple-500 shadow" />
                            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">{engagement.year}</span>
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">{engagement.format}</span>
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">{engagement.location}</span>
                            </div>
                            <h4 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{engagement.event}</h4>
                            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">{engagement.topic}</p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{engagement.takeaway}</p>
                        </motion.div>
                    ))}
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Mentoring & coaching</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Program yang diampu</h3>
                    </div>
                    <HeartHandshake className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {MENTORING_PROGRAMS.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                            className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                        >
                            <span className={cx("inline-flex h-10 w-10 items-center justify-center rounded-lg", program.accent)}>
                                <program.icon className="h-5 w-5" />
                            </span>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{program.program}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{program.focus}</p>
                            <div className="grid gap-1 text-sm text-slate-600 dark:text-slate-300">
                                <p><span className="font-semibold text-slate-800 dark:text-slate-100">Cadence:</span> {program.cadence}</p>
                                <p><span className="font-semibold text-slate-800 dark:text-slate-100">Peserta:</span> {program.participants}</p>
                            </div>
                            <p className="text-xs font-medium uppercase tracking-wide text-blue-500 dark:text-blue-400">Hasil</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{program.outcomes}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </motion.div>
    )
};
