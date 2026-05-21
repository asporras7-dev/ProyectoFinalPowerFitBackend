const express = require('express');
const router = express.Router();
const CategoriaPublicacionController = require('../controllers/CategoriaPublicacionController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/verifyRole');

router.get('/', CategoriaPublicacionController.getAll);
router.get('/:id', CategoriaPublicacionController.getById);
router.post('/', auth, isAdmin, CategoriaPublicacionController.create);
router.put('/:id', auth, isAdmin, CategoriaPublicacionController.update);
router.delete('/:id', auth, isAdmin, CategoriaPublicacionController.delete);

module.exports = router;
