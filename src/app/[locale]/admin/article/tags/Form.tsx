"use client";
import { useState, useCallback, forwardRef, useImperativeHandle, useEffect } from "react";
import {
    Box,
    Stack,
    FormControl,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ArticleTag } from "@/models/ArticleTag";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";



interface Store {
    open: boolean;
    loading: boolean;
};

const initialStore: Store = {
    open: false,
    loading: false,
};

type FormArticleTag = {
    name: ArticleTag["name"];
    slug: ArticleTag["slug"];
    desc: ArticleTag["desc"];
};

const initialForm: FormArticleTag = {
    name: "",
    slug: "",
    desc: "",
};


interface FormTagsProps {
    onCancel?(): void;
    onClose?(): void;
    onSuccess?(): void;
};

interface FormTagsRef {
    open(): void;
};

const FormTags = forwardRef<FormTagsRef, FormTagsProps>((props, ref) => {
    const [store, setStore] = useState<Store>(initialStore);
    const [form, setForm] = useState<FormArticleTag>(initialForm);


    const cancel = useCallback(() => {
        setForm(initialForm);
        setStore(pre => ({ ...pre, open: false }));
        if (ref && props.onCancel) props.onCancel();
    }, [props, ref, setStore, setForm]);

    const close = useCallback(() => {
        setStore(pre => ({ ...pre, open: false }));
        if (ref && props.onClose) props.onClose();
    }, [props, ref, setStore, setForm]);

    const save = useCallback(async () => {
        try {
            const res = await axios.post("/api/article/tags", form, { withCredentials: true });
            Swal.fire({
                title: "Success",
                text: res.statusText,
                icon: "success",
                confirmButtonText: "Close",
                backdrop: true,
                customClass: {
                    container: 'swal-high-z',
                },
            }).then(() => {
                if(props.onSuccess) {
                    setStore(pre => ({ ...pre, open: false }));
                    setForm(initialForm);
                    props.onSuccess();
                };
            });
        } catch (error) {
            const err: AxiosError = error as AxiosError;
            Swal.fire({
                title: "Failed",
                text: err.response?.statusText || err.message,
                icon: "error",
                confirmButtonText: "Ok",
                backdrop: true,
                customClass: {
                    container: 'swal-high-z',
                },
            });
        }
    }, [form, props, ref, setStore, setForm]);

    // Hooks
    useImperativeHandle(ref, () => ({
        open() {
            setStore(pre => ({ ...pre, open: true }));
        },
    }), [setStore]);




    return (
        <Dialog
            fullWidth
            open={store.open}
            onClose={close}
            maxWidth={"xs"}
        >
            <DialogTitle>Create New Article Tag</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <FormControl>
                        <Typography sx={{ mb: 0.5 }}>Name</Typography>
                        <TextField
                            size="small"
                            placeholder="Name..."
                            value={form.name}
                            onChange={e => setForm(pre => ({ ...pre, name: e.target.value }))}
                        />
                    </FormControl>
                    <FormControl>
                        <Typography sx={{ mb: 0.5 }}>Slug</Typography>
                        <TextField
                            size="small"
                            placeholder="Slug..."
                            value={form.slug}
                            onChange={e => setForm(pre => ({ ...pre, slug: e.target.value }))}
                        />
                    </FormControl>
                    <FormControl>
                        <Typography sx={{ mb: 0.5 }}>Desc</Typography>
                        <TextField
                            size="small"
                            placeholder="Description..."
                            value={form.desc}
                            onChange={e => setForm(pre => ({ ...pre, desc: e.target.value }))}
                            multiline
                            minRows={3}
                            maxRows={10}
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CloseOutlinedIcon />}
                    onClick={cancel}
                >
                    Cancel
                </Button>
                <LoadingButton
                    variant="contained"
                    color="primary"
                    startIcon={<SaveAsOutlinedIcon />}
                    onClick={save}
                    loading={store.loading}
                >
                    Save
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
});

FormTags.displayName = "FormTags";
export { FormTags, type FormTagsRef };