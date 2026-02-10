'use client';

import * as React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Divider,
} from '@mui/material';

export const CommitmentFeeExplanation: React.FC = () => {
    return (
        <Card elevation={3}>
            <CardContent>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            Apa itu Harga Komitmen / Kontrak Awal
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Harga komitmen adalah biaya awal yang dibayarkan sebelum proses
                            pengembangan dimulai. Biaya ini bukan sekadar uang muka, tetapi
                            bentuk kesepakatan awal agar proses perencanaan dan pengembangan
                            dapat dilakukan secara serius dan terstruktur.
                        </Typography>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Kenapa Harga Komitmen Diperlukan
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Dalam pengembangan platform, ruang lingkup proyek sering kali
                            belum sepenuhnya jelas di awal. Harga komitmen memungkinkan kami
                            melakukan analisis kebutuhan, menyusun arsitektur awal, dan
                            membangun fondasi teknis tanpa mengunci harga final terlalu dini.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mt={1}>
                            Dengan pendekatan ini, kedua pihak mendapatkan kejelasan: klien
                            memahami arah produk yang akan dibangun, dan pengembang dapat
                            memberikan estimasi lanjutan yang lebih akurat dan realistis.
                        </Typography>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Gambaran Harga Komitmen
                        </Typography>

                        <Stack spacing={2}>
                            <Box>
                                <Typography fontWeight={500}>
                                    Proyek Kecil
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Website sederhana, landing page, atau company profile.
                                    <br />
                                    Kisaran harga komitmen: Rp2.500.000 – Rp5.000.000
                                </Typography>
                            </Box>

                            <Box>
                                <Typography fontWeight={500}>
                                    Proyek Menengah
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Website dinamis, sistem dengan login, admin panel, atau fitur
                                    interaktif.
                                    <br />
                                    Kisaran harga komitmen: Rp7.500.000 – Rp15.000.000
                                </Typography>
                            </Box>

                            <Box>
                                <Typography fontWeight={500}>
                                    Proyek Besar / Platform
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Platform custom, MVP startup, marketplace, atau sistem dengan
                                    kompleksitas tinggi.
                                    <br />
                                    Kisaran harga komitmen: Rp20.000.000 – Rp50.000.000
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Harga komitmen mencakup fase awal pengembangan. Estimasi biaya
                            lanjutan akan ditentukan setelah fase ini selesai dan ruang lingkup
                            proyek disepakati bersama.
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};
