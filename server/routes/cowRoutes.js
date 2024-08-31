const express = require('express');
const router = express.Router();

const {
    getCows,
    getCow,
    addCow,
    updateCow,
    deleteCow,
    getYearlyCows,
    } = require('../controllers/cowController');

router.route('/').get(getCows).post(addCow);
router.route('/:id').get(getCow).patch(updateCow).delete(deleteCow);
router.route('/data/yearly').get(getYearlyCows);

module.exports = router;