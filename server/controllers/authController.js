const { readJSONFile } = require("../utils/jsonUtils");
const jwtUtils = require("../utils/jwtUtils");

exports.login = (req, res) => {
  const { username, password } = req.body;
  const users = readJSONFile("users.json");
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwtUtils.generateToken({
      id: user.id,
      username: user.username,
    });
    res.status(200).json({ token });
  } else {
    res.status(400).send("Invalid credentials.");
  }
};
