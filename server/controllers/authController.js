const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const jwtUtils = require("../utils/jwtUtils");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../utils/errors");
const ShortUniqueId = require("short-unique-id");

const uid = new ShortUniqueId({
  length: 3,
  dictionary: "number",
});

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const users = readJSONFile("users.json");
  const user = users.find((u) => u.email === email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwtUtils.generateToken({ id: user.id, name: user.fullName });
    res.status(StatusCodes.OK).send({ token });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Email or password is wrong" });
  }
};

exports.register = async (req, res) => {
  const users = readJSONFile("users.json");
  const { email, password, fullName } = req.body;
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    throw new BadRequestError("User already exists.");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: parseInt(uid.randomUUID(8)),
      fullName,
      email,
      password: hashedPassword,
    };
    users.push(newUser);
    writeJSONFile("users.json", users);
    res.status(StatusCodes.CREATED).send("User created.");
  }
};

exports.getNameById = (id) => {
  const users = readJSONFile("users.json");
  const user = users.find((u) => u.id === id);
  return user.fullName;
};
