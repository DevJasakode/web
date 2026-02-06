import { NextResponse } from "next/server";
import models from "@/models";

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

    const users = await models.User.findAll({ limit, offset, where });
    const count = await models.User.count({ where });

    return NextResponse.json({
        count: count,
        data: users,
    });
};

// Create new User
export async function POST(request: Request) {
    return NextResponse.json(null, {
        status: 200,
        statusText: "Implementation not created"
    });
};

// Update User
export async function PATCH(request: Request) {
    return NextResponse.json(null, {
        status: 200,
        statusText: "Implementation not created"
    });
}


// Delete User
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("limit") ?? "true"; // hapus total
    
    return NextResponse.json(null, {
        status: 200,
        statusText: "Implementation not created"
    });
}