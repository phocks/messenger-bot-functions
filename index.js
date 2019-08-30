const express = require("express");
const app = express();

const indexRoute = require("./routes");
const circleRandomColor = require("./routes/circleRandomColor");
const nameInteractive = require("./routes/nameHistoryInteractive");
const d3test = require("./routes/d3test")

const PORT = 5555;

app.get("/", indexRoute);
app.post("/name", nameInteractive);
app.get("/circle-random-color", circleRandomColor);
app.get("/d3test", d3test);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Expose the express app to Google Cloud Functions
module.exports = { app };
