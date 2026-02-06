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
} from "@mui/material";
import { Inbox } from "@/api/contact/inbox/models";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";


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

  // Hooks
  useEffect(() => { LoadInbox() }, [filter]);

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