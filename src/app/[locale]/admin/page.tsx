"use client";
import { SyntheticEvent, useCallback, useState } from "react";
import { WorldMapCard } from "./(dashboard)/components/WorldMapCard";
import { DonutChart } from "./(dashboard)/components/DonutChart"
import { TopUsersChart } from "./(dashboard)/components/TopUsersChart"
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// components
import {
  Box,
  Grid,
  Paper,
  Card,
  Typography,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { KPI } from "./(dashboard)/KPI";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ApprovalOutlinedIcon from '@mui/icons-material/ApprovalOutlined';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";


function ResponsiveGrid() {
  const items = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {items.map((num) => (
          <Grid
            key={num}
            // xs: 12 untuk 1 kolom di mobile
            // sm: 6 untuk 2 kolom di tablet
            // md: 4 untuk 3 kolom di desktop
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "#dde",
              }}
            >
              Item {num}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function AsymmetricGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {/* Kolom 1 - lebih lebar */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <WorldMapCard />
          </Paper>
        </Grid>

        {/* Kolom 2 */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <DonutChart />
          </Paper>
        </Grid>

        {/* Kolom 3 */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <TopUsersChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

type TrendIndicatorProps = {
  label: string;         // contoh: "this week"
  currentValue: number; // nilai sekarang
  value: number;        // nilai pembanding (previous)
};

function TrendIndicator({
  label,
  currentValue,
  value,
}: TrendIndicatorProps) {
  const diff = currentValue - value;

  const isUp = diff > 0;
  const isDown = diff < 0;
  const isSame = diff === 0;

  const diffPercent =
    value !== 0 ? Math.abs((diff / value) * 100).toFixed(1) : "0";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {/* Trend info */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
          width: "fit-content",
          backgroundColor: isUp
            ? "rgba(46, 125, 50, 0.1)"
            : isDown
              ? "rgba(211, 47, 47, 0.1)"
              : "rgba(0, 0, 0, 0.08)",
        }}
      >
        {isUp && (
          <ArrowUpwardIcon
            sx={{ fontSize: 14, color: "success.main" }}
          />
        )}
        {isDown && (
          <ArrowDownwardIcon
            sx={{ fontSize: 14, color: "error.main" }}
          />
        )}

        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            color: isUp
              ? "success.main"
              : isDown
                ? "error.main"
                : "text.secondary",
          }}
        >
          {diffPercent}%
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Box>
  );
};


function ChartDonut() {
  const data = [
    { name: "Solutions", value: 34, fill: "#7604e0" },
    { name: "Innovations", value: 23, fill: "#0d0de0" },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          isAnimationActive
        />

        {/* Center Content */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan
            x="50%"
            dy="-0.3em"
            fontSize="20"
            fontWeight="600"
            fill="#777"
          >
            {total}
          </tspan>
          <tspan
            x="50%"
            dy="1.2em"
            fontSize="16"
            fill="#777"
          >
            Total Plans
          </tspan>
        </text>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default function Dashboard() {
  const [tab, setTab] = useState<number>(1);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };


  const dateNow = useCallback((): string => {
    const date = new Date();

    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  }, []);


  const testAuth = useCallback(() => {
    axios.get("/api/auth", { withCredentials: true }).then(res => console.log(res.data));
  }, []);


  return (
    <Box>
      <Card sx={{ px: 3, py: 2.5, mb: 4 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Typography fontWeight={"bold"} fontSize={"1.4rem"} sx={{ mb: 0.5 }}>Product Improvement</Typography>
            <Typography>Product Improvement helps you indetify products that can be improved Upgrade Now</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "end" }}>
              <Button
                variant="outlined"
                color="info"
                onClick={testAuth}
              >Export</Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="stretch">
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Card sx={{ py: 2, px: 2, height: "100%" }}>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <ChartDonut />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography fontSize={"1.2rem"} >Visitor Growth</Typography>
                    <Typography fontSize={"1.2rem"} fontWeight={"bold"}>12%</Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography fontSize={"0.8rem"}>Arrow Up</Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 5 }} sx={{ color: "#7604e0" }}>Solutions</Grid>
                    <Grid size={{ xs: 7 }}>34 Product</Grid>
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 5 }} sx={{ color: "#0d0de0" }}>Innovations</Grid>
                    <Grid size={{ xs: 7 }}>23 Project</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <Card sx={{ py: 2, px: 2, height: "100%" }}>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Typography fontSize={"1.3rem"}>Total Earning</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "end" }}>
                    {dateNow()}
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="stretch">
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Card sx={{ height: "100%", px: 1.5, py: 1.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography>Income</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: "flex-end",
                        }}
                      >
                        <MonetizationOnOutlinedIcon />
                      </Box>
                    </Box>
                    <Typography fontSize={"1.2rem"} fontWeight={"bold"} sx={{ mb: 1 }}>Rp24.330.000</Typography>
                    <TrendIndicator
                      currentValue={28900}
                      value={28100}
                      label="this week"
                    />
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Card sx={{ height: "100%", px: 1.5, py: 1.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography>Total Order</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: "flex-end",
                        }}
                      >
                        <GradingOutlinedIcon />
                      </Box>
                    </Box>
                    <Typography fontSize={"1.2rem"} fontWeight={"bold"} sx={{ mb: 1 }}>20</Typography>
                    <TrendIndicator
                      currentValue={28900}
                      value={28100}
                      label="this week"
                    />
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Card sx={{ height: "100%", px: 1.5, py: 1.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography>Visitor</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: "flex-end",
                        }}
                      >
                        <OndemandVideoOutlinedIcon />
                      </Box>
                    </Box>
                    <Typography fontSize={"1.2rem"} fontWeight={"bold"} sx={{ mb: 1 }}>20</Typography>
                    <TrendIndicator
                      currentValue={28900}
                      value={28100}
                      label="this week"
                    />
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Card sx={{ height: "100%", px: 1.5, py: 1.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography>Impresion</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: "flex-end",
                        }}
                      >
                        <ApprovalOutlinedIcon />
                      </Box>
                    </Box>
                    <Typography fontSize={"1.2rem"} fontWeight={"bold"} sx={{ mb: 1 }}>20</Typography>
                    <TrendIndicator
                      currentValue={28900}
                      value={28100}
                      label="this week"
                    />
                  </Card>
                </Grid>
              </Grid>

            </Card>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ px: 2, py: 2 }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange} aria-label="Product List Tab">
                <Tab label="Solutions" value={1} />
                <Tab label="Innovations" value={2} />
              </TabList>
            </Box>
            <TabPanel value={1}>Solutions</TabPanel>
            <TabPanel value={2}>Innovations</TabPanel>
          </TabContext>
        </Box>
      </Card>


    </Box>
  )
};
