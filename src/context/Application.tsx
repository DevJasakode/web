"use client";

import { makeTheme, getThemeMode } from "@/config/theme";
import { Theme } from "@mui/material";
import { createContext, ReactNode, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ThemeRegistry } from "@/context/ThemeRegistry";
import { applyThemeMode } from "@/config/theme";
import { User } from "@/models/User";
import axios from "axios";
import { locales, Locale } from "@/i18n/config";
import { usePathname } from "next/navigation";


interface Context {
    user: User | null;
    mui_theme: Theme;
    store: Record<string, any>;
    set(fn: (state: Exclude<Context, "set">) => Exclude<Context, "set">): void;
};

const initialContext: Context = {
    user: null,
    mui_theme: makeTheme(getThemeMode()),
    store: {},
    set(fn) { },
};

export const CTX = createContext<Context>(initialContext);


/**
 * ----------------------------------------
 * Helper: generalize locale segment to route pattern
 * ----------------------------------------
 */
function normalizeLocaleRoute(pathname: string): string {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
        return "/[locale]/" + segments.slice(1).join("/");
    }

    return pathname;
};



export default function ApplicationProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [store, setStore] = useState<Context>(initialContext);

    useEffect(() => {
        applyThemeMode(store.mui_theme.palette.mode);
    }, [store.mui_theme.palette.mode]);





    // Load Auth
    useEffect(() => {
        const route = normalizeLocaleRoute(pathname);
        if (route.startsWith("/[locale]/admin") && !route.startsWith("/[locale]/admin/auth")) {
            axios.get<User | null>("/api/auth", { withCredentials: true }).then(res => {
                if (res.status >= 200 && res.status <= 201 && res.data) {
                    setStore(pre => ({ ...pre, user: res.data }));
                };
            });
        };
    }, [pathname]);


    return (
        <CTX.Provider value={{ ...store, set: setStore }}>
            <ThemeRegistry>
                <ThemeProvider theme={store.mui_theme}>
                    <CssBaseline />
                    {/* <MainLayout>
                        {children}
                    </MainLayout> */}
                    {children}
                </ThemeProvider>
            </ThemeRegistry>
        </CTX.Provider>
    )
};