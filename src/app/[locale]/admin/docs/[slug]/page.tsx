"use client";

import {
    MDXEditor,
    toolbarPlugin,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    linkPlugin,
    linkDialogPlugin,
    imagePlugin,
    tablePlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    CodeToggle,
    CreateLink,
    InsertImage,
    InsertTable,
    ListsToggle,
    BlockTypeSelect,
    InsertThematicBreak,
} from "@mdxeditor/editor";
import { Box, Grid } from "@mui/material";
import { useState, Fragment } from "react";
import { useParams } from "next/navigation";
import "@mdxeditor/editor/style.css";

interface MarkdownEditorProps {
    value: string;
    onChange: (markdown: string) => void;
    readOnly?: boolean;
}

/**
 * MarkdownEditor
 * --------------
 * Full-featured Markdown editor berbasis MDXEditor.
 *
 * Fitur:
 * - Heading, list, quote, table
 * - Code block (CodeMirror)
 * - Image & link
 * - Undo / redo
 * - Markdown shortcut
 * - Source ↔ visual mode (diff)
 *
 * Editor ini menyimpan data sebagai Markdown murni.
 */
function MarkdownEditor({
    value,
    onChange,
    readOnly = false,
}: MarkdownEditorProps) {
    return (
        <div className="border" spellCheck={false}>
            <MDXEditor
                markdown={value}
                onChange={onChange}
                readOnly={readOnly}
                plugins={[
                    // Toolbar utama
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                <UndoRedo />
                                <BlockTypeSelect />
                                <BoldItalicUnderlineToggles />
                                <CodeToggle />
                                <ListsToggle />
                                <CreateLink />
                                <InsertImage />
                                <InsertTable />
                                <InsertThematicBreak />
                            </>
                        ),
                    }),

                    // Struktur dokumen
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),

                    // Markdown UX
                    markdownShortcutPlugin(),

                    // Link
                    linkPlugin(),
                    linkDialogPlugin(),

                    // Image
                    imagePlugin({
                        imageUploadHandler: async (file) => {
                            /**
                             * TODO:
                             * Upload ke server / S3 / Cloudinary
                             * lalu return URL string
                             */
                            return URL.createObjectURL(file);
                        },
                    }),

                    // Table
                    tablePlugin(),

                    // Code block
                    codeBlockPlugin(),
                    codeMirrorPlugin({
                        codeBlockLanguages: {
                            js: "JavaScript",
                            ts: "TypeScript",
                            tsx: "TSX",
                            json: "JSON",
                            css: "CSS",
                            html: "HTML",
                            bash: "Shell",
                        },
                    }),

                    // Visual ↔ source diff mode
                    diffSourcePlugin(),
                ]}
            />
        </div>
    );
}




interface MarkdownViewerProps {
    value: string;
    className?: string;
}


/**
* MarkdownViewer
* --------------
* Komponen read-only untuk menampilkan konten Markdown
* yang dihasilkan oleh MDXEditor.
*
* Tidak menyediakan toolbar atau interaksi edit.
* Digunakan untuk preview, halaman publik, atau read mode.
*/
function MarkdownViewer({ value, className }: MarkdownViewerProps) {
    return (
        <div className={className ?? "mdx-viewer"}>
            <MDXEditor
                markdown={value}
                readOnly
                contentEditableClassName="mdx-viewer-content"
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    linkPlugin(),
                    imagePlugin(),
                    tablePlugin(),
                    codeBlockPlugin(),
                    codeMirrorPlugin({
                        codeBlockLanguages: {
                            js: "JavaScript",
                            ts: "TypeScript",
                            tsx: "TSX",
                            json: "JSON",
                            css: "CSS",
                            html: "HTML",
                            bash: "Shell",
                        },
                    }),
                ]}
            />
        </div>
    );
}

// ========================================================================================

export default function Project() {
    // const { slug } = await params;
    const params = useParams<{ slug: string }>();
    const [content, setContent] = useState<string>("## Halo dunia\n\nMulai menulis...");


    // useEffect(() => console.log(params), [params]);

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }} className="mdx-scope">
                <Grid container spacing={2}>
                    <Grid sx={{ xs: 12, md: 6 }}>
                        <MarkdownEditor
                            value={content}
                            onChange={setContent}
                        />
                    </Grid>
                    <Grid sx={{ xs: 12, md: 6 }}>
                        <MarkdownViewer
                            value={content}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>

    )
};

