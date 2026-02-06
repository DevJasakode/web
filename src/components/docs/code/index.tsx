"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Daftar bahasa yang kita dukung.
 * Bisa diperluas sesuai kebutuhan.
 */
export type CodeLanguage =
  | "text"
  | "js"
  | "jsx"
  | "ts"
  | "tsx"
  | "json"
  | "bash"
  | "css"
  | "html"
  | "python"
  | "java"
  | "go"
  | "rust"
  | "yaml"
  | "markdown";

export interface CodeBlockProps {
  value: string;
  language?: CodeLanguage;
  theme?: Record<string, React.CSSProperties>;
  showLineNumbers?: boolean;
  startingLineNumber?: number;
  wrapLongLines?: boolean;
  customStyle?: React.CSSProperties;
  fontSize?: number | string;
  padding?: number | string;
}

export const DefaultCodeBlock: React.FC<CodeBlockProps> = ({
  value,
  language = "text",
  theme = oneDark,
  showLineNumbers = false,
  startingLineNumber = 1,
  wrapLongLines = false,
  customStyle,
  fontSize = "0.9rem",
  padding = "1rem",
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={theme}
      showLineNumbers={showLineNumbers}
      startingLineNumber={startingLineNumber}
      wrapLongLines={wrapLongLines}
      customStyle={{
        fontSize,
        padding,
        borderRadius: "6px",
        ...customStyle,
      }}
    >
      {value}
    </SyntaxHighlighter>
  );
};