import { useState, JSX } from "react";
import { motion } from "framer-motion";
import {
    Sparkles,
    Target,
    Heart,
    Rocket,
    GraduationCap,
    Briefcase,
    Leaf,
    Milestone,
} from "lucide-react";
import {
    JourneyMilestoneCategory,
    JourneyChapter,
    JourneyMilestone,
    JourneySnapshot,
} from "./types";



// Import Components
import { cx } from "./utils";

const JOURNEY_CATEGORY_STYLES: Record<JourneyMilestoneCategory, { badge: string; dot: string }> = {
    education: {
        badge: "border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        dot: "bg-indigo-500",
    },
    career: {
        badge: "border border-slate-500/20 bg-slate-500/10 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300",
        dot: "bg-slate-600",
    },
    community: {
        badge: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        dot: "bg-emerald-500",
    },
    innovation: {
        badge: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
        dot: "bg-blue-500",
    },
};

const JOURNEY_CHAPTERS: ReadonlyArray<JourneyChapter> = [
    {
        id: "foundation",
        title: "Fondasi rasa ingin tahu",
        period: "2009 – 2014",
        headline: "Belajar membangun, jatuh cinta pada pengalaman digital",
        description:
            "Dimulai dari iseng merombak tampilan blog sekolah, berkembang menjadi keseriusan untuk mempelajari interaksi manusia dengan teknologi. Masa kuliah di Informatika memperkuat logika teknis sekaligus membuka ruang eksplorasi desain antarmuka.",
        keywords: ["UI experimentation", "Kompetisi desain", "Komunitas kampus"],
        icon: GraduationCap,
        accent: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
        gradient: "from-indigo-500/10 via-slate-50 to-white",
    },
    {
        id: "builder",
        title: "Menjadi builder produk",
        period: "2015 – 2019",
        headline: "Membentuk studio, mengelola tim lintas disiplin",
        description:
            "Masuk ke dunia profesional sebagai front-end engineer yang cepat beradaptasi menjadi product designer. Merintis studio kecil untuk klien lokal, mengorkestrasi proses penelitian hingga rilis produk dalam siklus yang iteratif.",
        keywords: ["Riset pengguna", "Design system awal", "Studio mandiri"],
        icon: Briefcase,
        accent: "border border-slate-500/20 bg-slate-900/10 text-slate-700 dark:text-slate-200",
        gradient: "from-slate-900/5 via-white to-slate-50",
    },
    {
        id: "vision",
        title: "Studio, sistem, dan eksplorasi",
        period: "2020 – Sekarang",
        headline: "Menggabungkan leadership dengan eksplorasi frontier",
        description:
            "Kini fokus sebagai product design lead yang memformulasikan strategi pengalaman menyeluruh. Mengembangkan design system multi-brand, memimpin program mentorship berbahasa Indonesia, dan bereksperimen dengan medium spatial web.",
        keywords: ["Design ops", "Mentorship", "Spatial web"],
        icon: Leaf,
        accent: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        gradient: "from-emerald-400/10 via-white to-slate-50",
    },
];

