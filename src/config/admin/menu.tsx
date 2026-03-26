import { ReactNode } from "react";
// import all icons
import SearchIcon from "@mui/icons-material/Search";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PeopleIcon from "@mui/icons-material/People";
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SettingsPhoneOutlinedIcon from '@mui/icons-material/SettingsPhoneOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';



export interface AdminMenu {
    type?: "menu" | "section" | "divider";
    code: string;
    label: string;
    icon?: ReactNode;
    desc?: string;
    path?: string;
    children?: AdminMenu[];
};


export const adminMenu: AdminMenu[] = [
    {
        code: "dashboard",
        label: "Dashboard",
        icon: <DashboardOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin",
    },
    {
        code: "website",
        label: "Jasakode Website",
        icon: <LanguageOutlinedIcon fontSize="small" />,
        children: [
            {
                code: "website.analytics",
                label: "Analytics",
                icon: <BarChartOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/website/analytics",
            },
            {
                code: "website.performance",
                label: "Performance",
                icon: <SpeedOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/website/performance",
            },
            {
                code: "website.team",
                label: "Team",
                icon: <PeopleOutlineOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/website/team",
            },
            {
                code: "website.employees",
                label: "Employees",
                icon: <GroupsOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/website/employees",
            },
            {
                code: "website.career",
                label: "Career",
                icon: <WorkOutlineOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/website/career",
            },
            {
                code: "website.settings",
                label: "Settings",
                icon: <SettingsOutlinedIcon fontSize="small" />,
                children: [
                    {
                        code: "website.settings.appearance",
                        label: "Appearance",
                        icon: <ColorLensOutlinedIcon fontSize="small" />,
                        path: "/[locale]/admin/website/settings/appearance",
                    },
                    {
                        code: "website.settings.language",
                        label: "Language",
                        icon: <TranslateOutlinedIcon fontSize="small" />,
                        path: "/[locale]/admin/website/settings/language",
                    },
                    {
                        code: "website.settings.contact",
                        label: "Contact",
                        icon: <SettingsPhoneOutlinedIcon fontSize="small" />,
                        path: "/[locale]/admin/website/settings/contact",
                    }
                ]
            }
        ]
    },
    {
        code: "iam",
        label: "IAM",
        icon: <AdminPanelSettingsOutlinedIcon fontSize="small" />,
        children: [
            {
                code: "iam.overview",
                label: "Overview",
                icon: <SecurityOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/iam",
            },
            {
                code: "iam.users",
                label: "Users",
                icon: <PeopleIcon fontSize="small" />,
                path: "/[locale]/admin/iam/user"
            },
            {
                code: "iam.users-history",
                label: "Users History",
                icon: <RestoreOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/iam/user-history"
            },
        ]
    },
    {
        code: "about",
        label: "About",
        icon: <InfoOutlinedIcon fontSize="small" />,
        children: [
            {
                code: "about.team",
                label: "Team",
                icon: <PeopleOutlineOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/about/team",
            },
            {
                code: "about.employees",
                label: "Employees",
                icon: <GroupsOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/about/employees",
            },
            {
                code: "about.career",
                label: "Career",
                icon: <WorkOutlineOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/about/career",
            },
            {
                code: "about.history",
                label: "History",
                icon: <ManageHistoryOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/about/history",
            },
            {
                code: "about.settings",
                label: "Settings",
                icon: <SettingsOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/about/settings",
                // Pengaturan artikel: SEO, slug, metadata, default behavior
            },
        ]
    },
    {
        code: "article",
        label: "Article",
        icon: <FeedOutlinedIcon fontSize="small" />,
        children: [
            {
                code: "article.overview",
                label: "Overview",
                icon: <DashboardOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article",
                // Ringkasan sistem artikel:
                // jumlah artikel, draft vs published, statistik singkat
            },
            {
                code: "article.articles",
                label: "Articles",
                icon: <DescriptionOutlinedIcon fontSize="small" />,
                // Menu induk untuk semua artikel
                children: [
                    {
                        code: "article.articles.all-posts",
                        label: "All Posts",
                        icon: <ArticleOutlinedIcon fontSize="small" />,
                        path: "/[locale]/admin/article/posts",
                        // Menampung semua artikel tanpa filter
                    },
                    {
                        code: "article.articles.drafts",
                        label: "Drafts",
                        icon: <EditOutlinedIcon fontSize="small" />,
                        path: "/[locale]/admin/article/drafts",
                        // Artikel yang belum dipublikasikan
                    },
                    {
                        code: "article.articles.scheduled",
                        label: "Scheduled",
                        icon: <ScheduleOutlinedIcon fontSize="small" />,
                        path: "/[locale]/admin/article/scheduled",
                        // Artikel siap tayang dengan jadwal tertentu
                    },
                    {
                        code: "article.articles.published",
                        label: "Published",
                        icon: <PublicOutlinedIcon fontSize="small" />,
                        path: "/[locale]/admin/article/published",
                        // Artikel yang sudah live
                    },
                ],
            },
            {
                code: "article.create",
                label: "Create Article",
                icon: <AddCircleOutlineOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/create",
                // Halaman menulis artikel baru
            },
            {
                code: "article.categories",
                label: "Categories",
                icon: <FolderOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/categories",
                // Pengelompokan artikel secara struktural
            },
            {
                code: "article.tags",
                label: "Tags",
                icon: <LocalOfferOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/tags",
                // Label fleksibel untuk membantu pencarian dan relasi artikel
            },
            {
                code: "article.media",
                label: "Media",
                icon: <ImageOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/media",
                // Gambar, thumbnail, dan aset visual artikel
            },
            {
                code: "article.analytics",
                label: "Analytics",
                icon: <BarChartOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/analytics",
                // Statistik performa artikel: views, read time, engagement
            },
            {
                code: "article.comments",
                label: "Comments",
                icon: <ChatBubbleOutlineOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/comments",
                // Komentar pembaca dan moderasi
            },
            {
                code: "article.settings",
                label: "Settings",
                icon: <SettingsOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/settings",
                // Pengaturan artikel: SEO, slug, metadata, default behavior
            },
        ]
    },
    // {
    //     code: "docs",
    //     icon: <FormatColorTextOutlinedIcon fontSize="small" />,
    //     path: "/[locale]/admin/docs",
    // },
    // {
    //     code: "data",
    //     icon: <FolderIcon fontSize="small" />,
    //     path: "/[locale]/admin/data",
    // },
];