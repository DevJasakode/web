"use client";

import { useState, useRef, ReactNode, useCallback } from "react";
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme as MuiUseTheme,
    Slide,
    Paper,
} from "@mui/material";
import { type Activity, type ActivityCode } from "@/config/admin";
import { activitys } from "../config/config";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import SourceIcon from "@mui/icons-material/Source";
import { AdminNavigation } from "../../navigation/AdminNavigation";
import { AccountPopover } from "./AccountPopover";
import { SettingPopover } from "./SettingPopover";
import { useTheme } from "@/context";
import { useEffect } from "react";
import { ButtonThemeToggle, ButtonLanguageSelector, ButtonBackToTop } from "@/components/button";
import { locales, Locale } from "@/i18n/config";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { SmartLink } from "@/components/link";


const ACTIVITY_WIDTH = 48;
const SIDEBAR_MIN = 180;
const SIDEBAR_MAX = 400;


/**
 * ----------------------------------------
 * Helper: generalize locale segment to route pattern
 * ----------------------------------------
 */
function normalizeLocaleRoute(pathname: string): string {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
        return "/[locale]/" + segments.slice(1).join("/");
    }

    return pathname;
};



interface Store {
    activity: ActivityCode; // Active Activity
    show_header: boolean;
    show_explorer: boolean;
};


const initialStore: Store = {
    activity: "Home",
    show_header: true,
    show_explorer: true,
};

