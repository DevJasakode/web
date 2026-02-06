"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLanguage = exports.defaultLocale = exports.locales = void 0;
exports.isLocale = isLocale;
exports.normalizeLocale = normalizeLocale;
exports.locales = [
    "ar", "az", "bg", "bn", "ca", "cs", "da", "de",
    "el", "en", "eo", "es", "et", "eu", "fa", "fi",
    "fr", "ga", "gl", "he", "hi", "hu", "id", "it",
    "ja", "ko", "ky", "lt", "lv", "ms", "nb", "nl",
    "pt-BR", "pl", "pt", "ro", "ru", "sk", "sl", "sq",
    "sv", "th", "tl", "tr", "uk", "ur", "vi", "zh-Hans",
    "zh-Hant"
];
exports.defaultLocale = "en";
exports.defaultLanguage = {
    code: "en",
    englishName: "English",
    nativeName: "English",
    flag: "🇺🇸",
    dir: "ltr"
};
function isLocale(value) {
    return exports.locales.includes(value);
}
function normalizeLocale(value) {
    if (isLocale(value))
        return value;
    var language = value.split("-")[0];
    return isLocale(language) ? language : null;
}
