import {
    type Activity,
} from "@/config/admin";

// import all icons
import SearchIcon from "@mui/icons-material/Search";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

// import all explorer
import { AdminHomeExplorer } from "../explorer/AdminHomeExplorer";
import { AdminIamExplorer } from "../explorer/AdminIamExplorer";
import { AdminArticleExplorer } from "../explorer/AdminArticleExplorer";
import { AdminContactExplorer } from "../explorer/AdminContactExplorer";
import { AdminAboutExplorer } from "../explorer/AdminAboutExplorer";
import { AdminDocsExplorer } from "../explorer/AdminDocsExplorer";
import { AdminDataExplorer } from "../explorer/AdminDataExplorer";


export const activitys: Activity[] = [
    {
        code: "Home",
        logo: <DashboardOutlinedIcon fontSize="small" />,
        prefix: "/[locale]/admin",
        explorer: <AdminHomeExplorer />,
    },
    {
        code: "IAM",
        logo: <AdminPanelSettingsOutlinedIcon fontSize="small" />,
        prefix: "/[locale]/admin/iam",
        explorer: <AdminIamExplorer />,
    },
    {
        code: "about",
        logo: <InfoOutlinedIcon fontSize="small" />,
        prefix: "/[locale]/admin/about",
        explorer: <AdminAboutExplorer />
    },
    {
        code: "article",
        logo: <FeedOutlinedIcon fontSize="small" />,
        prefix: "/[locale]/admin/article",
        explorer: <AdminArticleExplorer />
    },
    {
        code: "contact",
        logo: <AddIcCallOutlinedIcon fontSize="small" />,
        prefix: "/[locale]/admin/contact",
        explorer: <AdminContactExplorer />
    },
    {
        code: "docs",
        logo: <FormatColorTextOutlinedIcon fontSize="small" />,
        prefix: "/[locale]/admin/docs",
        explorer: <AdminDocsExplorer />
    },
    {
        code: "data",
        logo: <FolderIcon fontSize="small" />,
        prefix: "/[locale]/admin/data",
        explorer: <AdminDataExplorer />,
    },
];