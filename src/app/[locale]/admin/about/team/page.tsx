"use client";

import { useState } from "react";
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

interface Store {

}

const initialStore: Store = {

}


const columns: GridColDef[] = [
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
                    <Avatar>N</Avatar>
                </Box>
            )
        },
    },
    { field: 'firstName', headerName: 'First name', width: 160 },
    { field: 'lastName', headerName: 'Last name', width: 160 },
    {
        width: 120,
        field: 'age',
        headerName: 'Age',
        type: 'number',
        align: "left",
        headerAlign: "left",
        disableColumnMenu: true,
    },
    {
        flex: 1,
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
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

const paginationModel = { page: 0, pageSize: 10 };


export default function Team() {
    const [store, setStore] = useState<Store>(initialStore);

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
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[10, 25, 50, 75, 100]}
                        checkboxSelection
                        // // sx={{ border: 0 }}
                        // showCellVerticalBorder={true}
                        // showColumnVerticalBorder={true}
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

/**
 * avatar
 * name
 * tags
 * social media
 * profile username
 */