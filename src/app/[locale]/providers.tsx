"use client";

import { usePathname } from "next/navigation";
import { ThemeRegistry } from "@/context/ThemeRegistry";
import { Dictionary } from "@/i18n";
import { I18nProvider } from "@/i18n/provider";
import { Locale, locales } from "@/i18n/config";
import ApplicationProvider from "@/context/Application";
import { ClientBoundary } from "@/context/ClientBoundary";
import { MainLayout, AdminLayout } from "@/features/layouts";

import LayoutAmdim from "@/layouts/admin";

/**
 * ----------------------------------------
 * Helper: strip locale from pathname
 * ----------------------------------------
 */
function stripLocale(pathname: string) {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
        return "/" + segments.slice(1).join("/");
    }

    return pathname;
};

export function Providers({
    children,
    locale,
    dictionary,
}: {
    children: React.ReactNode;
    locale: Locale;
    dictionary: Dictionary;
}) {
    const pathname = usePathname();
    const cleanPath = stripLocale(pathname);

    /**
     * ----------------------------------------
     * Admin auth pages
     * (no layout, no providers)
     * ----------------------------------------
     */
    if (cleanPath.startsWith("/admin/auth")) {
        return <>{children}</>;
    }

    return (
        <ThemeRegistry>
            <I18nProvider locale={locale} dict={dictionary}>
                <ClientBoundary>
                    <ApplicationProvider>
                        {cleanPath.startsWith("/admin") ? (
                            <LayoutAmdim>{children}</LayoutAmdim>
                        ) : (
                            <MainLayout>{children}</MainLayout>
                        )}
                    </ApplicationProvider>
                </ClientBoundary>
            </I18nProvider>
        </ThemeRegistry>
    );
};

