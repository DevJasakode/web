"use client";

import * as React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
} from "@mui/material";
import GTranslateIcon from "@mui/icons-material/GTranslate";

export default function LibreTranslate() {
    const [sourceText, setSourceText] = React.useState("");
    const [translatedText, setTranslatedText] = React.useState("");

    const handleTranslate = () => {
        // dummy translate
        setTranslatedText(
            sourceText
                ? "Ini adalah hasil terjemahan (dummy). Nanti bisa dihubungkan ke API LibreTranslate."
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
            {/* Hero */}
            <Stack spacing={2} textAlign="center">
                <Box display="flex" justifyContent="center">
                    <GTranslateIcon sx={{ fontSize: 48 }} />
                </Box>

                <Typography variant="h3" fontWeight={800}>
                    Jasakode Translate
                </Typography>

                <Typography color="text.secondary" maxWidth={600} mx="auto">
                    Layanan penerjemahan teks berbasis teknologi open-source.
                    Cepat, transparan, dan siap digunakan untuk kebutuhan profesional.
                </Typography>
            </Stack>

            {/* Translator */}
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <Stack spacing={3}>
                    <Typography variant="h6" fontWeight={600}>
                        Terjemahkan Teks
                    </Typography>

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <TextField
                            label="Teks Asal"
                            placeholder="Masukkan teks yang ingin diterjemahkan"
                            multiline
                            rows={6}
                            fullWidth
                            value={sourceText}
                            onChange={(e) => setSourceText(e.target.value)}
                        />

                        <TextField
                            label="Hasil Terjemahan"
                            placeholder="Hasil terjemahan akan muncul di sini"
                            multiline
                            rows={6}
                            fullWidth
                            value={translatedText}
                            InputProps={{ readOnly: true }}
                        />
                    </Stack>

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleTranslate}
                        >
                            Terjemahkan
                        </Button>
                    </Box>
                </Stack>
            </Paper>

            {/* Value Proposition */}
            <Stack spacing={2} textAlign="center">
                <Typography variant="h5" fontWeight={700}>
                    Kenapa Jasakode Translate?
                </Typography>

                <Typography color="text.secondary" maxWidth={700} mx="auto">
                    Dibangun di atas teknologi open-source, Jasakode Translate memberikan
                    fleksibilitas, transparansi, dan kontrol penuh untuk kebutuhan
                    penerjemahan personal maupun bisnis.
                </Typography>
            </Stack>
        </Box>
    );
}
