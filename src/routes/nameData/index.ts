import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import * as roundTo from "round-to";

import * as proportions from "./birthProportionFactors.json";

// Loads json into database memory once on load
const adapter = new FileSync("./src/routes/nameData/combinedWithRanks.json");
const db = low(adapter);

const getNameData = (firstName: string) => {
  const searchString = firstName.toUpperCase();

  const nameData = db
    .get("names")
    .find({ Name: searchString })
    .value();

  // Make a simple array from the data
  let currentDataArray = [];
  let currentRankArray = [];

  if (typeof nameData !== "undefined") {
    for (let i = 1944; i < 2019; i++) {
      /**
       * Data comes like:
       * "1944": [122, 14],
       * "1945": [145, 16], ... etc
       * First number in array is the frequency
       * Second number is rank
       */
      let yearFrequency = nameData[i.toString()]
        ? +nameData[i.toString()][0]
        : 0;
      let ranking = nameData[i.toString()] ? +nameData[i.toString()][1] : 0;
      // if (typeof yearFrequency === "undefined" || yearFrequency === "")
      //   yearFrequency = 0;
      // else yearFrequency = +yearFrequency;
      currentDataArray.push(yearFrequency);
      currentRankArray.push(ranking);
    }
  } else {
    // Otherwise zero out
    for (let i = 1944; i < 2019; i++) {
      let yearFrequency = 0;
      currentDataArray.push(yearFrequency);
    }
  }

  const chartArray = currentDataArray.map((freq, index) => {
    return {
      year: 1944 + index,
      name: searchString,
      percentage: roundTo(((freq / proportions[index]) * 100), 4) //* ausBirths[index]
    };
  });

  return chartArray;
};


export default (req, res) => {
  const result = getNameData(req.params.firstName);
  const returnValue = result ? result : { message: "Name not found..." };
  res.json(returnValue);
};

export { getNameData };
