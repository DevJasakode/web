import type { LucideIcon } from "lucide-react";

export type TimelineTab =
    | "about"
    | "contact"
    | "Professional and Education"
    | "Activities & Contributions"
    | "Statistik & Interaktif"
    | "Journey of life";

export type TimelineEvent = {
    t: string;
    d: string;
};

export type StatusTone = "online" | "focus" | "offline";

export type ContactChannel = {
    id: string;
    label: string;
    value: string;
    helper: string;
    meta: string;
    icon: LucideIcon;
    href?: string;
    accent: {
        icon: string;
        chip: string;
    };
};

export type SocialLink = {
    id: string;
    platform: string;
    handle: string;
    href: string;
    icon: LucideIcon;
    gradient: string;
    metric: string;
};

export type AvailabilitySlot = {
    id: string;
    label: string;
    hours: string;
    status: StatusTone;
    description: string;
};

export type ContactHighlight = {
    id: string;
    title: string;
    description: string;
};

export type PersonalFact = {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: LucideIcon;
    accent: string;
};

export type LifeGoal = {
    id: string;
    title: string;
    description: string;
    progress: number;
    icon: LucideIcon;
    accent: string;
};

export type ProfileLensKey = "professional" | "personal";

export type ProfileLens = {
    title: string;
    subtitle: string;
    summary: string;
    bullets: Array<{ id: string; label: string; detail: string }>;
};

export type DailyRhythm = {
    id: string;
    time: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

export type CoreValue = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    accent: string;
};

export type HeroHighlight = {
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
};

export type JourneyMilestoneCategory = "education" | "career" | "community" | "innovation";

export type JourneyChapter = {
    id: "foundation" | "builder" | "vision";
    title: string;
    period: string;
    headline: string;
    description: string;
    keywords: string[];
    icon: LucideIcon;
    accent: string;
    gradient: string;
};

export type JourneyMilestone = {
    id: string;
    chapterId: JourneyChapter["id"];
    year: string;
    title: string;
    description: string;
    category: JourneyMilestoneCategory;
    impact: string;
};

export type JourneySnapshot = {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: LucideIcon;
    accent: string;
};

export type Experience = {
    id: string;
    role: string;
    company: string;
    companyUrl?: string;
    location: string;
    period: string;
    headline: string;
    achievements: string[];
    stack: string[];
    icon: LucideIcon;
    accent: string;
};

export type EducationEntry = {
    id: string;
    institution: string;
    location: string;
    period: string;
    degree: string;
    focus: string;
    highlight: string;
};

export type Certification = {
    id: string;
    title: string;
    issuer: string;
    year: string;
    credentialId?: string;
    description: string;
    icon: LucideIcon;
    accent: string;
};

export type SkillGroup = {
    id: string;
    title: string;
    description: string;
    items: string[];
    icon: LucideIcon;
    accent: string;
};

export type CommunityInitiative = {
    id: string;
    name: string;
    role: string;
    location: string;
    year: string;
    description: string;
    impact: string;
    icon: LucideIcon;
    accent: string;
};

export type OpenSourceProject = {
    id: string;
    name: string;
    description: string;
    role: string;
    highlights: string[];
    repoUrl: string;
    accent: string;
};

export type SpeakingEngagement = {
    id: string;
    event: string;
    format: string;
    location: string;
    year: string;
    topic: string;
    takeaway: string;
};

export type MentoringProgram = {
    id: string;
    program: string;
    focus: string;
    cadence: string;
    participants: string;
    outcomes: string;
    icon: LucideIcon;
    accent: string;
};

export type ActivityStat = {
    id: string;
    label: string;
    value: string;
    description: string;
    icon: LucideIcon;
    accent: string;
};

export type Endorsement = {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
    score: number;
    avatar: string;
    relationship: string;
};

export type ActivityItem = {
    id: string;
    type: "post" | "project" | "update";
    title: string;
    description: string;
    date: string;
    link?: string;
};

export type SkillPulse = {
    id: string;
    label: string;
    value: number;
    trend: "up" | "steady" | "down";
};

export type Badge = {
    id: string;
    name: string;
    level: string;
    description: string;
    points: number;
    icon: LucideIcon;
    accent: string;
};