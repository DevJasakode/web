"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    CircularProgress,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import { JSX } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import { FileType, File } from "@/api/video/route";
import { SmartLink } from "@/components/link";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import { Locale } from "@/i18n/config";


interface Store {
    loading: boolean;
    files: File[];
};

const initialStore: Store = {
    loading: false,
    files: [],
};


export default function Video() {
    const router = useRouter();
    const pathname = usePathname();

    const { locale } = useParams<{ locale: Locale }>();
    const searchParams = useSearchParams();
    const [store, setStore] = useState<Store>(initialStore);
    const filePath = searchParams.get("path");
    const fileType = searchParams.get("type");



    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    };


    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
            MUI
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            onClick={handleClick}
        >
            Core
        </Link>,
        <Typography key="3" sx={{ color: 'text.primary' }}>
            Breadcrumb
        </Typography>,
    ];

    const load = useCallback(async (path?: string, fileType?: string) => {
        setStore(pre => ({ ...pre, loading: true }));
        try {
            let query = "";
            console.log(path && fileType)
            if (path && fileType) {
                query = `?path=${path}&type=${fileType}`
            }
            const res = await axios.get<File[]>("/api/video"+query, { withCredentials: true });
            if (res.status >= 200 && res.status <= 201 && res.data) {
                // console.log(res.status, res.statusText, res.data);
                setStore(pre => ({ ...pre, files: res.data }));
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



    useEffect(() => {
        if (filePath && fileType) {
            if(fileType === "folder") {
                load(filePath, fileType);
            } else {
                console.log(filePath, fileType)
            }
        } else if (filePath || fileType) {
            router.replace(pathname);
        } else {
            load();
        };
    }, [filePath, fileType]);



    return (
        <Box sx={{ px: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button>
                        <ViewModuleIcon />
                    </Button>
                    <Button>
                        <ViewListIcon />
                    </Button>
                </ButtonGroup>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ pb: 2 }}>

                <Stack spacing={2} sx={{ mb: 2 }}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Stack>

                <Box sx={{ my: 1 }}>
                    {
                        store.loading ?
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    py: 8,
                                }}
                            >
                                <CircularProgress color="secondary" />
                            </Box>
                            :
                            <Fragment>
                                {
                                    store.files.length > 0 ?
                                        <Box>
                                            <Grid container spacing={2}>
                                                {store.files.map((item) => (
                                                    <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={item.id}>
                                                        <Card
                                                            variant="outlined"
                                                            sx={{
                                                                textAlign: "center",
                                                                cursor: "pointer",
                                                                "&:hover": { boxShadow: 3 }
                                                            }}
                                                        >
                                                            <SmartLink
                                                                href={{
                                                                    pathname: `/[locale]/video?path=${item.path}&type=${item.type}`,
                                                                    query: { locale: locale }
                                                                }}
                                                            >
                                                                <CardContent>
                                                                    <Box mb={1}>
                                                                        {
                                                                            item.type === "folder" ?
                                                                                <FolderIcon fontSize="large" color="primary" /> :
                                                                                "FILE"
                                                                        }
                                                                    </Box>
                                                                    <Typography variant="body2">{item.name}</Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {item.size}
                                                                    </Typography>
                                                                </CardContent>
                                                            </SmartLink>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box> :
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                py: 8,
                                            }}
                                        >
                                            <IconButton size="medium" color="primary" onClick={() => load()}>
                                                <RotateLeftOutlinedIcon />
                                            </IconButton>
                                        </Box>
                                }
                            </Fragment>
                    }
                </Box>
            </Box>

        </Box>
    );
};