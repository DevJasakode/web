import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
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
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
    AdminExplorer,
    AdminExplorerMenuItem,
} from "./AdminExplorer";




const menuData: AdminExplorerMenuItem[] = [
    {
        id: "overview",
        label: "Overview",
        icon: <DashboardOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/article",
        // Ringkasan sistem artikel:
        // jumlah artikel, draft vs published, statistik singkat
    },
    {
        id: "articles",
        label: "Articles",
        icon: <DescriptionOutlinedIcon fontSize="small" />,
        // Menu induk untuk semua artikel
        children: [
            {
                id: "all-posts",
                label: "All Posts",
                icon: <ArticleOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/posts",
                // Menampung semua artikel tanpa filter
            },
            {
                id: "drafts",
                label: "Drafts",
                icon: <EditOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/drafts",
                // Artikel yang belum dipublikasikan
            },
            {
                id: "scheduled",
                label: "Scheduled",
                icon: <ScheduleOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/scheduled",
                // Artikel siap tayang dengan jadwal tertentu
            },
            {
                id: "published",
                label: "Published",
                icon: <PublicOutlinedIcon fontSize="small" />,
                path: "/[locale]/admin/article/published",
                // Artikel yang sudah live
            },
        ],
    },
    {
        id: "create",
        label: "Create Article",
        icon: <AddCircleOutlineOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/article/create",
        // Halaman menulis artikel baru
    },
    {
        id: "categories",
        label: "Categories",
        icon: <FolderOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/article/categories",
        // Pengelompokan artikel secara struktural
    },
    {
        id: "tags",
        label: "Tags",
        icon: <LocalOfferOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/article/tags",
        // Label fleksibel untuk membantu pencarian dan relasi artikel
    },
    {
        id: "media",
        label: "Media",
        icon: <ImageOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/article/media",
        // Gambar, thumbnail, dan aset visual artikel
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: <BarChartOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/article/analytics",
        // Statistik performa artikel: views, read time, engagement
    },
    {
        id: "comments",
        label: "Comments",
        icon: <ChatBubbleOutlineOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/article/comments",
        // Komentar pembaca dan moderasi
    },
    {
        id: "settings",
        label: "Settings",
        icon: <SettingsOutlinedIcon fontSize="small" />,
        path: "/[locale]/admin/article/settings",
        // Pengaturan artikel: SEO, slug, metadata, default behavior
    },
];

export function AdminArticleExplorer() {
    return (<AdminExplorer menuData={menuData}/>)
};


