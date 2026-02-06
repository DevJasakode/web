import { useState, JSX } from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Globe,
    CalendarDays,
    Clock,
    Sparkles,
    Bell,
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
} from "lucide-react";

import {
    PersonalFact,
    LifeGoal,
    ProfileLensKey,
    ProfileLens,
    DailyRhythm,
    CoreValue,
    HeroHighlight,
} from "./types";
import { cx } from "./utils";

// import { 
//     TimelineTab,
//     TimelineEvent,
//     StatusTone,
//     ContactChannel,
//     SocialLink,
//     AvailabilitySlot,
//     ContactHighlight,
//     PersonalFact,
//     LifeGoal,
//     ProfileLensKey,
//     ProfileLens,
//     DailyRhythm,
//     CoreValue,
//     HeroHighlight,
//     JourneyMilestoneCategory,
//     JourneyChapter,
//     JourneyMilestone,
//     JourneySnapshot,
//     Experience,
//     EducationEntry,
//     Certification,
//     SkillGroup,
//     CommunityInitiative,
//     OpenSourceProject,
//     SpeakingEngagement,
//     MentoringProgram,
//     ActivityStat,
//     Endorsement,
//     ActivityItem,
//     SkillPulse,
//     Badge,
// } from "@pages/about/profile/types";




const PROFILE_LENSES: Record<ProfileLensKey, ProfileLens> = {
    professional: {
        title: "Product designer & systems thinker",
        subtitle: "Menggabungkan research, interface motion, dan implementasi front-end.",
        summary:
            "Saya merancang pengalaman digital human-centric dengan pendekatan data-driven. Fokus pada pembuatan design system yang scalable, eksperimen A/B cepat, dan kolaborasi lintas disiplin dari discovery hingga delivery.",
        bullets: [
            {
                id: "craft",
                label: "Craft",
                detail: "Design system modular untuk platform dengan >2 juta pengguna aktif.",
            },
            {
                id: "leadership",
                label: "Leadership",
                detail: "Memimpin squad 8 orang (design-engineering-product) dengan kerangka prioritas berbasis impact.",
            },
            {
                id: "experimentation",
                label: "Experimentation",
                detail: "Merilis 17 eksperimen fitur dalam 12 bulan terakhir dengan peningkatan retention 14%.",
            },
        ],
    },
    personal: {
        title: "Learner, community builder, family-first",
        subtitle: "Perjalanan personal yang memadukan teknologi, seni, dan kebiasaan mindful.",
        summary:
            "Saya percaya hidup yang seimbang dimulai dari kebiasaan kecil. Mengajar komunitas desain lokal, bermain musik akustik di akhir pekan, dan menjaga kesehatan mental melalui journaling.",
        bullets: [
            {
                id: "community",
                label: "Komunitas",
                detail: "Founder Kodecolor Circle — komunitas dengan 600+ kreator aktif berbagi studi kasus.",
            },
            {
                id: "wellbeing",
                label: "Keseharian",
                detail: "Rutinitas lari 5K mingguan dan sesi mindfulness untuk menjaga fokus.",
            },
            {
                id: "learning",
                label: "Belajar",
                detail: "Sedang mengeksplorasi WebXR & 3D storytelling untuk medium edukasi baru.",
            },
        ],
    },
};

