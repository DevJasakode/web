"use client";

import {
    Stack,
    Grid,
    Card,
    Typography,
    FormControl,
    TextField,
    Button,
} from "@mui/material";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

export default function WebsiteSettingContact() {

    return (
        <Stack
            sx={{
                px: 3,
                py: 3,
            }}
            spacing={3}
        >
            <Stack sx={{ px: 3, py: 3 }}>
                <Grid spacing={3} container>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontSize={"1.4rem"} fontWeight={"bold"}>Jasakode Website Settings</Typography>
                        <Typography fontSize={"1rem"}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ipsa natus nostrum quisquam beatae animi mollitia, doloremque modi laudantium fugit!
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignContent: "flex-start",
                            justifyContent: {
                                xs: "flex-start",
                                md: "flex-end"
                            }
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SaveAsOutlinedIcon />}
                            disabled
                        >
                            Save Chnages
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
            <Card sx={{ px: 3, py: 3 }}>
                <Grid spacing={3} container>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ mb: 2 }} fontWeight={"bold"} fontSize={"1.2rem"}>Umum</Typography>
                        <Stack spacing={2}>
                            <FormControl>
                                <Typography sx={{ mb: 0.5 }}>Office Address</Typography>
                                <TextField
                                    size="small"
                                    value={"Srijaya, Kec. Belitang II, Kabupaten Ogan Komering Ulu Timur, Sumatera Selatan 32383"}
                                    placeholder="..."
                                    multiline
                                    minRows={3}
                                    maxRows={6}
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                        }
                                    }}
                                    onChange={() => { }}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ mb: 0.5 }}>Phone</Typography>
                                <TextField
                                    size="small"
                                    value={"+62 851 5900 3374"}
                                    placeholder="..."
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                        }
                                    }}
                                    onChange={() => { }}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ mb: 0.5 }}>Email</Typography>
                                <TextField
                                    size="small"
                                    value={"info@jasakode.com"}
                                    placeholder="info@jasakode.com"
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                        }
                                    }}
                                    onChange={() => { }}
                                />
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ mb: 2 }} fontWeight={"bold"} fontSize={"1.2rem"}>Sosial Media</Typography>
                        <Stack spacing={2}>
                            <FormControl>
                                <Typography sx={{ mb: 0.5 }}>Youtube</Typography>
                                <TextField
                                    size="small"
                                    value={"https://youtube.com/@jasakode"}
                                    placeholder="https://youtube.com/@channel"
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                        }
                                    }}
                                    onChange={() => { }}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ mb: 0.5 }}>Linkedin</Typography>
                                <TextField
                                    size="small"
                                    value={"https://linkedin.com/@jasakode"}
                                    placeholder="https://linkedin.com/@channel"
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                        }
                                    }}
                                    onChange={() => { }}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ mb: 0.5 }}>Github</Typography>
                                <TextField
                                    size="small"
                                    value={"https://github.com/@jasakode"}
                                    placeholder="https://github.com/@channel"
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                        }
                                    }}
                                    onChange={() => { }}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ mb: 0.5 }}>Tiktok</Typography>
                                <TextField
                                    size="small"
                                    value={"https://tiktok.com/@jasakode"}
                                    placeholder="https://tiktok.com/@channel"
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                        }
                                    }}
                                    onChange={() => { }}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ mb: 0.5 }}>X (dulu Twitter)</Typography>
                                <TextField
                                    size="small"
                                    value={"https://x.com/@jasakode"}
                                    placeholder="https://x.com/@channel"
                                    slotProps={{
                                        input: {
                                            spellCheck: false,
                                        }
                                    }}
                                    onChange={() => { }}
                                />
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
        </Stack>
    )
}