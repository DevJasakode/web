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
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";


interface Props {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onClose?: (e: MouseEvent | TouchEvent) => void;
};

export const SettingPopover: React.FC<Props> = ({
    onClick,
    onClose,
}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
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
                <SettingsIcon fontSize="small" />
            </IconButton>

            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="right-end"
                modifiers={[
                    { name: "offset", options: { offset: [0, 0] } },
                    // { name: "arrow", options: { element: arrowRef } },
                ]}
                sx={{ zIndex: 99 }}
            >
                {/* ARROW REAL */}
                <Box
                    ref={setArrowRef}
                    sx={{
                        position: "absolute",
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "rotate(45deg)",
                        left: -5,
                        // top: "50%",
                        bottom: 0,
                    }}
                />
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper
                        sx={{
                            minWidth: 260,
                            maxWidth: 360,
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
                                mx: 0,
                            },
                        }}
                    >
                        <Box>
                            <MenuList dense disablePadding>
                                <MenuItem onClick={() => console.log("profile")}>
                                    <ListItemIcon>
                                        <PersonOutlineIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Command Pallete</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={() => console.log("settings")}>
                                    <ListItemIcon>
                                        <SettingsOutlinedIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Settings</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
};