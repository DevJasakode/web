import type { Locale } from "./config";

type Dictionary = Record<string, string>;

// export function createTranslator(dict: Dictionary, locale: Locale) {
//   return function t(key: string) {
//     return dict[key] ?? key;
//   };
// }

export function createTranslator(dict: Dictionary, locale: Locale) {
  return function t(key: string) {
    if (process.env.NODE_ENV === "development") {
      if (!(key in dict)) {
        console.warn(`[i18n:${locale}] missing key: ${key}`);
      }
    }
    return dict[key] ?? key;
  };
}
