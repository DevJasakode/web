"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Chip,
  IconButton,
  Paper,
  Grid,
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ArticleTag } from "@/models/ArticleTag";
import axios, { AxiosError } from "axios";
import { FormTags, FormTagsRef } from "./Form";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';




/**
 * Tipe data Tag
 */
type Tag = {
  id: string;
  name: string;
  articleCount: number;
};

/**
 * Dummy data tags
 */
const dummyTags: Tag[] = [
  { id: "1", name: "react", articleCount: 10 },
  { id: "2", name: "typescript", articleCount: 7 },
  { id: "3", name: "ui-design", articleCount: 5 },
  { id: "4", name: "writing", articleCount: 3 },
];

interface Response {
  count: number;
  data?: ArticleTag[] | null;
};

const initialResponse: Response = {
  count: 0,
};

interface Filter {
  page: number;
  limit: number;
};

const initialFilter: Filter = {
  page: 0,
  limit: 25,
};

const paginationModel = { page: 0, pageSize: 10 };


function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const days = [
    "Minggu", "Senin", "Selasa", "Rabu",
    "Kamis", "Jumat", "Sabtu"
  ];

  const dayName = days[date.getUTCDay()];
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${dayName}, ${hours}/${month}/${year}`;
};

function formatDateUnix(dateNumber: number): string {
  const date = new Date(dateNumber);

  const days = [
    "Minggu", "Senin", "Selasa", "Rabu",
    "Kamis", "Jumat", "Sabtu"
  ];

  const dayName = days[date.getUTCDay()];
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${dayName}, ${hours}/${month}/${year}`;
};

export default function ArticleTags() {
  const [row, setRow] = useState<Response>(initialResponse);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [tags, setTags] = useState<Tag[]>(dummyTags);
  const [newTag, setNewTag] = useState("");

  const formRef = useRef<FormTagsRef>(null);

  /**
   * Tambah tag baru (dummy)
   */
  const handleAddTag = () => {
    formRef.current?.open();
    // const value = newTag.trim().toLowerCase();
    // if (!value) return;

    // // Cegah duplikasi
    // if (tags.some((tag) => tag.name === value)) return;

    // setTags((prev) => [
    //   ...prev,
    //   {
    //     id: crypto.randomUUID(),
    //     name: value,
    //     articleCount: 0,
    //   },
    // ]);

    // setNewTag("");
  };

  /**
   * Hapus tag (dummy)
   */
  const handleDeleteTag = (id: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const columns: GridColDef<ArticleTag>[] = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "slug",
      headerName: "Slug",
      sortable: true,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "desc",
      headerName: "Description",
      sortable: true,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "created_at",
      sortable: true,
      disableColumnMenu: true,
      width: 150,
    },
    {
      field: "created_by",
      headerName: "created_by",
      sortable: true,
      disableColumnMenu: true,
      width: 150,
      valueGetter: (_, v) => (formatDateUnix(v.created_by)),
    },
    {
      field: "id",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      disableReorder: true,
      filterable: false,
      width: 100,
      align: "right",
      headerAlign: "right",
      renderCell(params) {
        return (
          <Box>
            <IconButton
              size="small"
              color="primary"
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
        )
      },
    }
  ];

  const loadTags = useCallback(async () => {
    try {
      const res = await axios.get(`/api/article/tags`, { withCredentials: true });
      if (res.status >= 200 && res.status <= 201) {
        setRow(res.data)
      }
    } catch (error) {
      const err: AxiosError = error as AxiosError;
      console.log(err.message, err.response)
    }
  }, [filter, setRow]);

  // Hooks
  useEffect(() => {
    loadTags();
  }, [filter]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Form Tags */}
      <FormTags
        ref={formRef}
      />

      {/* ===== Page Header ===== */}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={1} mb={3}>
            <Typography variant="h5" fontWeight={600}>
              Tags
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Flexible labels to help organize and discover articles
            </Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "flex-start",
                md: "flex-end",
              },
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddOutlinedIcon />}
              onClick={handleAddTag}
            >
              Add
            </Button>
          </Box>
        </Grid>
      </Grid>


      <Box>
        <DataGrid
          rows={row.data || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 25, 50, 75, 100]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Box>
    </Box>
  );
}