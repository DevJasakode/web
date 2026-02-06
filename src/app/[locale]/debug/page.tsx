"use client";
import { useCallback, useEffect, useState } from "react";
import {
    Paper,
    Box,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

interface Store {
    loading: boolean;
    base64QR: string;
    host: string;
};

const initialStore: Store = {
    loading: false,
    base64QR: "",
    host: "",
};

interface Respon {
    host: string;
    qr: string;
};

export default function Debug() {
    const [store, setStore] = useState<Store>(initialStore);

    const getIP = useCallback(async () => {
        setStore(pre => ({ ...pre, loading: true }));
        try {
            const res = await axios.get<Respon>("/api/config", { withCredentials: true });
            if (res.status >= 200 && res.status <= 201 && res.data) {
                setStore(pre => ({ ...pre, host: res.data.host, base64QR: res.data.qr }));
            } else {
                throw Error(`${res.status} ${res.statusText} | Undefined error body not Found.`)
            }
        } catch (error) {
            const err: AxiosError = error as AxiosError;
            Swal.fire({
                title: err.message || "Error",
                text: err.response?.statusText || err.message,
                icon: 'error',
                confirmButtonText: 'Cool',
            });
        } finally {
            setStore(pre => ({ ...pre, loading: false }));
        }
    }, []);

    // Hooks
    useEffect(() => { getIP() }, []);

    return (
        <Box component={Paper}
            sx={{
                py: "50px",
                display: "flex",
                justifyContent: "center"
            }}
        >
            {
                store.loading ?
                    "Loading..." :
                    (
                        store.base64QR ?
                            <Box>
                                <img src={store.base64QR} alt="QR Code" width={250} />
                                <Link
                                    href={store.host}
                                    target="_blank"
                                    style={{
                                        margin: "0 auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "blue",
                                    }}
                                >{store.host}</Link>
                            </Box> : "DEBUG"
                    )
            }
        </Box>
    );
};