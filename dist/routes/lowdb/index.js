"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./src/routes/nameData/combinedWithRanks.json");
const db = low(adapter);
exports.default = (req, res) => {
    const value = db
        .get("names")
        .find({ Name: "NATHAN" })
        .value();
    console.log(value);
    res.json(value);
};
//# sourceMappingURL=index.js.map