import { NextResponse } from "next/server";
import models from "@/models";
import { Op } from "sequelize";
import { verifyPassword } from "@/lib/hash";


interface FormLogin {
  username: string;
  password: string;
  remember: boolean;
};

// Login
export async function PATCH(request: Request) {
  if (request.headers.get("Content-Type") !== "application/json") {
    return NextResponse.json(
      { error: "Tipe konten tidak dapat diproses" },
      { status: 406 }
    );
  };
  try {
    const body: FormLogin = await request.json();
    const user = await models.User.findOne({
      where: {
        [Op.or]: [
          {
            username: body.username,
          },
          { email: body.username }
        ]
      }
    });
    if (user) {
      const passwordVerify = await verifyPassword(body.password, user.password)
      if (passwordVerify) {
        return NextResponse.json(user, {
          status: 201,
          statusText: "Success Login"
        });
      }
      return NextResponse.json(null, {
        status: 403,
        statusText: "Password salah"
      });
    };

    return NextResponse.json(null, {
      status: 404,
      statusText: "user not found"
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Gagal Login",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  };
};