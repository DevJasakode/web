import { NextResponse } from "next/server";
import { resolve } from "path";
import { mkdir, writeFile, readdir } from "fs/promises";


const PATH = "public/docs";

export interface Project {
  name: string;
  slug: string;
  desc: string;
};

export interface FormProject {
  name: string;
  slug: string;
  desc: string;
  logo?: string; // base64
};

export async function GET(request: Request) {
  try {
    const files = await readdir(PATH, { encoding: "utf-8" });
    const data: Project[] = [];
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      data.push({
        name: element.replace(/\b[a-z]/g, (char) => char.toUpperCase()),
        slug: element,
        desc: "Hello World"
      })
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Gagal mendapatkan project",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
};


export async function POST(request: Request) {
  if (request.headers.get("content-type") !== "application/json") {
    return NextResponse.json(
      { error: "Tipe konten tidak dapat diproses" },
      { status: 406 }
    );
  }

  try {
    const body: FormProject = await request.json();

    const projectdir = resolve(PATH, body.slug);
    const projectpath = resolve(projectdir, "project.json");

    await mkdir(projectdir, { recursive: true });

    await writeFile(
      projectpath,
      JSON.stringify(
        {
          name: body.name,
          slug: body.slug,
          desc: body.desc,
        },
        null,
        2
      ),
      "utf-8"
    );

    return NextResponse.json({ status: "ok" }, { status: 201 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Gagal menyimpan project",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

