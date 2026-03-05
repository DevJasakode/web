"use client";

import { useState, MouseEvent, useCallback } from 'react';
import {
    Button,
    Box,
    Typography,
    ClickAwayListener,
    Dialog,
    DialogContent,
    Grid,
    Paper,
    Popper,
} from '@mui/material';
import { useI18n, languages } from "@/i18n";
import { defaultLanguage, Language } from "@/i18n/config";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';


function DialogLanguageSelector() {
    return (
        <Dialog open fullWidth maxWidth="md">
            <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    {languages.map((item, i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i} sx={{ display: "flex" }}>
                            <Box
                                sx={{
                                    p: 2,
                                    width: "100%",
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    bgcolor: "background.paper",
                                    cursor: "pointer",
                                    transition: "all .15s ease",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1.5,

                                    "&:hover": {
                                        borderColor: "primary.main",
                                        transform: "translateY(-2px)",
                                        boxShadow: 3,
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5
                                    }}
                                >
                                    <Box
                                        sx={{
                                            fontSize: "1.8rem",
                                            lineHeight: 1
                                        }}
                                    >
                                        {item.flag}
                                    </Box>

                                    <Typography fontWeight={700} fontSize="1.2rem">
                                        {item.code}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography fontSize="0.9rem" color="text.secondary">
                                        {item.englishName}
                                    </Typography>
                                    <Typography fontWeight={500}>
                                        {item.nativeName}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export function ButtonLanguageSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { locale } = useI18n();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const language = languages.find(item => (item.code == locale)) || defaultLanguage;
    const open = Boolean(anchorEl);


    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleSelect = useCallback((value: Language) => {
        handleClose();

        const segments = pathname.split('/').filter(Boolean);
        segments[0] = value.code; // ganti prefix bahasa

        const newPath =
            '/' +
            segments.join('/') +
            (searchParams.toString()
                ? `?${searchParams.toString()}`
                : '');
        router.replace(newPath);
    }, [router, pathname, searchParams, handleClose]);

    return (
        <Box>
            {/* <DialogLanguageSelector /> */}
            <Button
                id="btn-language"
                onClick={handleOpen}
                aria-controls={open ? 'language-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                startIcon={
                    language.flag || language.code
                }
                sx={{
                    textTransform: 'none',
                    px: 1,
                    py: 0.5,
                    minWidth: 'auto',
                }}
            >
                <Typography
                    fontWeight="bold"
                    fontSize={"0.8rem"}
                >
                    {language.code.toUpperCase()}
                </Typography>
            </Button>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
                modifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 12],
                        },
                    },
                ]}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper
                        sx={{
                            width: 640,
                            maxHeight: 420,
                            overflowY: "auto",
                            p: 2,
                            borderRadius: 2
                        }}
                    >
                        <Grid container spacing={2}>
                            {languages.map((item, i) => (
                                <Grid size={{ xs: 3 }} key={i}>
                                    <Box
                                        onClick={() => handleSelect(item)}
                                        sx={{
                                            textAlign: "center",
                                            p: 1,
                                            borderRadius: 1,
                                            cursor: "pointer",
                                            transition: "all .15s",

                                            "&:hover": {
                                                bgcolor: "action.hover"
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                fontSize: "1.8rem",
                                                mb: 0.5
                                            }}
                                        >
                                            {item.flag}
                                        </Box>

                                        <Typography fontSize="0.8rem">
                                            {item.nativeName}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </Box>
    );
};