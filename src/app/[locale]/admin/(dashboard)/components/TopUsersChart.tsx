"use client";

// TopUsersChart.tsx
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
  { name: "Jeff Smith", plans: 100 },
  { name: "Anna Doe", plans: 75 },
  { name: "John Lee", plans: 62 },
  { name: "Maria", plans: 50 }
];

export function TopUsersChart() {
  return (
    <Card title="Top Users">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="plans" fill="#60A5FA" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

