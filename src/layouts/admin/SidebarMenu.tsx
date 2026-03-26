"use client";

import { Fragment, useCallback, useEffect } from "react"
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    List,
} from "@mui/material"
import { AdminMenu } from "@/config/admin/menu";
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { useState } from "react";
import { SxProps, Theme } from "@mui/material";
import { Locale, locales } from "@/i18n/config";
import { usePathname } from "next/navigation";
import { SmartLink } from "@/components/link";


function normalizeToRoutePattern(pathname: string) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    // kalau segment pertama adalah locale
    if (locales.includes(segments[0] as Locale)) {
        segments[0] = "[locale]";
    }

    return "/" + segments.join("/");
};

function getMenuPathCodes(
    menus: AdminMenu[],
    targetCode: string
): string[] {
    const path: string[] = [];

    function dfs(items: AdminMenu[], currentPath: string[]): boolean {
        for (const item of items) {
            const newPath = [...currentPath, item.code];

            if (item.code === targetCode) {
                path.push(...newPath);
                return true;
            }

            if (item.children && dfs(item.children, newPath)) {
                return true;
            }
        }
        return false;
    }

    dfs(menus, []);
    return path;
};

const getFontWeight = (level: number) => {
    const weight = 700 - level * 100;
    return Math.max(400, Math.min(700, weight));
};

const getMenuStyle = (level: number, isOpen: boolean) => {
    const fontWeight = Math.max(400, 700 - level * 100);

    const colors = [
        { color: "#111827", bg: "transparent" }, // level 0
        { color: "#1f2937", bg: "#f9fafb" },     // level 1
        { color: "#374151", bg: "#f3f4f6" },     // level 2
        { color: "#4b5563", bg: "#f3f4f6" },     // level 3+
    ];

    const selectedColors = {
        color: "#4338ca",
        bg: "#eef2ff",
        hover: "#e0e7ff"
    };

    const c = colors[level] || colors[colors.length - 1];

    const baseBg = c.bg;

    return {
        fontWeight,
        color: c.color,
        backgroundColor: isOpen ? selectedColors.bg : baseBg,

        // padding left berdasarkan level (MUI spacing unit)
        pl: (level * 4) + 2,

        "&:hover": {
            backgroundColor: isOpen
                ? selectedColors.hover
                : "#f3f4f6"
        },

        "&.Mui-selected": {
            backgroundColor: selectedColors.bg,
            color: selectedColors.color
        },

        "&.Mui-selected:hover": {
            backgroundColor: selectedColors.hover
        }
    };
};

function MenuItem({
    label,
    icon,
    desc,
    code,
    path,
    children,

    sx,
    setCollapse,
    collapse,
    active,
    level = 0,
}: AdminMenu & {
    collapse: AdminMenu["code"][];
    setCollapse(value: AdminMenu["code"], level: number): void;
    active?: AdminMenu["path"];
    level: number;
    sx: SxProps<Theme> | undefined;
}) {
    const hasChildren = Boolean(children)

    return (
        <Fragment>
            {
                path ?
                    <SmartLink href={{ pathname: path }}>
                        <ListItemButton
                            selected={path && path === active ? true : false}
                            onClick={(ev) => {
                                if (hasChildren && setCollapse) setCollapse(code, level);
                            }}
                            sx={{
                                minHeight: 40,
                                borderRadius: 1,
                                pl: (level * 4) + 2,
                                ...sx,

                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 36,
                                    color: "inherit"
                                }}
                            >
                                {icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={label}
                                slotProps={{
                                    primary: {
                                        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                                        fontSize: 15 - (level * 1),
                                        fontWeight: getFontWeight(level),
                                    }
                                }}
                            />
                            {hasChildren && (collapse.includes(code) ? <ExpandLess /> : <ExpandMore />)}
                        </ListItemButton>
                    </SmartLink> :
                    <ListItemButton
                        selected={path && path === active ? true : false}
                        onClick={(ev) => {
                            if (hasChildren && setCollapse) setCollapse(code, level);
                        }}
                        sx={{
                            minHeight: 40,
                            borderRadius: 1,
                            pl: (level * 4) + 2,
                            ...sx,

                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 36,
                                color: "inherit"
                            }}
                        >
                            {icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={label}
                            slotProps={{
                                primary: {
                                    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                                    fontSize: 15 - (level * 1),
                                    fontWeight: getFontWeight(level),
                                }
                            }}
                        />
                        {hasChildren && (collapse.includes(code) ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
            }
            {hasChildren && (
                <Collapse in={collapse.includes(code)} timeout="auto" unmountOnExit >
                    {
                        children?.map((item, i) => (
                            <MenuItem
                                key={i}
                                {...item}
                                active={active}
                                sx={{ ...sx, ...getMenuStyle(level + 1, collapse.includes(code)) }}
                                level={level + 1}
                                collapse={collapse}
                                setCollapse={setCollapse}
                            />
                        ))
                    }
                </Collapse>
            )}
        </Fragment>
    )
};

export default function SidebarMenuItem({
    menu
}: {
    menu: AdminMenu[];
}) {
    const [collapse, setCollapse] = useState<AdminMenu["code"][]>([]);
    const [active, setActive] = useState<AdminMenu["path"]>(undefined);
    const pathname = usePathname();

    const handlerCollapse = useCallback((code: AdminMenu["code"]) => {
        if (collapse.includes(code)) {
            setCollapse(pre => (pre.filter(i => (i !== code))));
        } else {
            setCollapse(getMenuPathCodes(menu, code));
            // setActive(undefined);
        }
    }, [collapse, setCollapse]);

    // Hooks
    useEffect(() => {
        const route = normalizeToRoutePattern(pathname);
        function dfs(items: AdminMenu[]) {
            for (const item of items) {
                if (route == item.path) {
                    setActive(item.path);
                    setCollapse(getMenuPathCodes(menu, item.code));
                };
                if (item.children) dfs(item.children);
            }
        };
        dfs(menu);
    }, [pathname]);


    return (
        <List>
            {
                menu.map((item, i) => (
                    <MenuItem
                        key={i}
                        {...item}
                        level={0}
                        active={active}
                        collapse={collapse}
                        setCollapse={handlerCollapse}
                        sx={getMenuStyle(0, collapse.includes(item.code))}
                    />
                ))
            }
        </List>
    )
}