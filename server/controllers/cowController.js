const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");

exports.registerCow = (req, res) => {
  const cows = readJSONFile("cows.json");
  const newCow = { id: Date.now(), ...req.body };
  cows.push(newCow);
  writeJSONFile("cows.json", cows);
  res.status(201).send("Cow registered successfully");
};

exports.getCowDetails = (req, res) => {
  const cows = readJSONFile("cows.json");
  const cow = cows.find((c) => c.id === parseInt(req.params.id));
  if (!cow) return res.status(404).send("Cow not found");
  res.status(200).json(cow);
};
