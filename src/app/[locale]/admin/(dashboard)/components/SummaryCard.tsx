"use client";

// SummaryCard.tsx
type Props = {
  label: string;
  value: number;
  sub?: string;
};

export function SummaryCard({ label, value, sub }: Props) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  );
}
