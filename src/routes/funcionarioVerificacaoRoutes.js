const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/:email', funcionarioController.verificarFuncionario);

module.exports = router;