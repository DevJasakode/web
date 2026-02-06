"use client";
import { Fragment, useEffect, useState } from "react";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import Lottie from 'lottie-react'
import loadingAnimation from '@/public/animation/Loading.json'
import { useRouter } from 'next/navigation'
import axios from "axios";


interface Store {
    loading: boolean;
};

const initialStore: Store = {
    loading: true,
};



export default function Auth() {
    const router = useRouter();
    const [store, setStore] = useState<Store>(initialStore);

    function load() {
        setTimeout(() => {
            setStore(pre => ({ ...pre, loading: false }));
        }, 3000);
    };

    // Hooks
    useEffect(() => {
        load();
    }, [router]);

    return (
        <Fragment>
            {
                store.loading ?
                    <Box
                        sx={{
                            width: "100vw",
                            height: "100svh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >

                        <Lottie
                            animationData={loadingAnimation}
                            loop
                            style={{ width: 120, height: 120 }}
                        />
                    </Box> :
                    <Box>
                        Information
                    </Box>
            }
        </Fragment>
    );
};
