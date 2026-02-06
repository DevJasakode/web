export interface Docs {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    desc: string | null;
    created_at: Date;
    created_by: number;
    updated_at: Date | null;
    updated_by: number | null;
    deleted_at: Date | null;
    deleted_by: number | null;
};

export interface DocsForm {
    name: string;
    slug: string;
    logo?: string | null;
    desc?: string | null;
};
