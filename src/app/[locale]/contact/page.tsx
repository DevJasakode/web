"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  FormControl,
  Paper,
  alpha,
} from '@mui/material';
import {
  LoadingButton,
} from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import Swal from "sweetalert2"


interface FormError {
  email: boolean;
}


interface Form {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  error: FormError;
};


const initialForm: Form = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  error: { email: false },
};





export default function Contact() {
  const [form, setForm] = useState<Form>(initialForm);
  const [loading, setLoading] = useState<boolean>(false);

  const send = useCallback(() => {
    setLoading(true);

    // Validasi sintaks email (regex = finite automaton)
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
      setForm(pre => ({
        ...pre,
        error: { ...pre.error, email: true },
      }));
      setLoading(false);
      return;
    }

    axios.post("/api/contact/inbox", form, { withCredentials: true })
      .then(res => {
        Swal.fire({
          title: "Message Sent",
          text: res.data?.message ?? "Pesan berhasil dikirim",
          icon: "success",
        });
        setForm(initialForm);
      })
      .catch((err: AxiosError<any>) => {
        const status = err.response?.status;
        const data = err.response?.data;

        // Interpretasi ilmiah status code
        if (status === 429) {
          Swal.fire({
            title: "Rate Limit",
            text: data?.message ?? "Terlalu banyak permintaan",
            icon: "warning",
            footer: `Coba lagi dalam ${data?.retry_after_seconds ?? 60} detik`,
          });
          return;
        }

        Swal.fire({
          title: data?.error ?? "Request Failed",
          text: data?.message ?? "Kesalahan tak terduga",
          icon: "error",
        });
      })
      .finally(() => setLoading(false));
  }, [form]);


  return (
    <Box sx={{ py: { xs: 8, md: 14 } }} component={Paper}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* KIRI */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mt: 1 }}
            >
              Get in Touch
            </Typography>
            {/* <Typography
              variant="overline"
              sx={{ color: 'text.secondary', fontWeight: 600 }}
            >
              PT. Jasa Inovasi Holdings
            </Typography> */}

            <Typography sx={{ mt: 2, color: 'text.secondary', maxWidth: 520 }}>
              We help you automate your workflows, automate repetitive tasks, and
              elevate your business.
            </Typography>

            <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Office */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                    color: 'primary.main',
                  }}
                >
                  <LocationOnIcon />
                </Avatar>
                <Box>
                  <Typography fontWeight={600}>Our office</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Srijaya, Kec. Belitang II, Kabupaten Ogan Komering Ulu Timur,
                    <br />
                    Sumatera Selatan 32383
                  </Typography>
                </Box>
              </Box>

              {/* Contact */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                    color: 'primary.main',
                  }}
                >
                  <PhoneIcon />
                </Avatar>
                <Box>
                  <Typography fontWeight={600}>Get in touch</Typography>
                  <Typography variant="body2" color="text.secondary">
                    +62 851 5900 3374
                    <br />
                    info@jasakode.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* KANAN */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent sx={{ p: 4, width: "100%" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src="/assets/Logo.png"
                    alt="Logo"
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%', // ekuivalen Avatar
                      objectFit: 'cover',
                    }}
                  />
                  <Typography fontWeight={600}>Jasakode</Typography>
                </Box>
                <Box
                  component="form"
                  sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <FormControl fullWidth>
                    <TextField
                      spellCheck={false}
                      label="Name"
                      size='small'
                      required
                      value={form.name}
                      onChange={e => setForm(pre => ({ ...pre, name: e.target.value }))}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      spellCheck={false}
                      label="Company"
                      size='small'
                      value={form.company}
                      onChange={e => setForm(pre => ({ ...pre, company: e.target.value }))}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      label="Email"
                      size="small"
                      type="email"
                      required
                      value={form.email}
                      error={form.error.email}
                      helperText={form.error.email ? "Format email tidak valid" : ""}
                      onChange={(e) =>
                        setForm((pre) => ({ ...pre, error: { ...pre.error, email: false }, email: e.target.value }))
                      }
                    />
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                      spellCheck={false}
                      label="Phone"
                      size='small'
                      required
                      value={form.phone}
                      onChange={e => setForm(pre => ({ ...pre, phone: e.target.value }))}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField
                      spellCheck={false}
                      label="Message"
                      multiline
                      rows={4}
                      fullWidth
                      required
                      value={form.message}
                      onChange={e => setForm(pre => ({ ...pre, message: e.target.value }))}
                    />
                  </FormControl>
                  <LoadingButton
                    size="small"
                    variant="contained"
                    loading={loading}
                    sx={{
                      mt: 1,
                      py: 1.4,
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                    onClick={send}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* FAQ */}
      <Container maxWidth="md" sx={{ mt: 14 }}>
        <Box textAlign="center">
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', fontWeight: 600 }}
          >
            FAQ
          </Typography>
          <Typography variant="h4" fontWeight={800} mt={1}>
            You’ve got questions, we’ve got{' '}
            <Box component="span" color="primary.main">
              answers
            </Box>
          </Typography>
        </Box>

        <Box sx={{ mt: 5 }}>
          {[
            {
              q: 'How can I tell if using AI is the right solution for my problem?',
              a: 'We start with discovery workshop to map goals, constraints, and data readiness.',
            },
            {
              q: 'How long does an AI solution take to implement?',
              a: 'Typical timeline ranges 4–10 weeks depending on scope.',
            },
            {
              q: 'Will we need to make changes in our teams?',
              a: 'We’ll align workflows and provide training so adoption is smooth.',
            },
          ].map((item, i) => (
            <Accordion key={i} elevation={0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={500}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{item.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box >
  )
};
