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

        if (!file) {
            return NextResponse.json(
                { message: "File is required" },
                { status: 400 }
            );
        }

        // Convert file ke buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate hash unik
        const hash = createHash("sha256").update(buffer).digest("hex");
        const name = hash + extname(file.name);
        const path = resolve("public/storage", name);
        const metaPath = resolve("/storage", name);


        if (!existsSync(dirname(path))) {
            mkdirSync(dirname(path))
        }

        writeFileSync(path, buffer, "binary");


        // Simpan ke database
        const storage = await models.Storage.create(
            {
                private: isPrivate,
                prefix: prefix,
                name: file.name,
                hash: hash,
                size: file.size,
                content_type: file.type,
                created_by: created_by,
            },
            { transaction: t }
        );

        await models.StorageMeta.bulkCreate(
            [
                {
                    storage_id: storage.id,
                    key: "__path",
                    value: metaPath,
                },
                {
                    storage_id: storage.id,
                    key: "original_name",
                    value: file.name,
                },
                {
                    storage_id: storage.id,
                    key: "extension",
                    value: extname(file.name),
                },
                {
                    storage_id: storage.id,
                    key: "mime",
                    value: file.type,
                },
            ],
            { transaction: t }
        );

        await t.commit();



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
