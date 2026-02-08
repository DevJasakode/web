"use client";

import { useRef } from "react";
import {
    FormControl,
    TextField,
    Typography,
    InputAdornment,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

type ImageFilePickerProps = {
    label?: string;
    value?: File | null;
    placeholder?: string;
    accept?: string;
    disabled?: boolean;
    onChange?: (file: File | null) => void;
};

export function ImageFilePicker({
    label = "File",
    value,
    placeholder = "Pilih file...",
    accept = "image/*",
    disabled = false,
    onChange,
}: ImageFilePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <FormControl fullWidth>
            {label && (
                <Typography sx={{ mb: 0.5 }}>
                    {label}
                </Typography>
            )}

            <input
                ref={inputRef}
                type="file"
                hidden
                accept={accept}
                disabled={disabled}
                onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    onChange?.(file);
                }}
            />

            <TextField
                size="small"
                spellCheck={false}
                fullWidth
                disabled={disabled}
                value={value?.name ?? ""}
                placeholder={placeholder}
                onClick={() => inputRef.current?.click()}
                slotProps={{
                    input: {
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <AddPhotoAlternateOutlinedIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </FormControl>
    );
}
