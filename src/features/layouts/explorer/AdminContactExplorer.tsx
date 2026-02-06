import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import {
    AdminExplorer,
    AdminExplorerMenuItem,
} from "./AdminExplorer";



const menuData: AdminExplorerMenuItem[] = [
    {
        id: "inbox",
        label: "Inbox",
        icon: <MailOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/contact/inbox",
    },
    {
        id: "settings",
        label: "Settings",
        icon: <SettingsOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/contact/settings",
        // Pengaturan artikel: SEO, slug, metadata, default behavior
    },
];


export function AdminContactExplorer() {
    return (<AdminExplorer menuData={menuData}/>)
};


