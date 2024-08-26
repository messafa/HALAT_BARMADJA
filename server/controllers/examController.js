const {readJSONFile, writeJSONFile} = require("../utils/jsonUtils");
const {StatusCodes} = require("http-status-codes");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({
    length: 4,
    dictionary: "number",
  });

exports.getExams = (req, res) => {
    const exams = readJSONFile("exams.json");
    res.send(exams);
};


exports.getExam = (req, res) => {
    const exams = readJSONFile("exams.json");
    const exam = exams.find((e) => e.id === parseInt(req.params.id));
    if (exam) {
        res.status(StatusCodes.OK).send(exam);
    } else {
        res.status(StatusCodes.NOT_FOUND).send("Exam not found.");
    }
};

exports.addExam = (req, res) => {
    const exams = readJSONFile("exams.json");
    const newExam = {
        id: parseInt(uid()),
        ...req.body,
    };
    exams.push(newExam);
    writeJSONFile("exams.json", exams);
    res.status(StatusCodes.CREATED).send(newExam);
};

exports.updateExam = (req, res) => {
    const exams = readJSONFile("exams.json");
    const examIndex = exams.findIndex((e) => e.id === parseInt(req.params.id));
    if (examIndex !== -1) {
        const updatedExam = {...exams[examIndex], ...req.body};
        exams[examIndex] = updatedExam;
        writeJSONFile("exams.json", exams);
        res.status(StatusCodes.OK).send(updatedExam);
    } else {
        res.status(StatusCodes.NOT_FOUND).send("Exam not found.");
    }
};

exports.deleteExam = (req, res) => {
    const exams = readJSONFile("exams.json");
    const filteredExams = exams.filter((e) => e.id !== parseInt(req.params.id));
    if (filteredExams.length < exams.length) {
        writeJSONFile("exams.json", filteredExams);
        res.status(StatusCodes.OK).send("Exam deleted.");
    } else {
        res.status(StatusCodes.NOT_FOUND).send("Exam not found.");
    }
};