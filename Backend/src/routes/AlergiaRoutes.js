const express = require('express');
const router = express.Router();
const AlergiaController = require('../controllers/AlergiaController');

router.get('/', AlergiaController.getAll);
router.get('/:id', AlergiaController.getById);
router.post('/', AlergiaController.create);
router.put('/:id', AlergiaController.update);
router.delete('/:id', AlergiaController.delete);

module.exports = router;
