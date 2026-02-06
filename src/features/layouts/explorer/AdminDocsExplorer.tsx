"use client";

import { Fragment } from 'react';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import {
    AdminExplorer,
    AdminExplorerMenuItem,
} from "./AdminExplorer";
import { Box, Divider, CircularProgress, Typography } from '@mui/material';
import { useStore } from '@/context';
import { Project as ProjectData } from "@/api/admin/docs/route";

const menuData: AdminExplorerMenuItem[] = [
    {
        id: "project",
        label: "Project",
        icon: <AccountTreeOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/docs/project",
    },
];


export function AdminDocsExplorer() {
    const store = useStore();

    return (
        <Fragment>
            <AdminExplorer menuData={menuData} />
            <Divider />
            {
                store.get<boolean>("admin.docs.project.loading") ?
                    <Box sx={{ px: 1.2, py: 1, display: "flex", alignItems: "center" }}>
                        <CircularProgress color="success" size={18} /> <Typography sx={{ ml: 1 }}>Loading...</Typography>
                    </Box> : null
            }
            {
                store.get<ProjectData[]>("admin.docs.project")?.map((item, i) => (
                    <div key={i}>
                        { item.name }
                    </div>
                ))
            }
        </Fragment>
    )
};



