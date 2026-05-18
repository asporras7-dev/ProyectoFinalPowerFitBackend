const express = require('express');
const router = express.Router();
const ReporteController = require('../controllers/ReporteController');

router.get('/', ReporteController.getAll);
router.get('/:id', ReporteController.getById);
router.post('/', ReporteController.create);
router.put('/:id', ReporteController.update);
router.delete('/:id', ReporteController.delete);

module.exports = router;