const JOURNEY_MILESTONES: ReadonlyArray<JourneyMilestone> = [
    {
        id: "2009-blog",
        chapterId: "foundation",
        year: "2009",
        title: "Memenangkan kompetisi desain blog nasional",
        description: "Belajar tentang hirarki visual dan pentingnya narasi dalam UI pertama kalinya.",
        category: "education",
        impact: "Membangun kepercayaan diri untuk mengejar desain secara serius.",
    },
    {
        id: "2011-community",
        chapterId: "foundation",
        year: "2011",
        title: "Mendirikan komunitas belajar desain kampus",
        description: "Mengadakan sesi berbagi rutin tentang UX dasar dan usability testing sederhana.",
        category: "community",
        impact: "Menemukan kegemaran memfasilitasi pembelajaran kolaboratif.",
    },
    {
        id: "2013-intern",
        chapterId: "foundation",
        year: "2013",
        title: "Magang sebagai front-end engineer",
        description: "Mengonversi wireframe menjadi UI interaktif dan mempelajari cara kerja tim lintas fungsi.",
        category: "career",
        impact: "Mewarisi kebiasaan dokumentasi yang disiplin dan QA bersama QA engineer.",
    },
    {
        id: "2015-fintech",
        chapterId: "builder",
        year: "2015",
        title: "Bergabung dengan startup fintech",
        description: "Memimpin redesign aplikasi mobile pinjaman produktif dengan fokus pada kejelasan data.",
        category: "career",
        impact: "Konversi onboarding naik 18% dalam tiga bulan pertama.",
    },
    {
        id: "2017-studio",
        chapterId: "builder",
        year: "2017",
        title: "Mendirikan Kodecolor Studio",
        description: "Mengelola tim hybrid untuk klien B2B dan B2C, mengatur proses discovery hingga delivery.",
        category: "community",
        impact: "Menjalankan 22 proyek dengan sistem retainer dan squad lintas bidang.",
    },
    {
        id: "2019-design-system",
        chapterId: "builder",
        year: "2019",
        title: "Merilis design system lintas platform",
        description: "Membangun library React dan Figma dengan token desain dan dokumentasi versioned.",
        category: "innovation",
        impact: "Mengurangi waktu handoff engineer sebesar 35%.",
    },
    {
        id: "2021-lead",
        chapterId: "vision",
        year: "2021",
        title: "Menjadi product design lead",
        description: "Memimpin squad lintas negara untuk platform SaaS dengan pengguna aktif 2 juta+.",
        category: "career",
        impact: "Retention meningkat 14% setelah peluncuran guided onboarding.",
    },
    {
        id: "2022-mentorship",
        chapterId: "vision",
        year: "2022",
        title: "Membuka program mentorship berbahasa Indonesia",
        description: "Membimbing desainer dan engineer muda melalui sesi mingguan dan review portofolio.",
        category: "community",
        impact: "120+ sesi mentoring dengan rating kepuasan 4.9/5.",
    },
    {
        id: "2024-spatial",
        chapterId: "vision",
        year: "2024",
        title: "Eksperimen spatial web & WebXR",
        description: "Menggabungkan Three.js dan R3F untuk prototipe dashboard immersive.",
        category: "innovation",
        impact: "Proof of concept dipresentasikan di dua konferensi komunitas produk.",
    },
];

