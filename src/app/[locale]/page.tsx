"use client";

import { BarChart, Binary, Cpu, Lightbulb, Rocket } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import { useI18n } from "@/i18n";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Users2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormControl, TextField } from "@mui/material";
import { FormPhoneCode } from "@/components/form/PhoneCode";


export type ChartPoint = {
    month: string;
    users: number;
};

export type Highlight = {
    title: string;
    description: string;
};

export type Solution = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

export type Metric = {
    label: string;
    value: string;
};

export type ProcessStep = {
    title: string;
    body: string;
};

export type Testimonial = {
    quote: string;
    name: string;
    role: string;
};

export type ResourceHighlight = {
    icon: LucideIcon;
    title: string;
    body: string;
};

// =========================================================================================
// AnimatedBackground
// =========================================================================================

type BackgroundOrb = {
    className: string;
    initial: { x: number; y: number };
    animate: { x: number; y: number };
    duration: number;
    delay: number;
};

const lightBackgroundOrbs: BackgroundOrb[] = [
    {
        className:
            "absolute -top-28 -left-28 h-[26rem] w-[26rem] rounded-full bg-indigo-400/20 blur-3xl mix-blend-screen",
        initial: { x: -120, y: -80 },
        animate: { x: 40, y: 60 },
        duration: 26,
        delay: 0,
    },
    {
        className:
            "absolute top-[18%] right-[-12rem] h-[30rem] w-[30rem] rounded-full bg-fuchsia-400/20 blur-3xl mix-blend-screen",
        initial: { x: 120, y: -40 },
        animate: { x: -60, y: 40 },
        duration: 32,
        delay: 2,
    },
    {
        className:
            "absolute bottom-[-14rem] left-[-6rem] h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-3xl mix-blend-screen",
        initial: { x: -80, y: 80 },
        animate: { x: 60, y: -40 },
        duration: 30,
        delay: 3,
    },
    {
        className:
            "absolute bottom-[-18rem] right-[-10rem] h-[24rem] w-[24rem] rounded-full bg-purple-400/20 blur-3xl mix-blend-screen",
        initial: { x: 90, y: 90 },
        animate: { x: -40, y: -60 },
        duration: 28,
        delay: 1.5,
    },
];

const darkBackgroundOrbs: BackgroundOrb[] = [
    {
        className:
            "absolute -top-32 -left-24 h-[30rem] w-[30rem] rounded-full bg-indigo-500/30 blur-3xl mix-blend-screen",
        initial: { x: -110, y: -70 },
        animate: { x: 30, y: 50 },
        duration: 28,
        delay: 0.4,
    },
    {
        className:
            "absolute top-[14%] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/25 blur-3xl mix-blend-screen",
        initial: { x: 100, y: -30 },
        animate: { x: -50, y: 30 },
        duration: 34,
        delay: 1.2,
    },
    {
        className:
            "absolute bottom-[-16rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/25 blur-3xl mix-blend-screen",
        initial: { x: -70, y: 90 },
        animate: { x: 50, y: -30 },
        duration: 30,
        delay: 2.1,
    },
    {
        className:
            "absolute bottom-[-18rem] right-[-12rem] h-[26rem] w-[26rem] rounded-full bg-violet-500/25 blur-3xl mix-blend-screen",
        initial: { x: 80, y: 80 },
        animate: { x: -35, y: -50 },
        duration: 29,
        delay: 1.8,
    },
];

