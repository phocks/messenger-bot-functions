const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./routes/nameData/combinedWithRanks.json");
const db = low(adapter);

module.exports = (req, res) => {
  const searchString = req.params.firstName.toUpperCase();
  console.log(searchString);

  const result = db
    .get("names")
    .find({ Name: searchString })
    .value();

  console.log(result);

  const returnValue = result ? result : {message: "Name not found..."}

  res.json(returnValue);
};
