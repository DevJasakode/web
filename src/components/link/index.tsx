// components/SmartLink.tsx
"use client";

import Link, { LinkProps } from "next/link";
import { ReactNode, CSSProperties } from "react";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n/config";

type HrefObject = {
    pathname: string;
    query?: Record<string, string | string[]>;
};

type SmartLinkProps = Omit<LinkProps, "href"> & {
    href: HrefObject;
    style?: CSSProperties | undefined;
    className?: string | undefined;
    children: ReactNode;
};

function interpolate(
    pathname: string,
    query: Record<string, string | string[]> = {}
): string {
    return pathname.replace(
        /\[(\.{3})?(\w+)\]/g,
        (_, spread, key) => {
            const value = query[key];
            if (Array.isArray(value)) return value.join("/");
            if (typeof value === "string") return value;
            return "";
        }
    );
}

export function SmartLink({ href, ...props }: SmartLinkProps) {
    const { locale } = useParams<{ locale: Locale }>();

    const resolvedPath = interpolate(href.pathname, { locale: locale, ...href.query });
    return <Link {...props} href={resolvedPath} />;
}
