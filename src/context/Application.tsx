"use client";

import { makeTheme, getThemeMode } from "@/config/theme";
import { Theme } from "@mui/material";
import { createContext, ReactNode, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ThemeRegistry } from "@/context/ThemeRegistry";
import { applyThemeMode } from "@/config/theme";


interface Context {
    mui_theme: Theme;
    store: Record<string, any>;
    set(fn: (state: Exclude<Context, "set">) => Exclude<Context, "set">): void;
};

const initialContext: Context = {
    mui_theme: makeTheme(getThemeMode()),
    store: {},
    set(fn) { },
};

export const CTX = createContext<Context>(initialContext);



export default function ApplicationProvider({ children }: { children: ReactNode }) {
    const [store, setStore] = useState<Context>(initialContext);

    useEffect(() => {
        applyThemeMode(store.mui_theme.palette.mode);
    }, [store.mui_theme.palette.mode]);

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