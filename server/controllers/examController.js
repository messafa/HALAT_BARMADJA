const { readJSONFile, writeJSONFile } = require("../utils/jsonUtils");
const { StatusCodes } = require("http-status-codes");
const { getNameById } = require("./authController");
const { checkCowId } = require("./cowController");
const jwtUtils = require("../utils/jwtUtils");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({
  length: 4,
  dictionary: "number",
});

exports.getExams = (req, res) => {
  const exams = readJSONFile("exams.json");
  res.status(StatusCodes.OK).json({ count: exams.length, exams: exams });
};

exports.getExam = (req, res) => {
  const exams = readJSONFile("exams.json");
  const exam = exams.find((e) => e.id === parseInt(req.params.id));
  if (exam) {
    res.status(StatusCodes.OK).json(exam);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Exam not found." });
  }
};

exports.addExam = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwtUtils.verifyToken(token);
  if (checkCowId(req.body.cowId)) {

      const exams = readJSONFile("exams.json");
      const newExam = {
        id: parseInt(uid.rnd()),
        ...req.body,
        addedBy: getNameById(decoded.id),
      };
      exams.push(newExam);
      writeJSONFile("exams.json", exams);
      res.status(StatusCodes.CREATED).send(newExam);
   
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Cow not found." });
  }
};

exports.updateExam = (req, res) => {
  const exams = readJSONFile("exams.json");
  const examIndex = exams.findIndex((e) => e.id === parseInt(req.params.id));
  if (examIndex !== -1) {
    if (checkCowId(req.body.cowId)) {
      const updatedExam = { ...exams[examIndex], ...req.body };
      exams[examIndex] = updatedExam;
      writeJSONFile("exams.json", exams);
      res.status(StatusCodes.OK).json(updatedExam);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "Cow not found." });
    }
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Exam not found." });
  }
};

exports.deleteExam = (req, res) => {
  const exams = readJSONFile("exams.json");
  const filteredExams = exams.filter((e) => e.id !== parseInt(req.params.id));
  if (filteredExams.length < exams.length) {
    writeJSONFile("exams.json", filteredExams);
    res.status(StatusCodes.OK).json({ msg: `Exam ${req.params.id} deleted.` });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Exam not found." });
  }
};
