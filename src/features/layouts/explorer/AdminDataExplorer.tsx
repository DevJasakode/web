import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
    AdminExplorer,
    AdminExplorerMenuItem,
} from "./AdminExplorer";


const menuData: AdminExplorerMenuItem[] = [
    {
        id: "dtp-kpu",
        label: "DTP KPU",
        icon: <FormatListBulletedIcon fontSize="small" />,
        path: "/[locale]/admin/data/dtp-kpu",
    },
];

export function AdminDataExplorer() {
    return (<AdminExplorer menuData={menuData}/>)
};

