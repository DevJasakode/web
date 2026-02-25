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
  Chip,
  IconButton,
  Paper,
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ArticleTag } from "@/models/ArticleTag";



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
  data?: ArticleTag | null;
};
const initialResponse: Response = {
  count: 0,
}

export default function ArticleTags() {
  const [row, setRow] = React.useState<Response>(initialResponse);
  const [tags, setTags] = React.useState<Tag[]>(dummyTags);
  const [newTag, setNewTag] = React.useState("");

  /**
   * Tambah tag baru (dummy)
   */
  const handleAddTag = () => {
    const value = newTag.trim().toLowerCase();
    if (!value) return;

    // Cegah duplikasi
    if (tags.some((tag) => tag.name === value)) return;

    setTags((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: value,
        articleCount: 0,
      },
    ]);

    setNewTag("");
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
    }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 800 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Tags
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Flexible labels to help organize and discover articles
        </Typography>
      </Stack>

      {/* ===== Add Tag ===== */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="New Tag"
              placeholder="e.g. performance, accessibility"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
            <Button
              variant="contained"
              startIcon={<AddOutlinedIcon />}
              onClick={handleAddTag}
            >
              Add
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* ===== Tags List ===== */}
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={`${tag.name} (${tag.articleCount})`}
              onDelete={() => handleDeleteTag(tag.id)}
              deleteIcon={
                <IconButton size="small">
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              }
              sx={{ mb: 1 }}
            />
          ))}

          {/* Empty State */}
          {tags.length === 0 && (
            <Typography fontSize={14} color="text.secondary">
              No tags created yet
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}