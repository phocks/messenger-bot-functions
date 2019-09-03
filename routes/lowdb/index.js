const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./routes/lowdb/combinedWithRanks.json");
const db = low(adapter);



module.exports = (req, res) => {
  const value = db
  .get("names")
  .find({ Name: "NATHAN" })
  .value();

  console.log(value);

  res.json(value)
};
