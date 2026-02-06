"use client";


// GaugeChart.tsx
import { PieChart, Pie, Cell } from "recharts";
import { Card } from "./Card";

const data = [
  { value: 70, color: "#22C55E" },
  { value: 20, color: "#FACC15" },
  { value: 10, color: "#EF4444" }
];

export function GaugeChart() {
  return (
    <Card title="Carbon Footprint">
      <PieChart width={260} height={160}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
      </PieChart>

      <div className="text-center text-sm font-semibold text-green-600">
        LOW
      </div>
    </Card>
  );
}
