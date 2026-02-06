"use client";

import * as React from "react";
import {
    Popper,
    Box,
    Avatar,
    Typography,
    Divider,
    Button,
    Stack,
    IconButton,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Link from "next/link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";


interface Props {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onClose?: (e: MouseEvent | TouchEvent) => void;
};

export const AccountPopover: React.FC<Props> = ({
    onClick,
    onClose,
}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(event);
        setAnchorEl((prev) => (prev ? null : event.currentTarget));
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (onClose) onClose(event);
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton size="small" onClick={handleToggle}>
                <AccountCircleOutlinedIcon fontSize="small" />
            </IconButton>

            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="right-end"
                modifiers={[
                    { name: "offset", options: { offset: [0, 0] } },
                ]}
                sx={{ zIndex: 99 }}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper
                        sx={{
                            width: 260,
                            p: 2,
                            boxShadow: 3,
                            position: "relative",
                            overflow: "visible",
                            borderRadius: 0,
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                left: -6,
                                top: 24,
                                width: 12,
                                height: 12,
                                bgcolor: "background.paper",
                                transform: "rotate(45deg)",
                            },
                            "& .MuiMenuItem-root": {
                                mx: 0.5,
                            },
                        }}
                    >
                        <Box>
                            <Stack alignItems="center" spacing={1}>
                                <Avatar sx={{ width: 64, height: 64 }} />
                                <Typography fontWeight={600}>John Doe</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Frontend Engineer
                                </Typography>
                            </Stack>

                            <Divider sx={{ my: 1 }} />

                            <MenuList dense disablePadding>
                                <MenuItem onClick={() => console.log("profile")}>
                                    <ListItemIcon>
                                        <PersonOutlineIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Profile</ListItemText>
                                </MenuItem>

                                <MenuItem onClick={() => console.log("settings")}>
                                    <ListItemIcon>
                                        <SettingsOutlinedIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Settings</ListItemText>
                                </MenuItem>

                                <Divider />

                                <Link href={"/admin/auth"}>
                                    <MenuItem
                                        onClick={() => console.log("logout")}
                                        sx={{ color: "error.main" }}
                                    >
                                        <ListItemIcon sx={{ color: "error.main" }}>
                                            <LogoutOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Logout</ListItemText>
                                    </MenuItem>
                                </Link>
                            </MenuList>

                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
};
