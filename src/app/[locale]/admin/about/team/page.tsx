"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import {
    Box,
    Grid,
    Button,
    Avatar,
    IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { MorphingTeamFormDialog } from "./Form";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { AboutTeam, ResponsePagination } from "@/api/about/team/models";
import axios, { AxiosError } from "axios";
import { SmartLink } from "@/components/link";
import { Locale } from "@/i18n/config";
import { useParams } from "next/navigation";

interface Store {
    loading: boolean;
}

const initialStore: Store = {
    loading: false,
};

interface Filter {
    limit: number;
    page: number;
};

const initialFilter: Filter = {
    limit: 25,
    page: 0,
};



const columns: GridColDef<AboutTeam>[] = [
    { field: 'id', headerName: 'ID', width: 70, disableColumnMenu: true },
    {
        field: 'avatar',
        headerName: 'Avatar',
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
        disableReorder: true,
        sortable: false,
        width: 80,
        renderCell(params) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: 'center',
                        height: "100%"
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    {
                        params.row.avatar ?
                            <Avatar src={params.row.avatar} alt={params.row.name}></Avatar> :
                            <Avatar>{params.row.name}</Avatar>
                    }

                </Box>
            )
        },
    },
    {
        flex: 1,
        field: 'name',
        headerName: 'Name',
        description: 'This column has a value getter and is not sortable.',
        renderCell(params) {
            const { locale } = useParams<{ locale: Locale }>(); 
            return (
                <Fragment>
                    {
                        params.row.profile ?
                        <SmartLink
                            href={{
                                pathname: `/[locale]/about/profile/@${params.row.profile}`,
                                query: { locale }
                            }}
                        >
                            { params.row.name }
                        </SmartLink> :
                        params.row.name
                    }
                </Fragment>
            )
        },
    },
    {
        flex: 1,
        field: 'focus',
        headerName: 'Focus',
        align: "left",
        headerAlign: "left",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        flex: 1,
        field: "position",
        headerName: 'Position',
        align: "left",
        headerAlign: "left",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        flex: 1,
        field: 'created_at',
        headerName: 'Created At',
        align: "left",
        headerAlign: "left",
        disableColumnMenu: true,
    },
    {
        field: "action",
        headerName: "Action",
        description: "Action",
        sortable: false,
        width: 100,
        align: "right",
        headerAlign: "right",
        disableColumnMenu: true,
        renderCell(params) {
            return (
                <Box>
                    <IconButton
                        color="secondary"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <MoreVertOutlinedIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Box>
            )
        },
    }
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


export default function Team() {
    const [filter, setFilter] = useState<Filter>(initialFilter);
    const [team, setTeam] = useState<ResponsePagination<AboutTeam>>({ meta: { total: 0, limit: 25, offset: 0 }, data: [] });
    const [store, setStore] = useState<Store>(initialStore);


    const loadTeam = useCallback(async () => {
        try {
            setStore(pre => ({ ...pre, loading: true }));
            const res = await axios.get<ResponsePagination<AboutTeam>>(
                `/api/about/team?limit=${filter.limit}&offset=${filter.limit * filter.page}`,
                {
                    withCredentials: true,
                    timeout: 500,
                }
            );
            if (res.status >= 200 && res.status <= 201) {
                setTeam(res.data);
                console.log(res.data);
            }
        } catch (error) {
            const err: AxiosError = error as AxiosError;
            console.log(err.response?.statusText || err.message)
        } finally {
            setStore(pre => ({ ...pre, loading: false }));
        }
    }, [filter, setTeam, setStore]);


    useEffect(() => { loadTeam(); }, [filter]);

    return (
        <Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>

                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 2,
                        }}
                    >
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
                        <MorphingTeamFormDialog />
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <Paper sx={{ width: '100%' }}>
                    <DataGrid
                        rows={team.data || []}
                        columns={columns}
                        initialState={{ pagination: { paginationModel: { page: filter.page, pageSize: filter.limit } } }}
                        pageSizeOptions={[10, 25, 50, 75, 100]}
                        checkboxSelection
                        sx={{
                            '& .MuiDataGrid-cell': {
                                borderRight: '1px solid rgba(224, 224, 224, 1)',
                                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                            },
                        }}

                    />
                </Paper>
            </Box>
        </Box>
    )
};
