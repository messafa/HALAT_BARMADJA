const express = require('express');
const router = express.Router();

const {
    getMilkProductions,
    getMilkProduction,
    addMilkProduction,
    updateMilkProduction,
    deleteMilkProduction,
    } = require('../controllers/milkProductionController');

router.route('/').get(getMilkProductions).post(addMilkProduction);
router.route('/:id').get(getMilkProduction).patch(updateMilkProduction).delete(deleteMilkProduction);


module.exports = router;