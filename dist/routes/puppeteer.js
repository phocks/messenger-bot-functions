"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
let page;
function getBrowserPage() {
    return __awaiter(this, void 0, void 0, function* () {
        // Launch headless Chrome. Turn off sandbox so Chrome can run under root.
        const browser = yield puppeteer.launch({ args: ["--no-sandbox"] });
        return browser.newPage();
    });
}
exports.default = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const url = req.query.url;
    if (!url) {
        return res.send('Please provide URL as GET parameter, for example: <a href="?url=https://example.com">?url=https://example.com</a>');
    }
    if (!page) {
        page = yield getBrowserPage();
    }
    yield page.goto(url);
    const imageBuffer = yield page.screenshot();
    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
});
//# sourceMappingURL=puppeteer.js.map