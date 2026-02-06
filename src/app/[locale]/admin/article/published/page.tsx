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

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

/**
 * Tipe data artikel terpublikasi
 */
type PublishedArticle = {
  id: string;
  title: string;
  status: "published";
  author: string;
  publishedAt: string;
  views: number;
};

/**
 * Dummy data artikel published
 */
const dummyPublishedArticles: PublishedArticle[] = [
  {
    id: "1",
    title: "Why Writing Systems Shape Thinking",
    status: "published",
    author: "Admin",
    publishedAt: "2025-01-05",
    views: 1240,
  },
  {
    id: "2",
    title: "Calm UI Is a Competitive Advantage",
    status: "published",
    author: "Editor",
    publishedAt: "2025-01-12",
    views: 860,
  },
];

/**
 * Halaman Published Articles
 */
export default function ArticlePublished() {
  const [search, setSearch] = React.useState("");

  /**
   * Filter artikel berdasarkan judul
   */
  const filteredArticles = dummyPublishedArticles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Published Articles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Articles that are live and visible to readers
        </Typography>
      </Stack>

      {/* ===== Search ===== */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            size="small"
            placeholder="Search published articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* ===== Published Table ===== */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Views</TableCell>
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
                  <Chip size="small" label="published" color="success" />
                </TableCell>

                <TableCell>{article.author}</TableCell>
                <TableCell>{article.publishedAt}</TableCell>
                <TableCell>{article.views.toLocaleString()}</TableCell>

                <TableCell align="right">
                  {/* Published fokus ke monitoring & update */}
                  <IconButton size="small">
                    <VisibilityOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <BarChartOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* Empty State */}
            {filteredArticles.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography
                    align="center"
                    color="text.secondary"
                    fontSize={14}
                  >
                    No published articles found
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