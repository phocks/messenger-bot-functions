const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./routes/nameData/combinedWithRanks.json");
const db = low(adapter);

module.exports = (req, res) => {
  const value = db
    .get("names")
    .find({ Name: "JOSHUA" })
    .value();

  console.log(value);

  res.json(value);
};
