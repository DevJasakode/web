import { NextResponse } from "next/server";
import models from "@/models";

export async function GET() {
  const response = await models.User.findAll();

  return NextResponse.json(response, { status: 200, statusText: "Success Find All Users" });
};
