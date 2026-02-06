import { ReactNode } from "react";


export type ActivityCode = 
"account" | "settings" | "IAM" |
"Home" | "search" | "article" |
"contact" | "about" | "solutions" |
"innovations" | "docs" | "data";

export interface Activity {
    prefix?: string; // pathname prefix
    code: ActivityCode;
    logo: ReactNode;
    explorer?: ReactNode | null | undefined;
};
