import React from "react";

export default function CareerPage({
  companyName = "Jasakode",
  headcount,
  countries,
  users,
  glassdoor,
  careersEmail,
  websiteUrl,
  slaReviewDays,
}: {
  companyName?: string;
  headcount?: number;
  countries?: number;
  users?: number;
  glassdoor?: number;
  careersEmail?: string;
  websiteUrl?: string;
  slaReviewDays?: number;
}) {
  return (
    <main className="min-h-full bg-zinc-50 text-zinc-900 antialiased">
      {/* Header */}
      <header className="no-print sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-xl bg-zinc-900"></span>
            <span className="font-semibold">{companyName}</span>
          </div>
          <nav className="text-sm text-zinc-600 hidden md:flex gap-6">
            <a href="#lowongan" className="hover:text-zinc-900">Lowongan</a>
            <a href="#budaya" className="hover:text-zinc-900">Budaya & Nilai</a>
            <a href="#benefit" className="hover:text-zinc-900">Benefit</a>
            <a href="#proses" className="hover:text-zinc-900">Proses Rekrutmen</a>
            <a href="#faq" className="hover:text-zinc-900">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">Karier</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Bangun masa depan bersama {companyName}
              </h1>
              <p className="mt-3 text-zinc-600">
                Kami mencari orang yang berorientasi pada dampak, kolaboratif, dan antusias
                mengejar solusi elegan untuk masalah nyata. Jelajahi peran yang cocok untukmu.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#lowongan" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">
                  Lihat Lowongan
                </a>
                <a href="#budaya" className="rounded-lg border bg-white px-4 py-2 text-sm">
                  Budaya Kami
                </a>
              </div>
            </div>

            <div className="rounded-2xl border bg-zinc-50 p-6">
              <ul className="grid gap-4 sm:grid-cols-2">
                <li className="rounded-xl border bg-white p-4">
                  <p className="text-3xl font-bold">{headcount ?? "-"}</p>
                  <p className="text-sm text-zinc-600">Tim & tumbuh cepat</p>
                </li>
                <li className="rounded-xl border bg-white p-4">
                  <p className="text-3xl font-bold">{countries ?? "-"}</p>
                  <p className="text-sm text-zinc-600">Karyawan lintas negara</p>
                </li>
                <li className="rounded-xl border bg-white p-4">
                  <p className="text-3xl font-bold">{users ?? "-"}</p>
                  <p className="text-sm text-zinc-600">Pengguna mempercayai kami</p>
                </li>
                <li className="rounded-xl border bg-white p-4">
                  <p className="text-3xl font-bold">{glassdoor ?? "-"}</p>
                  <p className="text-sm text-zinc-600">Skor kebahagiaan</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Budaya & Nilai */}
      <section id="budaya" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-xl font-semibold">Budaya & Nilai</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Obsesi pada Pengguna", "Tanggung Jawab Tinggi", "Belajar Cepat", "Kolaborasi Terbuka", "Kualitas & Craft", "Dampak di Atas Ego"].map(
              (item, i) => (
                <div key={i} className="rounded-xl border bg-zinc-50 p-4">
                  <h3 className="font-medium">{item}</h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    {item === "Obsesi pada Pengguna"
                      ? "Kami mulai dari kebutuhan pengguna dan bekerja mundur untuk membangun solusi terbaik."
                      : item === "Tanggung Jawab Tinggi"
                      ? "Kami memberikan otonomi sekaligus akuntabilitas pada hasil nyata."
                      : item === "Belajar Cepat"
                      ? "Eksperimen cepat, retrospektif jujur, iterasi tanpa henti."
                      : item === "Kolaborasi Terbuka"
                      ? "Transparansi dan komunikasi langsung untuk menyelesaikan masalah kompleks."
                      : item === "Kualitas & Craft"
                      ? "Perhatian pada detail dan pengalaman yang menyenangkan."
                      : "Fokus pada hasil, bukan jabatan."}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-white border-t">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h3 className="font-semibold text-xl mb-2">Tidak menemukan posisi yang cocok?</h3>
          <p className="text-sm text-zinc-600 mb-4">
            Kirim CV atau portofolio Anda ke {" "}
            <a href={`mailto:${careersEmail}`} className="underline underline-offset-2">
              {careersEmail}
            </a>
            , kami akan menghubungi Anda jika ada kecocokan.
          </p>
          <a
            href={`mailto:${careersEmail}`}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white inline-block"
          >
            Kirim CV
          </a>
        </div>
      </section>
    </main>
  );
}
