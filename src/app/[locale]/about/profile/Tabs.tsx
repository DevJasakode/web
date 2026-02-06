// import { useRef, useEffect, useLayoutEffect, useState } from "react";
// import type { PointerEvent as ReactPointerEvent } from "react";
// import { cx } from "./utils";

// import { TimelineTab } from "./types";

// interface TabsProps {
//     TABS: ReadonlyArray<TimelineTab>;
//     tab: string;
//     setTab: (t: TimelineTab) => void;
// };

// export function Tabs({ TABS, tab, setTab }: TabsProps) {
//     const scrollRef = useRef<HTMLDivElement | null>(null);
//     const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
//     const dragRef = useRef({
//         active: false,
//         dragging: false,
//         startX: 0,
//         scrollLeft: 0,
//         pointerId: 0,
//     });
//     const skipClickRef = useRef(false);
//     const [isDragging, setIsDragging] = useState(false);
//     const [canLeft, setCanLeft] = useState(false);
//     const [canRight, setCanRight] = useState(false);

//     // underline indicator
//     const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

//     const updateArrows = () => {
//         const el = scrollRef.current;
//         if (!el) return;
//         const { scrollLeft, scrollWidth, clientWidth } = el;
//         setCanLeft(scrollLeft > 0);
//         setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
//     };

//     const measureIndicator = () => {
//         const scroller = scrollRef.current;
//         const el = tabRefs.current[String(tab)];
//         if (!scroller || !el) return;
//         // posisi relatif terhadap scroller (nav relative)
//         const left = el.offsetLeft;
//         const width = el.offsetWidth;
//         setIndicator({ left, width });
//     };

//     const centerIntoView = (targetTab?: TimelineTab) => {
//         const scroller = scrollRef.current;
//         const el = tabRefs.current[String(targetTab ?? tab)];
//         if (!scroller || !el) return;

//         const padding = 16;
//         const elLeft = el.offsetLeft;
//         const elRight = elLeft + el.offsetWidth;
//         const viewLeft = scroller.scrollLeft;
//         const viewRight = viewLeft + scroller.clientWidth;
//         const maxScroll = scroller.scrollWidth - scroller.clientWidth;

//         let target = viewLeft;
//         if (elLeft - padding < viewLeft) {
//             target = elLeft - padding;
//         } else if (elRight + padding > viewRight) {
//             target = elRight + padding - scroller.clientWidth;
//         }

//         target = Math.max(0, Math.min(target, maxScroll));

//         scroller.scrollTo({ left: target, behavior: "smooth" });
//     };

//     const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
//         if (event.pointerType !== "mouse") {
//             return;
//         }

//         const scroller = scrollRef.current;
//         if (!scroller) {
//             return;
//         }

//         dragRef.current = {
//             active: true,
//             dragging: false,
//             startX: event.clientX,
//             scrollLeft: scroller.scrollLeft,
//             pointerId: event.pointerId,
//         };
//         skipClickRef.current = false;
//         setIsDragging(false);
//     };

//     const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
//         if (!dragRef.current.active) {
//             return;
//         }
//         const scroller = scrollRef.current;
//         if (!scroller) {
//             return;
//         }
//         const delta = event.clientX - dragRef.current.startX;
//         if (!dragRef.current.dragging && Math.abs(delta) > 4) {
//             dragRef.current.dragging = true;
//             skipClickRef.current = true;
//             setIsDragging(true);
//             scroller.setPointerCapture?.(dragRef.current.pointerId);
//         }

//         if (!dragRef.current.dragging) {
//             return;
//         }

//         scroller.scrollLeft = dragRef.current.scrollLeft - delta;
//         updateArrows();
//         event.preventDefault();
//     };

//     const endDrag = () => {
//         if (!dragRef.current.active) {
//             return;
//         }
//         const wasDragging = dragRef.current.dragging;
//         const scroller = scrollRef.current;
//         if (wasDragging && scroller && scroller.hasPointerCapture?.(dragRef.current.pointerId)) {
//             scroller.releasePointerCapture(dragRef.current.pointerId);
//         }
//         dragRef.current = { active: false, dragging: false, startX: 0, scrollLeft: 0, pointerId: 0 };
//         setIsDragging(false);
//         if (!wasDragging) {
//             skipClickRef.current = false;
//         }
//         updateArrows();
//     };

//     // awal + saat resize/scroll
//     useEffect(() => {
//         const el = scrollRef.current;
//         if (!el) return;
//         updateArrows();

//         const onScroll = () => updateArrows();
//         el.addEventListener("scroll", onScroll, { passive: true });

//         const ro = new ResizeObserver(() => {
//             updateArrows();
//             measureIndicator();
//         });
//         ro.observe(el);

//         // observe tiap tab untuk perubahan ukuran label
//         Object.values(tabRefs.current).forEach((btn) => btn && ro.observe(btn));

