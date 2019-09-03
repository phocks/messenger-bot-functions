const express = require("express");
const app = express();

const PORT = 5555;

app.get("/", require("./routes"));
app.post("/name", require("./routes/nameHistoryInteractive"));
app.get("/circle-random-color", require("./routes/circleRandomColor"));
app.get("/d3test", require("./routes/d3test"));
app.get("/puppeteer", require("./routes/puppeteer"));
app.get("/line-chart", require("./routes/lineChart"));
app.get("/node-canvas-test", require("./routes/nodeCanvasTest"));
app.get("/chart-js-test", require("./routes/chart-js-test"));
app.get("/lowdb", require("./routes/lowdb"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Expose the express app to Google Cloud Functions
module.exports = { app };
