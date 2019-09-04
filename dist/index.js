"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const PORT = 5555;
const routes_1 = require("./routes");
const circleRandomColor_1 = require("./routes/circleRandomColor");
const nameHistoryInteractive_1 = require("./routes/nameHistoryInteractive");
const d3test_1 = require("./routes/d3test");
const nameData_1 = require("./routes/nameData");
const puppeteer_1 = require("./routes/puppeteer");
const lineChart_1 = require("./routes/lineChart");
const nodeCanvasTest_1 = require("./routes/nodeCanvasTest");
const chartJsTest_1 = require("./routes/chartJsTest");
const lowdb_1 = require("./routes/lowdb");
app.get("/", routes_1.default);
app.post("/name", nameHistoryInteractive_1.default);
app.get("/circle-random-color", circleRandomColor_1.default);
app.get("/d3test", d3test_1.default);
app.get("/puppeteer", puppeteer_1.default);
app.get("/line-chart", lineChart_1.default);
app.get("/node-canvas-test", nodeCanvasTest_1.default);
app.get("/chart-js-test", chartJsTest_1.default);
app.get("/lowdb", lowdb_1.default);
app.get("/name-data/:firstName", nameData_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Expose the express app to Google Cloud Functions
exports.default = { app };
//# sourceMappingURL=index.js.map