"use client";

import { useState } from 'react';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Dialog,
    TextField,
    InputAdornment,
    ListSubheader,
} from '@mui/material';
import { ButtonThemeToggle } from '@/components/button';
import { useTheme } from '@/context';
import SearchIcon from '@mui/icons-material/Search';

// Components
import {
    DefaultCodeBlock,
    Alert,
} from '@/components/docs';



const drawerWidth = 260;


export default function Docs() {
    const { mode, setMode } = useTheme();
    const [openSearch, setOpenSearch] = useState(false);

    return (
        <Box sx={{ display: 'flex', minHeight: '100svh' }}>
            {/* App Bar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: (t) => t.zIndex.drawer + 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={600}>
                        Documentation
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            color="inherit"
                            onClick={() => setOpenSearch(true)}
                            aria-label="Search documentation"
                        >
                            <SearchIcon />
                        </IconButton>
                        <ButtonThemeToggle
                            mode={mode}
                            changeMode={() => setMode(mode == "dark" ? "light" : "dark")}
                        />
                    </Box>
                </Toolbar>

            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                    },
                }}
            >
                <Toolbar />
                <List>
                    {[
                        'Introduction',
                        'Getting Started',
                        'Components',
                        'Theming',
                        'API Reference',
                    ].map((text) => (
                        <ListItemButton key={text}>
                            <ListItemText
                                primary={text}
                                primaryTypographyProps={{
                                    fontSize: 14,
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: { xs: 2, md: 4 },
                    py: 3,
                    bgcolor: 'background.default',
                }}
            >
                <Toolbar />

                <article>
                    <Typography variant="h4" gutterBottom>
                        Docs
                    </Typography>
                    <Typography color="text.secondary">
                        Seluruh layout ini mengikuti theme MUI secara penuh.
                    </Typography>


                    <DefaultCodeBlock
                        value={`interface User { id: number; name: string }`}
                        language="ts"
                    // showLineNumbers
                    />
                    <Alert variant="error" title="Hello World" >
                        Ini Adalah Alert
                    </Alert>

                </article>
            </Box>

            {/* Search Dialog */}
            <Dialog
                open={openSearch}
                onClose={() => setOpenSearch(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        bgcolor: 'background.paper',
                    },
                }}
            >
                <Box sx={{ p: 3 }}>
                    <TextField
                        autoFocus
                        fullWidth
                        placeholder="Search documentation…"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <List
                        subheader={
                            <ListSubheader
                                disableSticky
                                sx={{
                                    bgcolor: 'transparent',
                                    color: 'text.secondary',
                                }}
                            >
                                Recommended
                            </ListSubheader>
                        }
                    >
                        {[
                            'Getting Started',
                            'Button Component',
                            'Theme Customization',
                            'API Reference',
                        ].map((item) => (
                            <ListItemButton key={item}>
                                <ListItemText primary={item} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Dialog>
        </Box>
    );
};