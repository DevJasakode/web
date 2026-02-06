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
  Divider,
} from "@mui/material";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

/**
 * Tipe data komentar
 */
type Comment = {
  id: string;
  articleTitle: string;
  author: string;
  content: string;
  status: "pending" | "approved";
  createdAt: string;
};

/**
 * Dummy data komentar
 */
const dummyComments: Comment[] = [
  {
    id: "1",
    articleTitle: "Calm UI Is a Competitive Advantage",
    author: "John Doe",
    content:
      "This article really resonated with me. Calm interfaces do make a difference in long-term usability.",
    status: "pending",
    createdAt: "2025-01-20",
  },
  {
    id: "2",
    articleTitle: "Why Writing Systems Shape Thinking",
    author: "Jane Smith",
    content:
      "Great perspective. I never thought about how writing systems influence cognition this deeply.",
    status: "approved",
    createdAt: "2025-01-18",
  },
];

/**
 * Halaman Comments
 */
export default function ArticleComments() {
  const [comments, setComments] =
    React.useState<Comment[]>(dummyComments);

  /**
   * Approve komentar (dummy)
   */
  const handleApprove = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "approved" } : c
      )
    );
  };

  /**
   * Hapus komentar (dummy)
   */
  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 900 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Comments
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review and moderate reader comments
        </Typography>
      </Stack>

      {/* ===== Comments List ===== */}
      <Stack spacing={2}>
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent>
              <Stack spacing={1}>
                {/* Meta */}
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack spacing={0.5}>
                    <Typography fontSize={13} fontWeight={500}>
                      {comment.author}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary">
                      On: {comment.articleTitle}
                    </Typography>
                  </Stack>

                  <Chip
                    size="small"
                    label={comment.status}
                    color={
                      comment.status === "approved"
                        ? "success"
                        : "warning"
                    }
                  />
                </Stack>

                <Divider />

                {/* Content */}
                <Typography fontSize={14}>
                  {comment.content}
                </Typography>

                {/* Footer */}
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    fontSize={12}
                    color="text.secondary"
                  >
                    {comment.createdAt}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    {comment.status === "pending" && (
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() =>
                          handleApprove(comment.id)
                        }
                      >
                        <CheckCircleOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                    )}

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {comments.length === 0 && (
          <Typography
            align="center"
            color="text.secondary"
            fontSize={14}
          >
            No comments to review
          </Typography>
        )}
      </Stack>
    </Box>
  );
}