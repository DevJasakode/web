"use client";

// TopProductsChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card } from "./Card";

const data = [
  { name: "Crop 1", urea: 15, mop: 25, an: 60 },
  { name: "Crop 2", urea: 12, mop: 50, an: 33 },
  { name: "Crop 3", urea: 18, mop: 32, an: 50 }
];

export function TopProductsChart() {
  return (
    <Card title="Top Products per Crop">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="urea" stackId="a" fill="#60A5FA" />
          <Bar dataKey="mop" stackId="a" fill="#93C5FD" />
          <Bar dataKey="an" stackId="a" fill="#BFDBFE" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