function AnimatedBackground() {
    const shouldReduceMotion = useReducedMotion();

    // motion values SELALU dipanggil
    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const glowX = useTransform(pointerX, [0, 1], [-160, 160]);
    const glowY = useTransform(pointerY, [0, 1], [-120, 140]);

    const [mounted, setMounted] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setMounted(true);

        const root = document.documentElement;
        const syncTheme = () =>
            setIsDarkMode(root.classList.contains("dark"));

        syncTheme();

        const obs = new MutationObserver(syncTheme);
        obs.observe(root, { attributes: true, attributeFilter: ["class"] });

        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!mounted || shouldReduceMotion) return;

        const move = (e: PointerEvent) => {
            pointerX.set(e.clientX / window.innerWidth);
            pointerY.set(e.clientY / window.innerHeight);
        };

        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
    }, [mounted, shouldReduceMotion]);

    if (!mounted) return null;

    const orbs = isDarkMode ? darkBackgroundOrbs : lightBackgroundOrbs;

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* radial wash */}
            <div
                className={`absolute inset-0 transition-colors duration-700 ${isDarkMode
                    ? "bg-[radial-gradient(circle_at_top,_rgba(8,47,73,0.55),transparent_72%)]"
                    : "bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),transparent_60%)]"
                    }`}
            />

            {/* ambient orbs */}
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className={orb.className}
                    initial={orb.initial}
                    animate={shouldReduceMotion ? orb.initial : orb.animate}
                    transition={{
                        duration: orb.duration,
                        delay: orb.delay,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* pointer glow */}
            <motion.div
                className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem]
                   -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl
                   bg-indigo-400/20 mix-blend-screen"
                style={{
                    x: shouldReduceMotion ? 0 : glowX,
                    y: shouldReduceMotion ? 0 : glowY,
                }}
            />
        </div>
    );
};


// =========================================================================================
// HeroSection
// =========================================================================================
interface HeroSectionProps {
    highlights: Highlight[];
};

