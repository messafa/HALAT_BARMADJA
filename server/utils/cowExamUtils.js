const { readJSONFile, writeJSONFile } = require("./jsonUtils"); 

exports.testing = (cowId) => {
    const cows = readJSONFile("cows.json");
    return cows.some((c) => c.id === cowId);
    };