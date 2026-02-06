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
  Divider,
  MenuItem,
  Chip,
} from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";

import { Editor } from "./editor";

// .jktf = Jasakode Text Format
/**
 * Tipe data form artikel
 * Nantinya bisa langsung disesuaikan dengan API
 */
type ArticleForm = {
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: "draft" | "scheduled" | "published";
};

/**
 * Dummy kategori
 */
const categories = ["Technology", "Design", "Writing", "Business"];

/**
 * Halaman Create Article
 */
export default function ArticleCreate() {
  const [form, setForm] = React.useState<ArticleForm>({
    title: "",
    content: "",
    category: "",
    tags: [],
    status: "draft",
  });

  const [tagInput, setTagInput] = React.useState("");

  /**
   * Update field form
   */
  const handleChange = <K extends keyof ArticleForm>(
    key: K,
    value: ArticleForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Tambah tag secara manual
   */
  const handleAddTag = () => {
    if (!tagInput.trim()) return;

    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()],
    }));
    setTagInput("");
  };

  /**
   * Dummy submit handler
   */
  const handleSubmit = (status: ArticleForm["status"]) => {
    const payload = { ...form, status };
    console.log("SUBMIT ARTICLE:", payload);
  };

  return (
    <Editor />
  )

  return (
    <Box sx={{ p: 3, maxWidth: 900 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Create Article
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Write, refine, and prepare your article for publication
        </Typography>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            {/* ===== Title ===== */}
            <TextField
              label="Title"
              placeholder="Enter article title..."
              fullWidth
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            {/* ===== Content ===== */}
            <TextField
              label="Content"
              placeholder="Start writing your article..."
              multiline
              minRows={10}
              fullWidth
              value={form.content}
              onChange={(e) => handleChange("content", e.target.value)}
            />

            {/* ===== Metadata ===== */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Category"
                fullWidth
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Add Tag"
                fullWidth
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
            </Stack>

            {/* ===== Tags Preview ===== */}
            {form.tags.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {form.tags.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Stack>
            )}

            <Divider />

            {/* ===== Actions ===== */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<SaveOutlinedIcon />}
                onClick={() => handleSubmit("draft")}
              >
                Save Draft
              </Button>

              <Button
                variant="outlined"
                startIcon={<ScheduleOutlinedIcon />}
                onClick={() => handleSubmit("scheduled")}
              >
                Schedule
              </Button>

              <Button
                variant="contained"
                startIcon={<PublishOutlinedIcon />}
                onClick={() => handleSubmit("published")}
              >
                Publish
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};