const express = require('express');
const router = express.Router();
const RutinaController = require('../controllers/RutinaController');

router.get('/', RutinaController.getAll);
router.get('/:id', RutinaController.getById);
router.post('/', RutinaController.create);
router.put('/:id', RutinaController.update);
router.delete('/:id', RutinaController.delete);

module.exports = router;
