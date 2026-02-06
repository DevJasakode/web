"use client";

import React, { useMemo, useState } from "react";
import {
    Box,
    Chip,
    Container,
    Grid,
    Stack,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

/* ======================
   Types
====================== */
type InnovationCategory = "AI" | "Sustainability" | "Fintech" | "Health";

interface Innovation {
    id: number;
    title: string;
    description: string;
    category: InnovationCategory;
    impactScore: number;
}

/* ======================
   Dummy Data
====================== */
const innovations: Innovation[] = [
    {
        id: 1,
        title: "AI Smart Farming",
        description:
            "Menggunakan computer vision untuk memprediksi hasil panen dan efisiensi air.",
        category: "AI",
        impactScore: 88,
    },
    {
        id: 2,
        title: "Green Energy Optimizer",
        description:
            "Platform optimasi distribusi energi terbarukan berbasis data real-time.",
        category: "Sustainability",
        impactScore: 92,
    },
    {
        id: 3,
        title: "Instant Micro-Lending",
        description:
            "Fintech lending dengan analisis risiko berbasis machine learning.",
        category: "Fintech",
        impactScore: 80,
    },
    {
        id: 4,
        title: "Remote Health Monitoring",
        description:
            "Monitoring pasien jarak jauh menggunakan IoT dan analitik prediktif.",
        category: "Health",
        impactScore: 85,
    },
];

/* ======================
   Component
====================== */
const MotionCard = motion(Card);

export default function Innovations() {
    const [activeCategory, setActiveCategory] =
        useState<InnovationCategory | "ALL">("ALL");

    const filteredInnovations = useMemo(() => {
        if (activeCategory === "ALL") return innovations;
        return innovations.filter((i) => i.category === activeCategory);
    }, [activeCategory]);

    const chartData = useMemo(() => {
        return innovations.map((i) => ({
            name: i.title,
            impact: i.impactScore,
        }));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* Header */}
            <Stack spacing={2} mb={4}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <LightbulbIcon color="primary" />
                    <Typography variant="h4" fontWeight={700}>
                        Innovation Hub
                    </Typography>
                </Stack>
                <Typography color="text.secondary">
                    Eksplorasi ide, teknologi, dan eksperimen yang membentuk masa depan.
                </Typography>
            </Stack>

            {/* Filter */}
            <Stack direction="row" spacing={1} mb={4} flexWrap="wrap">
                {["ALL", "AI", "Sustainability", "Fintech", "Health"].map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        clickable
                        color={activeCategory === cat ? "primary" : "default"}
                        onClick={() =>
                            setActiveCategory(cat as InnovationCategory | "ALL")
                        }
                    />
                ))}
            </Stack>

            {/* Innovation Cards */}
            <Grid container spacing={3}>
                {filteredInnovations.map((item) => (
                    <Grid size={{ xs: 12, md: 6 }} key={item.id}>
                        <MotionCard
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            sx={{ height: "100%" }}
                        >
                            <CardContent>
                                <Stack spacing={1}>
                                    <Typography variant="h6" fontWeight={600}>
                                        {item.title}
                                    </Typography>
                                    <Chip
                                        label={item.category}
                                        size="small"
                                        sx={{ width: "fit-content" }}
                                    />
                                    <Typography color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Typography variant="body2">
                                        Impact Score:{" "}
                                        <strong>{item.impactScore}</strong>
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>

            {/* Chart */}
            <Box mt={6}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Dampak Inovasi
                </Typography>
                <Box height={300}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" hide />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="impact" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Container>
    );
};

