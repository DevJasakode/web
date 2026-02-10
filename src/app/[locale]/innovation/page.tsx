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

type InnovationProject = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    highlight?: boolean;
};

const innovationProjects: InnovationProject[] = [
    {
        id: "1",
        title: "Decentralized Identity Engine",
        description:
            "Sistem identitas digital terdesentralisasi yang menghilangkan single point of failure dan memberikan kontrol penuh kepada pengguna.",
        tags: ["Blockchain", "Security", "Web3"],
        highlight: true
    },
    {
        id: "2",
        title: "AI-assisted Code Intelligence",
        description:
            "Mesin analisis kode berbasis AI untuk mendeteksi pola bug, technical debt, dan potensi optimasi performa secara real-time.",
        tags: ["AI", "Developer Tools"]
    },
    {
        id: "3",
        title: "Edge-native API Platform",
        description:
            "Platform API yang dieksekusi langsung di edge untuk latensi ultra-rendah dan skalabilitas global.",
        tags: ["Edge Computing", "Backend"]
    },
    {
        id: "4",
        title: "Human-centric Data Visualization",
        description:
            "Eksplorasi visualisasi data yang dirancang untuk otak manusia, bukan hanya dashboard angka.",
        tags: ["Data", "UX", "Visualization"]
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
                    {innovationProjects.map(project => (
                        <Grid size={{ xs: 12, md: 6 }} key={project.id}>
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
                                            `0 12px 32px ${theme.palette.action.hover}`
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 4 }}>
                                    <Stack spacing={2}>
                                        <Typography
                                            variant="h5"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {project.title}
                                        </Typography>

                                        <Typography sx={{ opacity: 0.85 }}>
                                            {project.description}
                                        </Typography>

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                        >
                                            {project.tags.map(tag => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: "rgba(255,255,255,0.1)",
                                                        color: "#fff"
                                                    }}
                                                />
                                            ))}
                                        </Stack>

                                        <Box>
                                            <Button
                                                endIcon={<ArrowForwardIcon />}
                                                sx={{
                                                    color: "primary.main",
                                                    textTransform: "none",
                                                    px: 0
                                                }}
                                            >
                                                Explore project
                                            </Button>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box >
    );
}
