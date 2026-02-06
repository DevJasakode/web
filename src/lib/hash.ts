import bcrypt from "bcryptjs";

/**
 * Mengubah password plaintext menjadi hash satu arah.
 * Secara ilmiah: menggunakan password-based key derivation function
 * dengan cost adaptif untuk memperlambat brute force.
 */
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // faktor kerja (cost), menentukan kompleksitas komputasi
    return bcrypt.hash(password, saltRounds);
};

/**
 * Memverifikasi password dengan membandingkan hasil hash derivasi.
 * Secara ilmiah: password di-hash ulang lalu dibandingkan,
 * bukan didekripsi, karena hash bersifat one-way.
 */
export async function verifyPassword(password: string,storedHash: string): Promise<boolean> {
    return bcrypt.compare(password, storedHash);
};

/**
 * Mengecek apakah string sudah berupa hash bcrypt.
 * Secara ilmiah: hash bcrypt memiliki format dan prefix khas ($2a$, $2b$, $2y$).
 */
export function isBcryptHash(value: string): boolean {
  return /^\$2[aby]\$\d{2}\$/.test(value);
};
