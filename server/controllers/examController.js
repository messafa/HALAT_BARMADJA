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
    throw new NotFoundError("Exam not found.");
  }
};

exports.addExam = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwtUtils.verifyToken(token);
  if (testing(parseInt(req.body.cowId))) {
    const exams = readJSONFile("exams.json");
    const {date,cowId,disease} = req.body;
    const newExam = {
      id: parseInt(uid.rnd()),
      date,
      cowId:+cowId,
      disease,
      addedBy: getNameById(decoded.id),
    };
    exams.push(newExam);
    writeJSONFile("exams.json", exams);
    res.status(StatusCodes.CREATED).send(newExam);
  } else {
    throw new BadRequestError(`Cow not found.`);
  }
};

exports.updateExam = (req, res) => {
  const exams = readJSONFile("exams.json");
  const examIndex = exams.findIndex((e) => e.id === parseInt(req.params.id));
  if (examIndex !== -1) {
    if (testing(parseInt(req.body.cowId))) {
      const updatedExam = { ...exams[examIndex], ...req.body };
      exams[examIndex] = updatedExam;
      writeJSONFile("exams.json", exams);
      res.status(StatusCodes.OK).json(updatedExam);
    } else {
      throw new BadRequestError(`Cow with ID ${req.body.cowId} not found.`);
    }
  } else {
    throw new NotFoundError("Exam not found.");
  }
};

exports.deleteExam = (req, res) => {
  const exams = readJSONFile("exams.json");
  const filteredExams = exams.filter((e) => e.id !== parseInt(req.params.id));
  if (filteredExams.length < exams.length) {
    writeJSONFile("exams.json", filteredExams);
    res.status(StatusCodes.OK).json({ msg: `Exam ${req.params.id} deleted.` });
  } else {
    throw new NotFoundError("Exam not found.");
  }
};

exports.getExamsByCowId = (req, res) => {
  const exams = readJSONFile("exams.json");
  const cowExams = exams.filter((e) => e.cowId === parseInt(req.params.cowId));
  res.status(StatusCodes.OK).json({ count: cowExams.length, exams: cowExams });
};

exports.deleteExamsByCowId = (cowId) => {
  const exams = readJSONFile("exams.json");
  const filteredExams = exams.filter((e) => e.cowId !== cowId);
  writeJSONFile("exams.json", filteredExams);
};

exports.getExamsNbrByMounth = (month) => {
  const exams = readJSONFile("exams.json");
  const examsNbr = exams.filter((e) => new Date(e.date).getMonth() === month);
  return examsNbr.length;
}

exports.getExamsNbrOfLastSixMonths = (req,res) => {
  
  const examsNbr = [];
  const currentMonth = new Date().getMonth();
  for (let i = 0; i < 6; i++) {
    examsNbr.push(exports.getExamsNbrByMounth((currentMonth - i + 12) % 12));
  }
  res.status(StatusCodes.OK).json( examsNbr );
}