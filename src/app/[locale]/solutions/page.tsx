"use client";

import * as React from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Chip,
    Card,
    CardContent,
    Button,
    Stack,
    Divider,
    alpha,
    Grid,
} from "@mui/material";

/* =======================
   Types
======================= */
type SolutionTag = "advisory" | "build" | "assurance" | "operate";

type Solution = {
    id: string;
    name: string;
    description: string;
    tags: SolutionTag[];
    duration: string;
    deliverable: string;
    fit: string;
};

/* =======================
   Dummy Data
======================= */
const SOLUTIONS: Solution[] = [
    {
        id: "consulting",
        name: "Consulting",
        description:
            "Strategic framing, system thinking, and architectural decisions.",
        tags: ["advisory"],
        duration: "2–6 weeks",
        deliverable: "Strategy brief",
        fit: "Founders, executives",
    },
    {
        id: "research",
        name: "Technology Research",
        description:
            "Focused experimentation to validate ideas before committing.",
        tags: ["advisory", "build"],
        duration: "2–8 weeks",
        deliverable: "PoC & report",
        fit: "R&D teams",
    },
    {
        id: "design",
        name: "Software Design",
        description:
            "UX flows, system architecture, and technical specifications.",
        tags: ["advisory", "build"],
        duration: "3–6 weeks",
        deliverable: "Design spec",
        fit: "Product & engineering",
    },
    {
        id: "development",
        name: "Development",
        description:
            "End-to-end implementation with CI/CD and production readiness.",
        tags: ["build", "operate"],
        duration: "6–12 weeks",
        deliverable: "Production system",
        fit: "Product teams",
    },
    {
        id: "review",
        name: "Code & Security Review",
        description:
            "Audit quality, performance, and security posture.",
        tags: ["assurance"],
        duration: "1–3 weeks",
        deliverable: "Audit report",
        fit: "Engineering orgs",
    },
];

/* =======================
   Component
======================= */
export default function Solutions() {
    const [query, setQuery] = React.useState("");
    const [activeTags, setActiveTags] = React.useState<SolutionTag[]>([
        "advisory",
        "build",
        "assurance",
        "operate",
    ]);

    const filtered = React.useMemo(() => {
        return SOLUTIONS.filter(
            (s) =>
                (s.name.toLowerCase().includes(query.toLowerCase()) ||
                    s.description.toLowerCase().includes(query.toLowerCase())) &&
                s.tags.some((t) => activeTags.includes(t))
        );
    }, [query, activeTags]);

    return (
        <Box
            sx={{
                // bgcolor: "background.default",
                minHeight: "100vh"
            }}
        >
            {/* ================= Hero ================= */}
            <Box
                sx={(theme) => ({
                    py: 12,
                    // background: `linear-gradient(180deg, ${alpha(
                    //     theme.palette.primary.main,
                    //     0.08
                    // )}, transparent)`,
                })}
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" fontWeight={700}>
                        Solutions
                    </Typography>
                    <Typography
                        color="text.secondary"
                        maxWidth={640}
                        mt={2}
                        fontSize={18}
                    >
                        Modular services covering strategy, build, assurance, and operations.
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        mt={4}
                    >
                        <TextField
                            placeholder="Search solutions…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            sx={{ width: 320 }}
                        />

                        {(["advisory", "build", "assurance", "operate"] as SolutionTag[]).map(
                            (tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onClick={() =>
                                        setActiveTags((prev) =>
                                            prev.includes(tag)
                                                ? prev.filter((t) => t !== tag)
                                                : [...prev, tag]
                                        )
                                    }
                                    color={activeTags.includes(tag) ? "primary" : "default"}
                                />
                            )
                        )}
                    </Stack>
                </Container>
            </Box>

            {/* ================= Grid ================= */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Grid container spacing={3}>
                    {filtered.map((s) => (
                        <Grid key={s.id} sx={{ xs: 12, sm: 6, md: 4 }}>
                            <Card
                                sx={(theme) => ({
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 3,
                                    transition: "all .25s ease",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: theme.shadows[6],
                                    },
                                })}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography fontWeight={600} fontSize={18}>
                                        {s.name}
                                    </Typography>

                                    <Typography
                                        fontSize={14}
                                        color="text.secondary"
                                        mt={1}
                                    >
                                        {s.description}
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    <Typography fontSize={13}>
                                        <b>Duration:</b> {s.duration}
                                    </Typography>
                                    <Typography fontSize={13}>
                                        <b>Deliverable:</b> {s.deliverable}
                                    </Typography>
                                    <Typography fontSize={13}>
                                        <b>Best for:</b> {s.fit}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{ mt: 3 }}
                                    >
                                        View details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* ================= Comparison ================= */}
            <Box sx={{ bgcolor: "background.paper", py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h5" fontWeight={600}>
                        Comparison Overview
                    </Typography>

                    <Stack spacing={2} mt={3}>
                        {SOLUTIONS.map((s) => (
                            <Box
                                key={s.id}
                                sx={(theme) => ({
                                    p: 3,
                                    borderRadius: 2,
                                    border: `1px solid ${theme.palette.divider}`,
                                })}
                            >
                                <Typography fontWeight={600}>{s.name}</Typography>
                                <Typography fontSize={14} color="text.secondary">
                                    {s.duration} • {s.deliverable} • {s.fit}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}