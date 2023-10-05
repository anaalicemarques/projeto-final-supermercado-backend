const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', produtoController.listAll);
router.get('/:id', produtoController.listById);
router.post('/', produtoController.create);
router.put('/:id', produtoController.update);
router.put('/', produtoController.cadastrarPromocao);
router.delete('/:id', produtoController.delete);

module.exports = router;