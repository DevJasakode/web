"use client";

import {
  Container,
  Box,
  Typography,
  Avatar,
  Stack,
  Chip,
  IconButton,
  Divider,
  Button,
  Paper,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

import DOMPurify from "dompurify";

export default function ArticleReader() {
  const dummyArticle = {
    title: "Quill Rich Text Editor",
    author: "Dr. Ada Lovelace",
    avatar: "https://i.pravatar.cc/150?img=47",
    date: "28 Februari 2026",
    category: "Web Engineering",
    content: `
      <h2 class="ql-align-center">Getting Started is Easy</h2>
      <p>Quill is a free, open source WYSIWYG editor built for the modern web.</p>
      <p class="ql-align-center"><strong>Built with</strong></p>
      <p class="ql-align-center">x^2 + (y - ∛x^2)^2 = 1</p>
      <p>Modern editors separate structure from presentation. That’s beautiful.</p>
    `,
  };

  const sanitized = DOMPurify.sanitize(dummyArticle.content);

  return (
    <Container maxWidth="md" sx={{ minHeight: "100svh", py: 6 }}>
      {/* HEADER */}
      <Box mb={4}>
        <Chip label={dummyArticle.category} sx={{ mb: 2 }} />

        <Typography variant="h3" fontWeight={700} gutterBottom>
          {dummyArticle.title}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={dummyArticle.avatar} />
          <Box>
            <Typography fontWeight={600}>
              {dummyArticle.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dipublikasikan {dummyArticle.date}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* ACTION BAR */}
      <Stack direction="row" spacing={1} mb={4}>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* CONTENT */}
      <Box
        sx={{
          "& h1, & h2, & h3": { fontWeight: 700, mt: 4 },
          "& p": { lineHeight: 1.8, fontSize: "1.1rem", mb: 2 },
          "& .ql-align-center": { textAlign: "center" },
        }}
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />

      <Divider sx={{ my: 6 }} />

      {/* COMMENT SECTION */}
      <Typography variant="h5" fontWeight={600} mb={3}>
        Komentar (3)
      </Typography>

      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Stack direction="row" spacing={2}>
            <Avatar src="https://i.pravatar.cc/150?img=12" />
            <Box>
              <Typography fontWeight={600}>
                Nikola Tesla
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                2 jam lalu
              </Typography>
              <Typography>
                Struktur data Delta itu underrated. HTML itu terlalu liar.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Stack direction="row" spacing={2}>
            <Avatar src="https://i.pravatar.cc/150?img=32" />
            <Box>
              <Typography fontWeight={600}>
                Marie Curie
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                1 jam lalu
              </Typography>
              <Typography>
                Editor modern memang harus memisahkan representasi dan presentasi.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      <Box mt={4}>
        <Button variant="contained">
          Tulis Komentar
        </Button>
      </Box>
    </Container>
  );
}