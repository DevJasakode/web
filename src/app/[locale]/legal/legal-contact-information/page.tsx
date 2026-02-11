'use client';

import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Paper,
  Grid,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function LegalContactInformationPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 10 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h3" fontWeight={600}>
              Legal Contact Information
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
                Halaman ini menyediakan informasi kontak resmi untuk keperluan
                hukum, privasi data, dan korespondensi formal terkait penggunaan
                website dan layanan kami. Silakan gunakan kontak di bawah ini
                hanya untuk kepentingan yang relevan.
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <BusinessIcon color="primary" />
                    <Typography fontWeight={600}>
                      Entitas Hukum
                    </Typography>
                    <Typography variant="body2">
                      PT Contoh Perusahaan Teknologi
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <LocationOnIcon color="primary" />
                    <Typography fontWeight={600}>
                      Alamat Terdaftar
                    </Typography>
                    <Typography variant="body2">
                      Jl. Contoh Alamat No. 123  
                      <br />
                      Jakarta, Indonesia
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <GavelIcon color="primary" />
                    <Typography fontWeight={600}>
                      Kontak Hukum
                    </Typography>
                    <Typography variant="body2">
                      legal@domainanda.com
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <PrivacyTipIcon color="primary" />
                    <Typography fontWeight={600}>
                      Privasi & Perlindungan Data
                    </Typography>
                    <Typography variant="body2">
                      privacy@domainanda.com
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <EmailIcon color="primary" />
                    <Typography fontWeight={600}>
                      Kontak Umum
                    </Typography>
                    <Typography variant="body2">
                      contact@domainanda.com
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Typography variant="body2" color="text.secondary">
                Kami berupaya merespons setiap permintaan yang sah dan relevan
                dalam waktu yang wajar sesuai dengan ketentuan hukum yang
                berlaku. Permintaan yang tidak berkaitan dengan urusan hukum
                atau privasi data dapat dialihkan atau tidak ditanggapi.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
