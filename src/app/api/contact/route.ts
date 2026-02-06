import { NextResponse } from "next/server";
import models from "@/models";

export async function GET() {
  const response = await models.User.findAll();

  return NextResponse.json(response, { status: 200, statusText: "Success Find All Users" });
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = NextResponse.json(body, {
      status: 201,
      statusText: "Success send message"
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      {
        error: "Gagal mengirim pesan",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500, statusText: "tidak dapat di lakukan" }
    );
  }
};
