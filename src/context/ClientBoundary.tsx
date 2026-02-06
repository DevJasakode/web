// ClientBoundary.tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./index";

export function ClientBoundary({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null; // atau skeleton NETRAL
    }

    return <>{children}</>;
}
