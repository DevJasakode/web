import { ArrowRight } from "lucide-react";

export function CallToActionSection() {
  return (
    <section className="py-20">
      <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-100 via-indigo-50 to-white p-10 shadow-lg dark:border-cyan-300/30 dark:bg-gradient-to-br dark:from-cyan-500/20 dark:via-slate-900 dark:to-slate-900">
        <div className="absolute inset-y-0 right-[-10%] w-1/2 bg-[radial-gradient(circle,_rgba(99,102,241,0.25),transparent_70%)] opacity-50 dark:bg-[radial-gradient(circle,_rgba(59,130,246,0.3),transparent_70%)]" />
        <div className="relative max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Mari bangun pertumbuhan berikutnya</h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-200/80">
            Ceritakan sasaran produk, tantangan teknis, atau target bisnis Anda. Kami akan meracik blueprint kolaborasi dan squad yang paling tepat dalam 5 hari kerja.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 dark:bg-white dark:text-slate-900 dark:hover:bg-cyan-100"
            >
              Konsultasi tanpa biaya
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#case-study"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/30 dark:text-white dark:hover:border-white dark:hover:text-cyan-100"
            >
              Lihat studi kasus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
