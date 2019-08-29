const express = require("express");
const app = express();

const PORT = 5555;

app.get("/users", (req, res, next) => {
  res.json({ hi: "hi" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = {
  app
};
