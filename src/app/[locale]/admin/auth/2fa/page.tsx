"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

const CODE_LENGTH = 6;

export default function TwoFA() {
  const [code, setCode] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const addDigit = (digit: number) => {
    if (code.length >= CODE_LENGTH) return;
    setCode((prev) => prev + digit);
  };

  const removeDigit = () => {
    setCode((prev) => prev.slice(0, -1));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 380,
          p: isMobile ? 2 : 3,
          borderRadius: 2,
        }}
      >
        {/* ================= Header ================= */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h6" fontWeight={600}>
            Verifikasi 2 Langkah
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Masukkan kode 6 digit dari aplikasi autentikator Anda
          </Typography>
        </Box>

        {/* ================= Code Display ================= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mb: 3,
          }}
        >
          {Array.from({ length: CODE_LENGTH }).map((_, index) => {
            const isActive = index === code.length;

            return (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  height: isMobile ? 48 : 56,
                  borderRadius: 1.5,
                  border: `2px solid ${
                    isActive
                      ? theme.palette.primary.main
                      : theme.palette.divider
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 600,
                  bgcolor: theme.palette.background.paper,
                  transition: "border-color 0.2s",
                }}
              >
                {code[index] ?? ""}
              </Box>
            );
          })}
        </Box>

        {/* ================= Keypad ================= */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1.5,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outlined"
              onClick={() => addDigit(num)}
              sx={{
                height: isMobile ? 48 : 56,
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {num}
            </Button>
          ))}

          {/* Spacer */}
          <Box />

          {/* Zero */}
          <Button
            variant="outlined"
            onClick={() => addDigit(0)}
            sx={{
              height: isMobile ? 48 : 56,
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            0
          </Button>

          {/* Delete */}
          <Button
            variant="outlined"
            onClick={removeDigit}
            sx={{
              height: isMobile ? 48 : 56,
            }}
          >
            <BackspaceIcon />
          </Button>
        </Box>

        {/* ================= Footer Info ================= */}
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 3, display: "block" }}
        >
          Kode akan berubah setiap 30 detik.  
          Pastikan waktu perangkat Anda sesuai.
        </Typography>
      </Paper>
    </Box>
  );
};
