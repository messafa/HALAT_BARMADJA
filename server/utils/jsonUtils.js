const fs = require("fs");
const path = require("path");

const readJSONFile = (filename) => {
  const filePath = path.join(__dirname, "../database", filename);
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeJSONFile = (filename, content) => {
  const filePath = path.join(__dirname, "../database", filename);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
};

module.exports = { readJSONFile, writeJSONFile };
