const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const { StatusCodes } = require("http-status-codes");
const { getNameById } = require("./authController");
const { checkCowId } = require("./cowController");
const jwtUtils = require("../utils/jwtUtils");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../utils/errors");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({
  length: 4,
  dictionary: "number",
});

exports.getBirths = (req, res) => {
  const births = readJSONFile("births.json");
  res.status(StatusCodes.OK).json({ count: births.length, births: births });
};

exports.getBirth = (req, res) => {
  const births = readJSONFile("births.json");
  const birth = births.find((b) => b.id === parseInt(req.params.id));
  if (birth) {
    res.status(StatusCodes.OK).json(birth);
  } else {
    throw new NotFoundError("Birth not found.");
  }
};

exports.addBirth = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwtUtils.verifyToken(token);
  if (checkCowId(req.body.motherId)) {
    const births = readJSONFile("births.json");
    const newBirth = {
      id: parseInt(uid.rnd()),
      ...req.body,
      addedBy: getNameById(decoded.id),
    };
    births.push(newBirth);
    writeJSONFile("births.json", births);
    res.status(StatusCodes.CREATED).send(newBirth);
  } else {
    throw new BadRequestError(`we don't cow with id=${req.body.motherId}`);
  }
};

exports.updateBirth = (req, res) => {
  const births = readJSONFile("births.json");
  const birthIndex = births.findIndex((b) => b.id === parseInt(req.params.id));
  if (birthIndex !== -1) {
    if (checkCowId(parseInt(req.body.motherId))) {
      const updatedBirth = { ...births[birthIndex], ...req.body };
      births[birthIndex] = updatedBirth;
      writeJSONFile("births.json", births);
      res.status(StatusCodes.OK).json(updatedBirth);
    } else {
      throw new BadRequestError(`we don't cow with id=${req.body.motherId}`);
    }
  } else {
    throw new NotFoundError("Birth not found.");
  }
};

exports.deleteBirth = (req, res) => {
  const births = readJSONFile("births.json");
  const filteredBirths = births.filter((b) => b.id !== parseInt(req.params.id));
  writeJSONFile("births.json", filteredBirths);
  res.status(StatusCodes.OK).json({ msg: "Birth deleted." });
};
