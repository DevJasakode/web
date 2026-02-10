"use client";

import * as React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Alert,
    Grid,
    Select,
    MenuItem,
    Avatar,
    Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DonationOverview } from "./DonationOverview";


type DonationFormData = {
    name: string;
    email: string;
    amount: string;
    paymentMethod: string;
    note: string;
};

const initialState: DonationFormData = {
    name: "",
    email: "",
    amount: "",
    paymentMethod: "",
    note: "",
};


interface Donation {
    name: string;
    amount: number;
}

const dummyDonations: Donation[] = [
    {
        name: "Andi Pratama",
        amount: 500_000,
    },
    {
        name: "Siti Rahma",
        amount: 300_000,
    },
    {
        name: "Budi Santoso",
        amount: 250_000,
    },
    {
        name: "Anonymous",
        amount: 100_000,
    },
];

const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);

export default function DonationForm() {
    const [form, setForm] = React.useState<DonationFormData>(initialState);
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange =
        (field: keyof DonationFormData) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, [field]: event.target.value });
            };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log("Donation data:", form);

        setSubmitted(true);
        setForm(initialState);
    };

    return (
        <Box
            maxWidth="lg"
            minHeight="100svh"
            sx={{
                mx: "auto",
                px: 3,
                py: 6,
                display: "flex",
                flexDirection: "column",
                gap: 6,
            }}
        >
            <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <Stack spacing={3}>
                    {/* Header */}
                    <Stack spacing={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <FavoriteBorderIcon />
                            <Typography variant="h5" fontWeight={700}>
                                Donasi untuk Proyek Ini
                            </Typography>
                        </Stack>

                        <Typography color="text.secondary">
                            Dukungan kamu membantu menjaga keberlanjutan pengembangan dan
                            infrastruktur proyek inovasi ini.
                        </Typography>
                    </Stack>

                    {submitted && (
                        <Alert severity="success">
                            Terima kasih atas dukungan kamu. Donasi kamu sangat berarti.
                        </Alert>
                    )}

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Stack spacing={3}>
                                {/* Nominal */}
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Jumlah Donasi"
                                        type="number"
                                        value={form.amount}
                                        onChange={handleChange("amount")}
                                        placeholder="Contoh: 50000"
                                        required
                                        slotProps={{ input: { type: "number" } }}
                                    />
                                </FormControl>
                                {/* Identitas (opsional) */}
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Nama (Opsional)"
                                        value={form.name}
                                        onChange={handleChange("name")}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Email (Opsional)"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange("email")}
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Stack spacing={3}>
                                {/* Metode Pembayaran */}
                                <FormControl fullWidth>
                                    <Typography sx={{ mb: 0.5 }}>Metode Pembayaran</Typography>
                                    <Select
                                        size="small"
                                        value={"qris"}
                                    >
                                        <MenuItem value={"qris"}>Qris</MenuItem>
                                        <MenuItem value={"paypal"}>Paypal</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* Catatan */}
                                <FormControl fullWidth>
                                    <TextField
                                        size="small"
                                        label="Catatan (Opsional)"
                                        value={form.note}
                                        onChange={handleChange("note")}
                                        multiline
                                        rows={3}
                                        fullWidth
                                        placeholder="Pesan atau dukungan singkat"
                                    />
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                    {/* Submit */}
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                        >
                            Donasi Sekarang
                        </Button>
                    </Box>

                    {/* Disclaimer */}
                    <Typography variant="body2" color="text.secondary">
                        Donasi bersifat sukarela dan tidak mengikat. Dana digunakan untuk
                        operasional, pengembangan, dan dokumentasi proyek.
                    </Typography>
                </Stack>
            </Paper>

            <DonationOverview />
        </Box>
    );
};
