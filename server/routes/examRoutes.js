const express = require('express');
const router = express.Router();

const {
    getExams,
    getExam,
    addExam,
    updateExam,
    deleteExam,
    } = require('../controllers/examController');

router.route('/').get(getExams).post(addExam);
router.route('/:id').get(getExam).patch(updateExam).delete(deleteExam);


module.exports = router;