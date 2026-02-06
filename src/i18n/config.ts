export const locales = [
  "ar", "az", "bg", "bn", "ca", "cs", "da", "de",
  "el", "en", "eo", "es", "et", "eu", "fa", "fi",
  "fr", "ga", "gl", "he", "hi", "hu", "id", "it",
  "ja", "ko", "ky", "lt", "lv", "ms", "nb", "nl",
  "pt-BR", "pl", "pt", "ro", "ru", "sk", "sl", "sq",
  "sv", "th", "tl", "tr", "uk", "ur", "vi", "zh-Hans",
  "zh-Hant"
] as const;
export type Locale = (typeof locales)[number];

export interface Language {
  code: Locale;
  englishName: string;
  nativeName: string;
  flag?: string;          // opsional, UI concern
  dir: "ltr" | "rtl";     // WAJIB
}

export const defaultLocale: Locale = "en";
export const defaultLanguage: Language = {
  code: "en",
  englishName: "English",
  nativeName: "English",
  flag: "🇺🇸",
  dir: "ltr"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value: string): Locale | null {
  if (isLocale(value)) return value;

  const language = value.split("-")[0];
  return isLocale(language) ? language : null;
}

