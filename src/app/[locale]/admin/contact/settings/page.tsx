"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Grid,
  FormControl,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { ContactSettings as ContactSettingsModel } from "@/api/contact/setting/models";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";



const initialContactSettings: ContactSettingsModel = {
  id: 1,
  address: "",
  phone: "",
  email: "",
  auto_reply_email: false,
  auto_reply_email_message: "",
  forward_telegram_bot: false,
  forward_telegram_bot_token: null,
  forward_whatsapp: false,
  forward_whatsapp_contact: null,
  created_at: new Date(),
  created_by: 1,
  updated_at: null,
  updated_by: 0,
};

/**
 * Halaman Contact Settings
 */
export default function ContactSettings() {
  const [loading, setLoading] = useState<boolean>(false);
  const [change, setChange] = useState<Record<string, any>>({});
  const [currentData, setCurrentData] = useState<ContactSettingsModel>(initialContactSettings);
  const [data, setData] = useState<ContactSettingsModel>(initialContactSettings);


  /**
   * Dummy save handler
   */
  const handleSave = async () => {
    // src/app/api/contact/setting
    try {
      setLoading(true);
      const res = await axios.patch("/api/contact/setting", change, { withCredentials: true });
      Swal.fire({
        title: "Success",
        text: res.statusText,
        icon: "success",
        closeButtonAriaLabel: 'Close',
      }).finally(() => loadData());
    } catch (error) {
      const err: AxiosError = error as AxiosError;
      Swal.fire({
        title: err.message,
        text: err.response?.statusText || err.message,
        icon: 'error',
        closeButtonAriaLabel: 'Close',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Helper update state
   */
  const changeData = useCallback(
    <K extends keyof ContactSettingsModel>(
      key: K,
      value: ContactSettingsModel[K]
    ) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setChange((prev) => {
        const isSameAsInitial = currentData[key] === value;
        if (isSameAsInitial) {
          const { [key]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [key]: value };
      });
    },
    [currentData]
  );


  async function loadData() {
    try {
      setLoading(true);
      const res = await axios.get("/api/contact/setting", { withCredentials: true });
      if (res.status >= 200 && res.status <= 201) {
        if (!res.data) {
          throw Error("Settings Data not Found");
        }
        setData(res.data);
        setChange({});
        setCurrentData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Hooks
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>

      {/* ===== Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Contact Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure how incoming messages are handled
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            {/* ===== office ===== */}
            <Card>
              <CardContent>
                <Typography fontWeight={600} mb={2}>
                  Office Addres
                </Typography>
                <Stack spacing={2}>
                  <FormControl>
                    <TextField
                      spellCheck={false}
                      size="small"
                      fullWidth
                      helperText="All contact messages will be sent to this email"
                      multiline
                      minRows={3}
                      maxRows={10}
                      value={data.address}
                      onChange={(e) => changeData("address", e.target.value)}
                    />
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>
            {/* ===== Inbox Settings ===== */}
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.forward_telegram_bot}
                        onChange={(e) => changeData("forward_telegram_bot", e.target.checked)}
                      />
                    }
                    label="Forwad Message on telegram bot"
                  />
                  <Box>
                    <Typography sx={{ mb: 0.5 }}>Telegram Bot Token</Typography>
                    <FormControl fullWidth>
                      <TextField
                        spellCheck={false}
                        size="small"
                        fullWidth
                        helperText="All contact messages will be sent to this email"
                        disabled={!data.forward_telegram_bot}
                        value={data.forward_telegram_bot_token || ""}
                        onChange={(e) => changeData("forward_telegram_bot_token", e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.forward_whatsapp}
                        onChange={(e) => changeData("forward_whatsapp", e.target.checked)}
                      />
                    }
                    label="Forwad Message on telegram bot"
                  />
                  <Box>
                    <Typography sx={{ mb: 0.5 }}>Whatsapp Contact</Typography>
                    <FormControl fullWidth>
                      <TextField
                        spellCheck={false}
                        size="small"
                        fullWidth
                        disabled={!data.forward_whatsapp}
                        helperText="All contact messages will be sent to this email"
                        value={data.forward_whatsapp_contact || ""}
                        onChange={(e) => changeData("forward_whatsapp_contact", e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            {/* ===== Inbox Contact Settings ===== */}
            <Card>
              <CardContent>
                <Typography fontWeight={600} mb={2}>
                  Inbox Email
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    spellCheck={false}
                    size="small"
                    fullWidth
                    helperText="All contact messages will be sent to this email"
                    value={data.email}
                    onChange={(e) => changeData("email", e.target.value)}
                  />
                </Stack>
              </CardContent>
            </Card>
            {/* ===== Inbox Phone ===== */}
            <Card>
              <CardContent>
                <Typography fontWeight={600} mb={2}>
                  Inbox Phone
                </Typography>

                <Stack spacing={2}>
                  <TextField
                    size="small"
                    fullWidth
                    helperText="All contact messages will be sent to this email"
                    value={data.phone}
                    onChange={(e) => changeData("phone", e.target.value)}
                  />
                </Stack>
              </CardContent>
            </Card>
            {/* ===== Auto Reply Settings ===== */}
            <Card>
              <CardContent>
                <Typography fontWeight={600} mb={2}>
                  Auto Reply
                </Typography>

                <Stack spacing={2}>
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={data.auto_reply_email}
                          onChange={(e) => changeData("auto_reply_email", e.target.checked)}
                        />
                      }
                      label="Enable automatic reply"
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Auto Reply Message"
                      multiline
                      minRows={3}
                      fullWidth
                      disabled={!data.auto_reply_email}
                      value={data.auto_reply_email_message}
                      onChange={(e) => changeData("auto_reply_email_message", e.target.value)}
                    />
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>



      <Stack spacing={3} sx={{ mt: 3 }}>
        <Divider />
        {/* ===== Save ===== */}
        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            variant="contained"
            startIcon={<SaveOutlinedIcon />}
            loading={loading}
            disabled={Object.keys(change).length === 0}
            onClick={handleSave}
          >
            Save Settings
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
}