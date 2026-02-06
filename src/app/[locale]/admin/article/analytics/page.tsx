"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Grid,
} from "@mui/material";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

/**
 * Dummy data analytics
 * Anggap ini hasil olahan backend
 */

// Statistik ringkas
const summaryStats = [
  { label: "Total Views", value: "12,480" },
  { label: "Articles Published", value: "24" },
  { label: "Avg. Read Time", value: "4m 32s" },
  { label: "Engagement Rate", value: "62%" },
];

// Views per hari
const viewsOverTime = [
  { date: "Jan 01", views: 420 },
  { date: "Jan 05", views: 680 },
  { date: "Jan 10", views: 900 },
  { date: "Jan 15", views: 760 },
  { date: "Jan 20", views: 1100 },
  { date: "Jan 25", views: 980 },
];

// Top articles
const topArticles = [
  { title: "Calm UI Is a Competitive Advantage", views: 1240 },
  { title: "Why Writing Systems Shape Thinking", views: 980 },
  { title: "Designing Sidebars That Don’t Annoy Users", views: 860 },
  { title: "Understanding React Server Components", views: 740 },
];

export default function ArticleAnalytics() {
  return (
    <Box sx={{ p: 3 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Analytics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track how your articles perform over time
        </Typography>
      </Stack>

      {/* ===== Summary Cards ===== */}
      <Grid container spacing={2} mb={3}>
        {summaryStats.map((stat) => (
          <Grid sx={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
            <Card>
              <CardContent>
                <Typography
                  fontSize={12}
                  color="text.secondary"
                  gutterBottom
                >
                  {stat.label}
                </Typography>
                <Typography fontSize={20} fontWeight={600}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ===== Charts ===== */}
      <Grid container spacing={3}>
        {/* Views Over Time */}
        <Grid sx={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography fontWeight={500} mb={2}>
                Views Over Time
              </Typography>

              <Box sx={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <LineChart data={viewsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="views"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Articles */}
        <Grid sx={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography fontWeight={500} mb={2}>
                Top Articles
              </Typography>

              <Box sx={{ width: "100%", height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={topArticles} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="title"
                      width={120}
                    />
                    <Tooltip />
                    <Bar dataKey="views" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}