import { useState, Fragment, useEffect } from "react";
import { SmartLink } from "@/components/link";
import { useParams, usePathname } from "next/navigation";
import {
    Box,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Locale, locales } from "@/i18n/config";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";


export type AdminExplorerMenuItem = {
    id: string;
    path?: string;
    label: string;
    icon: React.ReactNode;
    children?: AdminExplorerMenuItem[];
};

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


function openMenuByRoute(
    items: AdminExplorerMenuItem[],
    route: string,
    setOpen: (id: string) => void
): boolean {
    for (const item of items) {
        // cocok langsung
        if (item.path === route) {
            setOpen(item.id);
            return true;
        }

        // cek children
        if (item.children) {
            const foundInChild = openMenuByRoute(item.children, route, setOpen);
            if (foundInChild) {
                // kalau child cocok, parent ikut dibuka
                setOpen(item.id);
                return true;
            }
        }
    }
    return false;
}


export function AdminExplorer({
    menuData,
}: {
    menuData: AdminExplorerMenuItem[]
}) {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const params = useParams<{ locale: Locale }>();

    const toggleMenu = (id: string) => {
        setOpenMenus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Hooks
    useEffect(() => {
        const route = normalizeLocaleRoute(pathname);

        if (!route.startsWith("/[locale]")) return;

        openMenuByRoute(menuData, route, (id) => {
            setOpenMenus((prev) => ({
                ...prev,
                [id]: true,
            }));
        });
    }, [pathname, menuData]);



    return (
        <List disablePadding>
            {menuData.map((menu) => {
                const hasChildren = Boolean(menu.children?.length);
                const isOpen = openMenus[menu.id];

                return (
                    <Box key={menu.id}>
                        {/* ===== Parent Menu ===== */}
                        {
                            menu.path ?
                                <SmartLink
                                    href={{
                                        pathname: menu.path,
                                        query: {
                                            locale: params.locale,
                                        }
                                    }}
                                >
                                    <ListItemButton
                                        onClick={() => hasChildren && toggleMenu(menu.id)}
                                        sx={(theme) => ({
                                            px: 0.75, // atau bahkan 0.5
                                            py: 0.5,
                                            borderRadius: 1,
                                            color: isOpen ? theme.palette.text.primary : theme.palette.text.secondary,
                                            "&:hover": {
                                                backgroundColor: theme.palette.action.hover,
                                            },
                                        })}

                                    >
                                        <ListItemIcon
                                            sx={(theme) => ({
                                                minWidth: 24,
                                                color: theme.palette.text.secondary,
                                            })}
                                        >
                                            {menu.icon}
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={menu.label}
                                            primaryTypographyProps={{
                                                fontSize: 14,
                                            }}
                                        />

                                        {hasChildren &&
                                            (isOpen ? (
                                                <ExpandLessIcon fontSize="small" />
                                            ) : (
                                                <ExpandMoreIcon fontSize="small" />
                                            ))}
                                    </ListItemButton>
                                </SmartLink> :
                                <ListItemButton
                                    onClick={() => hasChildren && toggleMenu(menu.id)}
                                    sx={(theme) => ({
                                        px: 0.75, // atau bahkan 0.5
                                        py: 0.5,
                                        borderRadius: 1,
                                        color: isOpen ? theme.palette.text.primary : theme.palette.text.secondary,
                                        "&:hover": {
                                            backgroundColor: theme.palette.action.hover,
                                        },
                                    })}
                                >
                                    <ListItemIcon
                                        sx={(theme) => ({
                                            minWidth: 24,
                                            color: theme.palette.text.secondary,
                                        })}
                                    >
                                        {menu.icon}
                                    </ListItemIcon>

                                    <ListItemText
                                        primary={menu.label}
                                        slotProps={{
                                            primary: {
                                                fontSize: 14,
                                            }
                                        }}
                                    />

                                    {hasChildren &&
                                        (isOpen ? (
                                            <ExpandLessIcon fontSize="small" />
                                        ) : (
                                            <ExpandMoreIcon fontSize="small" />
                                        ))}
                                </ListItemButton>
                        }

                        {/* ===== Children Menu ===== */}
                        {hasChildren && (
                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                <List disablePadding>
                                    {menu.children!.map((child) => {
                                        const isChildrenOpen = openMenus[child.id];
                                        return (
                                            <Fragment key={child.id}>
                                                {
                                                    child.path ?
                                                        <SmartLink
                                                            href={{
                                                                pathname: child.path,
                                                                query: {
                                                                    locale: params.locale,
                                                                }
                                                            }}
                                                        >
                                                            <ListItemButton
                                                                key={child.id}
                                                                sx={(theme) => ({
                                                                    px: 0.75, // atau bahkan 0.5
                                                                    py: 0.5,
                                                                    pl: 3,
                                                                    borderRadius: 1,
                                                                    color: isChildrenOpen ? theme.palette.text.primary : theme.palette.text.secondary,
                                                                    "&:hover": {
                                                                        backgroundColor: theme.palette.action.hover,
                                                                    },
                                                                })}
                                                            >
                                                                <ListItemIcon
                                                                    sx={(theme) => ({
                                                                        minWidth: 20,
                                                                        color: theme.palette.text.disabled,
                                                                    })}
                                                                >
                                                                    {child.icon}
                                                                </ListItemIcon>

                                                                <ListItemText
                                                                    primary={child.label}
                                                                    slotProps={{
                                                                        primary: {
                                                                            fontSize: 13,
                                                                            pl: 1,
                                                                        }
                                                                    }}
                                                                />
                                                            </ListItemButton>
                                                        </SmartLink> :
                                                        <ListItemButton
                                                            key={child.id}
                                                            sx={(theme) => ({
                                                                px: 0.75, // atau bahkan 0.5
                                                                py: 0.5,
                                                                pl: 3,
                                                                borderRadius: 1,
                                                                color: isChildrenOpen ? theme.palette.text.primary : theme.palette.text.secondary,
                                                                "&:hover": {
                                                                    backgroundColor: theme.palette.action.hover,
                                                                },
                                                            })}
                                                        >
                                                            <ListItemIcon
                                                                sx={(theme) => ({
                                                                    minWidth: 20,
                                                                    color: theme.palette.text.disabled,
                                                                })}
                                                            >
                                                                {child.icon}
                                                            </ListItemIcon>

                                                            <ListItemText
                                                                primary={child.label}
                                                                slotProps={{
                                                                    primary: {
                                                                        fontSize: 13,
                                                                        pl: 1,
                                                                    }
                                                                }}
                                                            />
                                                        </ListItemButton>
                                                }
                                            </Fragment>
                                        )
                                    })}
                                </List>
                            </Collapse>
                        )}
                    </Box>
                );
            })}
        </List>
    );
};


