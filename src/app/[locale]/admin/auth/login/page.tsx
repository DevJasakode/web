"use client";

import { useCallback, useState, Fragment, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useRouter, useParams } from 'next/navigation'
import axios from "axios";
import Swal from "sweetalert2";
import { Locale } from "@/i18n/config";

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
      <g fillRule="evenodd" clipRule="evenodd">
        <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" />
        <path d="M19.1833 45.4716C18.9898 45.2219 18.9898 42.9973 19.1833 38.798C17.1114 38.8696 15.8024 38.7258 15.2563 38.3667C14.437 37.828 13.6169 36.1667 12.8891 34.9959C12.1614 33.8251 10.5463 33.64 9.89405 33.3783C9.24182 33.1165 9.07809 32.0496 11.6913 32.8565C14.3044 33.6634 14.4319 35.8607 15.2563 36.3745C16.0806 36.8883 18.0515 36.6635 18.9448 36.2519C19.8382 35.8403 19.7724 34.3078 19.9317 33.7007C20.1331 33.134 19.4233 33.0083 19.4077 33.0037C18.5355 33.0037 13.9539 32.0073 12.6955 27.5706C11.437 23.134 13.0581 20.2341 13.9229 18.9875C14.4995 18.1564 14.4485 16.3852 13.7699 13.6737C16.2335 13.3589 18.1347 14.1343 19.4734 16.0001C19.4747 16.0108 21.2285 14.9572 24.0003 14.9572C26.772 14.9572 27.7553 15.8154 28.5142 16.0001C29.2731 16.1848 29.88 12.7341 34.5668 13.6737C33.5883 15.5969 32.7689 18.0001 33.3943 18.9875C34.0198 19.9749 36.4745 23.1147 34.9666 27.5706C33.9614 30.5413 31.9853 32.3523 29.0384 33.0037C28.7005 33.1115 28.5315 33.2855 28.5315 33.5255C28.5315 33.8856 28.9884 33.9249 29.6465 35.6117C30.0853 36.7362 30.117 39.948 29.7416 45.247C28.7906 45.4891 28.0508 45.6516 27.5221 45.7347C26.5847 45.882 25.5669 45.9646 24.5669 45.9965C23.5669 46.0284 23.2196 46.0248 21.837 45.8961C20.9154 45.8103 20.0308 45.6688 19.1833 45.4716Z" />
      </g>
    </svg>
  )
};

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <g fill="none" fillRule="evenodd" clipRule="evenodd">
        <path fill="#f44336" d="M7.209 1.061c.725-.081 1.154-.081 1.933 0a6.57 6.57 0 0 1 3.65 1.82a100 100 0 0 0-1.986 1.93q-1.876-1.59-4.188-.734q-1.696.78-2.362 2.528a78 78 0 0 1-2.148-1.658a.26.26 0 0 0-.16-.027q1.683-3.245 5.26-3.86" opacity="0.987" />
        <path fill="#ffc107" d="M1.946 4.92q.085-.013.161.027a78 78 0 0 0 2.148 1.658A7.6 7.6 0 0 0 4.04 7.99q.037.678.215 1.331L2 11.116Q.527 8.038 1.946 4.92" opacity="0.997" />
        <path fill="#448aff" d="M12.685 13.29a26 26 0 0 0-2.202-1.74q1.15-.812 1.396-2.228H8.122V6.713q3.25-.027 6.497.055q.616 3.345-1.423 6.032a7 7 0 0 1-.51.49" opacity="0.999" />
        <path fill="#43a047" d="M4.255 9.322q1.23 3.057 4.51 2.854a3.94 3.94 0 0 0 1.718-.626q1.148.812 2.202 1.74a6.62 6.62 0 0 1-4.027 1.684a6.4 6.4 0 0 1-1.02 0Q3.82 14.524 2 11.116z" opacity="0.993" />
      </g>
    </svg>
  )
}


type LocationResult =
  | { status: "granted"; latitude: number; longitude: number }
  | { status: "denied" }
  | { status: "prompt" }
  | { status: "unsupported" }
  | { status: "error"; message: string };

async function requestLocationPermission(): Promise<LocationResult> {
  // Browser terlalu tua? Kita pamit dengan sopan.
  if (!("geolocation" in navigator)) {
    return { status: "unsupported" };
  }

  try {
    // Cek status permission jika Permissions API tersedia
    if ("permissions" in navigator) {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "denied") {
        return { status: "denied" };
      }

      if (permission.state === "prompt") {
        // lanjut ke getCurrentPosition untuk memicu dialog
      }
    }

    // Meminta lokasi (ini yang memicu dialog izin)
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      }
    );

    return {
      status: "granted",
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error: any) {
    if (error.code === error.PERMISSION_DENIED) {
      return { status: "denied" };
    }

    return {
      status: "error",
      message: error.message ?? "Unknown error",
    };
  }
};

