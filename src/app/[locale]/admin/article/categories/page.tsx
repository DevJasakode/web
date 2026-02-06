"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

/**
 * Tipe data kategori
 */
type Category = {
  id: string;
  name: string;
  articleCount: number;
};

/**
 * Dummy data kategori
 */
const dummyCategories: Category[] = [
  {
    id: "1",
    name: "Technology",
    articleCount: 12,
  },
  {
    id: "2",
    name: "Design",
    articleCount: 8,
  },
  {
    id: "3",
    name: "Writing",
    articleCount: 5,
  },
];

export default function ArticleCategories() {
  const [categories, setCategories] =
    React.useState<Category[]>(dummyCategories);
  const [newCategory, setNewCategory] = React.useState("");

  /**
   * Tambah kategori baru (dummy)
   */
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    setCategories((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newCategory.trim(),
        articleCount: 0,
      },
    ]);

    setNewCategory("");
  };

  /**
   * Hapus kategori (dummy)
   */
  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 700 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Categories
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Organize articles into clear and meaningful groups
        </Typography>
      </Stack>

      {/* ===== Create Category ===== */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="New Category"
              placeholder="e.g. Product, Engineering"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            />
            <Button
              variant="contained"
              startIcon={<AddOutlinedIcon />}
              onClick={handleAddCategory}
            >
              Add
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* ===== Categories Table ===== */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Articles</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id} hover>
                <TableCell>
                  <Typography fontSize={14} fontWeight={500}>
                    {category.name}
                  </Typography>
                </TableCell>

                <TableCell>{category.articleCount}</TableCell>

                <TableCell align="right">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* Empty State */}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography
                    align="center"
                    color="text.secondary"
                    fontSize={14}
                  >
                    No categories created yet
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