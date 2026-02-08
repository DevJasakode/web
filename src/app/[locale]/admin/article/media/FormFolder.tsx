"use client";
import { useImperativeHandle, forwardRef, useState, useCallback } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
} from "@mui/material";
import { Dropzone } from "@/components/form/Dropzone";
import { LoadingButton } from "@mui/lab";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';


export interface FormFolderProps {
    open: boolean;
    onClose?: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
};

export interface FormFolderRef {

};

interface Store {
    loading: boolean;
};

const initialStore: Store = {
    loading: false,
};

export const FormFolder = forwardRef<FormFolderRef, FormFolderProps>((props, ref) => {
    const [store, setStore] = useState<Store>(initialStore);

    // Hooks
    useImperativeHandle(ref, () => ({

    }), [store]);


    const cancel = useCallback(() => {
        if (!store.loading) {
            if (props.onClose) props.onClose({}, "backdropClick");
        }
    }, [store]);

    const upload = useCallback(() => {

    }, []);

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth={"sm"}
            fullWidth
            sx={{
                '& .MuiDialog-container': {
                    alignItems: 'flex-start', // pindah ke atas
                },
            }}
            slotProps={{
                paper: {
                    sx: {
                        mt: {
                            xs: 4,  // mobile (theme.spacing(2))
                            sm: 12,  // desktop
                        },
                    },
                }
            }}
        >
            <DialogTitle textAlign={"center"}>Upload Folder</DialogTitle>
            <DialogContent>
                <Dropzone />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={cancel}
                    disabled={store.loading}
                    startIcon={<ClearOutlinedIcon />}
                >
                    Cancel
                </Button>
                <LoadingButton
                    variant="contained"
                    color="primary"
                    onClick={upload}
                    loading={store.loading}
                    startIcon={<DriveFolderUploadOutlinedIcon />}
                >
                    Upload
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
});