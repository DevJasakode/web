"use client";

import { ReactNode, useState } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";

export function ThemeRegistry({
    children,
}: {
    children: ReactNode;
}) {
    const [{ cache, flush }] = useState(() => {
        const cache = createCache({ key: "mui", prepend: true });
        cache.compat = true;

        let inserted: string[] = [];
        const prevInsert = cache.insert;
        cache.insert = (...args) => {
            const serialized = args[1];
            if (!cache.inserted[serialized.name]) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };

        const flush = () => {
            const prev = inserted;
            inserted = [];
            return prev;
        };

        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) return null;

        let styles = "";
        for (const name of names) {
            styles += cache.inserted[name];
        }

        return (
            <style
                data-emotion={`mui ${names.join(" ")}`}
                dangerouslySetInnerHTML={{ __html: styles }}
            />
        );
    });

    return <CacheProvider value={cache}>{children}</CacheProvider>;
};
