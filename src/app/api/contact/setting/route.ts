import { NextResponse } from "next/server";
import models from "@/models";

export async function GET() {
  try {
    const setting = await models.ContactSetting.findOne({
      where: {
        id: 1,
      }
    });
    if (!setting) {
      throw Error("Setting Data Not Found")
    }
    const response = NextResponse.json(setting, {
      status: 201,
      statusText: "Success send message"
    });
    return response;
  } catch (err) {
    return NextResponse.json(
      {
        error: "Gagal mendapatkan data",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500, statusText: "tidak dapat di lakukan" }
    );
  }
};


export async function PATCH(request: Request) {
  if (request.headers.get("Content-Type") !== "application/json") {
    return NextResponse.json(
      { error: "Tipe konten tidak dapat diproses" },
      { status: 406 }
    );
  };
  try {
    const body = await request.json();
    if (Object.keys(body).length > 0) {
      const updated = await models.ContactSetting.update(body, { where: { id: 1 } });
      return NextResponse.json(
        updated,
        { status: 200, statusText: "Success Update Contact Setting" }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: "Gagal Login",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
};