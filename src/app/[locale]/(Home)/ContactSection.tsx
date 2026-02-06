import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 pb-24">
      <div className="rounded-3xl border border-slate-200/60 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/70 px-8 py-10 shadow-md">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
          
          {/* ⬇️ PENTING: min-w-0 */}
          <div className="flex flex-col items-start justify-start h-full min-w-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold whitespace-normal break-words"
            >
              Siap mempercepat roadmap Anda?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 text-lg md:text-[0.8rem] text-slate-600 dark:text-slate-300 whitespace-normal break-words"
            >
              Ceritakan tantangan tim Anda dan kami akan menyiapkan proposal personal dalam 72 jam.
            </motion.p>
          </div>

          {/* ⬇️ JUGA min-w-0 */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 min-w-0"
          >
            <input
              type="text"
              placeholder="Nama lengkap"
              className="w-full rounded-md border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email kerja"
              className="w-full rounded-md border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
            />
            <div className="flex gap-2">
              <select
                className="rounded-md border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 px-3 py-3 text-sm focus:border-indigo-500 focus:outline-none"
                defaultValue="+62"
              >
                <option value="+62">🇮🇩 +62</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                type="tel"
                placeholder="Nomor telepon"
                className="flex-1 rounded-md border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Ceritakan kebutuhan atau timeline Anda"
              className="w-full rounded-md border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/60 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Kirim brief
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
