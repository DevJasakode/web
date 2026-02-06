"use client";

import {
    ReactNode,
    useState,
} from "react";
import { ButtonBackToTop } from "@/components/button";
import { Footer } from "@/features/footer/Footer";
import { Navigation } from "@/features/navigation/Navigation";
import { MobileSidebar } from "@/features/layouts/sidebar/MobileSidebar"
import { useTheme, useMediaQuery } from "@mui/material";


interface Store {
    sidebar: boolean;
};

const initialStore: Store = {
    sidebar: false,
};

export function MainLayout(props: {
    children: ReactNode;
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [store, setStore] = useState<Store>(initialStore);

    return (
        <main>
            <ButtonBackToTop />
            {isMobile && (
                <MobileSidebar
                    open={store.sidebar}
                    onClose={() =>
                        setStore((pre) => ({ ...pre, sidebar: false }))
                    }
                />
            )}
            <Navigation
                sidebarToggleOnClick={() => {
                    if (store.sidebar) {
                        setStore(pre => ({ ...pre, sidebar: false }))
                    } else {
                        setStore(pre => ({ ...pre, sidebar: true }))
                    }
                }}
            />
            {props.children}
            <Footer />
        </main>
    )
};