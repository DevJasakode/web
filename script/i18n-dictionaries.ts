import {
    resolve,
} from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { locales, defaultLocale, Locale } from "../src/i18n/config";
import axios, { AxiosError } from "axios";



async function translateText(
    text: string,
    target: Locale
): Promise<{ translatedText: string; time: number; error?: string }> {
    const start = typeof performance !== "undefined"
        ? performance.now()
        : Date.now();

    try {
        const res = await axios.post<{ translatedText: string }>(
            "http://139.59.255.139:5000/translate",
            {
                q: text,
                source: defaultLocale,
                target,
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        const end = typeof performance !== "undefined"
            ? performance.now()
            : Date.now();

        if (res.status >= 200 && res.status < 300 && res.data) {
            return {
                translatedText: res.data.translatedText,
                time: end - start,
            };
        }

        return {
            translatedText: "",
            time: end - start,
            error: `Unexpected status: ${res.status}`,
        };
    } catch (error) {
        const end = typeof performance !== "undefined"
            ? performance.now()
            : Date.now();

        const err = error as AxiosError<any>;

        return {
            translatedText: "",
            time: end - start,
            error:
                err.response?.data?.error ??
                err.response?.statusText ??
                err.message,
        };
    }
}


console.clear();
(async () => {
    try {
        const dictionariesPath = resolve(process.cwd(), "src/i18n/dictionaries");
        const dictionariesdefaultLocaleFilePath = resolve(dictionariesPath, `${defaultLocale}.json`);
        if (!existsSync(dictionariesdefaultLocaleFilePath)) {
            throw Error("default language dictionaries file not found");
        }
        const raw = readFileSync(dictionariesdefaultLocaleFilePath, "utf-8");
        const obj = JSON.parse(raw);
        const defLang = new Map<string, string>(Object.entries(obj));

        const localesList = locales.filter(item => (item !== defaultLocale));
        for (let index = 0; index < localesList.length; index++) {
            console.log("========================================")
            const element = localesList[index];
            const path = resolve(dictionariesPath, `${element}.json`);
            if (!existsSync(path)) {
                writeFileSync(path, JSON.stringify({}), "utf-8");
            }
            const langMap = new Map<string, string>(Object.entries(JSON.parse(readFileSync(path, "utf-8"))));

            for (const [key, value] of Array.from(defLang.entries())) {
                if (langMap.has(key)) {
                    console.log(`${element} | ${key} | ${value} | exist`);
                } else {
                    const res = await translateText(value, element);
                    if (res.error) {
                        throw Error(res.error);
                    }
                    langMap.set(key, res.translatedText);
                    console.log(`${element} | ${key} | ${res.translatedText} | Translate ${res.time.toFixed(2)}ms`);
                }
            }
            writeFileSync(path, JSON.stringify(Object.fromEntries(langMap)), "utf-8");
            console.log("Done Translate ", element, "\n");
        }
    } catch (error) {
        console.error(error);
    }
})();


