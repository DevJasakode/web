import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import {
    AdminExplorer,
    AdminExplorerMenuItem,
} from "./AdminExplorer";


const menuData: AdminExplorerMenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
    path: "/[locale]/admin"
  },
  {
    id: "logs",
    label: "Visitor Logs",
    icon: <HistoryToggleOffOutlinedIcon fontSize="small" />,
    path: "/[locale]/logs"
  },
];

export function AdminHomeExplorer() {
  return (<AdminExplorer menuData={menuData}/>)
};


