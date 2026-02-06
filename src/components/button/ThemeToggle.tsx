"use client";

import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Mode } from "@/config/theme";

export interface ButtonThemeToggleProps {
  mode: Mode;
  changeMode(value: Mode): void;
};

export function ButtonThemeToggle(props: ButtonThemeToggleProps) {
  const handleToggleTheme = () => {
    props.changeMode(props.mode === "dark" ? "light" : "dark");
  };

  return (
    <IconButton
      onClick={handleToggleTheme}
      size="small"
      aria-label="Toggle theme mode"
      sx={(theme) => ({
        borderRadius: "50%",
        color: theme.palette.text.primary,
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.action.hover
              : theme.palette.action.hover,
        },
      })}
    >
      {props.mode === "dark" ? (
        <LightModeIcon fontSize="small" />
      ) : (
        <DarkModeIcon fontSize="small" />
      )}
    </IconButton>
  );
};
