"use client";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useI18n } from '@/i18n';
import { ReactNode } from 'react';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import { SmartLink } from '@/components/link';
import { useParams } from 'next/navigation';
import { Locale } from '@/i18n/config';

export interface MobileSidebarProps {
    open: boolean;
    onClose(): void;
};



interface Menu {
    label: string;
    icon?: ReactNode;
    path?: string;
}



export function MobileSidebar({
    open,
    onClose,
}: MobileSidebarProps) {
    const { locale } = useParams<{ locale: Locale }>();
    const { t } = useI18n();
    const menu: Menu[] = [
        {
            label: t("nav.about"),
            icon: <InfoOutlinedIcon />,
            path: "/[locale]/about"
        },
        {
            label: t("nav.solutions"),
            icon: <WidgetsOutlinedIcon />,
            path: "/[locale]/solutions"
        },
        {
            label: t("nav.innovations"),
            icon: <LightbulbOutlinedIcon />,
            path: "/[locale]/innovation"
        },
        {
            label: t("nav.article"),
            icon: <ArticleOutlinedIcon />,
            path: "/[locale]/article"
        },
        {
            label: t("nav.contact"),
            icon: <ContactMailOutlinedIcon />,
            path: "/[locale]/contact"
        },
    ];

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
            <List>
                {menu.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        {
                            item.path ?
                                <SmartLink
                                    href={{
                                        pathname: item.path,
                                        query: { locale: locale }
                                    }}
                                    style={{ width: "100%" }}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {item.icon ? item.icon : <PanoramaFishEyeIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </SmartLink> :
                                <ListItemButton>
                                    <ListItemIcon>
                                        {item.icon ? item.icon : <PanoramaFishEyeIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                        }

                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer open={open} onClose={onClose}>
            {DrawerList}
        </Drawer>
    );
};