"use client";

import { motion } from "framer-motion";
import { Hammer, Construction, AlertTriangle } from "lucide-react";
import { CareerList } from "./CareerList";
import { Box } from "@mui/material";

export default function Careers() {

  return (
    <Box 
      maxWidth={"lg"}
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        p: 3,
        minHeight: "100svh"
      }}
    >
      <CareerList />
    </Box>
  )

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 md:pt-24 bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 dark:text-slate-100 dark:from-slate-950 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="md:bg-white dark:md:bg-slate-900 md:shadow-xl rounded-2xl p-10 max-w-2xl text-center md:border md:border-slate-100 dark:md:border-slate-800/50"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Construction className="h-20 w-20 text-amber-500" />
            <Hammer className="absolute -bottom-2 -right-2 h-8 w-8 text-sky-500 animate-bounce" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-200 mb-3">
          Halaman Sedang Dalam Pengembangan
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
          Kami sedang membangun sesuatu yang luar biasa di sini. Beberapa fitur mungkin belum tersedia sepenuhnya,
          tapi tim kami sedang bekerja keras untuk menyempurnakannya.
        </p>

        <motion.button
          // href="/"
          onClick={() => history.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 text-white px-6 py-3 font-medium shadow-md hover:bg-sky-700 transition-colors"
        >
          <AlertTriangle className="h-5 w-5" />
          Kembali ke Halaman Sebelumnya
        </motion.button>
      </motion.div>

      <footer className="absolute bottom-6 text-sm text-slate-500">
        © {new Date().getFullYear()} | Jasakode Development
      </footer>
    </div>
  );
};