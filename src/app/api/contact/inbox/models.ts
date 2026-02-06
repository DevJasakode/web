
export interface Inbox {
    id: number;
    ip: string;
    hash: string;
    unread: boolean;

    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
    message: string | null;

    created_at: string;
    updated_at: Date | null;
}


export interface FormInbox {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
};