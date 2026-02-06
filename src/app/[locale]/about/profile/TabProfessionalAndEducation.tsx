import { useState, JSX } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Code2,
    Award,
    GraduationCap,
    Briefcase,
    BadgeCheck,
    Brain,
    Languages,
    Palette,
    PenTool,
    Server,
    Users,
    Workflow,
} from "lucide-react";
import {
    Experience,
    EducationEntry,
    Certification,
    SkillGroup,
} from "./types";



// Import Components
import { cx } from "./utils";


const EXPERIENCES: ReadonlyArray<Experience> = [
    {
        id: "kodecolor",
        role: "Founder & Principal Product Designer",
        company: "Kodecolor Studio",
        companyUrl: "https://kodecolor.com",
        location: "Remote • Palembang & Jakarta",
        period: "2017 – Sekarang",
        headline: "Memimpin studio boutique yang membantu startup Asia meluncurkan produk pertamanya.",
        achievements: [
            "Menggawangi lebih dari 22 product sprint dengan pendekatan discovery-to-delivery.",
            "Mengembangkan design system modular yang digunakan lintas 4 brand dan 3 platform.",
            "Meningkatkan conversion onboarding klien terbesar sebesar 18% melalui eksperimen UX.",
        ],
        stack: ["Product strategy", "Design ops", "Design system", "Story-driven UX"],
        icon: Briefcase,
        accent: "border border-slate-500/20 bg-slate-900/10 text-slate-700 dark:text-slate-200",
    },
    {
        id: "finbank",
        role: "Senior Product Designer",
        company: "Finbank Digital",
        companyUrl: "https://finbank.example",
        location: "Jakarta, Indonesia",
        period: "2015 – 2017",
        headline: "Menghadirkan banking experience yang transparan bagi UMKM.",
        achievements: [
            "Memimpin redesign aplikasi kredit produktif dengan peningkatan NPS +32 poin.",
            "Membangun design handoff pipeline dengan Storybook dan design tokens.",
            "Menginisiasi usability lab internal untuk sesi evaluasi dwimingguan.",
        ],
        stack: ["Data-informed UX", "Design tokens", "Stakeholder facilitation"],
        icon: Briefcase,
        accent: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        id: "edutech",
        role: "UX Engineer",
        company: "EduSphere",
        companyUrl: "https://edusphere.example",
        location: "Singapore (remote)",
        period: "2013 – 2015",
        headline: "Menggabungkan front-end engineering dengan eksperimen UX pada platform edukasi.",
        achievements: [
            "Menerjemahkan eksperimen riset ke komponen React reusable untuk tim global.",
            "Mempercepat iterasi prototyping hingga 40% dengan design-to-code kit internal.",
            "Mengelola integrasi a/b testing yang meningkatkan course completion 9%.",
        ],
        stack: ["React", "Design engineering", "A/B testing"],
        icon: Code2,
        accent: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
];

const EDUCATION: ReadonlyArray<EducationEntry> = [
    {
        id: "ti-sriwijaya",
        institution: "Universitas Sriwijaya",
        location: "Palembang, Indonesia",
        period: "2010 – 2014",
        degree: "Sarjana Teknik Informatika",
        focus: "Rekayasa Perangkat Lunak & Interaksi Manusia-Komputer",
        highlight: "Ketua laboratorium UX dan peraih hibah riset interface adaptif.",
    },
    {
        id: "smansa",
        institution: "SMAN 1 Palembang",
        location: "Palembang, Indonesia",
        period: "2007 – 2010",
        degree: "Ilmu Pengetahuan Alam",
        focus: "Fisika terapan & komunitas teknologi",
        highlight: "Membangun klub teknologi pelajar dengan fokus desain digital.",
    },
];

const CERTIFICATIONS: ReadonlyArray<Certification> = [
    {
        id: "mensa",
        title: "Member",
        issuer: "Mensa International",
        year: "2022",
        description: "Anggota resmi dengan skor IQ > 98 persentil, aktif dalam program problem-solving global.",
        icon: Brain,
        accent: "border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
    {
        id: "ux-lead",
        title: "Certified UX Lead",
        issuer: "Design Leadership Forum",
        year: "2021",
        credentialId: "DLF-UXL-8732",
        description: "Sertifikasi kepemimpinan produk digital dengan fokus scaling design ops.",
        icon: BadgeCheck,
        accent: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        id: "scrum",
        title: "Professional Scrum Master I",
        issuer: "Scrum.org",
        year: "2019",
        credentialId: "PSM1-46284",
        description: "Mendukung orkestrasi sprint lintas disiplin dan continuous discovery.",
        icon: Workflow,
        accent: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
];

const SKILL_GROUPS: ReadonlyArray<SkillGroup> = [
    {
        id: "craft",
        title: "Product craft",
        description: "Desain pengalaman menyeluruh dari insight hingga shipping.",
        items: ["Design system", "Journey orchestration", "Product discovery", "Narrative prototyping"],
        icon: PenTool,
        accent: "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
        id: "tech",
        title: "Technology",
        description: "Kemampuan teknikal untuk merancang dan menguji ide dengan cepat.",
        items: ["React & TypeScript", "Three.js / R3F", "Node & Go", "Design tokens"],
        icon: Server,
        accent: "border border-slate-500/20 bg-slate-500/10 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300",
    },
    {
        id: "collaboration",
        title: "Leadership & collaboration",
        description: "Memfasilitasi tim lintas negara dengan ritme yang sehat.",
        items: ["Coaching", "Facilitation", "Stakeholder alignment", "Public speaking"],
        icon: Users,
        accent: "border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
        id: "languages",
        title: "Languages",
        description: "Bahasa sehari-hari dalam kolaborasi.",
        items: ["Bahasa Indonesia (native)", "English (professional)", "Korean (conversational)", "Spanish (learning)"],
        icon: Languages,
        accent: "border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
];


export function TabProfessionalAndEducation(): JSX.Element {
    const [activeExperienceId, setActiveExperienceId] = useState<string>(EXPERIENCES[0]?.id ?? "");
    const activeExperience = EXPERIENCES.find((item) => item.id === activeExperienceId) ?? EXPERIENCES[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-10"
        >
            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]"
            >
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <Briefcase className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Pengalaman profesional
                    </div>
                    <div className="mt-4 space-y-4">
                        {EXPERIENCES.map((experience, index) => {
                            const isActive = experience.id === activeExperienceId;
                            return (
                                <motion.button
                                    key={experience.id}
                                    type="button"
                                    onClick={() => setActiveExperienceId(experience.id)}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.04 * index, duration: 0.35, ease: "easeOut" }}
                                    whileHover={{ y: -3, scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className={cx(
                                        "w-full rounded-xl border p-4 text-left transition",
                                        isActive ? "border-slate-900 bg-slate-900/90 text-white shadow" : "border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-900/55 hover:border-slate-300"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className={cx("text-sm font-semibold", isActive ? "text-white" : "text-slate-900 dark:text-slate-100")}>{experience.role}</p>
                                            <p className={cx("text-xs", isActive ? "text-slate-100" : "text-slate-500 dark:text-slate-400")}>{experience.company}</p>
                                        </div>
                                        <span
                                            className={cx(
                                                "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold",
                                                isActive ? "border-white/20 bg-white/15 text-white" : experience.accent,
                                            )}
                                        >
                                            {experience.period}
                                        </span>
                                    </div>
                                    <p className={cx("mt-2 text-xs leading-relaxed", isActive ? "text-slate-100" : "text-slate-500 dark:text-slate-400")}>{experience.headline}</p>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    key={activeExperience?.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
                >
                    <motion.span
                        aria-hidden
                        className="absolute -right-28 -top-28 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="relative z-10 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{activeExperience?.role}</h3>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    {activeExperience?.companyUrl ? (
                                        <a
                                            href={activeExperience.companyUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-300"
                                        >
                                            {activeExperience.company}
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-200">
                                            {activeExperience?.company}
                                        </span>
                                    )}
                                    <span className="h-3 w-px bg-slate-200 dark:bg-slate-700/60" aria-hidden />
                                    <span>{activeExperience?.location}</span>
                                </div>
                            </div>
                            <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/50 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                {activeExperience?.period}
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{activeExperience?.headline}</p>
                        <div className="space-y-2">
                            {activeExperience?.achievements.map((point) => (
                                <p key={point} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                    {point}
                                </p>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                            {activeExperience?.stack.map((item) => (
                                <span key={item} className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1 shadow-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Akademik</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Pendidikan formal</h3>
                    </div>
                    <GraduationCap className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {EDUCATION.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: 0.04 * index, duration: 0.35, ease: "easeOut" }}
                            className="space-y-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{entry.institution}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{entry.location}</p>
                                </div>
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-[0.7rem] font-semibold text-slate-600 dark:text-slate-300">
                                    {entry.period}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{entry.degree}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{entry.focus}</p>
                            <p className="text-xs font-medium uppercase tracking-wide text-blue-500 dark:text-blue-400">Highlight</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{entry.highlight}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Sertifikasi & lisensi</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Pembelajaran terakreditasi</h3>
                    </div>
                    <Award className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {CERTIFICATIONS.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: 0.04 * index, duration: 0.35, ease: "easeOut" }}
                            className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                        >
                            <span className={cx("inline-flex h-11 w-11 items-center justify-center rounded-lg", cert.accent)}>
                                <cert.icon className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{cert.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">{cert.year}</span>
                                {cert.credentialId && (
                                    <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">
                                        ID {cert.credentialId}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{cert.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Skill & tools</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Kemampuan inti</h3>
                    </div>
                    <Palette className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {SKILL_GROUPS.map((group, index) => (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                            className="flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <span className={cx("flex h-10 w-10 items-center justify-center rounded-lg", group.accent)}>
                                    <group.icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{group.title}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{group.description}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                                {group.items.map((item) => (
                                    <span key={item} className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1 shadow-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </motion.div>
    )
};