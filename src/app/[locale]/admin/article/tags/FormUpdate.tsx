"use client";

import {
    Dialog,
    Button,
    DialogActions,
    DialogContent,
} from "@mui/material";
import { useCallback, useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { LoadingButton } from "@mui/lab";
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import { ArticleTag } from "@/models/ArticleTag";
import { Form as ArticleTagForm } from "@/api/article/tags/route";

interface FormUpdateProps {
    open: boolean;
    data?: ArticleTag;
    onClose?(): void;
    onCancel?(): void;
    onUpdated?(): void;
};



export function FormUpdate({
    data,
    onClose
}: FormUpdateProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [form, setForm] = useState<ArticleTagForm>({
        name: data?.name || "",
        slug: data?.slug || "",
        desc: data?.desc || "",
    });

    const cancel = useCallback(() => {

    }, [setLoading]);

    const save = useCallback(() => {
        try {
            setLoading(true);

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }, [setLoading]);

    return (
        <Dialog open
            onClose={onClose}
        >
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CloseOutlinedIcon />}
                >
                    Cancel
                </Button>
                <LoadingButton
                    variant="contained"
                    color="primary"
                    startIcon={<BookmarkAddedOutlinedIcon />}
                    loading={loading}
                >
                    Update
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
};

