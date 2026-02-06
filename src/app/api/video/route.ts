import { NextResponse } from "next/server";
import { readdirSync, statSync } from "fs";
import { resolve } from "path";

const PATH: string = "/home/me";

export type FileType = "folder" | "file" | "pdf" | "image";

export interface File {
  id: number;
  path: string;
  name: string;
  type: FileType;
  size: number;
}

export async function GET(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  const clientIp =
    forwardedFor?.split(",")[0]?.trim() ??
    realIp ??
    "unknown";

  if (clientIp !== "::1") {
    return NextResponse.json(
      { error: "filesystem_error_ip" },
      { status: 500 }
    );
  };

  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");
  const fileType = searchParams.get("type");
  console.log("searchParams", filePath, fileType)


  try {
    const files = readdirSync(PATH, { encoding: "utf-8" });
    const respon: File[] = [];

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      const path = resolve(PATH, element);
      const info = statSync(path);

      if (info.isDirectory()) {
        respon.push({
          id: index + 1,
          path: path,
          name: element,
          type: "folder",
          size: info.size,
        })
      } else {
        respon.push({
          id: index + 1,
          path: path,
          name: element,
          type: "file",
          size: info.size,
        })
      }
    }

    return NextResponse.json(respon);
  } catch (err) {
    return NextResponse.json(
      { error: "filesystem_error" },
      { status: 500 }
    );
  }
}
