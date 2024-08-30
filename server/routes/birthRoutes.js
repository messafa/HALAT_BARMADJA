const express = require('express');
const router = express.Router();

const {
    getBirths,
    getBirth,
    addBirth,
    updateBirth,
    deleteBirth,
    getBirthsByCowId
    } = require('../controllers/birthController');

router.route('/').get(getBirths).post(addBirth);
router.route('/:id').get(getBirth).patch(updateBirth).delete(deleteBirth);
router.route('/cow/:id').get(getBirthsByCowId);


module.exports = router;