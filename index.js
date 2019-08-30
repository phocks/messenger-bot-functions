const express = require("express");
const app = express();

const circleRandomColor = require("./routes/circleRandomColor");
const nameInteractive = require("./routes/nameHistoryInteractive");

const PORT = 5555;

app.get("/", (req, res, next) => {
  res.json({
    message:
      "Welcome to the messenger bot API.\
      Written by Joshua Byrd. Please have a nice day."
  });
});

app.post("/name", nameInteractive);
app.get("/circle-random-color", circleRandomColor);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Expose the express app to Google Cloud Functions
module.exports = { app };
