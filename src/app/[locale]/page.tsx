"use client";

import { BarChart, Binary, Cpu, Lightbulb, Rocket } from "lucide-react";
import { AnimatedBackground } from "./(Home)/AnimatedBackground";
import { ContactSection } from "./(Home)/ContactSection";
import { HeroSection } from "./(Home)/HeroSection";
import { ImpactSection } from "./(Home)/ImpactSection";
import { MetricsSection } from "./(Home)/MetricsSection";
import { ProcessSection } from "./(Home)/ProcessSection";
import { ResourcesSection } from "./(Home)/ResourcesSection";
import { SolutionsSection } from "./(Home)/SolutionsSection";
import { TestimonialsSection } from "./(Home)/TestimonialsSection";
import type {
    ChartPoint,
    Highlight,
    Metric,
    ProcessStep,
    ResourceHighlight,
    Solution,
    Testimonial,
} from "./(Home)/types";
import type { TeamMember } from "./(Home)/TeamSection";
import { TeamSection } from "./(Home)/TeamSection";


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
        <div className="relative text-slate-900 dark:text-white overflow-hidden">
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
