const express = require('express');
const router = express.Router();
const AlergiaController = require('../controllers/AlergiaController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/verifyRole');

router.get('/', AlergiaController.getAll);
router.get('/:id', AlergiaController.getById);
router.post('/', auth, isAdmin, AlergiaController.create);
router.put('/:id', auth, isAdmin, AlergiaController.update);
router.delete('/:id', auth, isAdmin, AlergiaController.delete);

module.exports = router;
