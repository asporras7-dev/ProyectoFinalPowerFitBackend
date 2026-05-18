const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

router.post('/login', UsuarioController.login);
// Ruta protegida: Solo usuarios logueados y que sean 'admin' pueden obtener todos los usuarios
router.get('/', verificarToken, verificarRol(['admin']), UsuarioController.getAll);
router.get('/:id', UsuarioController.getById);
router.post('/', UsuarioController.create);
router.put('/:id', UsuarioController.update);
router.patch('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.delete);

module.exports = router;
