const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/authMiddleware');

router.post('/login', UsuarioController.login);
router.post('/', UsuarioController.create);

// Rutas protegidas
router.get('/', auth, UsuarioController.getAll);
router.get('/:id', auth, UsuarioController.getById);
router.put('/:id', auth, UsuarioController.update);
router.patch('/:id', auth, UsuarioController.update);
router.delete('/:id', auth, UsuarioController.delete);

module.exports = router;
