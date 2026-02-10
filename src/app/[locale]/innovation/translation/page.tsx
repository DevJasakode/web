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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SmartLink } from "@/components/link";


function AboutProject() {
    return (
        <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Stack spacing={3}>
                <Typography variant="h6" fontWeight={700}>
                    Tentang Proyek Ini
                </Typography>

                {/* DESKRIPSI UMUM */}
                <Typography color="text.secondary">
                    Jasakode Translation adalah proyek eksperimen terbuka yang mengeksplorasi
                    pemanfaatan teknologi penerjemahan berbasis open-source secara etis,
                    transparan, dan berkelanjutan. Proyek ini berfokus pada kualitas terjemahan,
                    keterbukaan arsitektur sistem, serta aksesibilitas teknologi bahasa bagi
                    komunitas pengembang dan non-teknis.
                </Typography>

                <Typography color="text.secondary">
                    Alih-alih bersaing dengan layanan komersial berskala besar, proyek ini
                    bertujuan menjadi ruang belajar bersama: tempat teknologi bahasa dapat
                    dipelajari, diuji, dan dikembangkan secara kolaboratif.
                </Typography>

                <Divider />

                {/* TEKNOLOGI */}
                <Stack spacing={1}>
                    <Typography fontWeight={600}>
                        Teknologi yang Digunakan
                    </Typography>

                    <Typography color="text.secondary">
                        Proyek ini memanfaatkan dan mengintegrasikan berbagai teknologi open-source,
                        antara lain:
                    </Typography>

                    <Typography color="text.secondary">
                        • <b>Argos Translate</b> – mesin penerjemahan neural open-source berbasis
                        Marian NMT, digunakan sebagai inti sistem terjemahan offline.<br />
                        • <b>LibreTranslate</b> – API penerjemahan open-source untuk kebutuhan
                        integrasi layanan dan eksperimen deployment.<br />
                        • <b>Node.js & TypeScript</b> – backend dan tooling utama.<br />
                        • <b>React & MUI</b> – antarmuka pengguna.<br />
                        • <b>Docker</b> – untuk replikasi lingkungan dan deployment yang konsisten.
                    </Typography>
                </Stack>

                <Divider />

                {/* REPOSITORI & DEMO */}
                <Stack spacing={1}>
                    <Typography fontWeight={600}>
                        Repositori & Demo
                    </Typography>

                    <Typography color="text.secondary">
                        Seluruh pengembangan dilakukan secara terbuka dan dapat diakses publik:
                    </Typography>

                    <Typography color="text.secondary">
                        • GitHub (Core Engine): https://github.com/jasakode/translation-core<br />
                        • GitHub (Web Interface): https://github.com/jasakode/translation-web<br />
                        • Demo Publik: https://translate.jasakode.dev
                    </Typography>

                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        Catatan: URL di atas masih bersifat dummy dan akan diperbarui setelah rilis
                        stabil.
                    </Typography>
                </Stack>

                <Divider />

                {/* TIM & TANGGUNG JAWAB */}
                <Stack spacing={1}>
                    <Typography fontWeight={600}>
                        Tim & Penanggung Jawab
                    </Typography>

                    <Typography color="text.secondary">
                        • Penanggung Jawab Proyek: <b>Ahmad Fauzan</b><br />
                        • Arsitek Teknologi: <b>Rina Mahardika</b><br />
                        • Koordinator Komunitas: <b>Dimas Prakoso</b><br />
                        • Penanggung Jawab Keuangan: <b>Siti Lestari</b>
                    </Typography>

                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        Seluruh peran di atas bersifat terbuka dan dapat berubah seiring
                        pertumbuhan proyek.
                    </Typography>
                </Stack>

                <Divider />

                {/* SUMBER & PENGELOLAAN DANA */}
                <Stack spacing={1}>
                    <Typography fontWeight={600}>
                        Sumber & Pengelolaan Dana
                    </Typography>

                    <Typography color="text.secondary">
                        Pendanaan proyek ini berasal dari:
                    </Typography>

                    <Typography color="text.secondary">
                        • Donasi individu dari komunitas<br />
                        • Sponsor kecil non-korporasi<br />
                        • Dukungan internal Jasakode Innovation
                    </Typography>

                    <Typography color="text.secondary">
                        Dana digunakan untuk:
                        • Infrastruktur server dan deployment<br />
                        • Pengembangan fitur dan riset teknis<br />
                        • Dokumentasi dan edukasi komunitas
                    </Typography>
                </Stack>

                <Divider />

                {/* TRANSPARANSI */}
                <Stack spacing={1}>
                    <Typography fontWeight={600}>
                        Transparansi & Akuntabilitas
                    </Typography>

                    <Typography color="text.secondary">
                        Proyek ini berkomitmen pada transparansi penuh. Ringkasan penggunaan dana,
                        roadmap pengembangan, serta keputusan teknis utama akan dipublikasikan
                        secara berkala melalui halaman alokasi dana dan repositori GitHub.
                    </Typography>
                </Stack>
            </Stack>
        </Paper>
    )
};

function HeroSection() {
    return (
        <Box
            sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
            }}
        >
            <Stack spacing={3}>
                {/* Title Row */}
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* LOGO */}
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            flexShrink: 0,
                        }}
                    >
                        <img
                            src="/assets/image/translation-logo.png"
                            alt="Jasakode Translate"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="h3" fontWeight={800} lineHeight={1.1}>
                            Jasakode Translate
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ opacity: 0.7, mt: 0.5 }}
                        >
                            Open-source language technology experiment
                        </Typography>
                    </Box>
                </Stack>

                {/* Description */}
                <Typography color="text.secondary" maxWidth={760}>
                    Jasakode Translate adalah bagian dari inisiatif{" "}
                    <b>Jasakode Innovation</b> — ruang eksplorasi teknologi terbuka
                    yang berfokus pada eksperimen, pembelajaran, dan solusi berbasis
                    open-source.
                </Typography>

                <Divider />
            </Stack>
        </Box>
    )
};

function DemoSection() {
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
    )
};

export default function LibreTranslate() {

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
                gap: 2,
            }}
        >
            {/* Header Proyek */}
            <HeroSection />

            {/* Tentang Proyek */}
            <AboutProject />

            {/* Demo Translator */}
            <DemoSection />

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
};
