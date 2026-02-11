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
