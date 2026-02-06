"use client";

import { useContext } from "react";
import { CTX } from "./Application";
import { Mode } from "@/config/theme";
import { makeTheme } from "@/config/theme";

interface ThemeContext {
    mode: Mode;
    setMode(mode: Mode): void;
};

export function useTheme(): ThemeContext {
    const ctx = useContext(CTX);

    return {
        mode: ctx.mui_theme.palette.mode,
        setMode(mode) {
            ctx.set(pre => ({ ...pre, mui_theme: makeTheme(mode) }));
            // ctx.set(pre => ({
            //     ...pre,
            //     mui_theme: {
            //         ...pre.mui_theme,
            //         palette: {
            //             ...pre.mui_theme.palette,
            //             mode: mode,
            //         }
            //     }
            // }));
        },
    };
};


/**
 * StoreContext
 * -------------
 * Kontrak (interface) untuk global storage sederhana berbasis key-value.
 *
 * Digunakan sebagai abstraction layer di atas React Context,
 * sehingga komponen tidak perlu berinteraksi langsung dengan context state.
 *
 * Pola ini memudahkan:
 * - akses global state (getter / setter)
 * - kontrol mutasi state
 * - refactor di masa depan tanpa menyentuh semua komponen
 */
interface StoreContext {
    /**
     * Mengecek apakah sebuah key sudah ada di store
     */
    exist(name: string): boolean;

    /**
     * Menyimpan data ke store dengan nama tertentu.
     * Mengembalikan `true` jika data dengan key tersebut sebelumnya sudah ada.
     */
    set<F>(name: string, data: F): boolean;

    /**
     * Mengambil data dari store berdasarkan key.
     * Bisa mengembalikan `undefined` jika key tidak ditemukan.
     */
    get<R>(name: string): R | undefined;

    /**
     * Menghapus data dari store.
     * Mengembalikan `true` jika data memang ada dan berhasil dihapus.
     */
    remove(name: string): boolean;

    /**
     * Mengosongkan seluruh isi store.
     * Berguna untuk logout, reset aplikasi, atau debugging.
     */
    clear(): void;
};

/**
 * useStore
 * --------
 * Custom hook sebagai antarmuka utama untuk global store.
 *
 * Hook ini membungkus React Context dan menyediakan API
 * getter / setter yang konsisten dan aman.
 *
 * Semua perubahan state dilakukan secara immutable
 * agar React dapat mendeteksi perubahan dengan benar.
 */
export function useStore(): StoreContext {
    const ctx = useContext(CTX);

    return {
        /**
         * Mengecek keberadaan key di dalam store.
         * Menggunakan operator `in` karena lebih efisien
         * dibanding iterasi Object.keys.
         */
        exist(name) {
            return name in ctx.store;
        },

        /**
         * Menyimpan data ke store.
         * Tidak memutasi state lama, melainkan membuat object baru.
         *
         * Return value:
         * - true  → key sudah ada sebelumnya (overwrite)
         * - false → key baru
         */
        set(name, data) {
            const existed = name in ctx.store;

            ctx.set(prev => ({
                ...prev,
                store: {
                    ...prev.store,
                    [name]: data,
                },
            }));

            return existed;
        },

        /**
         * Mengambil data dari store.
         * Tidak melempar error jika key tidak ada,
         * karena absence of state adalah kondisi normal.
         */
        get(name) {
            return ctx.store[name];
        },

        /**
         * Menghapus satu item dari store.
         *
         * Menggunakan object rest destructuring
         * untuk memastikan tidak ada mutasi state.
         */
        remove(name) {
            if (!(name in ctx.store)) {
                return false;
            }

            ctx.set(prev => {
                const { [name]: _, ...rest } = prev.store;

                return {
                    ...prev,
                    store: rest,
                };
            });

            return true;
        },

        /**
         * Menghapus seluruh isi store.
         * Biasanya dipakai saat:
         * - logout
         * - reset aplikasi
         * - hard refresh state global
         */
        clear() {
            ctx.set(prev => ({
                ...prev,
                store: {},
            }));
        },
    };
};