
import {
    Star,
} from "lucide-react";
import { cx } from "./utils";


export function Stars({ value = 4.5, max = 5 }: { value?: number; max?: number }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    return (
        <div className="inline-flex items-center gap-1">
            {Array.from({ length: max }).map((_, i) => (
                <Star key={i} className={cx("h-4 w-4", i < full ? "fill-yellow-400 text-yellow-400" : i === full && half ? "fill-yellow-400/60 text-yellow-400/60" : "text-slate-300 dark:text-slate-500")} />
            ))}
        </div>
    );
};
