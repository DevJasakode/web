import { NextResponse } from "next/server";
import QRCode from "qrcode";

import os from "os";


export async function GET(request: Request) {
  const interfaces = os.networkInterfaces();
  let ip = "";

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        ip = net.address;
        break;
      }
    }
    if (ip) break;
  };

  const host = `http://${ip}:3000`;
  const dataUrl = await QRCode.toDataURL(host);

  // IP lokal (LAN)
  return NextResponse.json({ host, qr: dataUrl }, { status: 200 });
};

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    received: body
  });
}


