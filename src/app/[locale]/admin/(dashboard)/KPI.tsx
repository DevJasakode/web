"use client";




import * as React from "react";
import { Box, Grid, Paper, Typography, Stack } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

type Stat = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
};

const stats: Stat[] = [
  {
    label: "Total Patients",
    value: "156",
    change: "8%",
    trend: "up",
    icon: <PeopleAltOutlinedIcon />,
    color: "#4f7cff",
  },
  {
    label: "Consultation",
    value: "92",
    change: "14%",
    trend: "up",
    icon: <EventNoteOutlinedIcon />,
    color: "#10b981",
  },
  {
    label: "Procedure",
    value: "64",
    change: "7%",
    trend: "down",
    icon: <MedicalServicesOutlinedIcon />,
    color: "#f59e0b",
  },
  {
    label: "Payment",
    value: "¥28,704",
    change: "12%",
    trend: "up",
    icon: <PaymentsOutlinedIcon />,
    color: "#6366f1",
  },
];

export function KPI() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {stats.map((item) => (
          <Grid key={item.label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`,
                border: "1px solid",
                borderColor: `${item.color}30`,
              }}
            >
              <Stack spacing={2}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: `${item.color}25`,
                      color: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {item.trend === "up" ? (
                      <TrendingUpIcon sx={{ fontSize: 18, color: "success.main" }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: 18, color: "error.main" }} />
                    )}
                    <Typography
                      variant="caption"
                      color={item.trend === "up" ? "success.main" : "error.main"}
                      fontWeight={600}
                    >
                      {item.change}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Content */}
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {item.value}
                  </Typography>
                </Box>

                {/* Footer */}
                <Typography
                  variant="caption"
                  sx={{ color: item.color, cursor: "pointer" }}
                >
                  View report →
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
