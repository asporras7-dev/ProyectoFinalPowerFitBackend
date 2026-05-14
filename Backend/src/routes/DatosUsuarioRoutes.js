const express = require('express');
const router = express.Router();
const DatosUsuarioController = require('../controllers/DatosUsuarioController');

router.get('/', DatosUsuarioController.getAll);
router.get('/:id', DatosUsuarioController.getById);
router.post('/', DatosUsuarioController.create);
router.put('/:id', DatosUsuarioController.update);
router.delete('/:id', DatosUsuarioController.delete);

module.exports = router;
