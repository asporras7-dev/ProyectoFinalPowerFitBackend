const express = require('express');
const router = express.Router();
const TemaEnTendenciaController = require('../controllers/TemaEnTendenciaController');

router.get('/', TemaEnTendenciaController.getAll);
router.get('/:id', TemaEnTendenciaController.getById);
router.post('/', TemaEnTendenciaController.create);
router.put('/:id', TemaEnTendenciaController.update);
router.delete('/:id', TemaEnTendenciaController.delete);

module.exports = router;
