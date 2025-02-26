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
  console.log(req.params.id);
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

exports.getMaxMilkProduction = (req, res) => {
  const milkProductions = readJSONFile("milkProductions.json");
  const maxMilkProduction = milkProductions.reduce((prev, current) =>
    prev.size > current.size ? prev : current
  );
  if (maxMilkProduction) {
    res.status(StatusCodes.OK).json(maxMilkProduction);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: "No milk production found." });
  }
};

exports.getMilkByDate = (date) => {
  const milkProductions = readJSONFile("milkProductions.json");
  const milkProduction = milkProductions.find((m) => m.date === date);
  if (milkProduction) {
    return +milkProduction.size;
  } else {
    return 0;
  }
};

exports.getMilkThisWeek = (req, res) => {
  const milkThisWeek = [0, 0, 0, 0, 0, 0, 0];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    milkThisWeek[6 - i] = exports.getMilkByDate(date.toISOString().split("T")[0]);
  }
  res.status(StatusCodes.OK).json(milkThisWeek);
};

exports.getMilkLastWeek = (req, res) => {
  const milkLastWeek = [0, 0, 0, 0, 0, 0, 0];
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  for (let i = 0; i < 7; i++) {
    const date = new Date(lastWeek);
    date.setDate(date.getDate() - i);
    milkLastWeek[6 - i] = exports.getMilkByDate(date.toISOString().split("T")[0]);
  }
  res.status(StatusCodes.OK).json(milkLastWeek);
};