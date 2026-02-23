import {
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    TextField,
    Typography,
    DialogTitle,
    Stack,
    Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Dropzone, DropzoneRefObject } from "@/components/form/Dropzone";
import { useCallback, useRef, useState } from "react";
import { ArticleCategories } from "@/models/ArticleCategories";
import { Storage } from "@/models/StorageFactory";
import axios, { AxiosError } from "axios";

export interface FormCategoryProps {
    open: boolean;
    parent_id?: number | null;

    onSave?(save: ArticleCategories | null, ev: { status: number, statusText: string }): void;
    onClose?(): void;
    onCancel?(): void;
};


interface Form {
    parent_id?: number | null;
    name: string;
    slug: string;
    logo?: string | null;
    desc: string;
};

const initialForm: Form = {
    name: "",
    slug: "",
    logo: null,
    desc: "",
};

export function FormCategory(props: FormCategoryProps) {
    const [form, setForm] = useState<Form>({ ...initialForm, parent_id: props.parent_id });
    const [loading, setLoading] = useState<boolean>(false);
    const dropzoneRef = useRef<DropzoneRefObject>(null);
    

    const changeForm = useCallback(<K extends keyof Form>(key: K, value: Form[K]) => {
        setForm(pre => ({ ...pre, [key]: value }));
    }, [setForm]);

    const save = useCallback(async () => {
        setLoading(true);
        try {
            const files = dropzoneRef.current?.getFiles();
            const data = form;
            // if(files && files.length > 0) {
            //     const resStorage = await axios.post<Storage | null>("/api/storage/file", data, { withCredentials: true });
            //     if(resStorage.status >= 200 && resStorage.status <= 201 && resStorage.data) {
            //         data.logo = resStorage.data.hash;
            //     }
            // };
            const res = await axios.post<ArticleCategories | null>("/api/article/categories", data, { withCredentials: true });
            if(props.onSave) {
                props.onSave(res.data, { status: res.status, statusText: res.statusText });
            };
        } catch (error) {
            const err: AxiosError = error as AxiosError;
            if(props.onSave) {
                props.onSave(null, { status: err.response?.status || 500, statusText: err.response?.statusText || err.message });
            };
        } finally {
            setLoading(false);
        }
    }, [form, setLoading]);

    return (
        <Dialog
            fullWidth
            maxWidth={"xs"}
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle>Create New Category</DialogTitle>
            <DialogContent>
                <Stack spacing={1.5}>
                    {
                        form.parent_id ?
                            <FormControl>
                                <Typography sx={{ mb: 0.5 }}>Parent Category</Typography>
                                <TextField
                                    size="small"
                                    placeholder="Parent Category"
                                />
                            </FormControl> : null
                    }
                    <FormControl
                        fullWidth
                    >
                        <Typography sx={{ mb: 0.5 }}>Name</Typography>
                        <TextField
                            size="small"
                            placeholder="name"
                            value={form.name}
                            onChange={e => changeForm("name", e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                    >
                        <Typography sx={{ mb: 0.5 }}>Slug</Typography>
                        <TextField
                            size="small"
                            placeholder="slug"
                            value={form.slug}
                            onChange={e => changeForm("slug", e.target.value)}
                        />
                    </FormControl>
                    <Box>
                        <Typography sx={{ mb: 0.5 }}>Logo</Typography>
                        <Dropzone
                            minHeight={130}
                            ref={dropzoneRef}
                        />
                    </Box>
                    <FormControl
                        fullWidth
                    >
                        <Typography sx={{ mb: 0.5 }}>Description</Typography>
                        <TextField
                            size="small"
                            multiline
                            minRows={3}
                            maxRows={10}
                            placeholder="desc..."
                            value={form.desc}
                            onChange={e => changeForm("desc", e.target.value)}
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    variant="outlined"
                    color="error"
                    onClick={props.onCancel}
                >
                    Cancel
                </LoadingButton>
                <LoadingButton
                    variant="contained"
                    color="primary"
                    loading={loading}
                    onClick={save}
                >
                    Save
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
};