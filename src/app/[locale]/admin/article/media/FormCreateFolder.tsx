"use client";
import { useImperativeHandle, forwardRef, useState, useCallback } from "react";
import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    FormControl,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import Swal from "sweetalert2";


export interface FormCreateFolderProps {
    open: boolean;
    onClose?: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
    onSave?: (() => void) | undefined;
};

export interface FormCreateFolderRef {

};

interface Store {
    loading: boolean;
};

const initialStore: Store = {
    loading: false,
};

function timeout(ms: number): Promise<never> {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Timeout"));
        }, ms);
    });
};

const FOLDER_NAME_REGEX = /^(?!\s)(?!.*\s$)[a-zA-Z0-9_-](?:[a-zA-Z0-9 _-]{0,48}[a-zA-Z0-9_-])?$/;

export const FormCreateFolder = forwardRef<FormCreateFolderRef, FormCreateFolderProps>((props, ref) => {
    const [store, setStore] = useState<Store>(initialStore);
    const [name, setName] = useState<string>("");

    // Hooks
    useImperativeHandle(ref, () => ({

    }), [store]);

    const cancel = useCallback(() => {
        if (!store.loading) {
            setName("");
            if (props.onClose) props.onClose({}, "backdropClick");
        }
    }, [props, store, setName])


    const save = useCallback(async () => {
        if (FOLDER_NAME_REGEX.test(name)) {
            setStore(pre => ({ ...pre, loading: true }));
            try {
                const result = await Promise.race([          // async process utama
                    timeout(2000),        // 5 detik, ala time.After
                ]);

                console.log("Success:", result);
            } catch (error) {

            } finally {
                setStore(pre => ({ ...pre, loading: false }));
            }
        } else {
            Swal.fire({
                title: "Nama Folder Tidak Valid",
                text: "Nama folder hanya boleh berisi huruf, angka, spasi, tanda hubung, dan garis bawah.",
                icon: "error",
                confirmButtonText: "Perbaiki",
                backdrop: true,
                customClass: {
                    container: 'swal-high-z',
                },
            });
        }
    }, [name, setName, setStore]);

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth={"xs"}
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
            <DialogTitle textAlign={"center"}>Create New Folder</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <Typography sx={{ mb: 0.5 }}>Name</Typography>
                    <TextField
                        size="small"
                        placeholder="Folder name"
                    />
                </FormControl>
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
                    onClick={save}
                    loading={store.loading}
                    startIcon={<DriveFolderUploadOutlinedIcon />}
                >
                    Save
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
});