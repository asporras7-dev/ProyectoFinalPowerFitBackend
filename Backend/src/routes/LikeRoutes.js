const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/LikeController');

router.get('/', LikeController.getAll);
router.get('/:id', LikeController.getById);
router.post('/', LikeController.create);
router.put('/:id', LikeController.update);
router.delete('/:id', LikeController.delete);

module.exports = router;
