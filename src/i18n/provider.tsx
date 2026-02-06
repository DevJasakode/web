"use client";

import React, { createContext, useContext } from "react";
import type { Locale } from "./config";

type Dictionary = Record<string, string>;

type I18nContextValue = {
    locale: Locale;
    t: (key: string) => string;
};

export const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
    locale,
    dict,
    children,
}: {
    locale: Locale;
    dict: Dictionary;
    children: React.ReactNode;
}) {
    const t = (key: string) => dict[key] ?? key;

    return (
        <I18nContext.Provider value={{ locale, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
    return ctx;
}
