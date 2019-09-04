"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const low = require("lowdb");
const FileSync_1 = require("lowdb/adapters/FileSync");
// Loads json into database memory once on load
const adapter = new FileSync_1.default("./src/routes/nameData/combinedWithRanks.json");
const db = low(adapter);
exports.default = (req, res) => {
    const searchString = req.params.firstName.toUpperCase();
    const result = db
        .get("names")
        .find({ Name: searchString })
        .value();
    const returnValue = result ? result : { message: "Name not found..." };
    res.json(returnValue);
};
//# sourceMappingURL=index.js.map