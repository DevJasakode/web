"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Button,
    Avatar,
    IconButton,
    FormControl,
    TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { DtpKpu, Respon } from "@/app/api/data/dtp-kpu/route";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import axios from "axios";


// import { MorphingFormDialog } from "./Form";


interface Store {
    loading: boolean;
}

const initialStore: Store = {
    loading: true,
}


interface Filter {
    limit: number;
    page: number;
    name: string;
}

const initialFilter: Filter = {
    limit: 25,
    page: 0,
    name: "",
}

const columns: GridColDef<DtpKpu>[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    disableColumnMenu: true,
  },

  {
    field: 'avatar',
    headerName: '',
    width: 60,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {params.row.nama?.[0] ?? '?'}
        </Avatar>
      </Box>
    ),
  },

  {
    field: 'nama',
    headerName: 'Nama',
    minWidth: 180,
    flex: 1,
  },

  {
    field: 'no_nik',
    headerName: 'NIK',
    width: 160,
  },

  {
    field: 'no_kk',
    headerName: 'No KK',
    width: 160,
  },

  {
    field: 'usia',
    headerName: 'Usia',
    width: 80,
    align: 'center',
    headerAlign: 'center',
  },

  {
    field: 'jns_kelamin',
    headerName: 'JK',
    width: 70,
    align: 'center',
    headerAlign: 'center',
  },

  {
    field: 'kelurahan',
    headerName: 'Kelurahan',
    minWidth: 160,
  },

  {
    field: 'kecamatan',
    headerName: 'Kecamatan',
    minWidth: 160,
  },

  {
    field: 'kabupaten',
    headerName: 'Kabupaten',
    minWidth: 160,
  },

  {
    field: 'provinsi',
    headerName: 'Provinsi',
    minWidth: 160,
  },

  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: 100,
    align: 'right',
    headerAlign: 'right',
    disableColumnMenu: true,
    renderCell: (params) => (
      <IconButton
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          // aksi download / detail
        }}
      >
        <FileDownloadOutlinedIcon />
      </IconButton>
    ),
  },
];

export default function DTPKPU() {
    const [store, setStore] = useState<Store>(initialStore);
    const [filter, setFilter] = useState<Filter>(initialFilter);
    const [row, setRow] = useState<Respon>({ count: 0, data: [] });

    function load() {
        axios.get<Respon>(`/api/data/dtp-kpu?limit=${filter.limit}&offset=${filter.page * filter.limit}&name=${filter.name}`).then(res => {
            if (res.status >= 200 && res.status <= 201 && res.data) {
                setRow(res.data);
            }
        }).finally(() => setStore(pre => ({ ...pre, loading: false })));
    };

    // Hooks
    useEffect(() => {
        setStore(pre => ({ ...pre, loading: true }));
        load();
    }, [filter]);

    return (
        <Box>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                    <FormControl>
                        <TextField
                            placeholder="cari nama..."
                            defaultValue={filter.name}
                            onBlur={e => setFilter(pre => ({ ...pre, name: e.target.value }))}
                            size="small"
                        />
                    </FormControl>
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
                        {/* <MorphingFormDialog /> */}
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <Paper sx={{ width: '100%' }}>
                    <DataGrid
                        loading={store.loading}
                        rows={row.data}
                        paginationMode="server"
                        rowCount={row.count}
                        columns={columns}
                        initialState={{ pagination: { paginationModel: { page: filter.page, pageSize: filter.limit } } }}
                        onPaginationModelChange={pm => setFilter(pre => ({ ...pre, page: pm.page, limit: pm.pageSize }))}
                        pageSizeOptions={[10, 25, 50, 75, 100]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </Box>
        </Box>
    )
};