// prompt unsupported error

type LocationPermissionDialogProps = {
  open: boolean;
  onClose: () => void;
};

function LocationPermissionDialog({
  open,
  onClose,
}: LocationPermissionDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Akses Lokasi Diblokir</DialogTitle>


      <DialogContent>
        <Typography gutterBottom>
          Browser Anda saat ini memblokir akses lokasi untuk situs ini.
          Demi keamanan dan privasi, izin lokasi tidak dapat diminta ulang
          secara otomatis.
        </Typography>


        <Typography gutterBottom sx={{ mt: 2 }}>
          Silakan ikuti langkah berikut untuk mengaktifkannya kembali:
        </Typography>


        <Box component="ol" sx={{ pl: 2 }}>
          <li>
            <Typography>
              Klik ikon <strong>🔒 / ℹ️</strong> di sebelah kiri address bar.
            </Typography>
          </li>
          <li>
            <Typography>
              Cari menu <strong>Location / Lokasi</strong>.
            </Typography>
          </li>
          <li>
            <Typography>
              Ubah izin menjadi <strong>Allow / Izinkan</strong>.
            </Typography>
          </li>
          <li>
            <Typography>
              Refresh halaman ini.
            </Typography>
          </li>
        </Box>


        <Box
          sx={{
            mt: 3,
            p: 2,
            border: "1px dashed #ccc",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="caption" display="block" gutterBottom>
            Contoh tampilan pengaturan browser
          </Typography>


          <img
            src="/Screenshot from 2026-01-26 00-23-28.png"
            alt="Contoh pengaturan izin lokasi"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Box>
      </DialogContent>


      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Mengerti
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function getLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation tidak didukung browser'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  })
};


interface Form {
  username: string;
  password: string;
  remember: boolean;
  geo_status: LocationResult["status"];
  geo_error: string;
  show_geo_required_dialog: boolean;
};

const initialForm: Form = {
  username: "",
  password: "",
  remember: false,

  geo_status: "prompt",
  geo_error: "",
  show_geo_required_dialog: false,
};

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Form>(initialForm);
  const { locale } = useParams<{ locale: Locale }>();


  const createSession = useCallback(async () => {
    setLoading(true);
    try {
      const geo = await getLocation();
      const res = await axios.post(
        "/api/auth",
        {
          status: form.geo_status,
          error: form.geo_error,
          accuracy: geo.coords.accuracy,
          latitude: geo.coords.latitude,
          longitude: geo.coords.longitude,
          timestamp: geo.timestamp,
        },
        { withCredentials: true }
      );

      console.log("Create Session success:", res.status, res.statusText, res.data);
    } catch (err: any) {
      if (err.response) {
        // Server merespons status error (misal 500)        
        Swal.fire({
          title: err.response.data?.error || err.response.statusText,
          text: err.response.data?.detail || 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool',
        });

        // console.log("Server error status:", err.response.status);         // 500
        // console.log("Server statusText:", err.response.statusText);       // "tidak dapat di lakukan"
        // console.log("Server response data:", err.response.data);         // { error: "...", detail: "..." }
      } else if (err.request) {
        // Request dikirim tapi tidak ada response
        console.log("No response from server:", err.request);
      } else {
        // Error setup request axios
        console.log("Axios request error:", err.message);
      }
    } finally {
      setLoading(false);
    }

  }, [form, setLoading]);

  const load = useCallback(() => {
    requestLocationPermission().then(async resGeo => {
      const isUserRejection =
        resGeo.status === "denied" ||
        (resGeo.status === "error" && resGeo.message?.toLowerCase().includes("denied"));
      if (isUserRejection) {
        setForm(pre => ({ ...pre, geo_status: resGeo.status, show_geo_required_dialog: true }));
      } else {
        setForm(pre => ({ ...pre, geo_status: resGeo.status, show_geo_required_dialog: false }));
        createSession();
      };
    }).catch(resGoeErr => {
      setForm(pre => ({
        ...pre, geo_status: resGoeErr.status,
        geo_error: resGoeErr.message || "",
        show_geo_required_dialog: false
      }));
    });
  }, [setForm]);


  const send = useCallback(async () => {
    try {
      const res = await axios.patch("/api/auth/login", {
        username: form.username,
        password: form.password,
        remember: form.remember,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.status >= 200 && res.status <= 201) {
        router.replace(`/${locale}/admin`);
      } else {
        Swal.fire({
          title: "Gagal Login",
          text: res.statusText,
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    } catch (err: any) {
      if (err.response) {
        // Server merespons status error (misal 500)        
        Swal.fire({
          title: err.response.data?.error || err.response.statusText,
          text: err.response.data?.detail || 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool',
        });

        // console.log("Server error status:", err.response.status);         // 500
        // console.log("Server statusText:", err.response.statusText);       // "tidak dapat di lakukan"
        // console.log("Server response data:", err.response.data);         // { error: "...", detail: "..." }
      } else if (err.request) {
        // Request dikirim tapi tidak ada response
        console.log("No response from server:", err.request);
      } else {
        // Error setup request axios
        console.log("Axios request error:", err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [form, router]);

  const changeForm = useCallback(<K extends keyof Form>(key: K, value: Form[K]) => {
    setForm(pre => ({ ...pre, [key]: value }));
  }, [setForm]);

  // Hooks
  useEffect(() => {
    load();
  }, [router]);

  return (
    <Fragment>
      <LocationPermissionDialog
        open={form.show_geo_required_dialog}
        onClose={() => setForm(pre => ({ ...pre, show_geo_required_dialog: false }))}
      />
      {
        loading &&
        <Box
          sx={{
            position: "fixed",
            zIndex: 999,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)", // transparan untuk efek blur
            backdropFilter: "blur(8px)", // efek kaca
            WebkitBackdropFilter: "blur(8px)", // untuk Safari
          }}
          onClick={e => e.stopPropagation()}
        >
          <CircularProgress />
        </Box>
      }

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f7fb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: 420,
            p: 4,
            borderRadius: 3
          }}
        >
          <Stack spacing={3}>
            {/* Header */}
            <Box textAlign="center">
              <Typography variant="h5" fontWeight={700}>
                Sign In
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome back! Let's continue with,
              </Typography>
            </Box>

            {/* OAuth buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  borderRadius: 1, textTransform: "none",
                  // ":hover": { bgcolor: "#3a14cc" },
                  "&.Mui-disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto", // ini kuncinya
                    bgcolor: "#4c1dff80",  // opsional: biar terlihat disabled
                    color: "#fff"
                  }
                }}
                disabled={form.geo_status === "denied" || form.geo_status === "prompt"}
              >
                Google
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GithubIcon />}
                sx={{
                  borderRadius: 1,
                  textTransform: "none",
                  // ":hover": { bgcolor: "#3a14cc" },
                  "&.Mui-disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto", // ini kuncinya
                    bgcolor: "#4c1dff80",  // opsional: biar terlihat disabled
                    color: "#fff"
                  }
                }}
                disabled={form.geo_status === "denied" || form.geo_status === "prompt"}
              >
                Github
              </Button>
            </Stack>

            {/* Divider */}
            <Divider>or Signin with</Divider>

            {/* Inputs */}
            <FormControl>
              <TextField
                fullWidth
                size="small"
                placeholder="Your Email"
                type="email"
                value={form.username}
                onChange={e => changeForm("username", e.target.value)}
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto"
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    cursor: "not-allowed"
                  }
                }}
                disabled={form.geo_status === "denied" || form.geo_status === "prompt"}
              />
            </FormControl>

            <FormControl>
              <TextField
                fullWidth
                size="small"
                placeholder="Your Password"
                type="password"
                value={form.password}
                onChange={e => changeForm("password", e.target.value)}
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    cursor: "not-allowed",
                    pointerEvents: "auto"
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    cursor: "not-allowed"
                  }
                }}
                disabled={form.geo_status === "denied" || form.geo_status === "prompt"}
              />
            </FormControl>

            {/* Remember / Forgot */}
            <FormControl>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember me"
                  checked={form.remember}
                  onChange={(e, c) => changeForm("remember", c)}
                />

                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Forgot password?
                </Typography>
              </Box>
            </FormControl>

            {/* Sign In button */}
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{
                borderRadius: 5,
                py: 1.2,
                bgcolor: "#4c1dff",
                ":hover": { bgcolor: "#3a14cc" },

                "&.Mui-disabled": {
                  cursor: "not-allowed",
                  pointerEvents: "auto", // ini kuncinya
                  bgcolor: "#4c1dff80",  // opsional: biar terlihat disabled
                  color: "#fff"
                }
              }}
              onClick={send}
              disabled={form.geo_status === "denied" || form.geo_status === "prompt"}
            >
              Sign In
            </Button>
            {/* Footer */}
            <Typography
              variant="body2"
              textAlign="center"
            >
              Don&apos;t have an account?{" "}
              <Box
                component="span"
                color="primary.main"
                sx={{ cursor: "pointer" }}
              >
                Signup
              </Box>
            </Typography>
          </Stack>
        </Card>
      </Box>
    </Fragment>
  );
};

