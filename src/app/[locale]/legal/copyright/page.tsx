'use client';

import {
    Box,
    Container,
    Typography,
    Stack,
    Divider,
    Paper,
} from '@mui/material';

export default function CopyrightPage() {
    return (
        <Box sx={{ bgcolor: 'background.default', py: 10 }}>
            <Container maxWidth="lg">
                <Stack spacing={4}>
                    {/* Header */}
                    <Stack spacing={1}>
                        <Typography variant="h3" fontWeight={600}>
                            Copyright Notice
                        </Typography>
                        <Typography color="text.secondary">
                            Terakhir diperbarui: 1 Januari 2026
                        </Typography>
                    </Stack>

                    <Divider />

                    {/* Content */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Stack spacing={4}>
                            <Typography variant="body1">
                                Seluruh konten yang tersedia di website ini, termasuk namun tidak
                                terbatas pada teks, grafik, logo, ikon, gambar, audio, video,
                                perangkat lunak, serta desain visual, merupakan milik
                                eksklusif Perusahaan atau pemberi lisensinya dan dilindungi oleh
                                undang-undang hak cipta yang berlaku.
                            </Typography>

                            <Typography variant="h6" fontWeight={600}>
                                Hak Kepemilikan
                            </Typography>
                            <Typography variant="body1">
                                Hak cipta atas seluruh materi di website ini dimiliki oleh
                                Perusahaan, kecuali dinyatakan lain secara eksplisit. Semua hak
                                yang tidak secara tegas diberikan kepada pengguna tetap menjadi
                                milik Perusahaan.
                            </Typography>

                            <Typography variant="h6" fontWeight={600}>
                                Penggunaan yang Diperbolehkan
                            </Typography>
                            <Typography variant="body1">
                                Pengguna diperbolehkan untuk mengakses dan menggunakan konten
                                website ini hanya untuk keperluan pribadi dan non-komersial,
                                sepanjang tidak melanggar ketentuan hukum yang berlaku dan tidak
                                menghapus pemberitahuan hak cipta atau kepemilikan lainnya.
                            </Typography>

                            <Typography variant="h6" fontWeight={600}>
                                Penggunaan yang Dilarang
                            </Typography>
                            <Typography variant="body1">
                                Dilarang keras menyalin, mereproduksi, memodifikasi,
                                mendistribusikan, mempublikasikan ulang, mentransmisikan, atau
                                mengeksploitasi sebagian atau seluruh konten website ini untuk
                                tujuan komersial tanpa izin tertulis sebelumnya dari Perusahaan.
                            </Typography>

                            <Typography variant="h6" fontWeight={600}>
                                Pelanggaran Hak Cipta
                            </Typography>
                            <Typography variant="body1">
                                Apabila Anda meyakini bahwa konten di website ini melanggar hak
                                cipta Anda, silakan menghubungi kami melalui informasi kontak
                                resmi dengan menyertakan bukti kepemilikan hak cipta dan
                                penjelasan yang relevan.
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                © {new Date().getFullYear()} Perusahaan Anda. Seluruh hak cipta
                                dilindungi undang-undang.
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};
