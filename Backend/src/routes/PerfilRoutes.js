const express = require('express');
const router = express.Router();
const PerfilController = require('../controllers/PerfilController');

router.get('/', PerfilController.getAll);
router.get('/:id', PerfilController.getById);
router.post('/', PerfilController.create);
router.put('/:id', PerfilController.update);
router.delete('/:id', PerfilController.delete);

module.exports = router;
