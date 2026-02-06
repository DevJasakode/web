"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

/**
 * Tipe data artikel terjadwal
 */
type ScheduledArticle = {
  id: string;
  title: string;
  status: "scheduled";
  author: string;
  publishAt: string;
};

/**
 * Dummy data artikel terjadwal
 */
const dummyScheduledArticles: ScheduledArticle[] = [
  {
    id: "1",
    title: "How Scheduling Content Changes Editorial Discipline",
    status: "scheduled",
    author: "Admin",
    publishAt: "2025-02-01 09:00",
  },
  {
    id: "2",
    title: "Why Calm Interfaces Make Better Writers",
    status: "scheduled",
    author: "Editor",
    publishAt: "2025-02-05 13:30",
  },
];

/**
 * Halaman Scheduled Articles
 */
export default function ArticleScheduled() {
  const [search, setSearch] = React.useState("");

  /**
   * Filter artikel berdasarkan judul
   */
  const filteredArticles = dummyScheduledArticles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Scheduled Articles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Articles that are ready and scheduled for publication
        </Typography>
      </Stack>

      {/* ===== Search ===== */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            size="small"
            placeholder="Search scheduled articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* ===== Scheduled Table ===== */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Publish At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id} hover>
                <TableCell>
                  <Typography fontSize={14} fontWeight={500}>
                    {article.title}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    icon={<ScheduleOutlinedIcon fontSize="small" />}
                    label="scheduled"
                    color="warning"
                  />
                </TableCell>

                <TableCell>{article.author}</TableCell>
                <TableCell>{article.publishAt}</TableCell>

                <TableCell align="right">
                  {/* Scheduled bisa diedit atau dibatalkan */}
                  <IconButton size="small">
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* Empty State */}
            {filteredArticles.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography
                    align="center"
                    color="text.secondary"
                    fontSize={14}
                  >
                    No scheduled articles found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}