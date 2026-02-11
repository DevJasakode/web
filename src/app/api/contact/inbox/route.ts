import { NextResponse } from "next/server";
import models from "@/models";
import { cookies } from "next/headers";
import { Op } from "sequelize";
import { FormInbox } from "./models";

// export const runtime = "nodejs";


export async function GET(request: Request) {
  try {
    // ===========================================================
    // Query Bulder
    // ===========================================================
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") ?? 25);
    const offset = Number(searchParams.get("offset") ?? 0);

    const where: any = {};
    if (searchParams.has("unread")) {
      Object.assign(where, {
        unread: Boolean(searchParams.get("unread") == "true"),
      })
    }
    // if (name) {
    //     where.nama = {
    //         [Op.like]: `${name}%`, // ← longgar
    //     };
    // }
    // if (age) {
    //     where.usia = age;
    // }

    // ===========================================================

    const inboxs = await models.ContactInbox.findAll({
      limit: limit,
      offset: offset,
      where: where,
    });
    const count = await models.ContactInbox.count({
      where: where,
    });
    return NextResponse.json({ count: count, data: inboxs }, {
      status: 200,
      statusText: "Success Find All Inbox"
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: "Terjadi kesalahan sistem",
        detail: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

export async function POST(request: Request) {
  try {
    // 1. Parse body dulu (error JSON tertangkap)
    const body: FormInbox = await request.json();

    // 2. Ambil cookie
    const cookieStore = await cookies();
    const hash = cookieStore.get("IBXH")?.value;

    // 3. Ambil IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    // 4. Rate limit berbasis waktu
    const oneMinuteAgo = new Date(Date.now() - 60_000);

    const count = await models.ContactInbox.count({
      where: {
        created_at: { [Op.gte]: oneMinuteAgo },
        [Op.or]: [
          { ip },
          ...(hash ? [{ hash }] : []),
        ],
      },
    });

    if (count > 0) {
      return NextResponse.json(
        {
          error: "RATE_LIMIT",
          message: "Pesan hanya boleh dikirim setiap 1 menit",
          retry_after_seconds: 60,
        },
        {
          status: 429,
          headers: { "Retry-After": "60" },
        }
      );
    }

    // 5. Simpan data
    const newHash = crypto.randomUUID();

    const created = await models.ContactInbox.create({
      ip,
      hash: newHash,
      ...body,
      unread: true,
    });

    // 6. Set cookie
    const isHttps =
      request.headers.get("x-forwarded-proto") === "https";

    const response = NextResponse.json(
      {
        success: true,
        message: "Pesan berhasil dikirim",
        data: { id: created.id },
      },
      { status: 201 }
    );

    response.cookies.set({
      name: "IBXH",
      value: newHash,
      maxAge: 60,
      httpOnly: true,
      sameSite: "lax",
      secure: isHttps,
      path: "/",
    });

    return response;
  } catch (err: unknown) {
    console.error("CONTACT_INBOX_ERROR:", err);

    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: "Terjadi kesalahan sistem",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
};

