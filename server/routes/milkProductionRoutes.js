const express = require('express');
const router = express.Router();

const {
    getMilkProductions,
    getMilkProduction,
    addMilkProduction,
    updateMilkProduction,
    deleteMilkProduction,
    getMaxMilkProduction,
    getMilkLastWeek,
    getMilkThisWeek
    } = require('../controllers/milkProductionController');

router.route('/prodiction/max').get(getMaxMilkProduction);
router.route('/').get(getMilkProductions).post(addMilkProduction);
router.route('/:id').get(getMilkProduction).patch(updateMilkProduction).delete(deleteMilkProduction);
router.route('/data/thisweek').get(getMilkThisWeek);
router.route('/data/lastweek').get(getMilkLastWeek);


module.exports = router;