//         return () => {
//             el.removeEventListener("scroll", onScroll);
//             ro.disconnect();
//         };
//     }, []);

//     // re-measure saat tab aktif atau list berubah
//     useLayoutEffect(() => {
//         measureIndicator();
//     }, [tab, TABS.length]);

//     // kalau TABS berubah dinamis atau tab aktif berubah, perbarui panah & posisi
//     useEffect(() => {
//         centerIntoView();
//         updateArrows();
//     }, [tab, TABS.length]);

//     return (
//         <div className="relative mt-6 border-b border-slate-200 pb-2 dark:border-slate-700">
//             {canLeft && (
//                 <div className="pointer-events-none absolute inset-y-1 left-0 z-10 w-12 rounded-e-full bg-gradient-to-r from-slate-900/15 via-slate-900/5 to-transparent dark:from-black/60 dark:via-black/35" />
//             )}
//             {canRight && (
//                 <div className="pointer-events-none absolute inset-y-1 right-0 z-10 w-12 rounded-s-full bg-gradient-to-l from-slate-900/15 via-slate-900/5 to-transparent dark:from-black/60 dark:via-black/35" />
//             )}

//             <div>
//                 {/* area scroll */}
//                 <nav
//                     ref={scrollRef}
//                     onPointerDown={handlePointerDown}
//                     onPointerMove={handlePointerMove}
//                     onPointerUp={endDrag}
//                     onPointerLeave={endDrag}
//                     onPointerCancel={endDrag}
//                     className={cx(
//                         "relative flex gap-2 overflow-x-auto whitespace-nowrap px-2 text-sm select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
//                         isDragging ? "cursor-grabbing" : "cursor-grab"
//                     )}
//                     role="tablist"
//                     aria-orientation="horizontal"
//                 >
//                     {/* underline indicator ala MUI */}
//                     <div
//                         aria-hidden
//                         className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-cyan-500 transition-[left,width] duration-200 ease-out"
//                         style={{ left: indicator.left, width: indicator.width }}
//                     />

//                     {TABS.map((t) => (
//                         <button
//                             key={String(t)}
//                             ref={(el) => {
//                                 tabRefs.current[t] = el;
//                             }}
//                             onClick={() => {
//                                 if (skipClickRef.current) {
//                                     skipClickRef.current = false;
//                                     return;
//                                 }
//                                 setTab(t);
//                                 centerIntoView(t);
//                             }}
//                             role="tab"
//                             aria-selected={tab === t}
//                             className={cx(
//                                 "relative -mb-px select-none px-3 py-2.5 font-medium outline-none",
//                                 tab === t
//                                     ? "text-slate-900 dark:text-slate-100"
//                                     : "text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
//                             )}
//                         >
//                             {String(t)[0].toUpperCase() + String(t).slice(1)}
//                         </button>
//                     ))}
//                 </nav>
//             </div>

//             {/* No arrow buttons; drag-to-scroll handles navigation */}
//         </div>
//     );
// };


"use client";

import * as React from "react";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { TimelineTab } from "./types";

interface TabsProps {
    TABS: ReadonlyArray<TimelineTab>;
    tab: TimelineTab;
    setTab: (t: TimelineTab) => void;
}

/* =========================
   Styled MUI Components
========================= */

const TabsRoot = styled(MuiTabs)(({ theme }) => ({
    minHeight: 44,
    "& .MuiTabs-indicator": {
        height: 2,
        borderRadius: 999,
        backgroundColor: theme.palette.mode === "dark"
            ? "#22d3ee"
            : "#06b6d4",
        transition: "all 200ms ease",
    },
}));

const TabItem = styled(MuiTab)(({ theme }) => ({
    textTransform: "none",
    minHeight: 44,
    minWidth: "auto",
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 500,
    color:
        theme.palette.mode === "dark"
            ? "rgba(226,232,240,.75)"
            : "#64748B",

    "&.Mui-selected": {
        color:
            theme.palette.mode === "dark"
                ? "#F8FAFC"
                : "#0F172A",
        fontWeight: 600,
    },

    "&:hover": {
        color:
            theme.palette.mode === "dark"
                ? "#E2E8F0"
                : "#334155",
    },
}));

/* =========================
   Component
========================= */

export function Tabs({ TABS, tab, setTab }: TabsProps) {
    return (
        <Box
            sx={{
                mt: 3,
                borderBottom: "1px solid",
                borderColor: theme =>
                    theme.palette.mode === "dark"
                        ? "rgba(148,163,184,.25)"
                        : "#E2E8F0",
            }}
        >
            <TabsRoot
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="Timeline Tabs"
            >
                {TABS.map((t) => (
                    <TabItem
                        key={String(t)}
                        value={t}
                        label={String(t)[0].toUpperCase() + String(t).slice(1)}
                    />
                ))}
            </TabsRoot>
        </Box>
    );
};