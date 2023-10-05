const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/', funcionarioController.listAll);
router.get('/:id', funcionarioController.listById);
router.post('/', funcionarioController.create);
router.put('/:id', funcionarioController.update);
router.delete('/:id', funcionarioController.delete);

module.exports = router;