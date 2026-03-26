"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from "@mui/material";
import { AccountButton } from "./AccountButton";
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import logo from "../../assets/image/Logo.png";
import { ButtonBackToTop } from "@/components/button";
import { adminMenu } from "@/config/admin/menu";
import { default as SidebarMenu } from "./SidebarMenu";

const MIN_WIDTH = 200
const MAX_WIDTH = 400
const DEFAULT_WIDTH = 260


export default function LayoutAmdim({
    children
}: {
    children: ReactNode;
}) {
    const [open, setOpen] = useState(true);
    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [dragging, setDragging] = useState(false);

    const startX = useRef(0)
    const startWidth = useRef(0)
    const resizing = useRef(false)

    const startResize: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        setDragging(true);
        resizing.current = true
        startX.current = e.clientX
        startWidth.current = width

        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
        document.body.style.pointerEvents = "none";
    };

    const stopResize = () => {
        resizing.current = false
        setDragging(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.body.style.pointerEvents = "";
    };

    const resize = (e: MouseEvent) => {
        if (!resizing.current) return

        const dx = e.clientX - startX.current
        const newWidth = startWidth.current + dx

        if (newWidth > MIN_WIDTH && newWidth < MAX_WIDTH) {
            requestAnimationFrame(() => {
                setWidth(newWidth)
            })
        }
    };

    // Component Hooks
    useEffect(() => {
        window.addEventListener("mousemove", resize)
        window.addEventListener("mouseup", stopResize)

        return () => {
            window.removeEventListener("mousemove", resize)
            window.removeEventListener("mouseup", stopResize)
        }
    }, [])

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <ButtonBackToTop />

            {/* TOPBAR */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    ml: open ? `${width}px` : 0,
                    width: open ? `calc(100% - ${width}px)` : "100%",
                    backgroundColor: "#fff",
                    color: "#000",
                    borderBottom: "1px solid #e5e7eb"
                }}
            >
                <Toolbar sx={{ minHeight: 64 }} >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            {
                                open ? null :
                                    <IconButton
                                        color="inherit"
                                        onClick={() => setOpen(!open)}
                                        edge="start"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                            }
                            <Typography variant="h6" sx={{ pl: 2 }}>
                                { location.href }
                            </Typography>
                        </Box>
                        <AccountButton />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* SIDEBAR */}
            {open && (
                <Drawer
                    variant="persistent"
                    open={open}
                    sx={{
                        width,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width,
                            display: "flex",
                            flexDirection: "column",
                            height: "100vh",
                            boxSizing: "border-box",
                            transition: resizing.current ? "none" : "width 0.15s ease",
                            borderRight: "none",
                            backgroundColor: "#f9fafc",
                        }
                    }}

                >
                    <Box
                        sx={{
                            position: "fixed",
                            top: 18,
                            left: open ? width - 14 : -14,
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "#fff",
                            border: "1px solid #ddd",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            zIndex: 2000,
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        <ChevronLeftIcon
                            sx={{
                                transform: open ? "rotate(0deg)" : "rotate(180deg)",
                                transition: "transform .2s"
                            }}
                            fontSize="small"
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            px: 1,
                            py: 1.2,
                        }}
                    >
                        <Box
                            sx={{
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={"/assets/image/Logo.png"}
                                alt="logo"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </Box>
                        <Typography fontSize={"1.2rem"} fontWeight={"bold"} sx={{ mt: 0.2 }}>Jasakode Panel</Typography>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto"
                        }}
                    >
                        <SidebarMenu 
                            menu={adminMenu}
                        />
                    </Box>

                    {/* RESIZE HANDLE */}
                    <Box
                        onMouseDown={startResize}
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: 8,
                            cursor: "col-resize",
                            borderRight: "2px solid",
                            borderColor: dragging ? "#3b82f6" : "#d1d5db98",
                            transition: "border-color .15s",
                            "&:hover": {
                                borderColor: dragging ? "#055ff1" : "#2765c3b7"
                            }
                        }}
                    />
                </Drawer>
            )
            }

            {/* CONTENT */}
            <Box component="main" sx={{ flex: 1 }}>
                <Toolbar sx={{ minHeight: 64 }} />
                {children}
            </Box>
        </Box >
    )
};