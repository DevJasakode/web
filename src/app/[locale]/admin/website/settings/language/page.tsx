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
import { languages } from "@/i18n"



export default function WebsiteSettingLanguage() {


    return (
        <Stack spacing={3} sx={{ px: 3, py: 3 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontSize={"1.4rem"} fontWeight={"bold"}>Language Settings</Typography>
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
                            <Typography sx={{ mb: 0.5 }}>Default Language</Typography>
                            <Select
                                size="small"
                                value={"en"}
                                onChange={() => { }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200, // tinggi maksimal dropdown
                                        },
                                    },
                                }}
                            >
                                {
                                    languages.map((item, i) => (
                                        <MenuItem key={i} value={item.code}>
                                            {item.flag} {item.englishName}
                                        </MenuItem>
                                    ))
                                }
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
}
