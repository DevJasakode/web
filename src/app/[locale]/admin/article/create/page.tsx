"use client";

import { Box, Grid } from "@mui/material";
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

      <div style={{ width: "100%", minHeight: 300 }}>
        <div ref={quillRef} />
      </div>
    </Box>
  );
}