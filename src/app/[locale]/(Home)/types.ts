import type { LucideIcon } from "lucide-react";

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
