'use client';

import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Paper,
} from '@mui/material';

export default function DisclaimerPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 10 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h3" fontWeight={600}>
              Disclaimer
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
                Informasi yang disediakan di website ini disajikan semata-mata
                untuk tujuan informasi umum. Meskipun kami berupaya menjaga
                akurasi dan keterkinian informasi, kami tidak memberikan
                pernyataan atau jaminan apa pun, baik tersurat maupun tersirat,
                mengenai kelengkapan, keakuratan, keandalan, atau ketersediaan
                informasi yang terdapat di website ini.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Tidak Ada Nasihat Profesional
              </Typography>
              <Typography variant="body1">
                Konten yang tersedia di website ini tidak dimaksudkan sebagai
                pengganti nasihat profesional, termasuk namun tidak terbatas
                pada nasihat hukum, keuangan, medis, atau teknis. Pengguna
                disarankan untuk berkonsultasi dengan profesional yang
                kompeten sebelum mengambil keputusan berdasarkan informasi
                yang diperoleh dari website ini.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Batasan Tanggung Jawab
              </Typography>
              <Typography variant="body1">
                Dalam keadaan apa pun, kami tidak bertanggung jawab atas
                kerugian atau kerusakan apa pun, termasuk namun tidak terbatas
                pada kerugian tidak langsung atau konsekuensial, yang timbul
                dari penggunaan atau ketergantungan pada informasi yang
                disediakan melalui website ini.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Tautan ke Pihak Ketiga
              </Typography>
              <Typography variant="body1">
                Website ini dapat memuat tautan ke website pihak ketiga yang
                tidak berada di bawah kendali kami. Kami tidak memiliki
                kendali atas isi, kebijakan, atau praktik website pihak ketiga
                tersebut dan tidak bertanggung jawab atas kerugian yang mungkin
                timbul dari penggunaan tautan tersebut.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Perubahan Informasi
              </Typography>
              <Typography variant="body1">
                Kami berhak untuk mengubah, memperbarui, atau menghapus konten
                website ini kapan saja tanpa pemberitahuan sebelumnya.
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Dengan menggunakan website ini, Anda dianggap telah membaca,
                memahami, dan menyetujui Disclaimer ini.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
