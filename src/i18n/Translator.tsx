"use client";
import { I18nContext } from "./provider";
import { Locale } from "./config";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import axios, { AxiosError } from "axios";


type TextElement =
    | "p"
    | "span"
    | "strong"
    | "em"
    | "small"
    | "label"
    | "i"
    | "b"
    | "u"
    | "mark"
    | "del"
    | "ins"
    | "sub"
    | "sup"
    | "code"
    | "pre"
    | "blockquote"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

type TranslatorProps = {
    children?: string;
    element?: TextElement;
};

// https://apertium.jasakode.com/listPairs


async function translateText(
    text: string,
    target: Locale
): Promise<{ translatedText: string; time: number; error?: string }> {
    const start = typeof performance !== "undefined"
        ? performance.now()
        : Date.now();

    try {
        const res = await axios.post<{ translatedText: string }>(
            "http://139.59.255.139:5000/translate",
            {
                q: text,
                source: "auto",
                target,
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        const end = typeof performance !== "undefined"
            ? performance.now()
            : Date.now();

        if (res.status >= 200 && res.status < 300 && res.data) {
            return {
                translatedText: res.data.translatedText,
                time: end - start,
            };
        }

        return {
            translatedText: "",
            time: end - start,
            error: `Unexpected status: ${res.status}`,
        };
    } catch (error) {
        const end = typeof performance !== "undefined"
            ? performance.now()
            : Date.now();

        const err = error as AxiosError<any>;

        return {
            translatedText: "",
            time: end - start,
            error:
                err.response?.data?.error ??
                err.response?.statusText ??
                err.message,
        };
    }
}

function TranslateIconAnimated({
    size = 20,
}: {
    size?: number;
}) {
    const diameter = size * 2.2;
    const r = diameter / 2;
    const offset = size * 0.25;
    return (
        <Box
            component="span"
            sx={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                width: diameter,
                height: diameter,
                color: "currentColor",
                display: "inline-block",
                cursor: "default",
            }}
            title="Harap tunggu, konten sedang diterjemahkan..."
        >

            <svg
                width={diameter}
                height={diameter}
                viewBox={`0 0 ${diameter} ${diameter}`}
                style={{
                    transform: "scale(0.7)",
                    transformOrigin: "center",
                }}
            >
                {/* MASK: ini yang membuat isi TIDAK PERNAH keluar */}
                <defs>
                    <mask id="circle-mask">
                        <rect width="100%" height="100%" fill="black" />
                        <circle cx={r} cy={r} r={r} fill="white" />
                    </mask>
                </defs>

                {/* Rotating dashed ring */}
                <motion.circle
                    cx={r}
                    cy={r}
                    r={r - 1}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 3,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    style={{ transformOrigin: "50% 50%" }}
                />

                {/* Content group (masked) */}
                <g mask="url(#circle-mask)" transform={`translate(${-size * 0.25}, 0)`}>
                    {/* A */}
                    <motion.text
                        x={r - size * 0.6}
                        y={r + size * 0.35}
                        fontSize={size}
                        fontWeight="600"
                        fill="currentColor"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{
                            x: [0, offset, 0],
                            opacity: [1, 0.3, 1],
                        }}
                        transition={{
                            duration: 1.6,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    >
                        A
                    </motion.text>

                    {/* 文 */}
                    <motion.text
                        x={r + size * 0.2}
                        y={r + size * 0.35}
                        fontSize={size}
                        fontWeight="600"
                        fill="currentColor"
                        initial={{ x: 0, opacity: 0.3 }}
                        animate={{
                            x: [0, -offset, 0],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 1.6,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    >
                        文
                    </motion.text>
                </g>
            </svg>
        </Box>
    );
};




export function Translator({
    children,
    element = "p",
}: TranslatorProps) {
    const ctx = useContext(I18nContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string | undefined>(children);
    const Component = element;

    async function translate(text: string) {
        if (ctx && ctx.locale) {
            setLoading(true);
            try {
                const res = await translateText(text, ctx.locale);
                if (res.error) {
                    throw Error(res.error);
                }
                setValue(res.translatedText)
            } catch (error) {
                const err: AxiosError = error as AxiosError;
                console.log(err.status, err.message, err.response?.status, err.response?.statusText, err.response?.data)
            } finally {
                setLoading(false);
            }
        }
    };


    useEffect(() => {
        if (children) translate(children);
    }, [ctx, children]);

    return (
        <Component
            style={{
                position: "relative",
                display: "inline-block",
                maxWidth: "100%",
                wordBreak: "break-word",
            }}
        >
            {loading && <TranslateIconAnimated size={12} />}
            {value}
        </Component>
    );
}
