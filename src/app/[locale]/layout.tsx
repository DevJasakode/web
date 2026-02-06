import "../globals.css";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { isLocale, Locale } from "@/i18n/config";
import { createTranslator } from "@/i18n/server";
import { Providers } from "./providers";


type Props = {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const dict = await getDictionary(locale);

    return (
        <html lang={locale}>
            <body>
                <Providers locale={locale} dictionary={dict}>
                    {children}
                </Providers>
            </body>
        </html>
    );
};

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const t = createTranslator(dict, locale as Locale);

    return {
        metadataBase: new URL("https://jasakode.com"),
        description: "JasaKode adalah platform pengembangan perangkat lunak yang menyediakan solusi web, aplikasi, dan sistem digital yang dirancang secara efisien, terukur, dan berkelanjutan untuk kebutuhan bisnis modern.",
        // assets
        title: t("app.title"),

        icons: {
            icon: [
                { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
                { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            ],
            apple: "/assets/apple-touch-icon.png",
        },

        manifest: "/assets/site.webmanifest",
    };
};

