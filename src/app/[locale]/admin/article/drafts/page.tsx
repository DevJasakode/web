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

/**
 * Tipe data artikel
 */
type Article = {
  id: string;
  title: string;
  status: "draft" | "published" | "scheduled";
  author: string;
  updatedAt: string;
};

/**
 * Dummy data artikel
 * Disaring hanya draft
 */
const dummyArticles: Article[] = [
  {
    id: "1",
    title: "Why TypeScript Feels Annoying Before It Feels Right",
    status: "draft",
    author: "Admin",
    updatedAt: "2025-01-20",
  },
  {
    id: "2",
    title: "The Hidden Cost of Over-Engineering UI",
    status: "draft",
    author: "Editor",
    updatedAt: "2025-01-22",
  },
];

/**
 * Halaman Draft Articles
 */
export default function ArticleDrafts() {
  const [search, setSearch] = React.useState("");

  /**
   * Filter draft berdasarkan judul
   */
  const filteredDrafts = dummyArticles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Draft Articles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Articles that are still being written and not yet published
        </Typography>
      </Stack>

      {/* ===== Search ===== */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            size="small"
            placeholder="Search drafts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* ===== Drafts Table ===== */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredDrafts.map((article) => (
              <TableRow key={article.id} hover>
                <TableCell>
                  <Typography fontSize={14} fontWeight={500}>
                    {article.title}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip size="small" label="draft" />
                </TableCell>

                <TableCell>{article.author}</TableCell>
                <TableCell>{article.updatedAt}</TableCell>

                <TableCell align="right">
                  {/* Draft biasanya langsung diedit */}
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
            {filteredDrafts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography
                    align="center"
                    color="text.secondary"
                    fontSize={14}
                  >
                    No draft articles found
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