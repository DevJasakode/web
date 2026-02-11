import { NextResponse } from "next/server";
import models from "@/models";


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const deleted = await models.ContactInbox.destroy({
            where: {
                id: Number(id),
            }
        });
        return NextResponse.json(deleted, {
            status: 200,
            statusText: "Success delete inbox"
        });
    } catch (err: unknown) {
        return NextResponse.json(
            {
                error: "INTERNAL_ERROR",
                message: "Terjadi kesalahan sistem",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const read = await models.ContactInbox.update({
            unread: false,
        }, {
            where: {
                id: Number(id),
            }
        });
        return NextResponse.json(read, {
            status: 200,
            statusText: "Success Read inbox"
        });
    } catch (err: unknown) {
        return NextResponse.json(
            {
                error: "INTERNAL_ERROR",
                message: "Terjadi kesalahan sistem",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500 }
        );
    }
}