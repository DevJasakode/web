"use client";

import * as React from "react";
import {
    Box,
    TextField,
    Typography,
    Button,
    Stack,
    Alert,
    FormControl,
    Grid,
    Tooltip,
} from "@mui/material";
import { Dropzone } from "@/components/form/Dropzone";
import { useParams } from "next/navigation";
import { SmartLink } from "@/components/link";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


type ApplicantFormData = {
    fullName: string;
    age: number;
    address: string;
    email: string;
    phone: string;
    portfolioUrl: string;
    coverLetter: string;
};

const initialState: ApplicantFormData = {
    fullName: "",
    address: "",
    age: 0,
    email: "",
    phone: "",
    portfolioUrl: "",
    coverLetter: "",
};

export default function ApplicantForm() {
    const [form, setForm] = React.useState<ApplicantFormData>(initialState);
    const [submitted, setSubmitted] = React.useState(false);
    const params = useParams<{ slug: string }>();


    const handleChange = (field: keyof ApplicantFormData) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [field]: event.target.value });
        };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // simulasi submit
        console.log("Applicant data:", form);

        setSubmitted(true);
        setForm(initialState);
    };

    return (
        <Box
            maxWidth="lg"
            sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                p: 3,
                pb: 12,
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    mt: 6,
                    pb: 4,
                    pt: 2,
                    px: 1,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                }}
            >
                <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end" }}>
                    <SmartLink
                        href={{
                            pathname: "/[locale]/about/careers/[slug]",
                            query: { slug: params.slug }
                        }}
                    >
                        <Button
                            color="error"
                            startIcon={<DeleteForeverOutlinedIcon />}
                        >
                            Cancel
                        </Button>
                    </SmartLink>
                </Box>

                <Stack spacing={3} sx={{ px: 3 }}>
                    <Box>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            Lamar Posisi Ini
                        </Typography>
                        <Typography color="text.secondary">
                            Isi formulir di bawah ini dengan data yang sebenar-benarnya.
                        </Typography>
                    </Box>

                    {submitted && (
                        <Alert severity="success">
                            Lamaran berhasil dikirim. Terima kasih sudah melamar.
                        </Alert>
                    )}

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Stack spacing={2}>
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Nama Lengkap"
                                        value={form.fullName}
                                        onChange={handleChange("fullName")}
                                        required
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange("email")}
                                        required
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Nomor Telepon"
                                        value={form.phone}
                                        onChange={handleChange("phone")}
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Link Portfolio / LinkedIn"
                                        value={form.portfolioUrl}
                                        onChange={handleChange("portfolioUrl")}
                                        placeholder="https://"
                                        fullWidth
                                    />
                                </FormControl>
                                <Tooltip
                                    title="Kami tidak menetapkan batasan usia. Informasi ini digunakan untuk memastikan pelamar memenuhi persyaratan usia minimum."
                                >
                                    <FormControl fullWidth>
                                        <TextField
                                            size="small"
                                            label="Usia"
                                            slotProps={{
                                                input: {
                                                    type: "number"
                                                }
                                            }}
                                            value={form.age}
                                            onChange={handleChange("age")}
                                            fullWidth
                                        />
                                    </FormControl>
                                </Tooltip>
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Address"
                                        value={form.address}
                                        onChange={handleChange("address")}
                                        placeholder="Jakarta"
                                        fullWidth
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Stack spacing={2}>
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Cover Letter"
                                        value={form.coverLetter}
                                        onChange={handleChange("coverLetter")}
                                        multiline
                                        rows={4}
                                        fullWidth
                                        placeholder="Ceritakan secara singkat kenapa kamu cocok untuk posisi ini"
                                    />
                                </FormControl>
                                <Box>
                                    <Typography sx={{ mb: 0.5 }}>Attachment</Typography>
                                    <Dropzone
                                        minHeight={150}
                                    />
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                        >
                            Kirim Lamaran
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
