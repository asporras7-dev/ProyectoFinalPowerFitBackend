const express = require('express');
const router = express.Router();
const RolContribuidorController = require('../controllers/RolContribuidorController');

router.get('/', RolContribuidorController.getAll);
router.get('/:id', RolContribuidorController.getById);
router.post('/', RolContribuidorController.create);
router.put('/:id', RolContribuidorController.update);
router.delete('/:id', RolContribuidorController.delete);

module.exports = router;
