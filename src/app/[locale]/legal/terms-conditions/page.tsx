'use client';

import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Paper,
} from '@mui/material';

export default function TermsConditionsPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 10 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h3" fontWeight={600}>
              Terms & Conditions
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
                Syarat dan Ketentuan ini mengatur akses dan penggunaan website
                serta layanan yang disediakan oleh kami. Dengan mengakses atau
                menggunakan website ini, Anda dianggap telah membaca,
                memahami, dan menyetujui seluruh ketentuan yang tercantum dalam
                dokumen ini.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Definisi
              </Typography>
              <Typography variant="body1">
                “Kami”, “Perusahaan”, atau “Layanan” merujuk pada entitas hukum
                yang mengoperasikan website ini. “Pengguna” merujuk pada setiap
                individu atau pihak yang mengakses atau menggunakan layanan
                kami.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Penggunaan Layanan
              </Typography>
              <Typography variant="body1">
                Pengguna setuju untuk menggunakan website dan layanan ini hanya
                untuk tujuan yang sah dan sesuai dengan hukum yang berlaku.
                Dilarang menggunakan layanan untuk aktivitas yang melanggar
                hukum, merugikan pihak lain, atau mengganggu operasional sistem
                kami.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Hak Kekayaan Intelektual
              </Typography>
              <Typography variant="body1">
                Seluruh konten, merek dagang, logo, dan materi lain yang tersedia
                di website ini merupakan milik Perusahaan atau pemberi
                lisensinya dan dilindungi oleh hukum hak cipta serta kekayaan
                intelektual yang berlaku.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Pembatasan Tanggung Jawab
              </Typography>
              <Typography variant="body1">
                Kami tidak bertanggung jawab atas kerugian langsung maupun tidak
                langsung yang timbul akibat penggunaan atau ketidakmampuan
                penggunaan website dan layanan ini, sejauh diizinkan oleh
                hukum yang berlaku.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Penghentian Akses
              </Typography>
              <Typography variant="body1">
                Kami berhak untuk menangguhkan atau menghentikan akses pengguna
                ke layanan kami kapan saja, dengan atau tanpa pemberitahuan,
                apabila ditemukan pelanggaran terhadap Syarat dan Ketentuan
                ini.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Tautan ke Pihak Ketiga
              </Typography>
              <Typography variant="body1">
                Website ini dapat memuat tautan ke website pihak ketiga. Kami
                tidak bertanggung jawab atas konten, kebijakan, atau praktik
                website pihak ketiga tersebut.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Perubahan Syarat dan Ketentuan
              </Typography>
              <Typography variant="body1">
                Kami berhak untuk memperbarui Syarat dan Ketentuan ini dari waktu
                ke waktu. Perubahan akan berlaku sejak dipublikasikan di halaman
                ini. Penggunaan layanan secara berkelanjutan dianggap sebagai
                persetujuan atas perubahan tersebut.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Hukum yang Berlaku
              </Typography>
              <Typography variant="body1">
                Syarat dan Ketentuan ini diatur dan ditafsirkan berdasarkan hukum
                yang berlaku di wilayah hukum Republik Indonesia, tanpa
                memperhatikan pertentangan ketentuan hukum.
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Apabila Anda tidak menyetujui sebagian atau seluruh ketentuan
                dalam dokumen ini, mohon untuk tidak melanjutkan penggunaan
                website dan layanan kami.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
