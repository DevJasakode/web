import { useState } from "react";
import {
    Avatar,
    Box,
    Typography,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function AccountButton() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box
                onClick={handleOpen}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    px: 1,
                    py: 0.5,
                    "&:hover": {
                        backgroundColor: "action.hover"
                    }
                }}
            >
                {/* Avatar */}
                <Avatar
                    sx={{
                        width: 36,
                        height: 36
                    }}
                >
                    JD
                </Avatar>

                {/* Text */}
                <Box sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }} fontWeight={"bold"}>
                        John Doe
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ lineHeight: 1 }}
                    >
                        Administrator
                    </Typography>
                </Box>

                {/* Arrow */}
                <KeyboardArrowDownIcon
                    sx={{
                        ml: 1,
                        transition: "transform 0.2s",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                />
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            minWidth: 300,
                            borderRadius: 0
                        }
                    }
                }}
            >

                {/* Header User */}
                <Box
                    sx={{
                        px: 2,
                        py: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center"
                    }}
                >
                    <Avatar sx={{ width: 56, height: 56, mb: 1 }}>
                        JD
                    </Avatar>

                    <Typography variant="subtitle1" fontWeight={600}>
                        John Doe
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        Administrator
                    </Typography>
                </Box>

                <MenuItem onClick={handleClose} sx={{ gap: 1.5 }}>
                    <PersonOutlineIcon fontSize="small" />
                    Profile
                </MenuItem>

                <MenuItem onClick={handleClose} sx={{ gap: 1.5 }}>
                    <SettingsOutlinedIcon fontSize="small" />
                    Settings
                </MenuItem>

                <Divider />

                <MenuItem
                    sx={{
                        gap: 1.5,
                        color: "error.main",
                        "& .MuiSvgIcon-root": {
                            color: "error.main"
                        }
                    }}
                >
                    <LogoutIcon fontSize="small" />
                    Logout
                </MenuItem>

            </Menu>
        </>
    );
}