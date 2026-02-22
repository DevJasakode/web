"use client";

import { useState, useCallback, useEffect } from "react";
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
import axios, { AxiosError } from "axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ArticleCategories as ArticleCategoriesModel } from "@/models/ArticleCategories";


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


interface Filter {
  page: number;
  limit: number;
}

const initialFilter: Filter = {
  page: 0,
  limit: 25,
};

// http://127.0.0.1:3000/api/article/categories

export default function ArticleCategories() {
  const [data, setData] = useState<{ count: number, data: ArticleCategoriesModel[] | null }>();
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [newCategory, setNewCategory] = useState("");

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


  const loadCategorys = useCallback(async() => {
    const res = await axios.get("/api/article/categories", { withCredentials: true });
    if(res.status >= 200 && res.status <= 201) {
      console.log(res.status, res.statusText);
      console.log(res.data);
    };
  }, [filter]);


  // Hooks
  useEffect(() => {
    loadCategorys();
  }, [filter]);

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