function HeroSection({ highlights }: HeroSectionProps) {
    const { t } = useI18n();

    return (
        <section className="max-w-6xl mx-auto px-6 pt-14 md:pt-20 pb-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 dark:border-indigo-500/40 bg-white/70 dark:bg-slate-900/60 px-4 py-2 text-[0.8rem] md:text-[1rem] font-medium text-indigo-600 dark:text-indigo-300 shadow-sm"
            >
                <ShieldCheck className="h-4 w-4" />
                <span>{t("home.welcome.tag")}</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-6 text-3xl md:text-5xl sm:text-6xl font-extrabold tracking-tight"
            >
                {/* Transformasi <span className="text-indigo-600">digital</span> yang
        mendorong pertumbuhan bisnis nyata */}
                {t("home.welcome")}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300"
            >
                {t("home.welcome.desc")}
            </motion.p>

            <motion.div
                className="mt-8 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <a
                    href="#contact"
                    className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium flex items-center gap-2 hover:bg-indigo-700 transition text-[0.8rem] md:text-[1rem]"
                >
                    Mulai proyek
                    <ArrowRight size={18} />
                </a>
                <button
                    className="px-6 py-3 cursor-pointer rounded-xl border border-slate-300 dark:border-slate-600 font-medium flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-[0.8rem] md:text-[1rem]"
                >
                    <Play size={18} /> Lihat demo 3 menit
                </button>
            </motion.div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {highlights.map((item) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6 }}
                        className="group rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/60 px-6 py-5 text-left shadow-sm transition"
                    >
                        <p className="text-xl font-semibold text-indigo-600 dark:text-indigo-300">
                            {item.title}
                        </p>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                            {item.description}
                        </p>
                        <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-500 transition group-hover:text-indigo-600">
                            Pelajari lebih lanjut
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// =========================================================================================
// MetricsSection
// =========================================================================================
interface MetricsSectionProps {
    metrics: Metric[];
};

function MetricsSection({ metrics }: MetricsSectionProps) {
    return (
        <section className="border-y border-slate-200/60 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40">
            <div className="max-w-6xl mx-auto px-6 py-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl bg-white/70 dark:bg-slate-900/60 px-6 py-8 shadow-sm"
                    >
                        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
                            {metric.value}
                        </p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {metric.label}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// =========================================================================================
// SolutionsSection
// =========================================================================================
interface SolutionsSectionProps {
    solutions: Solution[];
}

function SolutionsSection({ solutions }: SolutionsSectionProps) {
    return (
        <section id="solutions" className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center max-w-3xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold"
                >
                    Pilar layanan untuk mewujudkan produk kelas dunia
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mt-4 text-base text-slate-600 dark:text-slate-300"
                >
                    Kami memadukan riset pengguna, engineering, dan intelligence untuk mengantar ide Anda ke pasar dan menjaga momentum pertumbuhan.
                </motion.p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
                {solutions.map((solution, i) => (
                    <motion.div
                        key={solution.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        className="group relative h-full rounded-3xl border border-slate-200/60 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 p-8 shadow-md"
                    >
                        <solution.icon className="h-11 w-11 text-indigo-600 dark:text-indigo-300" />
                        <h3 className="mt-6 text-xl font-semibold">{solution.title}</h3>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            {solution.desc}
                        </p>
                        <span className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-300">
                            Jadwalkan konsultasi
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// =========================================================================================
// =========================================================================================
interface ImpactSectionProps {
    chartData: ChartPoint[];
}

function ImpactSection({ chartData }: ImpactSectionProps) {
    return (
        <section className="bg-slate-50 dark:bg-slate-800/80 py-20">
            <div className="max-w-6xl mx-auto px-6 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold"
                    >
                        Dampak nyata dari kolaborasi kami
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mt-4 text-base text-slate-600 dark:text-slate-300"
                    >
                        Grafik pertumbuhan pengguna memperlihatkan percepatan aktivasi dan retensi sejak integrasi solusi Jasakode.
                    </motion.p>
                    <motion.ul
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300"
                    >
                        <li>• Implementasi data warehouse terpusat meningkatkan visibilitas funnel.</li>
                        <li>• Automasi onboarding mengurangi waktu aktivasi pengguna baru hingga 48%.</li>
                        <li>• Eksperimen growth mingguan membantu menjaga NPS konsisten di atas 65.</li>
                    </motion.ul>
                </div>
                <div className="w-full h-[320px] rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/60 p-4 shadow-md">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}

// =========================================================================================
// ProcessSection
// =========================================================================================
interface ProcessSectionProps {
    steps: ProcessStep[];
};

function ProcessSection({ steps }: ProcessSectionProps) {
    return (
        <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold"
                    >
                        Metodologi kolaborasi yang transparan
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mt-4 text-base text-slate-600 dark:text-slate-300"
                    >
                        Setiap fase proyek memiliki indikator keberhasilan, rencana komunikasi, dan dokumentasi yang bisa diakses kapan pun.
                    </motion.p>
                </div>
                <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-600" />
                    <div className="space-y-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative ml-12 rounded-2xl border border-slate-200/60 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 px-6 py-6 shadow-sm"
                            >
                                <div className="absolute -left-12 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-semibold">{step.title}</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    {step.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// =========================================================================================
// TestimonialsSection
// =========================================================================================
interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            const cardWidth = el.scrollWidth / el.children.length;
            const index = Math.round(el.scrollLeft / cardWidth);
            setActiveIndex(index);
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="bg-slate-950 text-white py-14 sm:py-16 lg:py-20" id="demo">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold sm:text-3xl"
                        >
                            Klien kami bicara
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="mt-2 text-[0.9rem] leading-relaxed text-slate-300 sm:text-sm"
                        >
                            Dari startup hingga enterprise, kami hadir untuk mempercepat inovasi yang terukur.
                        </motion.p>
                    </div>

                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        viewport={{ once: true }}
                        href="#contact"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/20 sm:w-auto"
                    >
                        Jadwalkan sesi strategi
                        <ArrowRight className="h-4 w-4" />
                    </motion.a>
                </div>

                <div
                    ref={scrollRef}
                    className="mt-10 grid grid-flow-col auto-cols-[85%] gap-4 overflow-x-auto pb-2
                     snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden
                     sm:auto-cols-auto sm:grid-flow-row sm:gap-6 sm:overflow-visible sm:snap-none sm:grid-cols-2
                     lg:grid-cols-3"
                >
                    {testimonials.map((t, i) => (
                        <motion.figure
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="relative h-full snap-start rounded-2xl border border-white/10 bg-white/8 p-5 sm:rounded-3xl sm:p-6 backdrop-blur"
                        >
                            <p className="text-[0.95rem] leading-relaxed text-slate-100 sm:text-sm">
                                “{t.quote}”
                            </p>
                            <figcaption className="mt-5 text-sm font-semibold text-white">
                                {t.name}
                                <span className="block text-xs font-normal text-slate-300">{t.role}</span>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>

                <div className="mt-4 flex justify-center gap-2 sm:hidden">
                    {testimonials.map((_, i) => (
                        <span
                            key={i}
                            className={`h-2 w-2 rounded-full transition-colors ${i === activeIndex ? "bg-white" : "bg-white/30"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// =========================================================================================
// ResourcesSection
// =========================================================================================
interface ResourcesSectionProps {
    resources: ResourceHighlight[];
}

function ResourcesSection({ resources }: ResourcesSectionProps) {
    return (
        <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="rounded-3xl border border-slate-200/60 dark:border-slate-800/70 bg-gradient-to-r from-indigo-500/10 via-white to-indigo-500/10 dark:from-indigo-400/10 dark:via-slate-900 dark:to-indigo-400/10 p-12">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold"
                        >
                            Materi strategi untuk tim Anda
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="mt-4 text-sm text-slate-600 dark:text-slate-300"
                        >
                            Kami membagikan resource eksklusif setiap bulan berisi studi kasus, template, dan insight terbaru.
                        </motion.p>
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            href="#newsletter"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Dapatkan akses
                            <ArrowRight className="h-4 w-4" />
                        </motion.a>
                    </div>
                    <div className="grid gap-5">
                        {resources.map((resource, index) => (
                            <motion.div
                                key={resource.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 p-5 shadow-sm"
                            >
                                <resource.icon className="mt-1 h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                                <div>
                                    <h3 className="text-sm font-semibold">{resource.title}</h3>
                                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                        {resource.body}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// =========================================================================================
// =========================================================================================

type TeamMember = {
    id: string;
    name: string;
    role: string;
    bio: string;
    expertise: string[];
};

interface TeamSectionProps {
    teamMembers: TeamMember[];
}

function TeamSection({ teamMembers }: TeamSectionProps) {
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
                                className={`rounded-2xl border px-4 py-4 text-left transition ${highlightedMember === member.id
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
};

// =========================================================================================
// ContactSection
// =========================================================================================
function ContactSection() {
    return (
        <section id="contact" className="max-w-6xl mx-auto px-6 pb-24">
            <div className="rounded-3xl border border-slate-200/60 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/70 px-8 py-10 shadow-md">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">

                    {/* ⬇️ PENTING: min-w-0 */}
                    <div className="flex flex-col items-start justify-start h-full min-w-0">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold whitespace-normal break-words"
                        >
                            Siap mempercepat roadmap Anda?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="mt-4 text-lg md:text-[0.8rem] text-slate-600 dark:text-slate-300 whitespace-normal break-words"
                        >
                            Ceritakan tantangan tim Anda dan kami akan menyiapkan proposal personal dalam 72 jam.
                        </motion.p>
                    </div>

                    {/* ⬇️ JUGA min-w-0 */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-4 min-w-0"
                    >
                        <FormControl fullWidth>
                            <TextField size="small"
                                placeholder="Nama lengkap"
                                slotProps={{
                                    input: {
                                        type: "text"
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField size="small"
                                placeholder="Email kerja"
                                slotProps={{
                                    input: {
                                        type: "email"
                                    }
                                }}
                            />
                        </FormControl>
                        <div className="flex gap-2">
                            <FormPhoneCode />
                            <FormControl fullWidth>
                                <TextField size="small"
                                    placeholder="0"
                                    slotProps={{
                                        input: {
                                            type: "number"
                                        }
                                    }}
                                />
                            </FormControl>
                        </div>
                        <FormControl fullWidth>
                            <TextField size="small"
                                placeholder="Ceritakan kebutuhan atau timeline Anda"
                                multiline
                                minRows={3}
                                maxRows={10}
                            />
                        </FormControl>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Kirim brief
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}

// =========================================================================================


const chartData: ChartPoint[] = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 400 },
    { month: "Mar", users: 800 },
    { month: "Apr", users: 1600 },
];

const highlights: Highlight[] = [
    {
        title: "AI-first strategy",
        description: "Blueprint modernisasi yang siap memanfaatkan machine learning langsung dari hari pertama.",
    },
    {
        title: "Kolaborasi lintas tim",
        description: "Product, marketing, dan engineering bergerak sinkron melalui dashboard terpadu kami.",
    },
    {
        title: "Keamanan enterprise",
        description: "Standar compliance SOC2 & ISO 27001 untuk setiap solusi yang kami rilis.",
    },
];

const solutions: Solution[] = [
    {
        icon: Cpu,
        title: "Produk Digital Kustom",
        desc: "Bangun platform web, mobile, atau desktop yang dirancang sesuai proses bisnis Anda.",
    },
    {
        icon: Lightbulb,
        title: "Innovation Lab",
        desc: "Validasi ide baru lewat design sprint, prototyping interaktif, dan uji coba pengguna cepat.",
    },
    {
        icon: BarChart,
        title: "Analytics & Automation",
        desc: "Integrasi data real-time dengan alur kerja otomatis agar keputusan lebih presisi.",
    },
];

const metrics: Metric[] = [
    { label: "ROI rata-rata", value: "312%" },
    { label: "SLA uptime", value: "99.98%" },
    { label: "Jam dukungan", value: "24/7" },
    { label: "Negara klien", value: "16" },
];

const processSteps: ProcessStep[] = [
    {
        title: "Discovery & Insight",
        body: "Workshop intensif menggali tantangan bisnis, memetakan persona, dan menyusun north star metric.",
    },
    {
        title: "Co-design Solution",
        body: "Tim multidisiplin merancang arsitektur, flow UX, serta roadmap iterasi yang disepakati bersama.",
    },
    {
        title: "Agile Delivery",
        body: "Release bertahap tiap 2 minggu lengkap dengan pengujian otomatis, observability, dan pelatihan tim Anda.",
    },
    {
        title: "Scale & Optimize",
        body: "Monitoring berkelanjutan, optimasi performa, serta eksperimen growth untuk terus meningkatkan nilai bisnis.",
    },
];

const testimonials: Testimonial[] = [
    {
        quote:
            "Dalam 4 bulan kami meluncurkan platform B2B yang meningkatkan konversi demo menjadi pelanggan sebanyak 2,6x.",
        name: "Anisa Wardhani",
        role: "VP Product, TelcoX",
    },
    {
        quote:
            "Tim Jasakode bukan hanya mengeksekusi, tapi memandu kami merombak proses internal agar siap scale global.",
        name: "Michael Hartono",
        role: "COO, FinGain",
    },
    {
        quote:
            "Automasi insight mereka memotong waktu analisis mingguan dari 18 jam menjadi 45 menit saja.",
        name: "Lilis Prabowo",
        role: "Head of Data, RetailHub",
    },
];

const resourceHighlights: ResourceHighlight[] = [
    {
        icon: Rocket,
        title: "Playbook transformasi digital",
        body: "Checklist praktis untuk menavigasi migrasi sistem legacy ke arsitektur cloud-native.",
    },
    {
        icon: Binary,
        title: "Toolkit AI di produk",
        body: "Template prompt, guardrail, dan evaluasi model untuk merilis fitur AI dengan aman.",
    },
];

const teamMembers: TeamMember[] = [
    {
        id: "nadia",
        name: "Nadia Santoso",
        role: "Head of Product Strategy",
        bio: "Merancang blueprint transformasi digital untuk bank, telco, dan ritel besar di Asia Tenggara.",
        expertise: ["Product Ops", "Service Design", "Growth Experiment"],
    },
    {
        id: "rizky",
        name: "Rizky Maulana",
        role: "Principal Engineer",
        bio: "Menggabungkan arsitektur cloud-native dengan keamanan enterprise untuk platform dengan jutaan pengguna.",
        expertise: ["Platform Engineering", "Security", "DevEx"],
    },
    {
        id: "amira",
        name: "Amira Putri",
        role: "Lead Data Scientist",
        bio: "Memimpin squad AI & data untuk use case personalisasi, antifraud, dan automasi Customer Success.",
        expertise: ["MLOps", "Responsible AI", "Analytics"],
    },
    {
        id: "leo",
        name: "Leonard Pratama",
        role: "Delivery Director",
        bio: "Menjembatani alignment lintas C-level dan eksekusi squad hybrid onsite-remote.",
        expertise: ["Change Management", "Portfolio Delivery", "SLA Optimisation"],
    },
];


export default function Home() {
    return (
        <div className="relative overflow-hidden">
            <AnimatedBackground />
            <HeroSection highlights={highlights} />
            <MetricsSection metrics={metrics} />
            <SolutionsSection solutions={solutions} />
            <ImpactSection chartData={chartData} />
            <ProcessSection steps={processSteps} />
            <TestimonialsSection testimonials={testimonials} />
            <ResourcesSection resources={resourceHighlights} />
            <div className="relative max-w-6xl mx-auto px-6 pb-32">
                <TeamSection teamMembers={teamMembers} />
            </div>
            <ContactSection />
        </div>
    );
};
