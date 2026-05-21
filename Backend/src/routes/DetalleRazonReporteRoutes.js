const express = require('express');
const router = express.Router();
const DetalleRazonReporteController = require('../controllers/DetalleRazonReporteController');

router.get('/', DetalleRazonReporteController.getAll);
router.get('/:id', DetalleRazonReporteController.getById);
router.post('/', DetalleRazonReporteController.create);
router.put('/:id', DetalleRazonReporteController.update);
router.delete('/:id', DetalleRazonReporteController.delete);

module.exports = router;
