"use client";

import { useState, MouseEvent, useCallback } from 'react';
import {
    Button,
    Menu,
    MenuItem,
    Box,
    Typography,
    ListItemIcon,
} from '@mui/material';
import { useI18n, languages } from "@/i18n";
import { defaultLanguage, Language } from "@/i18n/config";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';


export function ButtonLanguageSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { locale } = useI18n();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const language = languages.find(item => (item.code == locale)) || defaultLanguage;
    const open = Boolean(anchorEl);

    // languages.find(item => (item.code == locale))

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

            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'left',
                // }}
                // transformOrigin={{
                //     vertical: 'top',
                //     horizontal: 'left',
                // }}
                sx={{
                    mt: 1,
                }}
                slotProps={{
                    paper: {
                        sx: {
                            maxHeight: 300,
                            overflowY: "auto",
                        },
                    }
                }}
            >
                {
                    languages.map((item, i) => (
                        <MenuItem onClick={() => handleSelect(item)} key={i}>
                            <ListItemIcon>
                                {item.flag || item.code}
                            </ListItemIcon>
                            {item.nativeName}
                        </MenuItem>
                    ))
                }
            </Menu>
        </Box>
    );
};