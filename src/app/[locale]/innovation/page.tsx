"use client";

import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Stack,
    Button
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SmartLink } from "@/components/link";

interface Project {
    path: string;
    name: string;
    logo?: string;
    desc: string;
    tags: string[];
};

const projects: Project[] = [
    {
        path: "/[locale]/innovation/translation",
        name: "Jasakode Translation",
        logo: "/assets/image/translation-logo.png",
        desc: "Jasakode Translation adalah layanan penerjemahan berbasis teknologi yang dikembangkan dalam ekosistem Jasakode Innovation. Proyek ini berfokus pada eksperimen open-source, peningkatan kualitas terjemahan multibahasa, dan eksplorasi integrasi AI untuk kebutuhan dokumentasi, produk, dan konten digital.",
        tags: [
            "Translation",
            "Multilingual",
            "Open Source",
            "AI Experiment",
            "Language Tech",
        ],
    },
    {
        path: "/[locale]/innovation/translation",
        name: "Decentralized Identity Engine",
        logo: "/assets/image/Logo.png",
        desc: "Sistem identitas digital terdesentralisasi yang menghilangkan single point of failure dan memberikan kontrol penuh kepada pengguna.",
        tags: ["Blockchain", "Security", "Web3"],
    }
];

export default function InnovationHub() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: {
                    xs: 8, md: 12
                },
                backgroundColor: "background.default"

            }}
        >
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 10
                    }}
                >
                    <Typography
                        variant="overline"
                        sx={{ color: "primary.main", letterSpacing: 2 }}
                    >
                        Innovation Hub
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            mt: 2,
                            lineHeight: 1.1
                        }}
                    >
                        Where Ideas
                        <Box component="span" sx={{ color: "primary.main" }}>
                            {" "}
                            Become Systems
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            maxWidth: 720,
                            mx: "auto",
                            mt: 3,
                            opacity: 0.85,
                            fontSize: "1.1rem"
                        }}
                    >
                        Innovation Hub adalah ruang eksplorasi ide, eksperimen teknologi,
                        dan sistem masa depan yang dibangun dengan pendekatan ilmiah,
                        pragmatis, dan visioner.
                    </Typography>
                </Box>

                {/* Projects Section */}
                <Grid container spacing={4}>
                    {projects.map((project, i) => (
                        <Grid size={{ xs: 12, md: 6 }} key={i}>
                            <SmartLink href={{ pathname: project.path }}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        borderRadius: 4,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        backgroundColor: "background.paper",
                                        transition: "all .25s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: theme =>
                                                `0 12px 32px ${theme.palette.action.hover}`,
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            p: 4,
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {/* HEADER */}
                                        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                                            {/* LOGO */}
                                            <Box
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 2,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    overflow: "hidden",
                                                    bgcolor: "background.default",
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <img
                                                    src={project.logo || "/assets/image/Logo.png"}
                                                    alt={project.name}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Box>

                                            {/* TITLE + TAGS */}
                                            <Box sx={{ minWidth: 0 }}>
                                                <Typography variant="h6" fontWeight={600} noWrap>
                                                    {project.name}
                                                </Typography>

                                                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                                                    {project.tags.slice(0, 3).map(tag => (
                                                        <Chip
                                                            key={tag}
                                                            label={tag}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: "action.hover",
                                                            }}
                                                        />
                                                    ))}
                                                </Stack>
                                            </Box>
                                        </Stack>

                                        {/* BODY */}
                                        <Typography sx={{ opacity: 0.85, mb: 3 }}>
                                            {project.desc}
                                        </Typography>

                                        {/* FOOTER */}
                                        <Box 
                                            sx={{ 
                                                mt: "auto",
                                                display: "flex",
                                                gap: 3, 
                                                alignItems: "center",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <Button
                                                endIcon={<ArrowForwardIcon />}
                                                sx={{
                                                    textTransform: "none",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Explore project
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </SmartLink>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box >
    );
};
