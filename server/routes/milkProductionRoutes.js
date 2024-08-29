const express = require('express');
const router = express.Router();

const {
    getMilkProductions,
    getMilkProduction,
    addMilkProduction,
    updateMilkProduction,
    deleteMilkProduction,
    getMaxMilkProduction,
    } = require('../controllers/milkProductionController');

router.route('/prodiction/max').get(getMaxMilkProduction);
router.route('/').get(getMilkProductions).post(addMilkProduction);
router.route('/:id').get(getMilkProduction).patch(updateMilkProduction).delete(deleteMilkProduction);


module.exports = router;