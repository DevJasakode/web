"use client";

import * as React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
    Divider,
    Link,
} from "@mui/material";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SmartLink } from "@/components/link";

export default function LibreTranslate() {
    const [sourceText, setSourceText] = React.useState("");
    const [translatedText, setTranslatedText] = React.useState("");

    const handleTranslate = () => {
        setTranslatedText(
            sourceText
                ? "Ini contoh hasil terjemahan. Fitur ini berfungsi sebagai demo dari proyek Jasakode Translate."
                : ""
        );
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
            {/* Header Proyek */}
            <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <GTranslateIcon />
                    <Typography variant="h4" fontWeight={800}>
                        Jasakode Translate
                    </Typography>
                </Stack>

                <Typography color="text.secondary" maxWidth={720}>
                    Jasakode Translate adalah bagian dari inisiatif <b>Jasakode Innovation</b> —
                    ruang eksplorasi teknologi terbuka yang berfokus pada eksperimen,
                    pembelajaran, dan solusi berbasis open-source.
                </Typography>
            </Stack>

            {/* Tentang Proyek */}
            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={700}>
                        Tentang Proyek Ini
                    </Typography>

                    <Typography color="text.secondary">
                        Proyek ini mengeksplorasi bagaimana teknologi penerjemahan berbasis
                        open-source dapat dimanfaatkan secara etis, transparan, dan
                        berkelanjutan. Fokus utama kami bukan hanya pada hasil terjemahan,
                        tetapi pada proses, arsitektur, dan aksesibilitas teknologi bahasa.
                    </Typography>

                    <Typography color="text.secondary">
                        Jasakode Translate tidak bertujuan menggantikan layanan komersial besar,
                        melainkan menyediakan alternatif yang dapat dipelajari, dikembangkan,
                        dan digunakan bersama oleh komunitas.
                    </Typography>
                </Stack>
            </Paper>

            {/* Demo Translator */}
            <Paper
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "background.default",
                }}
            >
                <Stack spacing={3}>
                    <Typography variant="h6" fontWeight={700}>
                        Demo Penerjemah
                    </Typography>

                    <Typography color="text.secondary">
                        Fitur ini merupakan demonstrasi teknis dari proyek Jasakode Translate.
                        Kualitas dan cakupan bahasa akan terus berkembang.
                    </Typography>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <TextField
                            label="Teks Asal"
                            multiline
                            rows={5}
                            fullWidth
                            value={sourceText}
                            onChange={(e) => setSourceText(e.target.value)}
                        />
                        <TextField
                            label="Hasil Terjemahan"
                            multiline
                            rows={5}
                            fullWidth
                            value={translatedText}
                            InputProps={{ readOnly: true }}
                        />
                    </Stack>

                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleTranslate}>
                            Terjemahkan
                        </Button>
                    </Box>
                </Stack>
            </Paper>

            {/* Donasi & Dukungan */}
            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <FavoriteBorderIcon />
                        <Typography variant="h6" fontWeight={700}>
                            Dukung Proyek Ini
                        </Typography>
                    </Stack>

                    <Typography color="text.secondary">
                        Jasakode Translate dikembangkan secara independen sebagai bagian dari
                        eksperimen inovasi terbuka. Dukungan kamu membantu menjaga server,
                        pengembangan fitur, dan dokumentasi.
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <SmartLink href={{ pathname: "/[locale]/innovation/translation/support" }}>
                            <Button variant="contained">
                                Donasi
                            </Button>
                        </SmartLink>
                        <Button variant="outlined">
                            Pelajari Jasakode Innovation
                        </Button>
                    </Stack>

                    <Divider />

                    <Typography variant="body2" color="text.secondary">
                        Proyek ini memanfaatkan teknologi open-source dan dikembangkan dengan
                        prinsip transparansi. Detail teknis dan kode sumber akan tersedia
                        secara publik.
                    </Typography>
                </Stack>
            </Paper>

            {/* Footer kecil */}
            <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                    Bagian dari ekosistem{" "}
                    <Link href="#" underline="hover">
                        Jasakode Innovation
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
