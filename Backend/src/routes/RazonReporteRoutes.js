const express = require('express');
const router = express.Router();
const RazonReporteController = require('../controllers/RazonReporteController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/verifyRole');

router.get('/', RazonReporteController.getAll);
router.get('/:id', RazonReporteController.getById);
router.post('/', auth, isAdmin, RazonReporteController.create);
router.put('/:id', auth, isAdmin, RazonReporteController.update);
router.delete('/:id', auth, isAdmin, RazonReporteController.delete);

module.exports = router;
