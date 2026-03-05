import { NextResponse, NextRequest } from "next/server";
import { ArticleTag } from "@/models/ArticleTag";
import { Op } from "sequelize";
import models from "@/models";

interface Form {
    name: ArticleTag["name"];
    slug: ArticleTag["slug"];
    desc: ArticleTag["desc"];
};

export function toSlug(input: string): string {
    return input
        // Normalisasi Unicode (é -> e + ´)
        .normalize("NFKD")
        // Hapus diakritik
        .replace(/[\u0300-\u036f]/g, "")
        // Lowercase
        .toLowerCase()
        // Ganti karakter non-alphanumeric jadi dash
        .replace(/[^a-z0-9]+/g, "-")
        // Hapus dash beruntun
        .replace(/-+/g, "-")
        // Trim dash di awal & akhir
        .replace(/^-|-$/g, "");
};

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(request: NextRequest) {
    try {
        // ===========================================================
        // Query Bulder
        // ===========================================================
        const { searchParams } = new URL(request.url);
        const limit = Number(searchParams.get("limit") ?? 25);
        const offset = Number(searchParams.get("offset") ?? 0);
        const name = String(searchParams.get("name") ?? "");
        const where: any = {};
        if (name) {
            where.name = {
                [Op.like]: `${name}%`, // ← longgar
            };
        }
        // ===========================================================

        const tags = await models.ArticleTag.findAll({
            limit,
            offset,
            where,
        });

        const count = await models.ArticleTag.count({
            where,
        });

        return NextResponse.json(
            {
                count: count,
                data: tags,
            }, {
            status: 200,
            statusText: "Success Find All Storage Object"
        });

    } catch (error) {
        console.error("GET /api/article/tags error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500, statusText: "Internal Server Error" }
        );
    }
};


export async function POST(request: NextRequest) {
    try {
        if (request.headers.get("Content-Type") !== "application/json") {
            return NextResponse.json(
                { error: "Tipe konten tidak dapat diproses" },
                { status: 406 }
            );
        };
        const body: Form = await request.json();

        const created = await models.ArticleTag.create({
            name: body.name,
            slug: body.slug && body.slug.length > 0 && slugRegex.test(body.slug) ? toSlug(body.slug) : toSlug(body.name),
            desc: body.desc,
            created_at: Date.now(),
            created_by: 1,
        });

        return NextResponse.json(
            created,
            { status: 201, statusText: "Success create new article tag" }
        );
    } catch (error) {
        console.error("POST /api/article/tags error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500, statusText: "Internal Server Error" }
        );
    }
};
