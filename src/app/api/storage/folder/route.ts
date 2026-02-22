import { NextResponse, NextRequest } from "next/server";
import models, { sequelize } from "@/models";
import { resolve, extname, dirname } from "path";
import { createHash } from "crypto";
import { mkdirSync, existsSync, writeFileSync } from "fs";


export async function POST(request: NextRequest) {
    const t = await sequelize.transaction();

    try {
        const formData = await request.formData();

        const file = formData.get("file") as File | null;
        const created_by = Number(formData.get("created_by") ?? 0);
        const isPrivate = formData.get("private") === "true";
        const prefix = String(formData.get("prefix") ?? "");


        return NextResponse.json(
            { message: "Upload success" },
            { status: 201, statusText: "Success upload file" }
        );
    } catch (error) {
        await t.rollback();
        console.error(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
};

