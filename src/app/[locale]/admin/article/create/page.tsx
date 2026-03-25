"use client";

import { Box, Card, Grid, FormControl, TextField, Stack, Typography, Tooltip, Select, MenuItem } from "@mui/material";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useQuill } from "react-quilljs";
import { LoadingButton } from "@mui/lab";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import hljs from "highlight.js";

import "quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";

export default function ArticleCreate() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    (window as any).hljs = hljs;
    setMounted(true);
  }, []);

  const modules = useMemo(() => ({
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      // ["blockquote", "code-block"],
      ["blockquote", "code", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"]
    ],
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value
    },
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: true
    }
  }), []);

  const { quill, quillRef } = useQuill(
    mounted
      ? {
        theme: "snow",
        modules
      }
      : undefined
  );

  const publish = useCallback(() => {
    if (quill) {
      console.log(quill.getContents());
    }
  }, [quill]);

  if (!mounted) return null;



  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }} />
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <LoadingButton
              variant="contained"
              startIcon={<PublishedWithChangesIcon />}
              onClick={publish}
            >
              Publish
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ display: "flex" }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ flex: 1, border: "none", boxShadow: "none" }}>
            <Stack spacing={2} sx={{ mb: 3 }}>
              <FormControl>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 0.5,
                  }}
                >
                  <span>Page Title</span>
                  <Tooltip
                    title="Title ini akan ditampilkan di sebelah favicon pada tab browser. Ini adalah title untuk halaman artikel (page title), bukan judul artikel di dalam konten."
                  >
                    <Typography
                      sx={{
                        ml: 0.5,
                        cursor: "default",
                        ":hover": { color: "green" }
                      }}
                    >
                      *
                    </Typography>
                  </Tooltip>
                </Box>
                <TextField
                  size="small"
                  placeholder="Title"
                />
              </FormControl>
            </Stack>
            <div ref={quillRef} style={{ minHeight: 300 }} spellCheck={"false"} />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
          <Card sx={{ flex: 1, px: 3, py: 2 }}>
            <Stack spacing={2}>
              <FormControl>
                <Typography sx={{ mb: 0.5 }}>Slug / Url</Typography>
                <TextField
                  size="small"
                />
              </FormControl>
              <FormControl>
                <Typography sx={{ mb: 0.5 }}>Featured Image / Thumbnail</Typography>
                <TextField
                  size="small"
                />
              </FormControl>
              <FormControl>
                <Typography sx={{ mb: 0.5 }}>Excerpt / Summary</Typography>
                <TextField
                  size="small"
                  multiline
                  minRows={3}
                  maxRows={10}
                />
              </FormControl>
              <FormControl>
                <Typography sx={{ mb: 0.5 }}>Status / Publishing Control</Typography>
                <Select
                  size="small" 
                  value={"draft"}
                >
                  <MenuItem value={"draft"}>Draft</MenuItem>
                  <MenuItem value={"Published"}>Published</MenuItem>
                  <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
                  <MenuItem value={"Archived"}>Archived</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <Typography sx={{ mb: 0.5 }}>Category</Typography>
                <TextField
                  size="small"
                />
              </FormControl>
              <FormControl>
                <Typography sx={{ mb: 0.5 }}>Tags</Typography>
                <TextField
                  size="small"
                />
              </FormControl>
              <FormControl>
                <Typography sx={{ mb: 0.5 }}>Author</Typography>
                <TextField
                  size="small"
                />
              </FormControl>
                <FormControl>
                <Typography sx={{ mb: 0.5 }}>Meta SEO</Typography>
                <TextField
                  size="small"
                />
              </FormControl>
                 <FormControl>
                <Typography sx={{ mb: 0.5 }}>Reading Time</Typography>
                <TextField
                  size="small"
                />
              </FormControl>
                <FormControl>
                <Typography sx={{ mb: 0.5 }}>Visibility / Access</Typography>
                <TextField
                  size="small"
                />
              </FormControl>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

// Title
// Slug
// Featured Image
// Excerpt / Summary
// Content (Rich Text Editor)
// Category
// Tags
// Author
// Status (Draft / Published)
// Publish Date