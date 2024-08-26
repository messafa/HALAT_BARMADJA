const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const { StatusCodes } = require("http-status-codes");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({
  length: 7,
  dictionary: "number",
});

exports.getBirths = (req, res) => {
  const births = readJSONFile("births.json");
  res.send(births);
};

exports.getBirth = (req, res) => {
  const births = readJSONFile("births.json");
  const birth = births.find((b) => b.id === parseInt(req.params.id));
  if (birth) {
    res.status(StatusCodes.OK).send(birth);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Birth not found.");
  }
};

exports.addBirth = (req, res) => {
  const births = readJSONFile("births.json");
  const newBirth = {
    id: parseInt(uid()),
    ...req.body,
  };
  births.push(newBirth);
  writeJSONFile("births.json", births);
  res.status(StatusCodes.CREATED).send(newBirth);
};

exports.updateBirth = (req, res) => {
  const births = readJSONFile("births.json");
  const birthIndex = births.findIndex((b) => b.id === parseInt(req.params.id));
  if (birthIndex !== -1) {
    const updatedBirth = { ...births[birthIndex], ...req.body };
    births[birthIndex] = updatedBirth;
    writeJSONFile("births.json", births);
    res.status(StatusCodes.OK).send(updatedBirth);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Birth not found.");
  }
};

exports.deleteBirth = (req, res) => {
  const births = readJSONFile("births.json");
  const filteredBirths = births.filter((b) => b.id !== parseInt(req.params.id));
  if (filteredBirths.length < births.length) {
    writeJSONFile("births.json", filteredBirths);
    res.status(StatusCodes.OK).send("Birth deleted.");
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Birth not found.");
  }
};
