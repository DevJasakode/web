

export interface ContactSettings {
    id: number;
    address: string;
    phone: string;
    email: string;
    auto_reply_email: boolean;
    auto_reply_email_message: string;
    forward_telegram_bot: boolean;
    forward_telegram_bot_token?: string | null;
    forward_whatsapp: boolean;
    forward_whatsapp_contact?: string | null;
    created_at: Date;
    created_by: number;
    updated_at: Date | null;
    updated_by: number | null;
};