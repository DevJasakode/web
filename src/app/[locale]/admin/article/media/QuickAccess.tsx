"use client";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Typography, Grid, Paper } from "@mui/material";

export interface QuickAccessItem {
    label: string;
    icon: React.ReactNode;
    bgColor: string;
}

export const quickAccessItems: QuickAccessItem[] = [
    { label: "Images", icon: <ImageOutlinedIcon />, bgColor: "#E3F2FD" },
    { label: "Videos", icon: <PlayCircleOutlineIcon />, bgColor: "#FCE4EC" },
    { label: "Music", icon: <MusicNoteOutlinedIcon />, bgColor: "#FFF3E0" },
    { label: "Apps", icon: <AppsOutlinedIcon />, bgColor: "#E8F5E9" },
    { label: "Zip Files", icon: <FolderZipOutlinedIcon />, bgColor: "#E0F2F1" },
    { label: "Documents", icon: <DescriptionOutlinedIcon />, bgColor: "#EDE7F6" },
    { label: "Downloads", icon: <DownloadOutlinedIcon />, bgColor: "#F1F8E9" },
    { label: "Add", icon: <AddOutlinedIcon />, bgColor: "#F5F5F5" },
];



export const QuickAccess = () => {
    return (
        <Box>
            <Typography fontWeight={600} mb={2}>
                Quick Access
            </Typography>

            <Grid container spacing={2}>
                {quickAccessItems.map((item) => (
                    <Grid key={item.label}>
                        <Box
                            sx={{
                                width: 80,
                                textAlign: "center",
                            }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    width: 56,
                                    height: 56,
                                    mx: "auto",
                                    mb: 0.5,
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: item.bgColor,
                                    cursor: "pointer",
                                    transition: "0.2s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: 2,
                                    },
                                }}
                            >
                                {item.icon}
                            </Paper>

                            <Typography fontSize="0.75rem" color="text.secondary">
                                {item.label}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

