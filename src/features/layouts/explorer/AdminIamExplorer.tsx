import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PeopleIcon from "@mui/icons-material/People";
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';

import {
    AdminExplorer,
    AdminExplorerMenuItem,
} from "./AdminExplorer";


const menuData: AdminExplorerMenuItem[] = [
    {
        id: "iam",
        label: "Overview",
        icon: <SecurityOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/iam",
    },
    {
        id: "users",
        label: "Users",
        icon: <PeopleIcon fontSize="small" />,
        path: "/[locale]/admin/iam/user"
    },
    {
        id: "users-history",
        label: "Users History",
        icon: <RestoreOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/iam/user-history"
    },
];

export function AdminIamExplorer() {
    return (<AdminExplorer menuData={menuData}/>);
};


