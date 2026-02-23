import { NextResponse, NextRequest } from "next/server";
import models from "@/models";
import { Op } from "sequelize";

export async function GET(request: NextRequest) {
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

    const categorys = await models.ArticleCategories.findAll({
        limit,
        offset,
        where,
        include: [
            {
                model: models.ArticleCategories,
                as: "children",
            },
            {
                model: models.ArticleCategories,
                as: "parent",
            },
        ]
    });
    const category_count = await models.ArticleCategories.count({
        where,
    });

    return NextResponse.json({ count: category_count, data: categorys }, {
        status: 200,
        statusText: "Success Find All Storage Object"
    });
};

interface Form {
    parent_id?: number | null;
    name: string;
    slug: string;
    logo?: string | null;
    desc: string;
};

export async function POST(request: NextRequest) {
    try {
        const body: Form = await request.json();

        const created = await models.ArticleCategories.create({
            name: body.name,
            slug: body.slug,
            logo: body.logo,
            created_at: new Date(),
            created_by: 1,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Success create article category",
                data: created,
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Create Article Category Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed Create Article Category",
                error: error?.message ?? "Internal Server Error",
            },
            { status: 500 }
        );
    }
};