'use client';

import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Paper,
} from '@mui/material';

export default function RefundPolicyPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 10 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h3" fontWeight={600}>
              Refund & Return Policy
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
                Kebijakan Pengembalian Dana dan Pembatalan ini menjelaskan
                ketentuan, batasan, serta prosedur yang berlaku terkait
                pengembalian dana atas produk atau layanan yang disediakan
                melalui website kami. Dengan melakukan pembelian, Anda dianggap
                telah membaca dan menyetujui kebijakan ini.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Kelayakan Pengembalian Dana
              </Typography>
              <Typography variant="body1">
                Pengembalian dana hanya dapat diajukan apabila memenuhi
                kriteria yang ditetapkan, termasuk namun tidak terbatas pada
                kegagalan layanan yang dapat diverifikasi, kesalahan penagihan,
                atau kondisi lain yang secara eksplisit dinyatakan memenuhi
                syarat refund sesuai dengan ketentuan layanan.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Produk atau Layanan yang Tidak Dapat Dikembalikan
              </Typography>
              <Typography variant="body1">
                Produk digital, layanan yang telah digunakan, langganan yang
                sedang berjalan, atau layanan yang telah diberikan sebagian
                atau seluruhnya umumnya tidak memenuhi syarat untuk
                pengembalian dana, kecuali diwajibkan lain oleh hukum yang
                berlaku.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Batas Waktu Pengajuan Refund
              </Typography>
              <Typography variant="body1">
                Permintaan pengembalian dana harus diajukan dalam jangka waktu
                tertentu sejak tanggal transaksi, sebagaimana ditentukan dalam
                deskripsi produk atau layanan terkait. Permintaan yang diajukan
                setelah melewati batas waktu tersebut dapat ditolak.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Prosedur Pengajuan Refund
              </Typography>
              <Typography variant="body1">
                Untuk mengajukan permintaan pengembalian dana, pengguna wajib
                menghubungi kami melalui kontak resmi yang tercantum di halaman
                Legal Contact Information dengan menyertakan informasi transaksi
                dan alasan permintaan refund yang relevan.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Proses dan Waktu Pengembalian Dana
              </Typography>
              <Typography variant="body1">
                Setiap permintaan refund akan ditinjau terlebih dahulu. Apabila
                disetujui, pengembalian dana akan diproses menggunakan metode
                pembayaran yang sama dengan transaksi awal dalam jangka waktu
                yang wajar, tergantung pada kebijakan penyedia pembayaran.
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                Perubahan atas Kebijakan Refund
              </Typography>
              <Typography variant="body1">
                Kami berhak untuk mengubah atau memperbarui kebijakan refund ini
                dari waktu ke waktu. Perubahan akan berlaku sejak dipublikasikan
                di halaman ini dan tidak berlaku surut terhadap transaksi yang
                telah diselesaikan.
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Kebijakan ini tidak mengurangi hak-hak konsumen sebagaimana
                diatur dalam peraturan perundang-undangan yang berlaku.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
