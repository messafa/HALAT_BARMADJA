const express = require('express');
const router = express.Router();

const {
    getCows,
    getCow,
    addCow,
    updateCow,
    deleteCow,
    } = require('../controllers/cowController');

router.route('/').get(getCows).post(addCow);
router.route('/:id').get(getCow).patch(updateCow).delete(deleteCow);

module.exports = router;