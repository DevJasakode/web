import type { LucideIcon } from "lucide-react";

export type IntroStat = {
  label: string;
  value: string;
};

export type Pillar = {
  id: string;
  title: string;
  description: string;
  metrics: string[];
};

export type JourneyItem = {
  year: string;
  title: string;
  body: string;
};

export type ValueItem = {
  icon: LucideIcon;
  title: string;
  detail: string;
};
