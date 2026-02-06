"use client";

import {
    Box,
    Grid,
    IconButton,
    FormControl,
    TextField,
    Divider,
    Button,
    Paper,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import axios from "axios";

import { MorphingUserDetail } from "./UserDetail";
import { useEffect, useState } from "react";


interface User {
    id: number;
    username: string;
    email: string;
    verified_email: string | null;
    avatar: string | null;
    created_at: string;
    created_by: number;
    updated_at?: string | null;
    updated_by?: number | null;
    deleted_at?: string | null;
    deleted_by?: number | null;
}

// Data dummy
const dummyUsers: User[] = [
    {
        id: 1,
        username: "alice",
        email: "alice@example.com",
        verified_email: "2026-01-01T10:00:00Z",
        avatar: "https://i.pravatar.cc/40?img=1",
        created_at: "2026-01-01T09:00:00Z",
        created_by: 1,
        updated_at: null,
        updated_by: null,
        deleted_at: null,
        deleted_by: null,
    },
    {
        id: 2,
        username: "bob",
        email: "bob@example.com",
        verified_email: null,
        avatar: "https://i.pravatar.cc/40?img=2",
        created_at: "2026-01-02T09:30:00Z",
        created_by: 1,
        updated_at: "2026-01-03T12:00:00Z",
        updated_by: 2,
        deleted_at: null,
        deleted_by: null,
    },
    {
        id: 3,
        username: "charlie",
        email: "charlie@example.com",
        verified_email: "2026-01-05T08:45:00Z",
        avatar: "https://i.pravatar.cc/40?img=3",
        created_at: "2026-01-05T08:00:00Z",
        created_by: 2,
        updated_at: null,
        updated_by: null,
        deleted_at: "2026-01-10T10:00:00Z",
        deleted_by: 1,
    },
];


interface Store {
    user_detail: number;
}

const initialStore: Store = {
    user_detail: 0,
}


interface Filter {
    page: number;
    pageSize: number;
}


const initialFilter: Filter = {
    page: 0,
    pageSize: 10,
}


export default function User() {
    const [store, setStore] = useState<Store>(initialStore);
    const [filter, setFilter] = useState<Filter>(initialFilter);
    const [rows, setRows] = useState<{ count: number, data: User[] }>({ count: dummyUsers.length, data: dummyUsers });

    const columns: GridColDef<User>[] = [
        { field: "id", headerName: "ID", width: 70, disableColumnMenu: true },
        {
            field: "avatar",
            headerName: "Avatar",
            width: 80,
            disableColumnMenu: true,
            sortable: false,
            align: "center",
            headerAlign: "center",
            renderCell: (params) =>
                params.value ? (
                    <div className="h-full w-full flex items-center justify-center">
                        <img
                            src={params.value}
                            alt="avatar"
                            style={{ width: 40, borderRadius: "50%" }}
                        />
                    </div>
                ) : null,
        },
        { field: "username", headerName: "Username", disableColumnMenu: true, flex: 1 },
        { field: "email", headerName: "Email", disableColumnMenu: true, flex: 1 },
        // { field: "verified_email", headerName: "Verified Email", width: 180, disableColumnMenu: true },
        // { field: "created_at", headerName: "Created At", width: 180, disableColumnMenu: true },
        // { field: "created_by", headerName: "Created By", width: 100, disableColumnMenu: true },
        // { field: "updated_at", headerName: "Updated At", width: 180, disableColumnMenu: true },
        // { field: "updated_by", headerName: "Updated By", width: 100, disableColumnMenu: true },
        // { field: "deleted_at", headerName: "Deleted At", width: 180, disableColumnMenu: true },
        // { field: "deleted_by", headerName: "Deleted By", width: 100, disableColumnMenu: true },
        {
            field: "action",
            headerName: "Action",
            width: 100,
            disableColumnMenu: true,
            sortable: false,
            align: "right",
            headerAlign: "right",
            resizable: false,
            renderCell(params) {

                return (
                    <div className="flex items-center h-full w-full gap-2 justify-end">
                        <IconButton size="small" onClick={() => setStore(pre => ({ ...pre, user_detail: params.row.id }))}>
                            <MoreVertOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                    </div>
                )
            },
        }
    ];

    function load() {
        axios.get<{ count: number, data?: User[] | null }>(`/api/user?limit=${filter.pageSize}&offset=${filter.page * filter.pageSize}`).then(res => {
            if(res.status >= 200 && res.status <= 201, res.data) {
                setRows({ count: res.data.count, data: res.data.data || [] });
            }
        }).catch(err => console.error(err));
    };


    // Hooks
    useEffect(() => {
        load()
    }, [filter]);

    return (
        <Box>
            <MorphingUserDetail
                open={store.user_detail !== 0}
                onClose={() => setStore(pre => ({ ...pre, user_detail: 0 }))}
            />

            <Box sx={{ flexGrow: 1, sx: 2, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl sx={{ maxWidth: 350 }}>
                            <TextField
                                size="small"
                                placeholder="Search..."
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <div className="flex items-center md:justify-end gap-2 flex-wrap">
                            <Button
                                variant="outlined"
                                startIcon={<SimCardDownloadOutlinedIcon />}
                            >
                                Import
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<UploadFileOutlinedIcon />}
                            >
                                Export
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Box>
         


            <Box component={Paper} sx={{ width: "100%" }}>
                <DataGrid
                    rows={rows.data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50]} // <-- ini diganti dari rowsPerPageOptions
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    )
}