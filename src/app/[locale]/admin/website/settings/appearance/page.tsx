"use client";

import {
    Stack,
    Grid,
    Typography,
    Card,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ContrastIcon from '@mui/icons-material/Contrast';

export default function WebsiteSettingAppearance() {

    return (
        <Stack spacing={3} sx={{ px: 3, py: 3 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontSize={"1.4rem"} fontWeight={"bold"}>Appearance</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: {
                            xs: "flex-start",
                            md: "flex-end"
                        }
                    }}
                >
                    Action
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ px: 3, py: 3, height: "100%" }}>
                        <FormControl sx={{ maxWidth: 250 }} fullWidth>
                            <Typography sx={{ mb: 0.5 }}>Default Theme Mode</Typography>
                            <Select
                                size="small"
                                value={"system"}
                                onChange={() => { }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200, // tinggi maksimal dropdown
                                        },
                                    },
                                }}
                            >
                                <MenuItem value={"system"}><ContrastIcon sx={{ mr: 1 }} /> System</MenuItem>
                                <MenuItem value={"light"}><LightModeIcon sx={{ mr: 1 }} /> Light</MenuItem>
                                <MenuItem value={"dark"}><DarkModeIcon sx={{ mr: 1 }} /> Dark</MenuItem>
                            </Select>
                        </FormControl>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} hidden>
                    <Card sx={{ px: 3, py: 3, height: "100%" }}>

                    </Card>
                </Grid>
            </Grid>
        </Stack>
    )
};