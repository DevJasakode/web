import React, { useState, JSX, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    Copy,
    Check,
    Clock,
    Video,
    Linkedin,
    Instagram,
    Twitter,
    ArrowUpRight,
    Sparkles,
    Bell,
} from "lucide-react";
import { 
    TimelineTab,
    StatusTone,
    ContactChannel,
    SocialLink,
    AvailabilitySlot,
    ContactHighlight,
} from "./types";

// Import Components
import { IconWhatsapp, IconTelegram } from "./Icons";
import { cx } from "./utils";


const TABS: ReadonlyArray<TimelineTab> = [
    "about",
    "contact",
    "Professional and Education",
    "Activities & Contributions",
    "Statistik & Interaktif",
    "Journey of life",
] as const;

const STATUS_STYLES: Record<StatusTone, { badge: string; dot: string }> = {
    online: { badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-400" },
    focus: { badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400", dot: "bg-amber-400" },
    offline: { badge: "bg-slate-500/10 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400", dot: "bg-slate-400" },
};

const STATUS_LABEL: Record<StatusTone, string> = {
    online: "Online",
    focus: "Focus zone",
    offline: "On request",
};

const CONTACT_CHANNELS: ReadonlyArray<ContactChannel> = [
    {
        id: "email",
        label: "Email",
        value: "antoniussinaga@jasakode.com",
        helper: "Best for proposals, briefs, and follow-ups.",
        meta: "Replies in < 2h",
        icon: Mail,
        href: "mailto:antoniussinaga@jasakode.com",
        accent: {
            icon: "border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-[0_15px_35px_-25px_rgba(59,130,246,1)]",
            chip: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        },
    },
    {
        id: "phone",
        label: "Direct line",
        value: "+62 851 5900 3374",
        helper: "Available weekdays 09.00–18.00 WIB via call or WhatsApp.",
        meta: "Priority clients",
        icon: Phone,
        href: "tel:+62885159003374",
        accent: {
            icon: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_15px_35px_-25px_rgba(16,185,129,1)]",
            chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
    },
    {
        id: "whatsapp",
        label: "Whatsapp",
        value: "+62 851 5900 3374",
        helper: "Available weekdays 09.00–18.00 WIB via call or WhatsApp.",
        meta: "Always online",
        icon: IconWhatsapp,
        href: "https://wa.me/6285159003374",
        accent: {
            icon: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_15px_35px_-25px_rgba(16,185,129,1)]",
            chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
    },
    {
        id: "telegram",
        label: "Telegram",
        value: "+62 851 5900 3374",
        helper: "Available weekdays 09.00–18.00 WIB via call or WhatsApp.",
        meta: "Replies in < 24h",
        icon: IconTelegram,
        href: "https://tm.me/6285159003374",
        accent: {
            icon: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_15px_35px_-25px_rgba(16,185,129,1)]",
            chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
    },
    {
        id: "video",
        label: "Video discovery",
        value: "https://cal.com/antonius-sinaga/30",
        helper: "Book a 30 min session to explore your product vision.",
        meta: "Calendly sync",
        icon: Video,
        href: "https://cal.com/antonius-sinaga/30",
        accent: {
            icon: "border border-violet-500/20 bg-violet-500/10 text-violet-600 shadow-[0_15px_35px_-25px_rgba(139,92,246,1)]",
            chip: "bg-violet-500/10 text-violet-600",
        },
    },
];

const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
    {
        id: "linkedin",
        platform: "LinkedIn",
        handle: "linkedin.com/in/antoniussinaga",
        href: "https://www.linkedin.com/in/antoniussinaga",
        icon: Linkedin,
        gradient: "from-slate-900/90 via-blue-600/70 to-sky-500/60",
        metric: "2.4k connections",
    },
    {
        id: "instagram",
        platform: "Instagram",
        handle: "@kodecolor",
        href: "https://www.instagram.com/kodecolor",
        icon: Instagram,
        gradient: "from-rose-500/90 via-amber-400/70 to-fuchsia-500/70",
        metric: "Daily UI reels",
    },
    {
        id: "twitter",
        platform: "X / Twitter",
        handle: "@antonius_dev",
        href: "https://twitter.com/antonius_dev",
        icon: Twitter,
        gradient: "from-slate-600/80 to-slate-400/80",
        metric: "Design in public",
    },
];

const AVAILABILITY: ReadonlyArray<AvailabilitySlot> = [
    {
        id: "weekdays",
        label: "Weekdays",
        hours: "09:00 – 17:30 WIB",
        status: "online",
        description: "Collaboration, design reviews, and async updates.",
    },
    {
        id: "evening",
        label: "Evening deep work",
        hours: "19:00 – 21:00 WIB",
        status: "focus",
        description: "Heads-down prototyping — expect async replies.",
    },
    {
        id: "weekends",
        label: "Weekends",
        hours: "On demand",
        status: "offline",
        description: "Reserved for launches & emergency shipping.",
    },
];

const CONTACT_HIGHLIGHTS: ReadonlyArray<ContactHighlight> = [
    {
        id: "timezone",
        title: "Timezone",
        description: "GMT+7 (WIB) — overlaps with Singapore, Perth, and parts of Europe mornings.",
    },
    {
        id: "cadence",
        title: "Response cadence",
        description: "Inbox cleared at 09:00, 13:00, and 17:00 WIB for predictable follow-ups.",
    },
    {
        id: "collab",
        title: "Collaboration",
        description: "Co-creating design systems, product strategy, and immersive UI experiences.",
    },
];


export function TabContact(): JSX.Element {
    const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
    const [notifyUpdates, setNotifyUpdates] = useState<boolean>(false);
    const copyTimeoutRef = useRef<number | undefined>(undefined);

    const handleCopy = useCallback(async (channel: ContactChannel) => {
        if (copyTimeoutRef.current) {
            window.clearTimeout(copyTimeoutRef.current);
        }

        if (typeof navigator !== "undefined" && "clipboard" in navigator) {
            try {
                await navigator.clipboard.writeText(channel.value);
            } catch (error) {
                /* Clipboard might be unavailable; continue with optimistic UI. */
            }
        }

        setCopiedChannel(channel.id);

        copyTimeoutRef.current = window.setTimeout(() => {
            setCopiedChannel(null);
        }, 2000);
    }, []);

    const handleKeyCopy = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>, channel: ContactChannel) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                void handleCopy(channel);
            }
        },
        [handleCopy],
    );

    const handleOpen = useCallback((href?: string) => {
        if (!href || typeof window === "undefined") {
            return;
        }
        window.open(href, "_blank", "noopener,noreferrer");
    }, []);

    useEffect(
        () => () => {
            if (copyTimeoutRef.current) {
                window.clearTimeout(copyTimeoutRef.current);
            }
        },
        [],
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-6"
        >
            <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="backdrop-blur mb-8"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Direct channels</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Tap any card to copy the contact detail instantly.</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <motion.span
                            className="relative flex h-2 w-2"
                            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                        >
                            <span className="absolute inset-0 rounded-full bg-emerald-500" />
                            <span className="absolute inset-0 rounded-full bg-emerald-400 blur-sm" />
                        </motion.span>
                        Replies in under a day
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    {CONTACT_CHANNELS.map((channel, index) => {
                        const isCopied = copiedChannel === channel.id;
                        const copyKey = isCopied ? `${channel.id}-copied` : `${channel.id}-idle`;

                        return (
                            <motion.div
                                key={channel.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => void handleCopy(channel)}
                                onKeyDown={(event) => handleKeyCopy(event, channel)}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * index, duration: 0.45, ease: "easeOut" }}
                                whileHover={{ translateY: -3, scale: 1.01 }}
                                className="group relative flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/50 p-4 text-left shadow-sm outline-none backdrop-blur transition focus-visible:ring-2 focus-visible:ring-blue-500/70"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className={cx("flex h-11 w-11 items-center justify-center rounded-lg", channel.accent.icon)}>
                                        <channel.icon className="h-5 w-5" />
                                    </div>
                                    {channel.href && (
                                        <motion.button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleOpen(channel.href);
                                            }}
                                            whileTap={{ scale: 0.96 }}
                                            className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 px-2 py-1 text-[0.7rem] font-medium text-slate-600 dark:text-slate-300 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
                                        >
                                            Open <ArrowUpRight className="h-3 w-3" />
                                        </motion.button>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{channel.label}</p>
                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                        <span className="break-all text-sm text-slate-600 dark:text-slate-300">{channel.value}</span>
                                        <span className={cx("rounded-full px-2 py-0.5 text-[0.7rem] font-medium", channel.accent.chip)}>{channel.meta}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="max-w-[70%] leading-snug">{channel.helper}</span>
                                    <motion.span
                                        key={copyKey}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800/80 px-2 py-1 text-[0.7rem] font-medium text-slate-600 dark:text-slate-300"
                                    >
                                        {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                        {isCopied ? "Copied" : "Tap to copy"}
                                    </motion.span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Use the Open button on each card to jump straight into the channel you need.</p>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.45, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-slate-900/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-slate-100 shadow-lg"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-base font-semibold text-white">Social presence</h3>
                        <p className="mt-1 text-sm text-slate-300 dark:text-slate-500">Follow the journey for live experiments, BTS content, and launches.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                        <Clock className="h-4 w-4" /> Async stories daily
                    </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {SOCIAL_LINKS.map((link, index) => (
                        <motion.a
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 * index, duration: 0.45, ease: "easeOut" }}
                            whileHover={{ translateY: -3, scale: 1.01 }}
                            className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_60px_-45px_rgba(15,23,42,1)] backdrop-blur"
                        >
                            <motion.div
                                className={cx(
                                    "absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100",
                                    "bg-gradient-to-br",
                                    link.gradient,
                                )}
                            />
                            <div className="relative z-10 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
                                        <link.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">{link.platform}</p>
                                        <p className="text-xs text-slate-200">{link.handle}</p>
                                    </div>
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-slate-300 dark:text-slate-500 transition-colors group-hover:text-white" />
                            </div>
                            <div className="relative z-10 flex items-center justify-between text-xs text-slate-200">
                                <span>{link.metric}</span>
                                <motion.span
                                    className="inline-flex items-center gap-1 text-[0.75rem]"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Connect <Sparkles className="h-3 w-3 text-amber-300" />
                                </motion.span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
                className="rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/80 dark:bg-slate-800/60 p-6 shadow-inner"
            >
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Availability & focus</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Plan the perfect moment to reach out or schedule a session.</p>
                    </div>
                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setNotifyUpdates((prev) => !prev)}
                        className={cx(
                            "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition",
                            notifyUpdates
                                ? "border-emerald-500 bg-emerald-500 text-white shadow"
                                : "border-slate-300 bg-white text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:bg-slate-800/80",
                        )}
                    >
                        {notifyUpdates ? <Check className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                        {notifyUpdates ? "You're on the list" : "Get availability alerts"}
                    </motion.button>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                    <div className="space-y-3">
                        {AVAILABILITY.map((slot, index) => {
                            const style = STATUS_STYLES[slot.status];

                            return (
                                <motion.div
                                    key={slot.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.08 * index, duration: 0.45, ease: "easeOut" }}
                                    whileHover={{ translateY: -2, scale: 1.01 }}
                                    className="flex flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm backdrop-blur"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{slot.label}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{slot.hours}</p>
                                        </div>
                                        <span className={cx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium", style.badge)}>
                                            <span className={cx("h-2 w-2 rounded-full", style.dot)} />
                                            {STATUS_LABEL[slot.status]}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{slot.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/60 p-4 shadow-sm backdrop-blur">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Highlights</p>
                            <ul className="mt-3 space-y-2">
                                {CONTACT_HIGHLIGHTS.map((item) => (
                                    <li key={item.id} className="flex items-start gap-3 rounded-lg bg-slate-100 dark:bg-slate-800/80/80 p-3 text-sm text-slate-600 dark:text-slate-300">
                                        <Sparkles className="mt-0.5 h-4 w-4 text-amber-500 dark:text-amber-400" />
                                        <div>
                                            <p className="font-medium text-slate-700 dark:text-slate-200">{item.title}</p>
                                            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <motion.div
                            initial={{ opacity: 0.7 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative overflow-hidden rounded-lg border border-blue-200 bg-gradient-to-br from-blue-500/10 via-cyan-400/10 to-violet-400/10 p-4 text-slate-700 dark:text-slate-200 shadow-inner"
                        >
                            <motion.div
                                className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-blue-400/20 blur-3xl"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="relative z-10 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400">Time zone</p>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">GMT+7 / WIB</p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Great overlap with APAC mornings & EU late afternoons.</p>
                                </div>
                                <motion.span
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-white/60 dark:bg-slate-900/35 text-blue-500 dark:text-blue-400 shadow"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2.4, repeat: Infinity }}
                                >
                                    <Clock className="h-5 w-5" />
                                </motion.span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
};