const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const { StatusCodes } = require("http-status-codes");
const { getNameById } = require("./authController");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({
  length: 10,
  dictionary: "number",
});

exports.getMilkProductions = (req, res) => {
  const milkProductions = readJSONFile("milkProductions.json");
  res.json({ count: milkProductions.length, milkProductions: milkProductions });
};

exports.getMilkProduction = (req, res) => {
  const milkProductions = readJSONFile("milkProductions.json");
  const milkProduction = milkProductions.find((m) => m.id === parseInt(req.params.id));
  if (milkProduction) {
    res.status(StatusCodes.OK).send(milkProduction);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Milk production not found.");
  }
};

exports.getMilkProductionByDate = (req, res) => {

  const milkProductions = readJSONFile("milkProductions.json");
  const milkProduction = milkProductions.find((m) => m.dateProdicted === req.params.dateProdicted);
  if (milkProduction) {
    res.status(StatusCodes.OK).send(milkProduction);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Milk production not found.");
  }
};

exports.addMilkProduction = (req, res) => {
  const milkProductions = readJSONFile("milkProductions.json");
  const newMilkProduction = {
    id: parseInt(uid.rnd()),
    addedBy: getNameById(req.body.addedBy),
    ...req.body,
  };
  milkProductions.push(newMilkProduction);
  writeJSONFile("milkProductions.json", milkProductions);
  res.status(StatusCodes.CREATED).send(newMilkProduction);

};

exports.updateMilkProduction = (req, res) => {
  const milkProductions = readJSONFile("milkProductions.json");
  const milkProductionIndex = milkProductions.findIndex(
    (m) => m.id === parseInt(req.params.id)
  );
  if (milkProductionIndex !== -1) {
    const updatedMilkProduction = { ...milkProductions[milkProductionIndex], ...req.body };
    milkProductions[milkProductionIndex] = updatedMilkProduction;
    writeJSONFile("milkProductions.json", milkProductions);
    res.status(StatusCodes.OK).send(updatedMilkProduction);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Milk production not found.");
  }
};

exports.deleteMilkProduction = (req, res) => {
  const milkProductions = readJSONFile("milkProductions.json");
  const filteredMilkProductions = milkProductions.filter(
    (m) => m.id !== parseInt(req.params.id)
  );
  if (filteredMilkProductions.length < milkProductions.length) {
    writeJSONFile("milkProductions.json", filteredMilkProductions);
    res.status(StatusCodes.OK).send("Milk production deleted.");
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Milk production not found.");
  }
};