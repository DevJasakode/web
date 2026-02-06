import * as React from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    Breadcrumbs,
    Link,
    IconButton,
    TextField,
    MenuItem,
    InputAdornment,
    Checkbox,
    ButtonGroup,
    Button,
} from "@mui/material";
import {
    MoreVert,
    GridView,
    ViewList,
    Search,
    Home,
} from "@mui/icons-material";
import { Folder, FileText, FileSpreadsheet, File } from "lucide-react";
import { motion } from "framer-motion";

/* =====================
   Types
===================== */

type FolderItem = {
    id: number;
    name: string;
    size: string;
    date: string;
};

type FileItem = {
    id: number;
    name: string;
    size: string;
    date: string;
    type: "doc" | "xls" | "pdf";
};

/* =====================
   Dummy Data
===================== */

const folders: FolderItem[] = [
    { id: 1, name: "Sketch Templates", size: "8 GB", date: "12.07.2019" },
    { id: 2, name: "Public Documents", size: "10 GB", date: "12.07.2019" },
    { id: 3, name: "Backups", size: "1 TB", date: "12.07.2019" },
    { id: 4, name: "Downloads", size: "250 GB", date: "12.07.2019" },
    { id: 5, name: "Resources", size: "4 GB", date: "12.07.2019" },
];

const files: FileItem[] = [
    { id: 1, name: "Shopping_list", size: "1 MB", date: "12.07.2019", type: "doc" },
    { id: 2, name: "Design_brief", size: "150 KB", date: "12.07.2019", type: "doc" },
    { id: 3, name: "Prices", size: "1 MB", date: "12.07.2019", type: "xls" },
    { id: 4, name: "01_project_description", size: "150 MB", date: "12.07.2019", type: "pdf" },
    { id: 5, name: "02_project_description", size: "160 MB", date: "12.07.2019", type: "pdf" },
];

/* =====================
   Helpers
===================== */

const fileIcon = (type: FileItem["type"]) => {
    switch (type) {
        case "doc":
            return <FileText color="#2196f3" />;
        case "xls":
            return <FileSpreadsheet color="#4caf50" />;
        case "pdf":
            return <File color="#f44336" />;
    }
};

const MotionCard = motion(Card);

/* =====================
   Page Component
===================== */

export const FileManager: React.FC = () => {
    return (
        <Box p={3}>
            {/* ===== Header ===== */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h5" fontWeight={600}>
                    Files (50)
                </Typography>
                <ButtonGroup size="small">
                    <Button variant="contained">
                        <GridView fontSize="small" />
                    </Button>
                    <Button variant="outlined">
                        <ViewList fontSize="small" />
                    </Button>
                </ButtonGroup>
            </Box>


            {/* ===== Filters ===== */}
            <Box display="none" gap={2} mb={4} flexWrap="wrap">
                <TextField
                    size="small"
                    select
                    label="Date"
                    defaultValue="all"
                    sx={{ width: 180 }}
                >
                    <MenuItem value="all">All Dates</MenuItem>
                    <MenuItem value="today">Today</MenuItem>
                    <MenuItem value="week">This Week</MenuItem>
                </TextField>

                <TextField
                    size="small"
                    select
                    label="Type"
                    defaultValue="all"
                    sx={{ width: 160 }}
                >
                    <MenuItem value="all">All Type</MenuItem>
                    <MenuItem value="doc">Documents</MenuItem>
                    <MenuItem value="xls">Spreadsheets</MenuItem>
                    <MenuItem value="pdf">PDF</MenuItem>
                </TextField>

                <TextField
                    size="small"
                    placeholder="Search files"
                    sx={{ width: 260 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Grid container spacing={3} mb={4}>
                {folders.map((folder) => (
                    <Grid key={folder.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                        <MotionCard
                            whileHover={{ y: -4 }}
                            sx={{ p: 2, borderRadius: 3, position: "relative", aspectRatio: 1/0.8 }}
                        >
                            <Checkbox size="small" sx={{ position: "absolute", top: 8, left: 8 }} />
                            <IconButton size="small" sx={{ position: "absolute", top: 8, right: 8 }}>
                                <MoreVert fontSize="small" />
                            </IconButton>

                            <Box display="flex" justifyContent="center" my={2}>
                                <Folder size={56} color="#fbc02d" />
                            </Box>

                            <Typography align="center" fontWeight={500}>
                                {folder.name}
                            </Typography>

                            <Box
                                mt={1}
                                display="flex"
                                justifyContent="space-between"
                                fontSize="0.75rem"
                                color="text.secondary"
                            >
                                <span>{folder.size}</span>
                                <span>{folder.date}</span>
                            </Box>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>

            {/* ===== Files ===== */}
            <Typography fontWeight={600} mb={2}>
                Files
            </Typography>

            <Grid container spacing={3}>
                {files.map((file) => (
                    <Grid key={file.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                        <MotionCard
                            whileHover={{ y: -4 }}
                            sx={{ p: 2, borderRadius: 3, position: "relative", aspectRatio: 1/0.8 }}
                        >
                            <Checkbox size="small" sx={{ position: "absolute", top: 8, left: 8 }} />
                            <IconButton size="small" sx={{ position: "absolute", top: 8, right: 8 }}>
                                <MoreVert fontSize="small" />
                            </IconButton>

                            <Box display="flex" justifyContent="center" my={2}>
                                {fileIcon(file.type)}
                            </Box>

                            <Typography align="center" fontWeight={500}>
                                {file.name}
                            </Typography>

                            <Box
                                mt={1}
                                display="flex"
                                justifyContent="space-between"
                                fontSize="0.75rem"
                                color="text.secondary"
                            >
                                <span>{file.size}</span>
                                <span>{file.date}</span>
                            </Box>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
