const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const jwtUtils = require("../utils/jwtUtils");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
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
    const token = jwtUtils.generateToken({ id: user.id, email: user.email });
    res.status(StatusCodes.OK).send({ token });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid credentials.");
  }
};

exports.register = async (req, res) => {
  const users = readJSONFile("users.json");
  const { email, password , fullName} = req.body;
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    res.status(StatusCodes.CONFLICT).send("User already exists.");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: parseInt(uid.rnd()), // This will generate a numeric ID
      fullName,
      email,
      password: hashedPassword,
    };
    users.push(newUser);
    writeJSONFile("users.json", users);
    res.status(StatusCodes.CREATED).send("User created.");
  }
};