const express = require('express');
const router = express.Router();
const ContribuidorController = require('../controllers/ContribuidorController');

router.get('/', ContribuidorController.getAll);
router.get('/:id', ContribuidorController.getById);
router.post('/', ContribuidorController.create);
router.put('/:id', ContribuidorController.update);
router.delete('/:id', ContribuidorController.delete);

module.exports = router;
