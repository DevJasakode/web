"use client";

import { useState, useCallback, Fragment, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  List,
  ListItemButton,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import { Inbox } from "@/api/contact/inbox/models";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { LoadingButton } from "@mui/lab";

interface Filter {
  limit: number;
  page: number;
};

const initialFilter: Filter = {
  limit: 25,
  page: 0,
};

/**
 * Halaman Contact / Inbox
 */
export default function ContactInbox() {
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [inbox, setInbox] = useState<{ count: number, data: Inbox[] | null }>({ count: 0, data: [] });
  const [activeMessageId, setActiveMessageId] = useState<number>(inbox.data && inbox.data.length > 0 ? inbox.data[0].id : 0);

  const activeMessage = inbox.data?.find(
    (m) => m.id === activeMessageId
  );

  /**
   * Tandai pesan sebagai dibaca
   */
  const handleSelectMessage = (id: number) => {
    setActiveMessageId(id);
  };

  const LoadInbox = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ count: number, data: Inbox[] | null }>(
        `/api/contact/inbox?limit=${filter.limit}&offset=${filter.limit * filter.page}`,
        { withCredentials: true }
      );
      if (res.status >= 200 && res.status <= 201 && res.data) {
        setInbox(pre => ({ ...pre, count: res.data.count, data: res.data.data || [] }));
      } else {
        throw Error("Response Data not found")
      }
    } catch (error) {
      const err: AxiosError = error as AxiosError;
      Swal.fire({
        title: "Failed Get Inbox",
        text: err.response?.statusText || err.message,
        icon: 'error',
        confirmButtonText: 'Close',
        confirmButtonColor: "red",
      });
    } finally {
      setLoading(false);
    }
  }, [filter, setInbox]);

  const removeInbox = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/contact/inbox/${id}`, { withCredentials: true, timeout: 3000 });
      Swal.fire({
        title: "Success",
        text: res.statusText,
        icon: 'success',
        closeButtonAriaLabel: 'Close',
      });
    } catch (error) {
      const err: AxiosError = error as AxiosError;
      Swal.fire({
        title: err.message,
        text: err.response?.statusText || err.message,
        icon: 'error',
        closeButtonAriaLabel: 'Close',
      });
    } finally {
      LoadInbox();
      setActiveMessageId(0);
    }
  }, [setLoading, LoadInbox]);

  const readInbox = useCallback(async (id: number) => {
    await axios.patch(`/api/contact/inbox/${id}`, { withCredentials: true, timeout: 3000 }).finally(() => {
      LoadInbox();
    });
  }, [LoadInbox]);

  // Hooks
  useEffect(() => { LoadInbox() }, [filter]);

  useEffect(() => {
    if(activeMessage && activeMessage.unread) {
      readInbox(activeMessageId);
    }
  }, [activeMessageId]);

  return (
    <Box sx={{ p: 3 }}>
      {/* ===== Page Header ===== */}
      <Stack direction="row" spacing={1} mb={3} alignItems="center">
        <MailOutlineOutlinedIcon />
        <Typography variant="h5" fontWeight={600}>
          Inbox
        </Typography>
      </Stack>



      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 2,
        }}
      >
        {/* ===== Message List ===== */}
        <Card>
          <List disablePadding>
            {
              inbox.data?.map((item, i) => (
                <Fragment key={i}>
                  <ListItemButton
                    selected={item.id === activeMessageId}
                    onClick={() => handleSelectMessage(item.id)}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Stack spacing={0.5} width="100%">
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          fontSize={13}
                          fontWeight={!item.unread ? 400 : 600}
                          noWrap
                        >
                          {item.name}
                        </Typography>

                        {item.unread && (
                          <Chip
                            size="small"
                            label="New"
                            color="primary"
                          />
                        )}
                      </Stack>

                      <Typography
                        fontSize={12}
                        color="text.secondary"
                        noWrap
                      >
                        {item.company}
                      </Typography>

                      <Typography
                        fontSize={11}
                        color="text.disabled"
                      >
                        {item.created_at}
                      </Typography>
                    </Stack>
                  </ListItemButton>
                  <Divider />
                </Fragment>
              ))
            }
          </List>
        </Card>

        {/* ===== Message Detail ===== */}
        <Card>
          {
            activeMessage ?
              <CardContent>
                {activeMessage ? (
                  <Stack spacing={2}>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={0.5}>
                          <Typography fontWeight={600}>
                            {activeMessage.name}
                          </Typography>
                          <Typography fontSize={13} color="text.secondary">
                            {activeMessage.name} — {activeMessage.email}
                          </Typography>
                          <Typography
                            fontSize={12}
                            color="text.disabled"
                          >
                            {activeMessage.created_at}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
                          <LoadingButton
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteOutlinedIcon />}
                            loading={loading}
                            onClick={() => removeInbox(activeMessage.id)}
                          >
                            Remove
                          </LoadingButton>
                        </Box>
                      </Grid>
                    </Grid>


                    {/* DeleteOutlinedIcon */}

                    <Divider />

                    <Typography fontSize={14} whiteSpace="pre-line">
                      {activeMessage.message}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography
                    color="text.secondary"
                    align="center"
                  >
                    Select a message to read
                  </Typography>
                )}
              </CardContent> :
              <Box sx={{ px: 2, py: 2 }}>
                Not Selected
              </Box>
          }
        </Card>
      </Box>
    </Box>
  );
};