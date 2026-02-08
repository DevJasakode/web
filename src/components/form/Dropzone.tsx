"use client";

import React, { Fragment, useCallback, useState, forwardRef, useEffect, useImperativeHandle, CSSProperties } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import {
    Box,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";



/**
 * @example
 * accept: {
 *  'image/jpeg': ['.jpg', '.jpeg'],
 *  'image/png': ['.png']
 * }
 * 
 */
type Accept = {
    [mimeType: string]: string[];
};

export interface DropzoneProps {
    accept?: Accept;
    multiple?: boolean;
    minHeight?: CSSProperties["minHeight"];
};
// export type DropzoneOptions = Pick<React.HTMLProps<HTMLElement>, PropTypes> & {
//   accept?: Accept;
//   minSize?: number;
//   maxSize?: number;
//   maxFiles?: number;
//   preventDropOnDocument?: boolean;
//   noClick?: boolean;
//   noKeyboard?: boolean;
//   noDrag?: boolean;
//   noDragEventsBubbling?: boolean;
//   disabled?: boolean;
//   onDrop?: <T extends File>(
//     acceptedFiles: T[],
//     fileRejections: FileRejection[],
//     event: DropEvent
//   ) => void;
//   onDropAccepted?: <T extends File>(files: T[], event: DropEvent) => void;
//   onDropRejected?: (fileRejections: FileRejection[], event: DropEvent) => void;
//   getFilesFromEvent?: (
//     event: DropEvent
//   ) => Promise<Array<File | DataTransferItem>>;
//   onFileDialogCancel?: () => void;
//   onFileDialogOpen?: () => void;
//   onError?: (err: Error) => void;
//   validator?: <T extends File>(
//     file: T
//   ) => FileError | readonly FileError[] | null;
//   useFsAccessApi?: boolean;
//   autoFocus?: boolean;
// };

function NoContent({ minHeight }: { minHeight?: CSSProperties["minHeight"] }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: minHeight || 250,
            }}
        >
            <CloudDownloadOutlinedIcon fontSize="large" />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </Box>
    )
};

function DragActived({ minHeight }: { minHeight?: CSSProperties["minHeight"] }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: minHeight || 250,
            }}
        >
            <p>Drop the files here ...</p>
        </Box>
    )
};


type ContentReaderFile = {
    id: string;
    path?: string;
    name: string;
    type: string;
    content: string; // base64 / text
};

function renderPreview(item: ContentReaderFile) {
    if (item.type.startsWith("image/")) {
        return (
            <img
                src={item.content}
                alt={item.name}
                style={{
                    maxWidth: "100%",
                    maxHeight: 120,
                    objectFit: "contain"
                }}
            />
        );
    }

    if (item.type.startsWith("video/")) {
        return (
            <video
                src={item.content}
                poster="" // browser akan pakai frame awal jika tidak ada
                style={{
                    maxWidth: "100%",
                    maxHeight: 120
                }}
                muted
            />
        );
    }

    if (item.type === "application/pdf") {
        return <PictureAsPdfOutlinedIcon fontSize="large" />;
    }

    return <DescriptionOutlinedIcon fontSize="large" />;
}




function ContentReader({ files, onRemove }: { files: FileWithPath[], onRemove?(path?: string): void }) {
    const [contents, setContents] = useState<ContentReaderFile[]>([]);

    useEffect(() => {
        if (!files.length) {
            setContents([]);
            return;
        }

        setContents([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result;

                if (typeof result !== "string") return;

                setContents(prev => [
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        path: file.path,
                        name: file.name,
                        type: file.type,
                        content: result
                    }
                ]);
            };


            if (file.type.startsWith("image/")) {
                reader.readAsDataURL(file);
                return;
            }

            if (file.type.startsWith("video/")) {
                reader.readAsDataURL(file);
                return;
            }

            switch (file.type) {
                case "application/pdf":
                    reader.readAsDataURL(file);
                    break;

                case "text/plain":
                    reader.readAsText(file);
                    break;

                default:
                    console.warn("Unsupported:", file.type);
            }
        });
    }, [files]);

    const handleDelete = (id: string) => {
        if (onRemove) onRemove(contents.find(item => item.id == id)?.path);
        setContents(prev => prev.filter(item => item.id !== id));
    };

    return (
        <Grid container spacing={2}>
            {contents.map(item => (
                <Grid key={item.id} size={3} sx={{ aspectRatio: 1 / 0.7 }}>
                    <Box
                        sx={{
                            border: "1px solid #ddd",
                            borderRadius: 2,
                            p: 1,
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {/* DELETE BUTTON */}
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleDelete(item.id);
                            }}
                            color="error"
                            sx={{ position: "absolute", top: 4, right: 4 }}
                        >
                            <DeleteOutlineIcon fontSize="small" />
                        </IconButton>

                        {/* CONTENT */}
                        {renderPreview(item)}

                        <Typography
                            variant="caption"
                            noWrap
                            sx={{ mt: 1, maxWidth: "100%" }}
                        >
                            {item.name}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export interface DropzoneRefObject {
    getFiles(): FileWithPath[];
    clear(): void;
};

export const Dropzone = forwardRef<DropzoneRefObject, DropzoneProps>((props, ref) => {
    const [files, setFiles] = useState<FileWithPath[]>([]);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: props.accept,
        multiple: props.multiple,
        onDrop,
    });

    useImperativeHandle(ref, () => ({
      getFiles() {
          return files;
      },
      clear() {
          setFiles([]);
      },
    }), [files, setFiles]);

    return (
        <div
            {...getRootProps()}
            style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: isDragActive ? "red" : "black",
                padding: 10,
            }}
        >
            <input {...getInputProps()} />
            {
                files.length > 0 ?
                    <ContentReader
                        files={files}
                        onRemove={path => {
                            setFiles(pre => (pre.filter(item => item.path !== path)));
                        }}
                    /> :
                    <Fragment>
                        {isDragActive ? (
                            <DragActived minHeight={props.minHeight} />
                        ) : (
                            <NoContent minHeight={props.minHeight} />
                        )}
                    </Fragment>
            }
        </div>
    );
});

