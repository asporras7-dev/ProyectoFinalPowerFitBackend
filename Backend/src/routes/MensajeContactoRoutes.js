const express = require('express');
const router = express.Router();
const MensajeContactoController = require('../controllers/MensajeContactoController');

router.get('/', MensajeContactoController.getAll);
router.get('/:id', MensajeContactoController.getById);
router.post('/', MensajeContactoController.create);
router.put('/:id', MensajeContactoController.update);
router.delete('/:id', MensajeContactoController.delete);

module.exports = router;
