const { readJSONFile } = require("../utils/jsonUtils");
const jwtUtils = require("../utils/jwtUtils");
const { StatusCodes } = require("http-status-codes");

const argon2 = require("argon2");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const users = readJSONFile("users.json");
  const user = users.find((u) => u.email === email);

  if (user && (await argon2.verify(user.password, password))) {
    const token = jwtUtils.generateToken({ id: user.id, email: user.email });
    res.status(StatusCodes.OK).send({ token });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid credentials.");
  }
};

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const users = readJSONFile("users.json");
  const user = users.find((u) => u.email === email);

  if (user) {
    res.status(StatusCodes.BAD_REQUEST).send("User already exists.");
  } else {
    const hashedPassword = await argon2.hash(password);
    const newUser = {
      id: users.length + 1,
      fullName,
      email,
      password: hashedPassword,
    };
    users.push(newUser);
    res.status(StatusCodes.CREATED).send(newUser);
  }
};