const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const { StatusCodes } = require("http-status-codes");
const { getNameById } = require("./authController");
const { testing } = require("../utils/cowExamUtils");
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
  const births = readJSONFile("births.json");

  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwtUtils.verifyToken(token);
    if (decoded) {
      const { motherId , dateBirth , gender } = req.body;
      const newBirth = {
        id: parseInt(uid.randomUUID(4)),
        motherId: +motherId,
        dateBirth,
        gender,
        addedBy: getNameById(decoded.id),
      };
      
      births.push(newBirth);
      
      writeJSONFile("births.json", births);
     
      res.status(StatusCodes.CREATED).send(newBirth);
    } else {
      throw new UnauthorizedError("Invalid token.");
    }
  } catch (err) {
    throw new UnauthorizedError("Invalid token.");
  }
};

exports.updateBirth = (req, res) => {
  const births = readJSONFile("births.json");
  const birthIndex = births.findIndex((b) => b.id === parseInt(req.params.id));
  if (birthIndex !== -1) {
    if (testing(parseInt(req.body.motherId))) {
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

exports.getBirthsByCowId = (req, res) => {
  const births = readJSONFile("births.json");
  const birthsByCow = births.filter(
    (birth) => birth.motherId === parseInt(req.params.id)
  );
  res
    .status(StatusCodes.OK)
    .json({ count: birthsByCow.length, births: birthsByCow });
};

exports.getNbrBirthsInSeason = (req, res) => {
  const births = readJSONFile("births.json");
  const birthsInSeason = births.reduce(
    (acc, birth) => {
      if (!birth.dateBirth) return acc; // تخطي السجلات بدون تواريخ

      const month = new Date(birth.dateBirth).getMonth();

      // حساب الفصول بناءً على الأشهر
      if (month >= 2 && month <= 4) {
        acc.spring++;
      } else if (month >= 5 && month <= 7) {
        acc.summer++;
      } else if (month >= 8 && month <= 10) {
        acc.autumn++;
      } else {
        acc.winter++;
      }
      return acc;
    },
    { spring: 0, summer: 0, autumn: 0, winter: 0 }
  );

  res.status(200).json(birthsInSeason);
};
