"use client";
import { ReactNode } from "react";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";

type MuiSeverity = "success" | "info" | "warning" | "error";
export type AlertVariant = "default" | MuiSeverity;

export interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    children?: ReactNode;
}

function isMuiSeverity(value: AlertVariant): value is MuiSeverity {
    return value !== "default";
}

export function Alert({
    variant = "default",
    title,
    children,
}: AlertProps) {
    const isDefault = variant === "default";

    return (
        <Stack sx={{ width: "100%" }} spacing={2}>
            <MuiAlert
                severity={isMuiSeverity(variant) ? variant : undefined}
                icon={isDefault ? <CheckIcon fontSize="inherit" /> : undefined}
                sx={
                    isDefault
                        ? {
                            bgcolor: "secondary.light",
                            color: "secondary.contrastText",
                            "& .MuiAlert-icon": {
                                color: "secondary.main",
                            },
                        }
                        : undefined
                }
            >
                {title && <AlertTitle>{title}</AlertTitle>}
                {children}
            </MuiAlert>
        </Stack>
    );
}