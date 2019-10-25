require("dotenv").config();
import * as express from "express";
const app = express();

const PORT = 5555;

import routes from "./routes";
import circleRandomColor from "./routes/circleRandomColor";
import nameHistoryInteractive from "./routes/nameHistoryInteractive";
import d3test from "./routes/d3test";
import nameData from "./routes/nameData";
import puppeteer from "./routes/puppeteer";
import lineChart from "./routes/lineChart";
import nodeCanvasTest from "./routes/nodeCanvasTest";
import chartJsTest from "./routes/chartJsTest";
import lowdb from "./routes/lowdb";
import chartName from "./routes/chartName";
import cloudBot from "./routes/cloudBot";
import heatwaves from "./routes/heatwaves";

app.get("/", routes);
app.post("/name-history-interactive", nameHistoryInteractive);
app.get("/circle-random-color", circleRandomColor);
app.get("/d3test", d3test);
app.get("/puppeteer", puppeteer);
app.get("/line-chart", lineChart);
app.get("/node-canvas-test", nodeCanvasTest);
app.get("/chart-js-test", chartJsTest);
app.get("/lowdb", lowdb);
app.get("/name-data/:firstName", nameData);
app.get("/chart-name/:firstName", chartName);
app.all("/cloud-bot", cloudBot);
app.all("/heatwaves", heatwaves);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Expose the express app to Google Cloud Functions
export { app };
