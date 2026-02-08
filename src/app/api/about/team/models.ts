
export interface ResponseMetadata {
    total: number;
    limit: number;
    offset: number;
}

export interface ResponsePagination<T extends any> {
    meta: ResponseMetadata;
    data: T[] | null;
};

export interface AboutTeam {
    id: number;
    name: string;
    avatar: string | null;
    position: string;
    position_desc: string;
    profile: string | null;
    focus: string | null;
    created_at: Date;
    created_by: number;
    updated_at: Date | null;
    updated_by: number | null;
    deleted_at: Date | null;
    deleted_by: number | null;
    social_media?: AboutTeamSocialMedia[] | null;
};

export interface AboutTeamSocialMedia {
    id: number;
    about_team_id: number;
    platform: string;
    platform_logo: string | null;
    platform_url: string | null;
    url: string;
    created_at: Date;
    created_by: number;
    updated_at: Date | null;
    updated_by: number | null;
}

