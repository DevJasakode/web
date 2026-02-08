import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import {
    AdminExplorer,
    AdminExplorerMenuItem,
} from "./AdminExplorer";

import { Route } from "@/lib/route";


const menuData: AdminExplorerMenuItem[] = [
    {
        id: "team",
        label: "Team",
        icon: <PeopleOutlineOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/about/team",
    },
    {
        id: "employees",
        label: "Employees",
        icon: <GroupsOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/about/employees",
    },
    {
        id: "career",
        label: "Career",
        icon: <WorkOutlineOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/about/career",
    },
    {
        id: "history",
        label: "History",
        icon: <ManageHistoryOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/about/history",
    },
    {
        id: "settings",
        label: "Settings",
        icon: <SettingsOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/about/settings",
        // Pengaturan artikel: SEO, slug, metadata, default behavior
    },


];

export function AdminAboutExplorer() {
    return (<AdminExplorer menuData={menuData}/>)
};



