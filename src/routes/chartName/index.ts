import { getNameData } from "../nameData";

export default (req, res) => {
  const returnedData = getNameData("joshua");
  res.json(returnedData);
};
