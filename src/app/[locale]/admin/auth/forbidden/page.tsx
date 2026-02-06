"use client";

import {
  Box,
  Button,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Forbidden() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 480,
          width: "100%",
          p: isMobile ? 3 : 4,
          borderRadius: 2,
        }}
      >
        {/* ================= Icon ================= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <BlockIcon
            sx={{
              fontSize: 56,
              color: theme.palette.error.main,
            }}
          />
        </Box>

        {/* ================= Title ================= */}
        <Typography
          variant="h5"
          fontWeight={600}
          textAlign="center"
          gutterBottom
        >
          403 – Akses Terlarang
        </Typography>

        {/* ================= Description ================= */}
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 2 }}
        >
          Anda tidak memiliki izin untuk mengakses halaman ini.
          Sistem menolak permintaan demi menjaga keamanan data.
        </Typography>

        {/* ================= Detail Info ================= */}
        <Box
          sx={{
            bgcolor: theme.palette.action.hover,
            borderRadius: 1.5,
            p: 2,
            mb: 3,
          }}
        >
          <Typography variant="body2" gutterBottom>
            Kemungkinan penyebab:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Akun Anda tidak memiliki hak akses yang diperlukan  
            <br />
            • Sesi login sudah kedaluwarsa  
            <br />
            • Anda mencoba mengakses area administratif  
            <br />
            • URL yang diakses tidak sesuai dengan peran Anda
          </Typography>
        </Box>

        {/* ================= Actions ================= */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            fullWidth
            onClick={() => {
              // dummy action
              // contoh: router.back()
            }}
          >
            Kembali
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              // dummy action
              // contoh: redirect ke halaman login
            }}
          >
            Login Ulang
          </Button>
        </Box>

        {/* ================= Footer Note ================= */}
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 3, display: "block" }}
        >
          Jika Anda yakin ini adalah kesalahan, silakan hubungi administrator.
        </Typography>
      </Paper>
    </Box>
  );
};
