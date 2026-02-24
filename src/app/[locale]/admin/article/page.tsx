"use client";

import {
    Box,
    Typography,
    Tabs,
    Tab,
    Grid,
    Card,
} from "@mui/material";
import { useState } from "react";

import { TabAll } from "./TabAll";
import { TabPublished } from "./TabPublished";
import { TabTrending } from "./TabTrending";
import { TabPedding } from "./TabPedding";
import { TabDraft } from "./TabDraft";
import { TabArsip } from "./TabArsip";
import { TabPreviousPublications } from "./TabPreviousPublications";
import { TabDeleted } from "./TabDeleted";



type TabCode =
    "all" | "published" | "trending" |
    "pedding" | "draft" | "arsip" |
    "previous_publications" | "deleted";


export default function Article() {
    const [tab, setTab] = useState<TabCode>("all");

    return (
        <Box>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                    <Card
                        sx={{
                            minHeight: "150px",
                            width: "100%"
                        }}
                    ></Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                    <Card
                        sx={{
                            minHeight: "150px",
                            width: "100%"
                        }}
                    ></Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                    <Card
                        sx={{
                            minHeight: "150px",
                            width: "100%"
                        }}
                    ></Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                    <Card
                        sx={{
                            minHeight: "150px",
                            width: "100%"
                        }}
                    ></Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                    <Card
                        sx={{
                            minHeight: "150px",
                            width: "100%"
                        }}
                    ></Card>
                </Grid>
            </Grid>
            <Box>
                <Tabs value={tab} onChange={(_, v) => setTab(v)}
                    sx={{
                        mb: 2
                    }}
                >
                    <Tab value={"all"} label={"All"} />
                    <Tab value={"published"} label={"Published"} />
                    <Tab value={"trending"} label={"Trending"} />
                    <Tab value={"pedding"} label={"Pedding"} />
                    <Tab value={"draft"} label={"Draft"} />
                    <Tab value={"arsip"} label={"Arsip"} />
                    <Tab value={"previous_publications"} label={"Previous Publications"} />
                    <Tab value={"deleted"} label={"Deleted"} />
                </Tabs>

                {tab === "all" && <TabAll />}
                {tab === "published" && <TabPublished />}
                {tab === "trending" && <TabTrending />}
                {tab === "pedding" && <TabPedding />}
                {tab === "draft" && <TabDraft />}
                {tab === "arsip" && <TabArsip />}
                {tab === "previous_publications" && <TabPreviousPublications />}
                {tab === "deleted" && <TabDeleted />}
            </Box>
        </Box>
    )
};