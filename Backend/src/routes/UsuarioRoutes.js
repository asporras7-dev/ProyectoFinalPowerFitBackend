const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.post('/login', UsuarioController.login);
router.get('/', UsuarioController.getAll);
router.get('/:id', UsuarioController.getById);
router.post('/', UsuarioController.create);
router.put('/:id', UsuarioController.update);
router.patch('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.delete);

module.exports = router;