const JOURNEY_SNAPSHOTS: ReadonlyArray<JourneySnapshot> = [
    {
        id: "products",
        label: "Produk digital dirilis",
        value: "32+",
        description: "Dari SaaS, e-commerce, hingga platform edukasi lintas perangkat.",
        icon: Rocket,
        accent: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        id: "mentoring",
        label: "Jam mentoring",
        value: "450",
        description: "Mendampingi kreator muda menavigasi karier produk dan desain.",
        icon: Heart,
        accent: "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
        id: "communities",
        label: "Komunitas dibina",
        value: "6",
        description: "Menginisiasi ruang belajar rutin dari Palembang hingga Jakarta.",
        icon: Sparkles,
        accent: "border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
];


export function TabJourneyOfLife(): JSX.Element {
    const [activeChapterId, setActiveChapterId] = useState<JourneyChapter["id"]>(JOURNEY_CHAPTERS[0].id);
    const activeChapter = JOURNEY_CHAPTERS.find((chapter) => chapter.id === activeChapterId)!;
    const filteredMilestones = JOURNEY_MILESTONES.filter((item) => item.chapterId === activeChapterId);

    return (
        <motion.div
            initial={{ opacity: 0.1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-10"
        >
            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-7 shadow-sm"
            >
                <motion.div
                    aria-hidden
                    className="absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10 flex flex-col gap-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <Milestone className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Perjalanan hidup
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 md:text-3xl">Evolusi Antonius sebagai builder produk</h2>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            Perjalanan ini bukan garis lurus. Ada fase belajar, membangun, dan menerjemahkan visi ke
                            dalam produk nyata. Setiap bab memberi sudut pandang baru tentang bagaimana teknologi dapat
                            mendukung manusia sekaligus menjaga keberlanjutan tim yang mengerjakannya.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {JOURNEY_CHAPTERS.map((chapter) => {
                            const isActive = chapter.id === activeChapterId;
                            return (
                                <motion.button
                                    key={chapter.id}
                                    type="button"
                                    onClick={() => setActiveChapterId(chapter.id)}
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className={cx(
                                        "relative flex h-full flex-col gap-3 rounded-xl border p-4 text-left shadow-sm transition",
                                        isActive
                                            ? "border-slate-900 bg-slate-900/90 text-white"
                                            : "border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-900/55 hover:border-slate-300"
                                    )}
                                >
                                    <span
                                        className={cx(
                                            "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
                                            isActive
                                                ? "border-white/20 bg-white/15 text-white"
                                                : chapter.accent
                                        )}
                                    >
                                        <chapter.icon className="h-4 w-4" /> {chapter.period}
                                    </span>
                                    <p className={cx("text-sm font-semibold", isActive ? "text-white" : "text-slate-900 dark:text-slate-100")}>{chapter.title}</p>
                                    <p className={cx("text-xs leading-relaxed", isActive ? "text-slate-100" : "text-slate-500 dark:text-slate-400")}>{chapter.headline}</p>
                                    </motion.button>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            <motion.section
                key={activeChapter.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="grid gap-6 lg:grid-cols-[1.4fr_1fr]"
            >
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm">
                    <div
                        className={cx(
                            "pointer-events-none absolute inset-0 rounded-2xl opacity-90",
                            `bg-gradient-to-br ${activeChapter.gradient}`,
                        )}
                        aria-hidden
                    />
                    <div className="relative z-10 flex flex-col gap-4">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
                            <Sparkles className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Bab aktif
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{activeChapter.headline}</h3>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{activeChapter.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs font-medium">
                            {activeChapter.keywords.map((keyword) => (
                                <span
                                    key={keyword}
                                    className="rounded-full border border-slate-300/60 bg-white/80 dark:bg-slate-900/50 px-3 py-1 text-slate-600 dark:text-slate-300 shadow-sm"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
                >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <Target className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Dampak bab ini
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        Fokus saya pada fase ini: memperluas dampak dengan pola kerja yang berkelanjutan, menjaga growth
                        pribadi sekaligus memberi ruang bagi orang lain untuk berkembang. Ini adalah kombinasi antara craft,
                        leadership, dan eksplorasi teknologi baru.
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <p className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Merancang sistem yang dapat diwariskan, bukan hanya proyek satu kali.
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Menjaga ritme sehat melalui dokumentasi dan retrospektif berkala.
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Mendorong kolaborasi lintas disiplin agar insight cepat terkonversi jadi eksperimen.
                        </p>
                    </div>
                </motion.div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Titik balik</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Milestone utama bab ini</h3>
                    </div>
                    <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                        {filteredMilestones.length} momen kunci
                    </span>
                </div>
                <div className="relative mt-6 space-y-6">
                    <span className="absolute left-[19px] top-0 h-full w-px bg-slate-200 dark:bg-slate-700/60" aria-hidden />
                    {filteredMilestones.map((milestone, index) => {
                        const styles = JOURNEY_CATEGORY_STYLES[milestone.category];
                        return (
                            <motion.div
                                key={milestone.id}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                                className="relative ml-8 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm"
                            >
                                <span
                                    className={cx(
                                        "absolute -left-8 top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow",
                                        styles.dot
                                    )}
                                />
                                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">
                                        {milestone.year}
                                    </span>
                                    <span className={cx("rounded-full px-2 py-0.5", styles.badge)}>
                                        {milestone.category.toUpperCase()}
                                    </span>
                                </div>
                                <h4 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{milestone.title}</h4>
                                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{milestone.description}</p>
                                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-blue-500 dark:text-blue-400">Dampak</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{milestone.impact}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="grid gap-4 md:grid-cols-3"
            >
                {JOURNEY_SNAPSHOTS.map((snapshot, index) => (
                    <motion.div
                        key={snapshot.id}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ delay: 0.04 * index, duration: 0.35, ease: "easeOut" }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/70 p-5 shadow-sm"
                    >
                        <span className={cx("inline-flex h-11 w-11 items-center justify-center rounded-lg", snapshot.accent)}>
                            <snapshot.icon className="h-5 w-5" />
                        </span>
                        <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{snapshot.value}</p>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{snapshot.label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{snapshot.description}</p>
                    </motion.div>
                ))}
            </motion.section>
        </motion.div>
    )
};