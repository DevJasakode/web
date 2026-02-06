"use client";

import {
    Box
} from "@mui/material";
import { ButtonThemeToggle } from "@/components/button";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { ButtonBase } from "@mui/material";
import { useTheme } from "@/context";

interface Props {
    explorer: boolean;
    openExplorer?(): void;
    closeExplorer?(): void;
};

export function AdminNavigation(props: Props) {
    const { setMode, mode } = useTheme();


    return (
        <Box
            component="nav"
            sx={(theme) => ({
                backgroundColor:
                    theme.palette.mode === 'dark'
                        ? theme.palette.grey[800]
                        : theme.palette.grey[200],
                height: '60px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
            })}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <ButtonBase
                    onClick={() => {
                        if (props.explorer && props.closeExplorer) {
                            props.closeExplorer();
                        } else if (props.openExplorer) {
                            props.openExplorer();
                        }
                    }}
                    sx={(theme) => ({
                        px: 1,
                        py: 1,
                        borderRadius: 1,
                        color: theme.palette.text.primary,
                        transition: theme.transitions.create("background-color", {
                            duration: theme.transitions.duration.shortest,
                        }),
                        "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                        },
                    })}
                >
                    {props.explorer ? <MenuOpenOutlinedIcon /> : <MenuOutlinedIcon />}
                </ButtonBase>

                <Box
                    sx={(theme) => ({
                        backgroundColor:
                            theme.palette.mode === 'dark'
                                ? theme.palette.grey[800]
                                : theme.palette.grey[200],
                        color: theme.palette.text.primary,
                        px: 2,
                        py: 0.5,
                        borderRadius: 999,
                        fontSize: 14,
                        fontWeight: 500,
                    })}
                >
                    {mode}
                </Box>

                <p style={{ marginLeft: 20 }} className="text-green-700 dark:text-red-600">{mode}</p>
            </Box>
            <div>
                <ButtonThemeToggle mode={mode} changeMode={(mode) => setMode(mode)} />
            </div>
        </Box>
    )
}