"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Button
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CommitmentFeeExplanation } from "./CommitmentFeeExplanation";

type Solution = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  domains: string[];
};

const solutionsData: Solution[] = [
  {
    id: "s1",
    title: "Scalable Backend Infrastructure",
    problem:
      "Aplikasi tumbuh cepat, tetapi backend tidak siap menangani lonjakan trafik dan kompleksitas.",
    solution:
      "Arsitektur backend modular dengan pendekatan domain-driven design, event-driven communication, dan skalabilitas horizontal.",
    domains: ["Backend", "Scalability", "Architecture"]
  },
  {
    id: "s2",
    title: "Real-time Data Synchronization",
    problem:
      "Data terdistribusi di banyak layanan dan sering tidak sinkron.",
    solution:
      "Mekanisme sinkronisasi real-time menggunakan WebSocket, message broker, dan konsistensi eventual yang terkontrol.",
    domains: ["Realtime", "Distributed System"]
  },
  {
    id: "s3",
    title: "Secure Digital Platform",
    problem:
      "Risiko keamanan meningkat seiring bertambahnya pengguna dan integrasi.",
    solution:
      "Pendekatan security-by-design dengan isolasi layanan, audit log, dan kontrol akses berlapis.",
    domains: ["Security", "Platform"]
  },
  {
    id: "s4",
    title: "Developer Productivity System",
    problem:
      "Tim developer melambat karena tooling tidak konsisten dan workflow berantakan.",
    solution:
      "Standarisasi tooling, otomatisasi pipeline, dan sistem dokumentasi yang hidup bersama kode.",
    domains: ["Developer Experience", "Automation"]
  }
];

export default function Solutions() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Hero */}
        <Box textAlign="center" mb={10}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ letterSpacing: 2 }}
          >
            Solutions
          </Typography>

          <Typography
            variant="h2"
            sx={{ fontWeight: 700, mt: 2 }}
          >
            Systems That
            <Box component="span" color="primary.main">
              {" "}
              Solve Real Problems
            </Box>
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 760,
              mx: "auto",
              mt: 3,
              fontSize: "1.05rem"
            }}
          >
            Setiap solusi dirancang sebagai sistem yang dapat bertahan,
            berkembang, dan beradaptasi — bukan sekadar fitur jangka pendek.
          </Typography>
        </Box>

        {/* Solutions List */}
        <Grid container spacing={4}>
          {solutionsData.map(solution => (
            <Grid size={{ xs: 12, md: 6 }} key={solution.id}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                  transition: "all .25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme =>
                      `0 12px 32px ${theme.palette.action.hover}`
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 600 }}
                    >
                      {solution.title}
                    </Typography>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Problem
                      </Typography>
                      <Typography>
                        {solution.problem}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Approach
                      </Typography>
                      <Typography>
                        {solution.solution}
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                    >
                      {solution.domains.map(domain => (
                        <Chip
                          key={domain}
                          label={domain}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>

                    <Box>
                      <Button
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          textTransform: "none",
                          px: 0
                        }}
                      >
                        View details
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <CommitmentFeeExplanation />
      </Container>
    </Box>
  );
};
