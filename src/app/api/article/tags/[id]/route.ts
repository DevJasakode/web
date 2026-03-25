import { NextResponse, NextRequest } from "next/server";
import { ArticleTag } from "@/models/ArticleTag";
import { Op } from "sequelize";
import models from "@/models";


export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const deleted = await models.ArticleTag.destroy({
            where: {
                id: Number(id),
            },
        });

        if (!deleted) {
            return NextResponse.json(null, {
                status: 404,
                statusText: "Tag tidak ditemukan"
            });
        }
        return NextResponse.json(deleted, {
            status: 200,
            statusText: "Success remove tag"
        });
    } catch (error) {
        console.error("DELETE ArticleTag error:", error);
        return NextResponse.json(null, {
            status: 500,
            statusText: error instanceof Error ? error.message : "Unknown error"
        });
    }
};

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        
    } catch (error) {
        
    }
};