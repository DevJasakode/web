"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import InputAdornment from "@mui/material/InputAdornment";
import {
    FormControl,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import axios from "axios";



interface Form {
    name: string;
    slug: string;
    desc: string;

    disbale_slug: boolean;
    error_slug: string;
}

const initialForm: Form = {
    name: "",
    slug: "",
    desc: "",

    disbale_slug: false,
    error_slug: "",
};


export function MorphingFormDialog({
    onCreated,
} : {
    onCreated?(): void;
}) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<Form>(initialForm);
    const [fileName, setFileName] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    function createSlug(input: string): string {
        return input
            .toLowerCase()              // paksa huruf kecil
            .replace(/[^a-z\s]/g, "")   // buang karakter selain huruf & spasi
            .trim()                     // hapus spasi depan/belakang
            .replace(/\s+/g, "-");      // spasi (1 atau lebih) → "-"
    };

    const cancel = useCallback(() => {
        setForm(initialForm);
        setFileName("");
        if (inputRef && inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.files = null;
        };
        setOpen(false);
    }, [setOpen]);

    const send = useCallback(() => {
        if (/[^a-z\s]/.test(form.slug)) {
            setForm(pre => ({
                ...pre,
                error_slug: "Karakter tidak valid pada slug"
            }));
            return;
        };


        axios.post("/api/admin/docs", {
            name: form.name,
            slug: form.slug,
            desc: form.desc,
            // logo: inputRef.current?.files?.[0] ?? undefined,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            if(res.status >= 200 && res.status <= 201 && onCreated) onCreated();
            console.log(res.status, res.statusText, res.data);
            cancel();
        }).catch(err => console.error(err));
    }, [form]);

    return (
        <>
            {/* Tombol yang bisa “bertransformasi” */}
            <motion.button
                layoutId="app-launch"
                onClick={() => setOpen(true)}
                whileHover={{ boxShadow: "0px 3px 5px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,

                    height: 36,
                    padding: "0 16px",
                    borderRadius: 4,
                    border: "none",

                    fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.75,
                    letterSpacing: "0.02857em",

                    backgroundColor: "#1976d2", // MUI primary.main
                    color: "#fff",

                    cursor: "pointer",
                    // textTransform: "uppercase",

                    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                }}
            >
                <AddOutlinedIcon style={{ fontSize: 18 }} />
                Create Project
            </motion.button>

            {/* Dialog overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.5)",
                            display: "flex",
                            // alignItems: "center",
                            paddingTop: 100,
                            justifyContent: "center",
                            zIndex: 99,
                        }}
                        autoFocus
                        onClick={() => setOpen(false)}
                    >
                        {/* Kontainer yang “morph” dari tombol ke jendela */}
                        <motion.div
                            layoutId="app-launch"
                            style={{
                                minWidth: 450,
                                maxWidth: 1000,
                                height: "max-content",
                                background: "#fff",
                                borderRadius: 0,
                                padding: 20,
                                pointerEvents: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FormControl fullWidth>
                                <TextField
                                    placeholder="Name"
                                    size="small"
                                    spellCheck={false}
                                    value={form.name}
                                    onFocus={() => setForm(pre => ({ ...pre, disbale_slug: true }))}
                                    onBlur={() => setForm(pre => ({ ...pre, disbale_slug: false }))}
                                    onChange={e => setForm(pre => ({ ...pre, name: e.target.value, slug: createSlug(e.target.value), error_slug: "" }))}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    placeholder="Slug"
                                    size="small"
                                    spellCheck={false}
                                    value={form.slug}
                                    error={form.error_slug.length > 0}
                                    disabled={form.disbale_slug}
                                    onChange={e => setForm(pre => ({ ...pre, slug: e.target.value, error_slug: "" }))}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    multiple={false}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setFileName(file.name);
                                    }}
                                />
                                <TextField
                                    size="small"
                                    spellCheck={false}
                                    value={fileName}
                                    fullWidth
                                    placeholder="Pilih file..."
                                    onClick={() => inputRef.current?.click()}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                            startAdornment: (
                                                <InputAdornment position="end" sx={{ mr: 1 }}>
                                                    <AddPhotoAlternateOutlinedIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                padding: 0,
                                            }
                                        },
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    placeholder="Description..."
                                    size="small"
                                    multiline
                                    minRows={3}
                                    maxRows={10}
                                    spellCheck={false}
                                    value={form.desc}
                                    onChange={e => setForm(pre => ({ ...pre, desc: e.target.value }))}
                                />
                            </FormControl>
                            <Divider sx={{ my: 1 }} />
                            <nav
                                className="flex items-center justify-end gap-2"
                            >
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={cancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={
                                        form.name.length == 0 ||
                                        form.slug.length == 0 ||
                                        form.desc.length == 0
                                    }
                                    onClick={send}
                                >
                                    Create
                                </Button>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};