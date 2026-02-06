import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import QRCode from "qrcode";


/**
 * Membuat secret 2FA baru untuk user dan mengubahnya menjadi QR code
 * agar bisa discan oleh aplikasi Google Authenticator.
 *
 * Fungsi ini biasanya dipanggil SAAT user pertama kali mengaktifkan 2FA.
 *
 * @param userEmail
 * Email user, digunakan hanya sebagai label agar mudah dikenali
 * di aplikasi Google Authenticator (tidak memengaruhi keamanan).
 *
 * @returns
 * Object berisi:
 * - base32: secret rahasia (HARUS disimpan di database secara aman)
 * - qrCodeDataURL: QR code dalam format Data URL untuk ditampilkan ke frontend
 */
export async function generate2FA(userEmail: string): Promise<{
  base32: string;
  qrCodeDataURL: string;
}> {
  // Generate secret acak untuk TOTP (Time-based One-Time Password)
  const secret = speakeasy.generateSecret({
    length: 20, // panjang secret (semakin panjang, semakin kuat)
    name: `MyApp (${userEmail})`, // nama yang muncul di Google Authenticator
  });

  // Mengubah otpauth_url menjadi QR code agar bisa discan oleh user
  const qrCodeDataURL = await QRCode.toDataURL(
    secret.otpauth_url!
  );

  // Kembalikan data yang dibutuhkan frontend dan backend
  return {
    base32: secret.base32,     // simpan ini di database (encrypted)
    qrCodeDataURL,             // tampilkan ini ke user
  };
};


/**
 * Memverifikasi apakah kode 6 digit yang dimasukkan user valid
 * berdasarkan secret 2FA yang tersimpan di server.
 *
 * Fungsi ini dipanggil setiap kali user login atau melakukan aksi sensitif.
 *
 * @param token
 * Kode 6 digit yang dimasukkan user dari Google Authenticator.
 *
 * @param userSecret
 * Secret 2FA milik user yang tersimpan di database
 * (dalam format base32).
 *
 * @returns
 * Boolean:
 * - true  → kode valid
 * - false → kode salah atau sudah kedaluwarsa
 */
export function verify2FA(
  token: string,
  userSecret: string
): boolean {
  return speakeasy.totp.verify({
    secret: userSecret,   // secret yang sama dengan yang ada di Authenticator
    encoding: "base32",   // format encoding secret
    token,                // kode 6 digit dari user
    window: 1,            // toleransi waktu ±30 detik
  });
};

export async function GET(request: Request) {
  const res = await generate2FA("mail@example.com");
  return NextResponse.json({
    data: res,
  });
};

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ 
    received: body 
  });
};
