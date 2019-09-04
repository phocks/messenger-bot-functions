import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

// Loads json into database memory once on load
const adapter = new FileSync("./src/routes/nameData/combinedWithRanks.json");
const db = low(adapter);

export default (req, res) => {
  const searchString = req.params.firstName.toUpperCase();

  const result = db
    .get("names")
    .find({ Name: searchString })
    .value();

  const returnValue = result ? result : { message: "Name not found..." };

  res.json(returnValue);
};

export const getName = (firstName: String) => {
  const searchString = firstName.toUpperCase();

  const result = db
    .get("names")
    .find({ Name: searchString })
    .value();

  return result;
};
