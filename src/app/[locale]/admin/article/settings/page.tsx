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
 * Tipe data settings artikel
 */
type ArticleSettingsState = {
  defaultAuthor: string;
  defaultCategory: string;
  enableComments: boolean;
  autoPublishScheduled: boolean;
  seoTitleSuffix: string;
  seoDescriptionLimit: number;
};

/**
 * Halaman Article Settings
 */
export default function ArticleSettings() {
  const [settings, setSettings] =
    React.useState<ArticleSettingsState>({
      defaultAuthor: "Admin",
      defaultCategory: "Technology",
      enableComments: true,
      autoPublishScheduled: true,
      seoTitleSuffix: "| My Blog",
      seoDescriptionLimit: 160,
    });

  /**
   * Update setting value
   */
  const handleChange = <K extends keyof ArticleSettingsState>(
    key: K,
    value: ArticleSettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Dummy save handler
   */
  const handleSave = () => {
    console.log("SAVED SETTINGS:", settings);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800 }}>
      {/* ===== Page Header ===== */}
      <Stack spacing={1} mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Article Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure default behavior and rules for articles
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {/* ===== General Settings ===== */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              General
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Default Author"
                fullWidth
                value={settings.defaultAuthor}
                onChange={(e) =>
                  handleChange("defaultAuthor", e.target.value)
                }
              />

              <TextField
                label="Default Category"
                fullWidth
                value={settings.defaultCategory}
                onChange={(e) =>
                  handleChange("defaultCategory", e.target.value)
                }
              />
            </Stack>
          </CardContent>
        </Card>

        {/* ===== Publishing Settings ===== */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              Publishing
            </Typography>

            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoPublishScheduled}
                    onChange={(e) =>
                      handleChange(
                        "autoPublishScheduled",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Automatically publish scheduled articles"
              />
            </Stack>
          </CardContent>
        </Card>

        {/* ===== Discussion Settings ===== */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              Discussion
            </Typography>

            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableComments}
                    onChange={(e) =>
                      handleChange(
                        "enableComments",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Enable comments on articles"
              />
            </Stack>
          </CardContent>
        </Card>

        {/* ===== SEO Settings ===== */}
        <Card>
          <CardContent>
            <Typography fontWeight={600} mb={2}>
              SEO
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Title Suffix"
                fullWidth
                helperText="Appended to every article title"
                value={settings.seoTitleSuffix}
                onChange={(e) =>
                  handleChange("seoTitleSuffix", e.target.value)
                }
              />

              <TextField
                label="Meta Description Limit"
                type="number"
                fullWidth
                value={settings.seoDescriptionLimit}
                onChange={(e) =>
                  handleChange(
                    "seoDescriptionLimit",
                    Number(e.target.value)
                  )
                }
              />
            </Stack>
          </CardContent>
        </Card>

        <Divider />

        {/* ===== Save Button ===== */}
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