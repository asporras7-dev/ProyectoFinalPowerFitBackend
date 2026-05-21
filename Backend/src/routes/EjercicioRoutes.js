const express = require('express');
const router = express.Router();
const EjercicioController = require('../controllers/EjercicioController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/verifyRole');

router.get('/', EjercicioController.getAll);
router.get('/:id', EjercicioController.getById);
router.post('/', auth, isAdmin, EjercicioController.create);
router.put('/:id', auth, isAdmin, EjercicioController.update);
router.delete('/:id', auth, isAdmin, EjercicioController.delete);

module.exports = router;
