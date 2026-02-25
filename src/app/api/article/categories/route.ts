import { NextResponse, NextRequest } from "next/server";
import models from "@/models";
import { Op } from "sequelize";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const limit = Number(searchParams.get("limit") ?? 25);
        const offset = Number(searchParams.get("offset") ?? 0);
        const name = searchParams.get("name") ?? "";


        const where: any = {};

        if (name) {
            where.name = {
                [Op.like]: `${name}%`,
            };
        }

        const [categories, categoryCount] = await Promise.all([
            models.ArticleCategories.findAll({
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
                ],
            }),
            models.ArticleCategories.count({ where }),
        ]);

        return NextResponse.json(
            { count: categoryCount, data: categories },
            {
                status: 200,
                statusText: "Success Find All Article Categories",
            }
        );
    } catch (error: unknown) {
        console.error("GET /api/article/categories error:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

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