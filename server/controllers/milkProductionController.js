const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const jwtUtils = require("../utils/jwtUtils");
const { StatusCodes } = require("http-status-codes");
const { getNameById } = require("./authController");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../utils/errors");
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
  const milkProduction = milkProductions.find(
    (m) => m.id === parseInt(req.params.id)
  );
  if (milkProduction) {
    res.status(StatusCodes.OK).send(milkProduction);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Milk production not found.");
  }
};

exports.getMilkProductionByDate = (req, res) => {
  const milkProductions = readJSONFile("milkProductions.json");
  const milkProduction = milkProductions.find(
    (m) => m.dateProdicted === req.params.dateProdicted
  );
  if (milkProduction) {
    res.status(StatusCodes.OK).send(milkProduction);
  } else {
    res.status(StatusCodes.NOT_FOUND).send("Milk production not found.");
  }
};

exports.addMilkProduction = (req, res) => {
  const milkProductions = readJSONFile("milkProductions.json");
  const milkProduction = milkProductions.find((m) => m.date === req.body.date);
  if (milkProduction) {
    throw new BadRequestError(
      `Milk production already exists for date ${req.body.date}.`
    );
  } else {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwtUtils.verifyToken(token);
      if (decoded) {
        const newMilkProduction = {
          id: parseInt(uid.rnd()),
          ...req.body,
          addedBy: getNameById(decoded.id),
        };
        milkProductions.push(newMilkProduction);
        writeJSONFile("milkProductions.json", milkProductions);
        res.status(StatusCodes.CREATED).send(newMilkProduction);
      } else {
        throw new UnauthorizedError("Invalid token.");
      }
    } catch (error) {
      throw new UnauthorizedError("Invalid token.");
    }
  }
};

exports.updateMilkProduction = (req, res) => {
  const milkProductions = readJSONFile("milkProductions.json");
  const milkProductionIndex = milkProductions.findIndex(
    (m) => m.id === parseInt(req.params.id)
  );
  if (milkProductionIndex !== -1) {
    const updatedMilkProduction = {
      ...milkProductions[milkProductionIndex],
      ...req.body,
    };
    milkProductions[milkProductionIndex] = updatedMilkProduction;
    writeJSONFile("milkProductions.json", milkProductions);
    res.status(StatusCodes.OK).send(updatedMilkProduction);
  } else {
    throw new NotFoundError("Milk production not found.");
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
    throw new NotFoundError("Milk production not found.");
  }
};
