"use client";
import { useImperativeHandle, forwardRef, useState, useCallback, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
} from "@mui/material";
import { Dropzone, DropzoneRefObject } from "@/components/form/Dropzone";
import { LoadingButton } from "@mui/lab";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios, { AxiosError } from "axios";

export interface FormFileProps {
    open: boolean;
    onClose?: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
};

export interface FormFileRef {

};

interface Store {
    loading: boolean;
};

const initialStore: Store = {
    loading: false,
};

export const FormFile = forwardRef<FormFileRef, FormFileProps>((props, ref) => {
    const [store, setStore] = useState<Store>(initialStore);
    const dropzoneRef = useRef<DropzoneRefObject>(null);

    // Hooks
    useImperativeHandle(ref, () => ({

    }), [store]);


    const cancel = useCallback(() => {
        if (!store.loading) {
            if (props.onClose) props.onClose({}, "backdropClick");
        }
    }, [store]);

    const upload = useCallback(async() => {
        if (dropzoneRef && dropzoneRef.current) {
            const files = dropzoneRef.current.getFiles();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const formData = new FormData();
                formData.set("file", file);

                try {
                    const res = await axios.post("/api/storage", formData, { withCredentials: true });
                    console.log(res)
                } catch (error) {
                    console.error(error)   
                }
            }
        }
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
            <DialogTitle textAlign={"center"}>Upload File</DialogTitle>
            <DialogContent>
                <Dropzone
                    ref={dropzoneRef}
                />
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