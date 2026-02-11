'use client';

import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Paper,
} from '@mui/material';

export default function PrivacyPolicyPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 10 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h3" fontWeight={600}>
              Privacy Policy
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
                Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
                menggunakan, menyimpan, dan melindungi data pribadi pengguna
                ketika Anda mengakses dan menggunakan website serta layanan
                kami. Kami berkomitmen untuk menjaga privasi dan keamanan data
                sesuai dengan ketentuan hukum yang berlaku.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Informasi yang Kami Kumpulkan
              </Typography>
              <Typography variant="body1">
                Kami dapat mengumpulkan informasi pribadi yang Anda berikan
                secara langsung, seperti nama, alamat email, dan informasi
                kontak lainnya. Selain itu, kami juga dapat mengumpulkan
                informasi secara otomatis, termasuk alamat IP, jenis perangkat,
                jenis browser, serta data penggunaan melalui cookie dan
                teknologi serupa.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Penggunaan Informasi
              </Typography>
              <Typography variant="body1">
                Informasi yang kami kumpulkan digunakan untuk menyediakan,
                mengelola, dan meningkatkan layanan kami, berkomunikasi dengan
                pengguna, memproses permintaan, menganalisis penggunaan
                layanan, serta memenuhi kewajiban hukum dan regulasi.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Pembagian Informasi kepada Pihak Ketiga
              </Typography>
              <Typography variant="body1">
                Kami tidak menjual data pribadi pengguna. Namun, kami dapat
                membagikan informasi kepada pihak ketiga terpercaya yang
                membantu operasional layanan kami, seperti penyedia analitik,
                infrastruktur teknologi, atau mitra pembayaran, sepanjang
                sesuai dengan Kebijakan Privasi ini dan ketentuan hukum yang
                berlaku.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Keamanan Data
              </Typography>
              <Typography variant="body1">
                Kami menerapkan langkah-langkah keamanan teknis dan
                organisatoris yang wajar untuk melindungi data pribadi dari
                akses tidak sah, kehilangan, penyalahgunaan, atau pengungkapan
                yang tidak diizinkan. Namun, perlu diketahui bahwa tidak ada
                sistem keamanan yang sepenuhnya bebas risiko.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Hak Pengguna
              </Typography>
              <Typography variant="body1">
                Pengguna memiliki hak untuk mengakses, memperbarui, memperbaiki,
                atau meminta penghapusan data pribadi mereka sesuai dengan
                ketentuan hukum yang berlaku. Permintaan terkait hak ini dapat
                diajukan melalui kontak resmi yang tercantum di halaman Legal
                Contact Information.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Penyimpanan Data
              </Typography>
              <Typography variant="body1">
                Data pribadi akan disimpan selama diperlukan untuk memenuhi
                tujuan pengumpulan data atau sebagaimana diwajibkan oleh hukum
                yang berlaku. Setelah itu, data akan dihapus atau dianonimkan
                secara aman.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Perubahan atas Kebijakan Privasi
              </Typography>
              <Typography variant="body1">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu
                untuk mencerminkan perubahan praktik, teknologi, atau
                persyaratan hukum. Setiap perubahan akan dipublikasikan melalui
                halaman ini dengan tanggal pembaruan terbaru.
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Dengan menggunakan website dan layanan kami, Anda dianggap telah
                membaca, memahami, dan menyetujui Kebijakan Privasi ini.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
