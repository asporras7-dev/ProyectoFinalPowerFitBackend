const express = require('express');
const router = express.Router();
const PublicacionController = require('../controllers/PublicacionController');

router.get('/', PublicacionController.getAll);
router.get('/:id', PublicacionController.getById);
router.post('/', PublicacionController.create);
router.put('/:id', PublicacionController.update);
router.delete('/:id', PublicacionController.delete);

module.exports = router;
