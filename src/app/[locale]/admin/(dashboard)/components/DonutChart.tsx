"use client";


// DonutChart.tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card } from "./Card";

const data = [
  { name: "Crop A", value: 34 },
  { name: "Crop B", value: 23 },
  { name: "Crop C", value: 10 },
  { name: "Others", value: 23 }
];

const COLORS = ["#22C55E", "#86EFAC", "#BBF7D0", "#DCFCE7"];

export function DonutChart() {
  return (
    <Card title="Total Plans per Crop">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
