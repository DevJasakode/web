import { NextResponse } from "next/server";
import fs from "fs";
import { parse } from "csv-parse";
import { Transform } from "stream";
import models from "@/models";
import { Op } from "sequelize";


function sanitizeCsvStream() {
  return new Transform({
    transform(chunk, _, callback) {
      const cleaned = chunk
        .toString()
        // hapus quote aneh di awal field
        .replace(/,\s*"/g, ',"')
        .replace(/"\s*,/g, '",')
        // normalize line ending
        .replace(/\r\n/g, "\n");

      callback(null, cleaned);
    }
  });
}



/**
* Parser CSV toleran untuk file bermasalah
*/
function createSafeCsvParser() {
  return parse({
    columns: true,
    from_line: 2, // skip header
    trim: true,
    relax_quotes: true, // ⬅️ ini kuncinya
    relax_column_count: true,
    skip_empty_lines: true,
    bom: true,
    quote: '"',
    escape: '"',
  });
};

async function readCsvHeaderSafe(
  filePath: string
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);

    const parser = parse({
      to_line: 1,
      relax_quotes: true,
      trim: true,
      bom: true,
    });

    parser.on("data", (row: string[]) => {
      resolve(row.map(h => h.trim().replace(/^"+|"+$/g, "")));
      stream.destroy();
    });

    parser.on("error", reject);

    stream.pipe(parser);
  });
}


/**
 * Membaca header CSV (baris pertama saja)
 */
async function readCsvHeader(
  filePath: string
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath);

    const parser = parse({
      to_line: 1, // hanya baris pertama
    });

    parser.on("data", (row: string[]) => {
      resolve(row);
      stream.destroy(); // hentikan stream setelah dapat header
    });

    parser.on("error", reject);

    stream.pipe(parser);
  });
};

interface CsvPageOptions {
  offset: number;
  limit: number;
}

/**
 * Membaca sebagian isi CSV dengan pagination
 */
async function readCsvPage<T = Record<string, string>>(
  filePath: string,
  options: CsvPageOptions
): Promise<T[]> {
  const { offset, limit } = options;

  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let rowIndex = 0;

    const stream = fs.createReadStream(filePath);

    const parser = parse({
      columns: true,       // pakai header sebagai key
      from_line: 2,        // skip header
      relax_quotes: true,
      relax_column_count: true,
      trim: true,
    });

    parser.on("data", (row: T) => {
      if (rowIndex < offset) {
        rowIndex++;
        return;
      }

      if (results.length < limit) {
        results.push(row);
        rowIndex++;
        return;
      }

      // sudah cukup → hentikan
      stream.destroy();
      resolve(results);
    });

    parser.on("end", () => {
      resolve(results);
    });

    parser.on("error", reject);

    stream.pipe(parser);
  });
};


interface CsvPageOptions {
  offset: number;
  limit: number;
}

interface CsvPageResult {
  header: string[];
  rows: Record<string, string>[];
}

async function readCsvPageWithHeader(
  filePath: string,
  options: CsvPageOptions
): Promise<CsvPageResult> {
  const { offset, limit } = options;

  return new Promise((resolve, reject) => {
    let header: string[] | null = null;
    const rows: Record<string, string>[] = [];
    let dataIndex = 0;

    const stream = fs.createReadStream(filePath);

    const parser = parse({
      relax_quotes: true,
      relax_column_count: true,
      trim: true,
      skip_empty_lines: true,
    });

    parser.on("data", (record: string[]) => {
      // 📌 BARIS 1 → HEADER
      if (!header) {
        header = record.map(h => h.trim());
        return;
      }

      // 📌 BARIS DATA (mulai line 2)
      if (dataIndex < offset) {
        dataIndex++;
        return;
      }

      if (rows.length < limit) {
        const obj: Record<string, string> = {};
        for (let i = 0; i < header.length; i++) {
          obj[header[i]] = record[i] ?? "";
        }
        rows.push(obj);
        dataIndex++;
        return;
      }

      // 📌 SUDAH CUKUP → STOP
      stream.destroy();
      resolve({ header, rows });
    });

    parser.on("end", () => {
      if (!header) {
        reject(new Error("CSV tidak memiliki header"));
        return;
      }
      resolve({ header, rows });
    });

    parser.on("error", reject);

    stream.pipe(parser);
  });
}

export interface DtpKpu {
  id: number;
  id_prov: string;
  id_kota: string;
  id_kecamatan: string;
  id_kelurahan: string;

  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;

  tps_id: string;
  no_kk: string;
  no_nik: string;

  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string; // YYYY-MM-DD atau format mentah CSV
  usia: string;

  jns_kelamin: string;   // contoh: "L" | "P" (dipersempit nanti)
  alamat: string;

  disabilitas: string;  // "YA" | "TIDAK" | kosong
  lup: string;          // flag / tanggal / status (tergantung sumber)
}

export interface Respon {
  data: DtpKpu[];
  count: number;
}



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get("limit") ?? 25);
  const offset = Number(searchParams.get("offset") ?? 0);
  const name = searchParams.get("name") ?? "";
  const age = searchParams.get("age") ?? "";

  const where: any = {};


  if (name) {
    where.nama = {
      [Op.like]: `${name}%`, // ← longgar
    };
  }


  if (age) {
    where.usia = age;
  }

  const data = await models.DtpKpu.findAll({
    limit: limit,
    offset: offset,
    where: where,
  });
  const count = await models.DtpKpu.count({
    where: where,
  });

  return NextResponse.json({data,count}, {
    status: 200,
    statusText: "Success Read Data"
  });
};


