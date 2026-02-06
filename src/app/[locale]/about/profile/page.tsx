"use client";


import { useState } from "react";
import { motion } from "framer-motion";
import {
    MessageCircle,
    UserPlus,
    MapPin,
    Shield,
} from "lucide-react";
import {
    TimelineTab,
} from "./types";

// Import Components
import { Stars } from "./Stars";
import { TabAbout } from "./TabAbout";
import { TabActivitiesAndContributions } from "./TabActivitiesAndContributions";
import { TabStatistikOrInteraktif } from "./TabStatistikOrInteraktif";
import { TabJourneyOfLife } from "./TabJourneyOfLife";
import { TabProfessionalAndEducation } from "./TabProfessionalAndEducation";
import { TabContact } from "./TabContact";
import { Tabs } from "./Tabs";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ResumeDialog } from "./resume";


const TABS: ReadonlyArray<TimelineTab> = [
    "about",
    "contact",
    "Professional and Education",
    "Activities & Contributions",
    "Statistik & Interaktif",
    "Journey of life",
] as const;

interface Store {
    resume: boolean;
};

const initialStore: Store = {
    resume: false,
};

export default function Profile() {
    const [tab, setTab] = useState<TimelineTab>("about");
    const [store, setStore] = useState<Store>(initialStore);

    return (
        <div className='w-full md:max-w-7xl mx-auto'>
            
            <ResumeDialog 
                show={store.resume} 
                onClose={() => setStore(pre => ({ ...pre, resume: false }))}
            />

            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='col-span-1'>
                    {/* Avatar */}
                    <div className="w-full h-auto px-6 md:px-8 pt-8">
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center">
                            <img
                                src="/Frame 1 3.png"
                                alt="Avatar"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full px-6 md:px-8 pb-8">
                        {/* Section title */}
                        <div className="flex items-center my-4">
                            <span className="font-semibold text-lg">Stories</span>
                            <span className="border-b-2 ms-2 border-gray-400/40 inline-flex w-full"></span>
                        </div>

                        {/* Intro */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium text-gray-800">Perkenalan Singkat</h3>
                            <p className="text-gray-600 mt-2">
                                Halo, saya <span className="font-semibold">Antonius</span>, seorang
                                software engineer yang antusias dengan teknologi modern, arsitektur
                                sistem terdistribusi, dan desain pengalaman pengguna. Saya percaya bahwa
                                kode bukan hanya instruksi untuk mesin, tetapi juga sebuah karya yang
                                membentuk masa depan.
                            </p>
                        </div>

                        {/* Fokus */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium text-gray-800">Fokus Saya</h3>
                            <p className="text-gray-600 mt-2">
                                Fokus utama saya adalah membangun <strong>layanan terdesentralisasi</strong>,
                                sistem backend yang tangguh, serta antarmuka web yang interaktif dan ramah pengguna.
                                Saya senang mengeksplorasi integrasi antara <em>Go</em>, <em>TypeScript</em>, dan <em>Three.js</em>
                                untuk menciptakan solusi yang inovatif.
                            </p>
                        </div>

                        {/* Moto */}
                        <div className="mb-6">
                            <h3 className="text-base font-medium text-gray-800">Moto / Nilai</h3>
                            <p className="text-gray-600 mt-2 italic">
                                “Bangun sesuatu yang bernilai, bukan hanya yang viral.”
                            </p>
                        </div>

                        {/* Visi Misi */}
                        <div>
                            <h3 className="text-base font-medium text-gray-800">Visi & Misi</h3>
                            <ul className="mt-2 list-disc pl-5 text-gray-600 space-y-1">
                                <li>Membawa teknologi ke lebih banyak orang dengan cara sederhana.</li>
                                <li>Menggabungkan kreativitas dan logika untuk solusi berdampak.</li>
                                <li>Berbagi pengetahuan dan berkontribusi pada ekosistem open source.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 md:col-span-2'>
                    <section className="order-1 md:order-2 md:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="py-6 px-4"
                        >
                            <div className="flex flex-col gap-5 md:flex-row md:items-start">


                                {/* Summary */}
                                <div className="min-w-0 flex-1">

                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="truncate text-[1.4rem] md:text-[1.6rem] font-semibold text-slate-900 dark:text-slate-100">
                                            Antonius Sinaga
                                        </h1>
                                        <span className="flex items-center gap-1 text-[0.8rem] text-slate-500 dark:text-slate-400">
                                            <MapPin className="h-4 w-4" />
                                            Sumatera Selatan, Indonesia
                                        </span>
                                    </div>
                                    <div>
                                        <span className="rounded-full bg-slate-100 dark:bg-slate-800/80 py-1 text-xs font-medium text-cyan-500">
                                            Product Designer
                                        </span>
                                    </div>

                                    <div className="mt-2 flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                                            <span className="text-lg font-semibold">8,6</span>
                                            <Stars value={4.5} />
                                        </div>
                                        <div className="hidden h-5 w-px bg-slate-200 dark:bg-slate-700/60 md:block" />
                                        <div className="flex flex-wrap gap-2">
                                            <button onClick={() => setStore(pre => ({ ...pre, resume: true }))} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 transition-colors cursor-pointer">
                                                📄 Resume
                                            </button>
                                            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
                                                <MessageCircle className="h-4 w-4" /> Send message
                                            </button>
                                            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
                                                <UserPlus className="h-4 w-4" /> Contacts
                                            </button>
                                            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
                                                <Shield className="h-4 w-4" /> Report user
                                            </button>
                                        </div>
                                    </div>

                                    {/* Tabs */}
                                    <Tabs TABS={TABS} tab={tab} setTab={v => setTab(v)} />

                                    {/* Tab content */}
                                    <div className="mt-6">
                                        {tab === "about" && <TabAbout />}
                                        {tab === "contact" && <TabContact />}
                                        {tab === "Professional and Education" && <TabProfessionalAndEducation />}
                                        {tab === "Activities & Contributions" && <TabActivitiesAndContributions />}
                                        {tab === "Statistik & Interaktif" && <TabStatistikOrInteraktif />}
                                        {tab === "Journey of life" && <TabJourneyOfLife />}
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </section>
                </div>
            </div>
        </div>
    )
};