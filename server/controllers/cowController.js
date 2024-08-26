const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
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
    res.send(cow);
  } else {
    res.status(404).send("Cow not found.");
  }
};

exports.addCow = (req, res) => {
  const cows = readJSONFile("cows.json");
  const newCow = {
    id: parseInt(uid()),
    addedBy: req.user,
    ...req.body,
  };
  cows.push(newCow);
  writeJSONFile("cows.json", cows);
  res.status(201).send(newCow);
};

exports.updateCow = (req, res) => {
  const cows = readJSONFile("cows.json");
  const cowIndex = cows.findIndex((c) => c.id === parseInt(req.params.id));
  if (cowIndex !== -1) {
    const updatedCow = { ...cows[cowIndex], ...req.body };
    cows[cowIndex] = updatedCow;
    writeJSONFile("cows.json", cows);
    res.send(updatedCow);
  } else {
    res.status(404).send("Cow not found.");
  }
};

exports.deleteCow = (req, res) => {
  const cows = readJSONFile("cows.json");
  const filteredCows = cows.filter((c) => c.id !== parseInt(req.params.id));
  if (filteredCows.length < cows.length) {
    writeJSONFile("cows.json", filteredCows);
    res.send("Cow deleted.");
  } else {
    res.status(404).send("Cow not found.");
  }
};