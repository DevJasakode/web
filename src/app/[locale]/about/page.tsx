"use client";

import { Sparkles, Layers, HeartHandshake } from "lucide-react";
import { CallToActionSection } from "./CallToActionSection";
import { HeroSection } from "./HeroSection";
import { JourneySection } from "./JourneySection";
import { PillarsSection } from "./PillarsSection";
import { ValuesSection } from "./ValuesSection";
import type {
  IntroStat,
  JourneyItem,
  Pillar,
  ValueItem,
} from "./types";
import { TeamShowcase } from "./TeamShowcase";
import ExpertiseShowcase from "./ExpertiseShowcase";

const introStats: IntroStat[] = [
  { label: "Tahun pengalaman", value: "8+" },
  { label: "Klien enterprise", value: "140" },
  { label: "Produk dirilis", value: "64" },
  { label: "Negara operasi", value: "12" },
];

const pillars: Pillar[] = [
  {
    id: "innovation",
    title: "Innovation DNA",
    description:
      "Kami menggabungkan research sprint, eksperimen growth, dan arsitektur modular untuk memvalidasi ide dalam hitungan minggu, bukan bulan.",
    metrics: ["Design-sprint 5 hari", "Prototipe high-fidelity", "Eksperimen A/B serentak"],
  },
  {
    id: "partnership",
    title: "Partnership First",
    description:
      "Setiap engagement dimulai dari co-creation canvas agar prioritas bisnis dan target teknis tim klien berada pada garis yang sama.",
    metrics: ["Ritual discovery mingguan", "Roadmap bersama", "Dokumentasi transparan"],
  },
  {
    id: "impact",
    title: "Measured Impact",
    description:
      "Kami mengukur dampak melalui north star metric, indikator finansial, dan kepuasan tim pengguna internal klien.",
    metrics: ["Dashboard real-time", "Review pemangku kepentingan", "Retrospektif kuartalan"],
  },
];

const journey: JourneyItem[] = [
  {
    year: "2016",
    title: "Studio kecil, visi besar",
    body: "Tiga founder membangun lab eksperimen yang fokus membantu UKM go-digital dengan proses cepat dan biaya terukur.",
  },
  {
    year: "2019",
    title: "Skala regional",
    body: "Meluncurkan framework microservice untuk industri finansial dan memenangkan kontrak multi-negara pertama.",
  },
  {
    year: "2021",
    title: "AI & otomasi terintegrasi",
    body: "Mendirikan practice AI engineering, memperkenalkan pipeline MLOps dan guardrail keamanan data untuk klien enterprise.",
  },
  {
    year: "2023",
    title: "Growth partner end-to-end",
    body: "Menyatukan strategi produk, lifecycle marketing, dan analytics ke dalam squad lintas disiplin yang siap terjun bersama klien.",
  },
];

const values: ValueItem[] = [
  {
    icon: Sparkles,
    title: "Pursue clarity",
    detail: "Kami mengutamakan transparansi insight dan alasan di balik setiap keputusan teknis maupun produk.",
  },
  {
    icon: Layers,
    title: "Design playable systems",
    detail: "Solusi dibangun modular sehingga mudah diuji, di-scale, atau disesuaikan tanpa mengganggu operasi.",
  },
  {
    icon: HeartHandshake,
    title: "Co-own the outcome",
    detail: "Tim Jasakode bergerak sebagai mitra sejajar, bukan vendor yang sekedar mengerjakan backlog.",
  },
];





export default function Contact() {

  return (
    <div className="relative min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="fixed top-0 bottom-0 left-0 right-0 inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="fixed top-0 bottom-0 left-0 right-0 inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,116,233,0.1),transparent_75%)] dark:bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 pb-32">
        <HeroSection stats={introStats} />
        <PillarsSection pillars={pillars} />
        <JourneySection journey={journey} />
        <ValuesSection values={values} />
        <ExpertiseShowcase />
        {/* <TeamShowcase /> */}
        <CallToActionSection />
      </div>
    </div>
  )
};

