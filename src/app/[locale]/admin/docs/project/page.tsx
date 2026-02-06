"use client";

import {
    Box,
    Grid,
    Paper,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
    ToggleButton,
    ToggleButtonGroup,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MorphingFormDialog } from "./Form";
import { useStore } from "@/context";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import axios from "axios";
import { Project as ProjectData } from "@/api/admin/docs/route";
import { Docs } from "@/api/docs/models";






type DisplayMode = "grid" | "list";


interface ItemListProps {
    items: ProjectData[];
    mode?: DisplayMode;
}

function ItemList({
    items,
    mode = "grid",
}: ItemListProps) {
    if (mode == "list") {
        return (
            <List>
                {items.map((item) => (
                    <ListItem
                        key={Math.random()}
                        sx={{
                            outline: "1px dashed transparent",
                            outlineOffset: "-1px",
                            transition: "all 0.15s ease",
                            // zebra striping (ganjil / genap)
                            "&:nth-of-type(odd)": {
                                backgroundColor: "rgba(0, 0, 0, 0.02)",
                            },
                            // hover state (menimpa zebra)
                            "&:hover": {
                                outlineColor: "primary.main",
                            },
                        }}
                    >
                        <ListItemText
                            primary={item.name}
                            secondary={item.desc}
                        />
                    </ListItem>
                ))}
            </List>
        )
    }
    return (
        <Grid container spacing={2}>
            {items.map((item) => (
                <Grid
                    key={Math.random()}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                >
                    <Paper
                        elevation={2}
                        sx={{
                            aspectRatio: "1 / 0.6", // kunci: kotak selalu persegi
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 2,
                        }}
                    >
                        <Typography align="center">
                            {item.name}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};


function DocsViewer({ data }: { data: Docs[] }) {
    const [view, setView] = useState<"list" | "grid">("list");

    return (
        <Box>
            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(_, v) => v && setView(v)}
                size="small"
                sx={{ mb: 3 }}
            >
                <ToggleButton value="list">List</ToggleButton>
                <ToggleButton value="grid">Grid</ToggleButton>
            </ToggleButtonGroup>

            {view === "list" ? (
                <Paper variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Logo</TableCell>
                                <TableCell>Nama</TableCell>
                                <TableCell>Slug</TableCell>
                                <TableCell>Deskripsi</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell>
                                        <Avatar
                                            src={d.logo ?? undefined}
                                            variant="rounded"
                                        >
                                            {d.name[0]}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>{d.slug}</TableCell>
                                    <TableCell>{d.desc ?? "-"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {data.map((d) => (
                        <Grid key={d.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Card
                                variant="outlined"
                                sx={{ height: "100%" }}
                            >
                                <CardContent>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            src={d.logo ?? undefined}
                                            variant="rounded"
                                            sx={{ width: 48, height: 48 }}
                                        >
                                            {d.name[0]}
                                        </Avatar>

                                        <Box>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {d.name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {d.slug}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 2 }}
                                    >
                                        {d.desc ?? "Tidak ada deskripsi"}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};


export const docsDummy: Docs[] = [
    {
        id: 1,
        name: "User Guide",
        slug: "user-guide",
        logo: null,
        desc: "Dokumentasi penggunaan aplikasi",
        created_at: new Date(),
        created_by: 1,
        updated_at: null,
        updated_by: null,
        deleted_at: null,
        deleted_by: null,
    },
    {
        id: 2,
        name: "API Reference",
        slug: "api-reference",
        logo: "/assets/Logo.png",
        desc: "Referensi endpoint API",
        created_at: new Date(),
        created_by: 1,
        updated_at: null,
        updated_by: null,
        deleted_at: null,
        deleted_by: null,
    },
];


export default function Project() {
    const [selected] = useState<number[]>([]);
    const [raw, setRaw] = useState<ProjectData[]>([]);
    const store = useStore();

    function load() {
        // axios.get<ProjectData[]>("/api/admin/docs").then(res => {
        //     if (res.status >= 200 && res.status <= 201 && res.data) {
        //         // console.log(res.data)
        //         store.set("admin.docs.project", res.data);
        //         store.set("admin.docs.project.loading", false);
        //         setRaw(res.data);
        //     }
        // });
        store.set("admin.docs.project.loading", true);
        axios.get<{ count: number, data?: Docs[] | null }>("/api/docs").then(res => {
            if (res.status >= 200 && res.status <= 201 && res.data) {
                console.log(res.status, res.statusText, res.data)
            }
        }).catch(error => {

        }).finally(() => store.set("admin.docs.project.loading", false));
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <Box component={"div"} sx={{ px: 2, py: 2, borderRadius: 0, borderStyle: "none" }}>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography>
                        All Project Documentation
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <div className="flex flex-wrap items-center md:justify-end gap-2">
                        {
                            selected.length > 0 &&
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteOutlinedIcon />}
                                size="medium"
                            >
                                Remove Project
                            </Button>
                        }
                        <Button
                            variant="outlined"
                            color="success"
                            startIcon={<FileDownloadOutlinedIcon />}
                            size="medium"
                        >
                            Import
                        </Button>
                        <Button
                            variant="outlined"
                            color="info"
                            startIcon={<FileUploadOutlinedIcon />}
                            size="medium"
                        >
                            Export
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<PrintOutlinedIcon />}
                            size="medium"
                        >
                            Print
                        </Button>
                        <MorphingFormDialog onCreated={load} />
                    </div>
                </Grid>
            </Grid>


            <Box>
                <ItemList items={raw} mode="grid" />
                <ItemList items={raw} mode="list" />
            </Box>
            <DocsViewer data={docsDummy} />

        </Box>
    )
};