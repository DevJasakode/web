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
  Grid,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ArticleCategories as ArticleCategoriesModel } from "@/models/ArticleCategories";
import { FormCategory } from "./Form";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';



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


const columns: GridColDef<ArticleCategoriesModel>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: 'slug',
    headerName: 'Slug Name',
    flex: 1,
    disableColumnMenu: true,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: 'created_by',
    headerName: 'Created By',
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: "id",
    headerName: "Action",
    width: 100,
    align: "right",
    headerAlign: "center",
    renderCell(params) {
      return (
        <Box>

        </Box>
      )
    },
  }
];

export default function ArticleCategories() {
  const [data, setData] = useState<{ count: number, data: ArticleCategoriesModel[] | null }>();
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [form, setForm] = useState<{ loading: boolean, open: boolean }>({ loading: false, open: false });

  /**
   * Tambah kategori baru (dummy)
   */
  const handleAddCategory = () => {
    setForm(pre => ({ ...pre, open: true }))
  };

  const loadCategorys = useCallback(async () => {
    const res = await axios.get<{ count: number, data: ArticleCategoriesModel[] | null }>("/api/article/categories", { withCredentials: true });
    if (res.status >= 200 && res.status <= 201) {
      setData(res.data);
    };
  }, [filter]);


  // Hooks
  useEffect(() => {
    loadCategorys();
  }, [filter]);

  return (
    <Box sx={{ p: 3 }}>
      <FormCategory
        open={form.open}
        onClose={() => setForm(pre => ({ ...pre, open: false }))}
        onCancel={() => setForm(pre => ({ ...pre, open: false }))}
        onSave={() => {
          setForm(pre => ({ ...pre, open: false }));
          loadCategorys();
        }}
      />
      {/* ===== Page Header ===== */}
      <Grid spacing={3} container>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={1}>
            <Typography variant="h5" fontWeight={600}>
              Categories
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Organize articles into clear and meaningful groups
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: 'center',
              justifyContent: "end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              startIcon={<AddIcon />}
            >
              Create
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <DataGrid
          rows={data?.data || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};