export function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { locale } = useParams<{ locale: Locale }>();
    const pathname = usePathname();
    const { setMode, mode } = useTheme();
    const [store, setStore] = useState<Store>(initialStore);
    const editorScrollRef = useRef<HTMLDivElement | null>(null);

    const muiTheme = MuiUseTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
    const [sidebarWidth, setSidebarWidth] = useState(240);

    const resizing = useRef(false);


    const getActiveActivity = (code: ActivityCode): Activity | undefined => {
        return activitys.find(item => (item.code == code));
    };
    const startResize = () => (resizing.current = true);
    const stopResize = () => (resizing.current = false);

    const onResize = (e: React.MouseEvent) => {
        if (!resizing.current) return;
        setSidebarWidth((w) =>
            Math.min(Math.max(w + e.movementX, SIDEBAR_MIN), SIDEBAR_MAX)
        );
    };


    const changeActivity = useCallback((code: ActivityCode) => () => {
        setStore(pre => ({ ...pre, activity: code, show_explorer: true }));
    }, [setStore]);

    /**
     * Hook untuk menangkap kombinasi Ctrl + B.
     * Secara ilmiah: memanfaatkan event keyboard level DOM
     * dengan deteksi state modifier (ctrlKey) dan key code.
     */
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === "b") {
                event.preventDefault();
                if (store.show_explorer) {
                    setStore(pre => ({ ...pre, show_explorer: false }));
                } else {
                    setStore(pre => ({ ...pre, show_explorer: true }));
                }
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [store.show_explorer]);


    useEffect(() => {
        const route = normalizeLocaleRoute(pathname);
        if (route.startsWith("/[locale]")) {
            for (let index = 0; index < activitys.length; index++) {
                if (route.startsWith(activitys[index].prefix || "")) {
                    setStore(pre => ({ ...pre, activity: activitys[index].code }));
                }
            }
        };
    }, [pathname]);

   
    return (
        <Box
            component={Paper}
            sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
            onMouseMove={onResize}
            onMouseUp={stopResize}
        >
            <ButtonBackToTop scrollRef={editorScrollRef} />
            {/* ================= Navigation ================= */}
            {
                store.show_header ?
                    <AppBar position="static" color="default" elevation={0}>
                        <Toolbar
                            variant="dense"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <SmartLink
                                    href={{ pathname: "/[locale]/admin", query: { locale: locale } }}
                                    className="flex items-center gap-1"
                                >
                                    <div className="felx items-center justify-center overflow-hidden">
                                        <img src={"/assets/Logo.png"} alt="Logo" width={28} />
                                    </div>
                                    <Typography variant="body2" fontWeight={"bold"} fontSize={"1.2rem"}>Jasakode Admin</Typography>
                                </SmartLink>
                            </div>
                            <div className="flex items-center justify-end gap-1">
                                <ButtonLanguageSelector />
                                <ButtonThemeToggle mode={mode} changeMode={(mode) => setMode(mode)} />
                            </div>
                        </Toolbar>
                    </AppBar> : null
            }

            {/* ================= Workspace ================= */}
            <Box
                // sx={{ flex: 1, display: "flex", position: "relative" }}
                sx={{
                    flex: 1,
                    display: "flex",
                    position: "relative",
                    overflow: "hidden", // ← kunci kedua
                }}
            >
                {/* Activity Bar (desktop) */}
                {!isMobile && (
                    <Box
                        sx={{
                            width: ACTIVITY_WIDTH,
                            bgcolor: muiTheme.palette.background.paper,
                            borderRight: `1px solid ${muiTheme.palette.divider}`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            pt: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center", // kunci agar icon tetap bulat
                            }}
                        >
                            {activitys.map((item, i) => (
                                <IconButton
                                    key={i}
                                    size="small"
                                    color={store.activity === item.code ? "primary" : "default"}
                                    onClick={changeActivity(item.code)}
                                    sx={{
                                        mb: 0.5,
                                    }}
                                    title={item.code.toUpperCase()}
                                >
                                    {item.logo}
                                </IconButton>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                pb: 2,
                                gap: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center", // kunci agar icon tetap bulat
                            }}
                        >
                            <AccountPopover />
                            <SettingPopover />
                        </Box>
                    </Box>
                )}

                {/* Sidebar */}
                <Slide
                    direction="right"
                    in={store.show_explorer}
                    mountOnEnter
                    unmountOnExit
                    timeout={220}
                >
                    <Box
                        sx={{
                            width: isMobile ? "70%" : sidebarWidth,
                            position: isMobile ? "absolute" : "relative",
                            zIndex: 10,
                            bgcolor: muiTheme.palette.background.default,
                            borderRight: `1px solid ${muiTheme.palette.divider}`,
                            height: "100%",
                            display: "flex",
                        }}
                    >
                        <Box sx={{ flex: 1, py: 1 }}>
                            {
                                getActiveActivity(store.activity)?.explorer
                            }
                        </Box>

                        {!isMobile && (
                            <Box
                                onMouseDown={startResize}
                                sx={{
                                    width: 4,
                                    cursor: "col-resize",
                                    bgcolor: "transparent",
                                    "&:hover": {
                                        bgcolor: muiTheme.palette.primary.main,
                                    },
                                }}
                            />
                        )}
                    </Box>
                </Slide>

                {/* Editor View */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden", // ← jangan scroll di sini
                    }}
                >
                    {
                        store.show_header ?
                            null :
                            <AdminNavigation
                                explorer={store.show_explorer}
                                openExplorer={() => setStore(pre => ({ ...pre, show_explorer: true }))}
                                closeExplorer={() => setStore(pre => ({ ...pre, show_explorer: false }))}
                            />
                    }

                    {/* SCROLL CONTAINER */}
                    <Box
                        ref={editorScrollRef}
                        sx={{
                            flex: 1,
                            overflowY: "auto", // ← SCROLL HANYA DI SINI
                            p: 2,
                            bgcolor: muiTheme.palette.background.paper,
                        }}
                    >
                        {children}
                    </Box>
                </Box>

            </Box>

            {/* Activity Bar (mobile bottom) */}
            {isMobile && (
                <Box
                    sx={{
                        height: 48,
                        display: "flex",
                        justifyContent: "space-around",
                        borderTop: `1px solid ${muiTheme.palette.divider}`,
                        bgcolor: muiTheme.palette.background.paper,
                    }}
                >
                    {[FolderIcon, SearchIcon, SourceIcon].map((Icon, i) => (
                        <IconButton
                            key={i}
                        >
                            <Icon fontSize="small" />
                        </IconButton>
                    ))}
                </Box>
            )}
        </Box>
    );
};