import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

// Loads json into database memory once on load
const adapter = new FileSync("./src/routes/nameData/combinedWithRanks.json");
const db = low(adapter);

const getName = (firstName: string) => {
  const searchString = firstName.toUpperCase();

  const result = db
    .get("names")
    .find({ Name: searchString })
    .value();

  return result;
};

export default (req, res) => {
  const result = getName(req.params.firstName);
  const returnValue = result ? result : { message: "Name not found..." };
  res.json(returnValue);
};

export { getName };
