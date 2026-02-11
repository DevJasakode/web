'use client';

import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Paper,
} from '@mui/material';

export default function CookiePolicy() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 10 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h3" fontWeight={600}>
              Cookie Policy
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
                Kebijakan Cookie ini menjelaskan bagaimana website kami
                menggunakan cookie dan teknologi serupa untuk mengenali Anda
                ketika mengunjungi platform kami. Dokumen ini menjelaskan apa
                itu cookie, jenis cookie yang kami gunakan, serta bagaimana Anda
                dapat mengelolanya.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Apa itu Cookie?
              </Typography>
              <Typography variant="body1">
                Cookie adalah file teks kecil yang disimpan di perangkat Anda
                ketika Anda mengunjungi sebuah website. Cookie memungkinkan
                website mengenali perangkat Anda dan mengingat preferensi
                tertentu untuk meningkatkan pengalaman pengguna.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Jenis Cookie yang Kami Gunakan
              </Typography>
              <Typography variant="body1">
                Website ini dapat menggunakan beberapa jenis cookie, termasuk
                cookie yang diperlukan untuk fungsi dasar website, cookie
                analitik untuk memahami bagaimana pengguna berinteraksi dengan
                layanan kami, serta cookie fungsional untuk mengingat preferensi
                pengguna.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Tujuan Penggunaan Cookie
              </Typography>
              <Typography variant="body1">
                Cookie digunakan untuk memastikan website berfungsi dengan baik,
                meningkatkan performa dan keamanan, menganalisis penggunaan
                layanan, serta memberikan pengalaman yang lebih relevan dan
                konsisten bagi pengguna.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Pengelolaan Cookie oleh Pengguna
              </Typography>
              <Typography variant="body1">
                Anda memiliki kendali penuh atas penggunaan cookie. Sebagian
                besar browser web memungkinkan Anda untuk menghapus atau
                menonaktifkan cookie melalui pengaturan browser. Namun, perlu
                diketahui bahwa menonaktifkan cookie tertentu dapat memengaruhi
                fungsi dan pengalaman penggunaan website.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Perubahan atas Kebijakan Cookie
              </Typography>
              <Typography variant="body1">
                Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu
                untuk mencerminkan perubahan teknologi, praktik operasional,
                atau ketentuan hukum yang berlaku. Setiap perubahan akan
                dipublikasikan melalui halaman ini.
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Dengan terus menggunakan website ini, Anda dianggap telah
                membaca dan memahami Kebijakan Cookie ini.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
