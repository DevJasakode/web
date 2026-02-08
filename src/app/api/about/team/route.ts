import { NextRequest, NextResponse } from "next/server";
import { Op, fn, col, where as whereFn } from "sequelize";
import models from "@/models";

export async function GET(request: NextRequest) {
    try {
        // ===========================================================
        // Query Builder
        // ===========================================================
        const { searchParams } = new URL(request.url);

        const limit = Number(searchParams.get("limit") ?? 25);
        const offset = Number(searchParams.get("offset") ?? 0);
        const name = searchParams.get("name");

        const where: any = {
            deleted_at: {
                [Op.or]: [null, 0],
            },
        };
        const conditions: any[] = [];

        // ===========================================================
        // Filter by name (LIKE)
        // ===========================================================
        if (name) {
            conditions.push(
                whereFn(
                    fn("LOWER", col("name")),
                    {
                        [Op.like]: `${name.toLowerCase()}%`,
                    }
                )
            );
        };


        if (conditions.length) {
            where[Op.and] = conditions;
        }
        // ===========================================================
        // Query
        // ===========================================================
        const [count, data] = await Promise.all([
            models.AboutTeam.count({ where }),
            models.AboutTeam.findAll({
                where,
                limit,
                offset,
                order: [["created_at", "DESC"]],
                include: [
                    {
                        model: models.AboutTeamSocialMedia,
                        as: "social_media",
                    },
                ],
            }),
        ]);

        // ===========================================================
        // Response
        // ===========================================================
        return NextResponse.json(
            {
                meta: {
                    total: count,
                    limit,
                    offset,
                },
                data,
            },
            {
                status: 200,
                statusText: "Success Find All Teams",
            }
        );
    } catch (error: any) {
        console.error("[GET /api/about/team]", error);

        return NextResponse.json(
            {
                message: "Failed to fetch teams",
                error: error?.message ?? "Unknown error",
            },
            {
                status: 500,
                statusText: "Internal Server Error",
            }
        );
    }
}
