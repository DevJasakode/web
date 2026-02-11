'use client';

import {
    Box,
    Container,
    Typography,
    Stack,
    Divider,
    Paper,
} from '@mui/material';

export default function MitraJasakode() {
    return (
        <Box sx={{ bgcolor: 'background.default', py: 10 }}>
            <Container maxWidth="md">
                <Stack spacing={4}>
                    {/* Header */}
                    <Stack spacing={1}>
                        <Typography variant="h3" fontWeight={600}>
                            Program Mitra Jasakode
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
                        <Stack spacing={3}>
                            <Typography variant="body1">
                                Program Mitra Jasakode merupakan skema kerja sama berbasis proyek
                                yang memungkinkan individu profesional, seperti programmer,
                                UI/UX designer, dan spesialis lainnya, untuk berkolaborasi
                                dengan Jasakode dalam penyelesaian pekerjaan tertentu.
                            </Typography>

                            <Typography variant="h6" fontWeight={600}>
                                Status Mitra
                            </Typography>
                            <Typography variant="body1">
                                Mitra bukan merupakan karyawan tetap, karyawan kontrak, maupun
                                tenaga kerja yang berada di bawah hubungan kerja dengan
                                Jasakode. Mitra adalah pihak independen yang bekerja secara
                                mandiri dan tidak terikat oleh jam kerja, target internal, atau
                                struktur organisasi Jasakode.
                            </Typography>

                            <Typography variant="h6" fontWeight={600}>
                                Pola Kerja Sama
                            </Typography>
                            <Typography variant="body1">
                                Kerja sama dilakukan berdasarkan kebutuhan proyek atau tugas
                                tertentu. Mitra hanya akan menerima pekerjaan apabila diminta
                                atau apabila menyatakan kesediaan untuk mengerjakan tugas yang
                                ditawarkan. Tidak terdapat kewajiban bagi Jasakode untuk
                                menyediakan pekerjaan secara berkelanjutan.
                            </Typography>

                            <Typography variant="h6" fontWeight={600}>
                                Sistem Pembayaran
                            </Typography>
                            <Typography variant="body1">
                                Pembayaran kepada mitra dilakukan berdasarkan pekerjaan yang
                                diselesaikan sesuai dengan kesepakatan proyek. Tidak terdapat
                                gaji bulanan, tunjangan, atau manfaat lain sebagaimana berlaku
                                pada hubungan kerja karyawan.
                            </Typography>

                            <Typography variant="h6" fontWeight={600}>
                                Kebebasan Profesional
                            </Typography>
                            <Typography variant="body1">
                                Mitra memiliki kebebasan untuk bekerja dengan klien atau pihak
                                lain di luar Jasakode, sepanjang tidak melanggar perjanjian
                                kerahasiaan atau konflik kepentingan yang disepakati dalam
                                proyek tertentu.
                            </Typography>

                            <Typography variant="h6" fontWeight={600}>
                                Tidak Ada Hubungan Kerja
                            </Typography>
                            <Typography variant="body1">
                                Tidak ada ketentuan dalam Program Mitra ini yang dapat
                                ditafsirkan sebagai pembentukan hubungan kerja, hubungan
                                ketenagakerjaan, atau kemitraan usaha dalam arti hukum
                                ketenagakerjaan antara Jasakode dan mitra.
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Ketentuan lebih lanjut mengenai hak dan kewajiban mitra akan
                                diatur dalam perjanjian kerja sama atau perjanjian proyek
                                terpisah yang disepakati secara individual.
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}
