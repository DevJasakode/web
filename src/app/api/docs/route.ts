import { NextResponse } from "next/server";
import models from "@/models";

import { Docs, DocsForm } from "./models";

// Get Authentication Session
export async function GET(request: Request) {
    // ===========================================================
    // Query Bulder
    // ===========================================================
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 25);
    const offset = Number(searchParams.get("offset") ?? 0);
    const where: any = {};
    // if (name) {
    //     where.nama = {
    //         [Op.like]: `${name}%`, // ← longgar
    //     };
    // }
    // if (age) {
    //     where.usia = age;
    // }

    // ===========================================================

    const users = await models.Docs.findAll({ limit, offset, where });
    const count = await models.Docs.count({ where });

    return NextResponse.json({
        count: count,
        data: users,
    });
};




export async function POST(request: Request) {
    if (request.headers.get("Content-Type") !== "application/json") {
        return NextResponse.json(
            { error: "Tipe konten tidak dapat diproses" },
            { status: 406 }
        );
    };
    try {
        const body: DocsForm = await request.json();
        const created = await models.Docs.create({
            name: body.name,
            slug: body.slug,
            logo: body.logo,
            desc: body.desc,
            created_by: 1,
        })
        return NextResponse.json(created, {
            status: 201,
            statusText: "Success Create Project Documentation"
        });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Gagal Login",
                detail: err instanceof Error ? err.message : String(err),
            },
            { status: 500, statusText: err instanceof Error ? err.message : String(err) }
        );
    };
};