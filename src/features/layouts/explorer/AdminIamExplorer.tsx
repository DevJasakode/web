import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PeopleIcon from "@mui/icons-material/People";

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
        children: [
            {
                id: "users-list",
                label: "User List",
                icon: <PeopleIcon fontSize="small" />,
                path: "/[locale]/admin/iam/user"
            },
            {
                id: "users-role",
                label: "User Roles",
                icon: <PeopleIcon fontSize="small" />,
                path: "/[locale]/admin/iam/user/role"
            },
        ],
    },
];

export function AdminIamExplorer() {
    return (<AdminExplorer menuData={menuData}/>);
};


