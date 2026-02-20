"use client";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import { useState, forwardRef, useImperativeHandle, ReactNode } from "react";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { LoadingButton } from "@mui/lab";

export interface PDFGeneratorProps {
    title?: string;
    children?: ReactNode;
};

export interface PDFGeneratorRef {
    open: Readonly<boolean>;
    show(): void;
    close(): void;
};

const PDFGenerator = forwardRef<PDFGeneratorRef, PDFGeneratorProps>((props, ref) => {
    const [open, setOpen] = useState<boolean>(false);

    // Ref Hooks
    useImperativeHandle(ref, () => ({
        open: open,
        show: () => setOpen(true),
        close: () => setOpen(false),
    }));

    return (
        <Dialog 
            open={open} 
            maxWidth="xs" 
            fullWidth
            onClose={() => setOpen(false)}
            title="PDF Generator"
        >
            <DialogTitle>{props.title ? props.title : "PDF Generator"}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<ClearOutlinedIcon />}
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <LoadingButton
                    variant="outlined"
                    startIcon={<DownloadOutlinedIcon />}
                >
                    Download
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
});

PDFGenerator.displayName = "PDFGenerator";
export default PDFGenerator;
