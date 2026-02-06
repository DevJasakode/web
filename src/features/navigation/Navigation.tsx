"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, useTheme as MuiUseTheme } from "@mui/material";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import { ButtonLanguageSelector } from "@/components/button";
import { useI18n } from "@/i18n";
import { useTheme } from "@/context";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n/config"


export interface NavigationProps {
  sidebarToggleOnClick?(): void;
}

export function Navigation({
  sidebarToggleOnClick,
}: NavigationProps) {
  const params = useParams<{ locale: Locale }>();
  const { mode, setMode } = useTheme();
  const muiTheme = MuiUseTheme();
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);




  return (
    <Box
      component="nav"
      id="navigation"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: muiTheme.zIndex.appBar,
        height: 60,
        display: "flex",
        alignItems: "center",
        transition: "all .3s ease",
        boxShadow: scrolled ? muiTheme.shadows[2] : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <Box
        className="w-full md:w-[80%] lg:w-[70%] max-w-[1920px] mx-auto flex items-center justify-between px-2"
      >
        {/* ===== Logo ===== */}
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHoSURBVHgB7dvNSYNBEIfx2RgjKUZr0FIEPxA8WELsIKIHwSCxElOCqAWkBM+SuO56FsR3J/J/ned3yVV8WHayQ8wAAAAAAAAAAAAAAMB3kgnZPc+P5Q/at557vkmd/68DE7K1skMLTirI021alo8rC0wqSDUY2qR8vFlQckGepqnGCHtK5IJU5VKcWLalBSQZpPpIMS942SCvN2mRzRYWjGyQqgS5tGCkg9RTUqo8WCDSQarBtl1YoDFYPki0MVg+SFW+LE6jjMG9CFJPSR7EuOB7EaR6uU7zCGOw1PO7kr3znK2jf/P8DoLIIYgYgogZWoO7o/dH+wc78OPZSGa4aTohq9U6/A7cW1OQs/l4mXLsHbi35jtka709scA7cG/NQQ7n6e3DMqfEicuUdTrbmeSgO3BvbmNvSlzwHtyCHM/GCwu4A/fm/MVwHW4H7s01yNcpyTnUDtyb+9PJcD0KtQP35h6EMbjNRh4XR6vRlDG4m40EqafEMhd8Fxt7fj+5H8+NMfjXmp7ff1KetQ/sj5RVQOcduBIWVGIIIoYgYggihiBiCCKGIGIIIoYgYggihiBiCCKGIGIIImajz+991vKztBacEDEEEUMQMQQRQxAxBBFDEDEEEUMQAAAAAAAAAAAAAADQC5+CNGWlBVT3ngAAAABJRU5ErkJggg=="
              alt="Logo"
              width={40}
              height={40}
            />
          </Box>
          <Link
            href={`/${params.locale}`}
            className="ml-1 text-[1.2rem] md:text-[1.4rem] font-bold"
          >
            {t("app.title")}
          </Link>
        </Box>

        {/* ===== Desktop Menu ===== */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          {[
            { href: `/${params.locale}/about`, label: t("nav.about") },
            { href: `/${params.locale}/solutions`, label: t("nav.solutions") },
            { href: `/${params.locale}/innovation`, label: t("nav.innovations") },
            { href: `/${params.locale}/article`, label: t("nav.article") },
            { href: `/${params.locale}/contact`, label: t("nav.contact") },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[1rem] hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-blue-600 after:origin-left after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </Box>

        {/* ===== Right Actions (ikon, toggle, hamburger) ===== */}
        <Box display="flex" alignItems="center" gap={1}>
          <div className="flex items-center gap-0 md:gap-1">
            <button
              className="flex w-[30px] h-[30px] hover:bg-gray-400/20 rounded-full cursor-pointer items-center justify-center"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            >
              {
                mode === "dark" ?
                  <LightModeOutlinedIcon fontSize="small" sx={{ fontSize: "1rem" }} /> :
                  <BedtimeOutlinedIcon fontSize="small" sx={{ fontSize: "1rem" }} />
              }
            </button>
            <ButtonLanguageSelector />
          </div>

          <button 
            onClick={sidebarToggleOnClick}
            className="flex md:hidden items-center w-[35px] transition-all hover:bg-gray-300/50 dark:hover:bg-gray-300/20 h-[35px] cursor-pointer justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 4h18v2H3zm0 7h12v2H3zm0 7h18v2H3z" />
            </svg>
          </button>
        </Box>
      </Box>
    </Box>
  );
}
