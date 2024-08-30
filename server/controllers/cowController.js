const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const { StatusCodes } = require("http-status-codes");
const { getNameById } = require("./authController");
const jwtUtils = require("../utils/jwtUtils");
const { deleteExamsByCowId } = require("./examController");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const ShortUniqueId = require("short-unique-id");
const e = require("express");
const uid = new ShortUniqueId({
  length: 8,
  dictionary: "number",
});

exports.getCows = (req, res) => {
  const cows = readJSONFile("cows.json");
  res.status(StatusCodes.OK).json({ count: cows.length, cows: cows });
};

exports.getCow = (req, res) => {
  const cows = readJSONFile("cows.json");
  const cow = cows.find((c) => c.id === parseInt(req.params.id));
  if (cow) {
    res.status(StatusCodes.OK).json(cow);
  } else {
    throw new NotFoundError("Cow not found.");
  }
};

exports.addCow = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwtUtils.verifyToken(token);
  const cows = readJSONFile("cows.json");
  if (!req.body || !req.body.entryDate || !req.body.breed) {
    throw new BadRequestError("Missing required fields.");
  }
  const newCow = {
    id: parseInt(uid.rnd()),
    ...req.body,
    addedBy: getNameById(decoded.id),
  };

  cows.push(newCow);
  writeJSONFile("cows.json", cows);
  res.status(StatusCodes.CREATED).send(newCow);
};

exports.updateCow = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtUtils.verifyToken(token);
  const cows = readJSONFile("cows.json");
  const cowIndex = cows.findIndex((c) => c.id === parseInt(req.params.id));
  if (cowIndex !== -1) {
    const updatedCow = { ...cows[cowIndex], ...req.body };
    cows[cowIndex] = updatedCow;
    writeJSONFile("cows.json", cows);
    res.status(StatusCodes.OK).json(updatedCow);
  } else {
    throw new NotFoundError(`Cow with ID ${req.params.id} not found.`);
  }
};

exports.deleteCow = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtUtils.verifyToken(token);
  const cows = readJSONFile("cows.json");
  const cowIndex = cows.findIndex((c) => c.id === parseInt(req.params.id));
  if (cowIndex !== -1) {
    deleteExamsByCowId(parseInt(req.params.id));
    const filteredCows = cows.filter((c) => c.id !== parseInt(req.params.id));
    writeJSONFile("cows.json", filteredCows);
    res.status(StatusCodes.OK).send("Cow removed.");
  } else {
    throw new NotFoundError("Cow not found.");
  }
};


exports.getYearlyCows = (req, res) => {
  const cows = readJSONFile("cows.json");
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const currentYearCows = cows.filter(
    (c) => new Date(c.entryDate).getFullYear() === currentYear
  );
  const lastYearCows = cows.filter(
    (c) => new Date(c.entryDate).getFullYear() === lastYear
  );
  const otherYearsCows = cows.filter(
    (c) =>
      new Date(c.entryDate).getFullYear() !== currentYear &&
      new Date(c.entryDate).getFullYear() !== lastYear
  );
  res.status(StatusCodes.OK).json({
    currentYear: currentYearCows.length,
    lastYear: lastYearCows.length,
    otherYears: otherYearsCows.length,
  });
};
