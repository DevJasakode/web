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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

/**
 * Tipe data artikel
 * Nantinya bisa langsung disesuaikan dengan response API
 */
type Article = {
  id: string;
  title: string;
  status: "draft" | "published" | "scheduled";
  author: string;
  createdAt: string;
};

/**
 * Dummy data artikel
 * Jangan terlalu pintar di awal — yang penting representatif
 */
const dummyArticles: Article[] = [
  {
    id: "1",
    title: "Understanding React Server Components",
    status: "published",
    author: "Admin",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    title: "Why TypeScript Makes You Slower (At First)",
    status: "draft",
    author: "Editor",
    createdAt: "2025-01-18",
  },
  {
    id: "3",
    title: "Designing Sidebars That Don’t Annoy Users",
    status: "scheduled",
    author: "Admin",
    createdAt: "2025-01-30",
  },
];

/**
 * Warna status artikel
 * Kecil, eksplisit, mudah diubah
 */
const statusColorMap: Record<Article["status"], "default" | "success" | "warning"> =
{
  published: "success",
  draft: "default",
  scheduled: "warning",
};

export default function ArticleAllPosts() {
  const [search, setSearch] = React.useState("");

  /**
   * Filter artikel berdasarkan judul
   * Simpel dulu — nanti bisa ditingkatkan
   */
  const filteredArticles = dummyArticles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          All Articles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage all articles, drafts, and scheduled posts
        </Typography>
      </Stack>

      {/* ===== Search & Actions ===== */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            size="small"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* ===== Articles Table ===== */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Created</TableCell>
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
                    label={article.status}
                    color={statusColorMap[article.status]}
                  />
                </TableCell>

                <TableCell>{article.author}</TableCell>
                <TableCell>{article.createdAt}</TableCell>

                <TableCell align="right">
                  <IconButton size="small">
                    <VisibilityOutlinedIcon fontSize="small" />
                  </IconButton>
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
                    No articles found
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