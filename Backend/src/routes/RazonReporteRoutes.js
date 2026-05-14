const express = require('express');
const router = express.Router();
const RazonReporteController = require('../controllers/RazonReporteController');

router.get('/', RazonReporteController.getAll);
router.get('/:id', RazonReporteController.getById);
router.post('/', RazonReporteController.create);
router.put('/:id', RazonReporteController.update);
router.delete('/:id', RazonReporteController.delete);

module.exports = router;
