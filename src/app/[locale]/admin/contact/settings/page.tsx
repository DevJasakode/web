"use client";

import * as React from "react";
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
} from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

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

/**
 * Halaman Contact Settings
 */
export default function ContactSettings() {
  const [settings, setSettings] =
    React.useState<ContactSettingsState>({
      office_addres: "Srijaya, Kec. Belitang II, Kabupaten Ogan Komering Ulu Timur, Sumatera Selatan 32383",
      inboxEmail: "info@jasakode.com",
      enableAutoReply: true,
      autoReplyMessage:
        "Terima kasih telah menghubungi kami. Pesan Anda telah diterima dan akan kami balas secepat mungkin.",
      notifyOnNewMessage: true,
      allowAnonymousMessages: false,
    });

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

  return (
    <Box sx={{ p: 3, maxWidth: 800 }}>
      {/* ===== Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Contact Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure how incoming messages are handled
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {/* ===== office ===== */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              Office Addres
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Office Addres"
                fullWidth
                helperText="All contact messages will be sent to this email"
                value={settings.office_addres}
                onChange={(e) =>
                  handleChange("office_addres", e.target.value)
                }
              />
            </Stack>
          </CardContent>
        </Card>

        {/* ===== Inbox Settings ===== */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              Inbox Email
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Inbox Email"
                fullWidth
                helperText="All contact messages will be sent to this email"
                value={settings.inboxEmail}
                onChange={(e) =>
                  handleChange("inboxEmail", e.target.value)
                }
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

        {/* ===== Inbox Phone ===== */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              Inbox Phone
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Inbox Email"
                fullWidth
                helperText="All contact messages will be sent to this email"
                value={settings.inboxEmail}
                onChange={(e) =>
                  handleChange("inboxEmail", e.target.value)
                }
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
          <Button
            variant="contained"
            startIcon={<SaveOutlinedIcon />}
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}