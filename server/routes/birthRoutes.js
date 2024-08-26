const express = require('express');
const router = express.Router();

const {
    getBirths,
    getBirth,
    addBirth,
    updateBirth,
    deleteBirth,
    } = require('../controllers/birthController');

router.route('/').get(getBirths).post(addBirth);
router.route('/:id').get(getBirth).patch(updateBirth).delete(deleteBirth);


module.exports = router;