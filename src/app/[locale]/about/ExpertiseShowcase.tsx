"use client";

import {
    Box,
    Container,
    Grid,
    Typography,
    Select,
    MenuItem,
    FormControl,
    Stack,
    Card,
    Chip,
    Avatar,
    Button,
    Menu,
    CardContent,
} from "@mui/material";
import {
    Users2,
} from "lucide-react";
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { SmartLink } from "@/components/link";
import { useState, Fragment } from "react";
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined';



function ExpertiseTeams() {
    return (
        <Box>
            <Typography fontSize={"0.8rem"} sx={{ mb: 1, ml: 1 }}>{"Skill".toLocaleUpperCase()}</Typography>
            <Stack spacing={2} direction={"row"}>
                <Avatar>AB</Avatar>
                <Box>
                    <Typography fontSize={"0.8rem"} fontWeight={"bold"}>AI Research Team</Typography>
                    <Typography fontSize={"0.8rem"}>Riset dan eksperimen model AI gen...</Typography>
                </Box>
            </Stack>
        </Box>
    )
};

export interface TechServiceOption {
    value: string;
    label: string;
}
const techServiceOptions: TechServiceOption[] = [
    { value: "all", label: "All" },
    { value: "backend", label: "Backend Engineer" },
    { value: "frontend", label: "Frontend Engineer" },
    { value: "fullstack", label: "Fullstack Developer" },
    { value: "mobile", label: "Mobile Developer" },
    { value: "devops", label: "DevOps Engineer" },
    { value: "qa", label: "QA Engineer" },
    { value: "uiux", label: "UI/UX Designer" },
    { value: "data", label: "Data Engineer" },
    { value: "datascientist", label: "Data Scientist" },
    { value: "ai", label: "AI Engineer" },
    { value: "cloud", label: "Cloud Engineer" },
    { value: "cybersecurity", label: "Cyber Security Specialist" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const ButtonFilter: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleClick}
                startIcon={<FilterAltOffOutlinedIcon />}
            >
                Filter
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            background: "transparent",
                            borderStyle: "none"
                        },
                    }
                }}
            >
                <Card sx={{ minWidth: 250 }}>
                    <CardContent>
                        <Stack spacing={1}>
                            <FormControl fullWidth>
                                <Select
                                    value={"all"}
                                    size="small"
                                    variant="outlined"
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                            },
                                        },
                                    }}
                                >
                                    {
                                        techServiceOptions.map(item => (
                                            <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <Select
                                    value={"1"}
                                    size="small"
                                    variant="outlined"
                                >
                                    <MenuItem value={"1"} selected sx={{ display: "none" }}>Featured</MenuItem>
                                    <MenuItem value={"2"} >Terbanyak Tim</MenuItem>
                                    <MenuItem value={"3"} >Nama (A-Z)</MenuItem>
                                </Select>
                            </FormControl>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    mt: 1
                                }}
                            >
                                <Button startIcon={<FilterListOffOutlinedIcon />} variant="contained">Terapkan</Button>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Menu>
        </>
    );
};

export default function ExpertiseShowcase() {

    return (
        <Box>
            <Container>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Users2 className="h-7 w-7 text-indigo-500 dark:text-cyan-300" />
                            <Typography fontWeight={"bold"} fontSize={"2rem"} sx={{ ml: 2 }}>Our Teams</Typography>
                        </Box>
                        <Typography>
                            Kenali semua unit yang membangun Studio kami—dari platform, aplikasi, riset, hingga operasi bisnis.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}
                        >
                            <ButtonFilter />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid size={{ xs: 12, md: 12, lg: 4 }}>
                    <Card
                        sx={{
                            height: "100%",
                            p: 2,
                            borderRadius: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                            }}
                        >
                            <div
                                className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-indigo-500/10 text-indigo-600 dark:bg-cyan-400/10 dark:text-cyan-200"
                            >
                                ICO
                            </div>
                            <Box>
                                <Typography fontWeight={"bold"} fontSize={"1.2rem"}>Artificial Intelligence</Typography>
                                <Typography>Pengembangan sistem cerdas berbasis data dan machine learning.</Typography>
                                <Stack spacing={1} direction={"row"} sx={{ mt: 1 }}>
                                    <Chip label={"Hello"} size="small" variant="outlined" color="primary" />
                                    <Chip label={"Hello"} size="small" variant="outlined" color="primary" />
                                </Stack>
                            </Box>
                        </Box>
                        <Stack spacing={1} sx={{ mt: 1 }}>
                            <Card
                                sx={{
                                    p: 1,
                                    borderRadius: 2,
                                }}
                            >
                                <ExpertiseTeams />
                            </Card>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography>Ingin bergabung? Kami selalu mencari talenta terbaik di engineering, desain, dan riset.</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <SmartLink href={{ pathname: "/[locale]/about/careers" }}>
                            <Button
                                variant="contained"
                                color="success"
                                endIcon={<OpenInNewOutlinedIcon />}
                            >
                                Lihat Lowongan
                            </Button>
                        </SmartLink>
                        <SmartLink href={{ pathname: "/[locale]/about/team" }}>
                            <Button
                                variant="contained"
                                color="info"
                                endIcon={<OpenInNewOutlinedIcon />}
                            >
                                Lihat Semua Tim
                            </Button>
                        </SmartLink>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};