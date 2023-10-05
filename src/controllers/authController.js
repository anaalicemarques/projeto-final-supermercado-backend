const Funcionario = require('../models/funcionario');
const Erros = require('../errors/erros');
const errosTratamento = require('../errors/errosTratamento');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    
    try {
        const { email, senha } = req.body;
    
        const funcionarioExiste = await Funcionario.findOne({email});

        if (!funcionarioExiste) {
            throw new Erros('Funcionário não encontrado', 404);
        }
        
        if (funcionarioExiste.senha !== senha) {
            throw new Erros('E-mail ou senha incorretos', 401);
        }
    
        const token = jwt.sign({email}, 'secreto');
        
        const mensagem = "Funcionário logado no sistema";
    
        return res.status(200).json({ mensagem, token });
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};