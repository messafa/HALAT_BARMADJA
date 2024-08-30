const express = require('express');
const router = express.Router();

const {
    getExams,
    getExam,
    addExam,
    updateExam,
    deleteExam,
    getExamsByCowId,
    getExamsNbrOfLastSixMonths
    } = require('../controllers/examController');

router.route('/').get(getExams).post(addExam);
router.route('/:id').get(getExam).patch(updateExam).delete(deleteExam);
router.route('/cow/:cowId').get(getExamsByCowId);
router.route('/data/lastSixMonths').get(getExamsNbrOfLastSixMonths);


module.exports = router;