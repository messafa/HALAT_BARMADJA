const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const { StatusCodes } = require("http-status-codes");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({
  length: 8,
  dictionary: "number",
});

exports.getCows = (req, res) => {
  const cows = readJSONFile("cows.json");
  res.send(cows);
};

exports.getCow = (req, res) => {
  const cows = readJSONFile("cows.json");
  const cow = cows.find((c) => c.id === parseInt(req.params.id));
  if (cow) {
    res.status(StatusCodes.OK).send(cow);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Cow not found.");
  }
};

exports.addCow = (req, res) => {
  const cows = readJSONFile("cows.json");
  const newCow = {
    id: parseInt(uid()),
    ...req.body,
  };
  cows.push(newCow);
  writeJSONFile("cows.json", cows);
  res.status(StatusCodes.CREATED).send(newCow);
};

exports.updateCow = (req, res) => {
  const cows = readJSONFile("cows.json");
  const cowIndex = cows.findIndex((c) => c.id === parseInt(req.params.id));
  if (cowIndex !== -1) {
    const updatedCow = { ...cows[cowIndex], ...req.body };
    cows[cowIndex] = updatedCow;
    writeJSONFile("cows.json", cows);
    res.status(StatusCodes.OK).send(updatedCow);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Cow not found.");
  }
};

exports.deleteCow = (req, res) => {
  const cows = readJSONFile("cows.json");
  const filteredCows = cows.filter((c) => c.id !== parseInt(req.params.id));
  if (filteredCows.length < cows.length) {
    writeJSONFile("cows.json", filteredCows);
    res.status(StatusCodes.OK).send("Cow deleted.");
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Cow not found.");
  }
};