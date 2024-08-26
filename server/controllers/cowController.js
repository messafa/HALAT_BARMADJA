const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const { StatusCodes } = require("http-status-codes");
const { getNameById } = require("./authController");
const jwtUtils = require("../utils/jwtUtils");
const ShortUniqueId = require("short-unique-id");
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
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Cow not found." });
  }
};

exports.addCow = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwtUtils.verifyToken(token);
    // check if token is valid
    if (decoded) {
      const cows = readJSONFile("cows.json");
      const newCow = {
        id: parseInt(uid.rnd()),
        ...req.body,
        addedBy: getNameById(decoded.id),
      };
      console.log(newCow);
      cows.push(newCow);
      writeJSONFile("cows.json", cows);
      res.status(StatusCodes.CREATED).send(newCow);
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send("Invalid token.");
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid token.");
  }
};

exports.updateCow = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwtUtils.verifyToken(token);
    if (decoded) {
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
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send("Invalid token.");
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid token.");
  }
};

exports.deleteCow = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwtUtils.verifyToken(token);
    if (decoded) {
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
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send("Invalid token.");
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid token.");
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwtUtils.verifyToken(token);
    if (decoded) {
      const cows = readJSONFile("cows.json");
      const filteredCows = cows.filter((c) => c.id !== parseInt(req.params.id));
      if (filteredCows.length < cows.length) {
        writeJSONFile("cows.json", filteredCows);
        res.status(StatusCodes.OK).send("Cow removed.");
      } else {
        res.status(StatusCodes.NOT_FOUND).send("Cow not found.");
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send("Invalid token.");
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid token.");
  }
};