const PERSONAL_FACTS: ReadonlyArray<PersonalFact> = [
    {
        id: "citizenship",
        label: "Kewarganegaraan",
        value: "Indonesia",
        description: "Lahir di Palembang, bangga membawa perspektif lokal dalam produk global.",
        icon: Flag,
        accent: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
        id: "residence",
        label: "Domisili",
        value: "Palembang, Sumatera Selatan",
        description: "Aktif kolaborasi remote lintas Jakarta, Singapura, hingga Berlin.",
        icon: MapPin,
        accent: "border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
        id: "languages",
        label: "Bahasa",
        value: "Bahasa Indonesia • English",
        description: "Korean conversational learner — senang menjembatani budaya dalam tim.",
        icon: BookOpen,
        accent: "border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    {
        id: "life-purpose",
        label: "Tujuan hidup",
        value: "Mendampingi 1 juta kreator membangun produk digital berkelanjutan.",
        description: "Mulai dari mentoring komunitas lokal hingga inkubasi studio produk.",
        icon: Target,
        accent: "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
        id: "working-style",
        label: "Gaya bekerja",
        value: "Design strategist, INFJ-A",
        description: "Mengutamakan empati, struktur roadmap jelas, dan eksperimen data-driven.",
        icon: Compass,
        accent: "border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
];

const HERO_HIGHLIGHTS: ReadonlyArray<HeroHighlight> = [
    {
        id: "experience",
        label: "12 tahun membangun produk",
        description: "Memimpin desain dan engineering dari startup SaaS hingga enterprise banking.",
        icon: Award,
    },
    {
        id: "hybrid",
        label: "Hybrid designer-engineer",
        description: "Menghubungkan riset pengguna dengan implementasi front-end yang terukur.",
        icon: Code2,
    },
    {
        id: "morning",
        label: "Ritual mindful pagi",
        description: "Sunrise run, journaling, dan menyeduh kopi manual brew favorit.",
        icon: Sun,
    },
    {
        id: "exploration",
        label: "Eksplorasi spatial web",
        description: "Sedang bereksperimen dengan Three.js dan WebXR untuk pengalaman immersive.",
        icon: Coffee,
    },
];


const LIFE_GOALS: ReadonlyArray<LifeGoal> = [
    {
        id: "studio",
        title: "Studio produk berdampak",
        description: "Membangun collective yang membantu UMKM dan startup Asia merilis produk pertama mereka.",
        progress: 72,
        icon: Rocket,
        accent: "text-sky-500 dark:text-sky-400",
    },
    {
        id: "mentor",
        title: "Mentoring talenta digital",
        description: "Mengkurasi kurikulum desain produk dan membuka akses mentorship berbahasa Indonesia.",
        progress: 48,
        icon: Award,
        accent: "text-amber-500 dark:text-amber-400",
    },
    {
        id: "life-balance",
        title: "Family-first lifestyle",
        description: "Menjadwalkan 3 hari fleksibel setiap minggu untuk keluarga, kesehatan, dan eksplorasi seni.",
        progress: 35,
        icon: Heart,
        accent: "text-rose-500 dark:text-rose-400",
    },
];

const PROFILE_LENS_ORDER: ReadonlyArray<ProfileLensKey> = ["professional", "personal"] as const;

const CORE_VALUES: ReadonlyArray<CoreValue> = [
    {
        id: "empathy",
        title: "Empati radikal",
        description: "Memulai setiap proyek dengan sesi mendengarkan aktif untuk memahami motivasi pengguna.",
        icon: Heart,
        accent: "border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
        id: "curiosity",
        title: "Rasa ingin tahu tak terbatas",
        description: "Eksperimen mingguan dengan teknologi baru dan mendokumentasikannya secara terbuka.",
        icon: Lightbulb,
        accent: "border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
        id: "craftsmanship",
        title: "Craftsmanship",
        description: "Iterasi desain hingga menyatu dengan detail micro-interaction yang konsisten.",
        icon: Sparkles,
        accent: "border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
];

const DAILY_RHYTHM: ReadonlyArray<DailyRhythm> = [
    {
        id: "sunrise",
        time: "05.30 – 08.00",
        title: "Sunrise journaling",
        description: "Ngopi, menulis di jurnal kinesthetic, dan menyusun prioritas harian.",
        icon: Sun,
    },
    {
        id: "focus",
        time: "09.00 – 17.30",
        title: "Product sprints",
        description: "Kolaborasi lintas zona waktu, usability test, dan coding UI real-time.",
        icon: Code2,
    },
    {
        id: "evening-lab",
        time: "20.00 – 22.00",
        title: "Exploration lab",
        description: "Belajar WebXR, menulis catatan publik, atau mentoring komunitas daring.",
        icon: Moon,
    },
];

export function TabAbout(): JSX.Element {
    const [lens, setLens] = useState<ProfileLensKey>("professional");
    const lensData = PROFILE_LENSES[lens];

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-10"
        >
            <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/85 dark:to-slate-900/70 p-8 shadow-sm dark:shadow-none"
            >
                <motion.div
                    aria-hidden
                    className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="absolute -bottom-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="relative flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <Sparkles className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Tentang Antonius
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 md:text-3xl">
                            Product designer yang menyatukan strategi, craft, dan pengalaman manusia
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            Saya membantu tim produk mengubah insight pengguna menjadi pengalaman digital yang bernilai.
                            Perjalanan ini memadukan riset mendalam, eksplorasi visual, dan kemampuan engineering sehingga
                            ide dapat lahir menjadi produk nyata dengan ritme yang stabil.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-3 py-1 shadow-sm">
                            <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" /> Palembang, Indonesia
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-3 py-1 shadow-sm">
                            <Globe className="h-4 w-4 text-slate-500 dark:text-slate-400" /> Remote • GMT+7
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-3 py-1 shadow-sm">
                            <CalendarDays className="h-4 w-4 text-slate-500 dark:text-slate-400" /> 5 Juni 1992
                        </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {HERO_HIGHLIGHTS.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * index, duration: 0.4, ease: "easeOut" }}
                                whileHover={{ y: -4, scale: 1.01 }}
                                className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-900/55 p-4 shadow-sm backdrop-blur"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200">
                                        <item.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.label}</p>
                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                                    </div>
                                </div>
                                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-0 transition group-hover:opacity-100" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="grid gap-4 md:grid-cols-2"
            >
                {PERSONAL_FACTS.map((fact, index) => (
                    <motion.div
                        key={fact.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: 0.05 * index, duration: 0.4, ease: "easeOut" }}
                        whileHover={{ y: -3, scale: 1.005 }}
                        className="group flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-900/55 p-5 shadow-sm backdrop-blur"
                    >
                        <div className="flex items-center gap-3">
                            <span className={cx("flex h-11 w-11 items-center justify-center rounded-lg", fact.accent)}>
                                <fact.icon className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{fact.label}</p>
                                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{fact.value}</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{fact.description}</p>
                    </motion.div>
                ))}
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="grid gap-6 lg:grid-cols-[1.25fr_1fr]"
            >
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-6 shadow-sm"
                >
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <Target className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Misi & visi hidup
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">Merancang pengalaman digital yang memperkuat manusia</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        Fokus utama saya adalah menghadirkan solusi digital yang inklusif, mudah diakses, dan berkelanjutan.
                        Saya percaya produk terbaik lahir ketika tim memahami konteks sosial pengguna dan menerjemahkannya
                        menjadi alur yang sederhana. Kombinasi desain sistematis dan teknologi modern menjadi fondasi saya
                        dalam menggerakkan perubahan.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Memprioritaskan dampak nyata terhadap kehidupan pengguna dibanding vanity metrics.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Menggabungkan riset mendalam dengan eksperimen cepat agar keputusan terukur.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Menjaga keberlanjutan tim melalui ritme kerja sehat dan dokumentasi transparan.
                        </li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Goals 2024 – 2026</p>
                            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">Langkah strategis berikutnya</p>
                        </div>
                        <Bell className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="mt-4 space-y-4">
                        {LIFE_GOALS.map((goal, index) => (
                            <motion.div
                                key={goal.id}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ delay: 0.05 * index, duration: 0.4, ease: "easeOut" }}
                                className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-800/60 p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-sm">
                                            <goal.icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{goal.title}</p>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{goal.description}</p>
                                        </div>
                                    </div>
                                    <span className={cx("text-sm font-semibold", goal.accent)}>{goal.progress}%</span>
                                </div>
                                <div className="mt-4 h-2 rounded-full bg-white/80 dark:bg-slate-900/50">
                                    <motion.span
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${goal.progress}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="block h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/70 p-6 shadow-sm"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Pilih sudut pandang</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Kenal lebih dekat</h3>
                    </div>
                    <div className="flex rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 p-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                        {PROFILE_LENS_ORDER.map((key) => {
                            const isActive = key === lens;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setLens(key)}
                                    className={cx(
                                        "rounded-full px-4 py-1.5 transition",
                                        isActive ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow" : "hover:text-slate-700 dark:text-slate-200"
                                    )}
                                >
                                    {key === "professional" ? "Profesional" : "Personal"}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    key={lens}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="mt-6 space-y-5"
                >
                    <div>
                        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">{lensData.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{lensData.subtitle}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{lensData.summary}</p>
                    <div className="grid gap-3 md:grid-cols-3">
                        {lensData.bullets.map((bullet) => (
                            <div
                                key={bullet.id}
                                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/60 p-3 shadow-sm"
                            >
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{bullet.label}</p>
                                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{bullet.detail}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="grid gap-6 lg:grid-cols-2"
            >
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-6 shadow-sm"
                >
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Ritme harian
                    </div>
                    <div className="mt-4 space-y-4">
                        {DAILY_RHYTHM.map((slot, index) => (
                            <motion.div
                                key={slot.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                                whileHover={{ y: -3 }}
                                className="flex items-start gap-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/85 dark:bg-slate-900/55 p-4 shadow-sm"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300">
                                    <slot.icon className="h-6 w-6" />
                                </span>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{slot.time}</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{slot.title}</p>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{slot.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-6 shadow-sm"
                >
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <Sparkles className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Nilai yang dijaga
                    </div>
                    <div className="mt-4 space-y-3">
                        {CORE_VALUES.map((value, index) => (
                            <motion.div
                                key={value.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                                whileHover={{ y: -2 }}
                                className="flex items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/85 dark:bg-slate-900/55 p-4 shadow-sm"
                            >
                                <span className={cx("flex h-10 w-10 items-center justify-center rounded-lg", value.accent)}>
                                    <value.icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{value.title}</p>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.section>
        </motion.div>
    )
};