"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var config_1 = require("../src/i18n/config");
var axios_1 = require("axios");
function translateText(text, target) {
    return __awaiter(this, void 0, void 0, function () {
        var start, res, end, error_1, end, err;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    start = typeof performance !== "undefined"
                        ? performance.now()
                        : Date.now();
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post("http://139.59.255.139:5000/translate", {
                            q: text,
                            source: config_1.defaultLocale,
                            target: target,
                        }, {
                            headers: { "Content-Type": "application/json" },
                        })];
                case 2:
                    res = _f.sent();
                    end = typeof performance !== "undefined"
                        ? performance.now()
                        : Date.now();
                    if (res.status >= 200 && res.status < 300 && res.data) {
                        return [2 /*return*/, {
                                translatedText: res.data.translatedText,
                                time: end - start,
                            }];
                    }
                    return [2 /*return*/, {
                            translatedText: "",
                            time: end - start,
                            error: "Unexpected status: ".concat(res.status),
                        }];
                case 3:
                    error_1 = _f.sent();
                    end = typeof performance !== "undefined"
                        ? performance.now()
                        : Date.now();
                    err = error_1;
                    return [2 /*return*/, {
                            translatedText: "",
                            time: end - start,
                            error: (_e = (_c = (_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) !== null && _c !== void 0 ? _c : (_d = err.response) === null || _d === void 0 ? void 0 : _d.statusText) !== null && _e !== void 0 ? _e : err.message,
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
console.clear();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var dictionariesPath, dictionariesdefaultLocaleFilePath, raw, obj, defLang, localesList, index, element, path, langMap, _i, _a, _b, key, value, res, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 9, , 10]);
                dictionariesPath = (0, path_1.resolve)(process.cwd(), "src/i18n/dictionaries");
                dictionariesdefaultLocaleFilePath = (0, path_1.resolve)(dictionariesPath, "".concat(config_1.defaultLocale, ".json"));
                if (!(0, fs_1.existsSync)(dictionariesdefaultLocaleFilePath)) {
                    throw Error("default language dictionaries file not found");
                }
                raw = (0, fs_1.readFileSync)(dictionariesdefaultLocaleFilePath, "utf-8");
                obj = JSON.parse(raw);
                defLang = new Map(Object.entries(obj));
                localesList = config_1.locales.filter(function (item) { return (item !== config_1.defaultLocale); });
                index = 0;
                _c.label = 1;
            case 1:
                if (!(index < localesList.length)) return [3 /*break*/, 8];
                console.log("========================================");
                element = localesList[index];
                path = (0, path_1.resolve)(dictionariesPath, "".concat(element, ".json"));
                if (!(0, fs_1.existsSync)(path)) {
                    (0, fs_1.writeFileSync)(path, JSON.stringify({}), "utf-8");
                }
                langMap = new Map(Object.entries(JSON.parse((0, fs_1.readFileSync)(path, "utf-8"))));
                _i = 0, _a = Array.from(defLang.entries());
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                _b = _a[_i], key = _b[0], value = _b[1];
                if (!langMap.has(key)) return [3 /*break*/, 3];
                console.log("".concat(element, " | ").concat(key, " | ").concat(value, " | exist"));
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, translateText(value, element)];
            case 4:
                res = _c.sent();
                if (res.error) {
                    throw Error(res.error);
                }
                langMap.set(key, res.translatedText);
                console.log("".concat(element, " | ").concat(key, " | ").concat(res.translatedText, " | Translate ").concat(res.time.toFixed(2), "ms"));
                _c.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                (0, fs_1.writeFileSync)(path, JSON.stringify(Object.fromEntries(langMap)), "utf-8");
                console.log("Done Translate ", element, "\n");
                _c.label = 7;
            case 7:
                index++;
                return [3 /*break*/, 1];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _c.sent();
                console.error(error_2);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); })();
