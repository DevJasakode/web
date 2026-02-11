"use client";

import { useEffect, useState } from "react";
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
} from "@mui/material";
import axios, { AxiosError } from "axios";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { ContactSettings as ContactSettingsModel } from "@/api/contact/setting/models";
import { LoadingButton } from "@mui/lab";

/**
 * Tipe data contact settings
 */
type ContactSettingsState = {
  office_addres: string;
  inboxEmail: string;
  enableAutoReply: boolean;
  autoReplyMessage: string;
  notifyOnNewMessage: boolean;
  allowAnonymousMessages: boolean;
};


const initialContactSettings: ContactSettingsModel = {
  id: 1,
  address: "Srijaya, Kec. Belitang II, Kabupaten Ogan Komering Ulu Timur, Sumatera Selatan 32383",
  phone: "+62 851 5900 3374",
  email: "info@jasakode.com",
  auto_reply_email: true,
  auto_reply_email_message: "Terima kasih telah menghubungi kami. Pesan Anda telah diterima dan akan kami balas secepat mungkin.",
  forward_telegram_box: true,
  forward_telegram_box_token: "",
  forward_whatsapp: true,
  forward_whatsapp_contact: "+62 851 5900 3374",
  created_at: new Date(),
  created_by: 1,
  updated_at: null,
  updated_by: 0,
};

/**
 * Halaman Contact Settings
 */
export default function ContactSettings() {
  const [settings, setSettings] =
    useState<ContactSettingsState>({
      office_addres: "Srijaya, Kec. Belitang II, Kabupaten Ogan Komering Ulu Timur, Sumatera Selatan 32383",
      inboxEmail: "info@jasakode.com",
      enableAutoReply: true,
      autoReplyMessage:
        "Terima kasih telah menghubungi kami. Pesan Anda telah diterima dan akan kami balas secepat mungkin.",
      notifyOnNewMessage: true,
      allowAnonymousMessages: false,
    });

  const [data, setData] = useState<ContactSettingsModel>(initialContactSettings);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Helper update state
   */
  const handleChange = <K extends keyof ContactSettingsState>(
    key: K,
    value: ContactSettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Dummy save handler
   */
  const handleSave = () => {
    console.log("CONTACT SETTINGS SAVED:", settings);
  };


  async function loadData() {
    try {
      setLoading(true);
      const res = await axios.get("/api/contact/setting", { withCredentials: true });
      if (res.status >= 200 && res.status <= 201) {
        if (!res.data) {
          throw Error("Settings Data not Found");
        }
        setData(res.data)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
                  <TextField
                    spellCheck={false}
                    size="small"
                    fullWidth
                    helperText="All contact messages will be sent to this email"
                    multiline
                    minRows={3}
                    maxRows={10}
                    value={data.address}
                    onChange={(e) => setData(pre => ({ ...pre, address: e.target.value }))}
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
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.enableAutoReply}
                        onChange={(e) =>
                          handleChange(
                            "enableAutoReply",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Enable automatic reply"
                  />

                  <TextField
                    label="Auto Reply Message"
                    multiline
                    minRows={3}
                    fullWidth
                    disabled={!settings.enableAutoReply}
                    value={settings.autoReplyMessage}
                    onChange={(e) =>
                      handleChange(
                        "autoReplyMessage",
                        e.target.value
                      )
                    }
                  />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            {/* ===== Inbox Settings ===== */}
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
                    onChange={(e) => setData(pre => ({ ...pre, email: e.target.value }))}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.forward_telegram_box}
                        onChange={(e) => setData(pre => ({ ...pre, forward_telegram_box: e.target.checked }))}
                      />
                    }
                    label="Notify me in telegram bot a new message arrives"
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
                    onChange={(e) => setData(pre => ({ ...pre, phone: e.target.value }))}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notifyOnNewMessage}
                        onChange={(e) =>
                          handleChange(
                            "notifyOnNewMessage",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Notify me when a new message arrives"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>



      <Stack spacing={3} sx={{ mt: 3 }}>

        {/* ===== Privacy & Rules ===== */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              Rules & Privacy
            </Typography>

            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.allowAnonymousMessages}
                    onChange={(e) =>
                      handleChange(
                        "allowAnonymousMessages",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Allow anonymous messages"
              />
            </Stack>
          </CardContent>
        </Card>

        <Divider />

        {/* ===== Save ===== */}
        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            variant="contained"
            startIcon={<SaveOutlinedIcon />}
            loading={loading}
            onClick={handleSave}
          >
            Save Settings
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
}