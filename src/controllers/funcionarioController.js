const Funcionario = require('../models/funcionario');
const Erros = require('../errors/erros');
const errosTratamento = require('../errors/errosTratamento');

exports.listAll = async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        if (funcionarios) {
            res.json(funcionarios);
        } else {
            throw new Erros('Não existem funcionários cadastrados', 404);
        }
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};

exports.listById = async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.id);
        if (funcionario) {
            res.json(funcionario);
        } else {
            throw new Erros('Funcionário não encontrado', 404);
        }
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};

exports.listByEmail = async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.email);
        if (funcionario) {
            res.json(funcionario);
        } else {
            throw new Erros('Funcionário não encontrado', 404);
        }
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};

exports.create = async (req, res) => {
    try {
        const dadosNovoFuncionario = req.body;
        const funcionarioCadastrado = await new Funcionario(dadosNovoFuncionario).save();
        res.status(201).json(funcionarioCadastrado);
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};

exports.update = async (req, res) => {
    try {
        const { nome, idade, matricula, cpf, endereco, telefone } = req.body;
        const funcionarioAtualizado = await Funcionario.findByIdAndUpdate(
            req.params.id,
            { nome, idade, matricula, cpf, endereco, telefone },
            { new: true }
        );
        if (funcionarioAtualizado) {
            res.json(funcionarioAtualizado);
        } else {
            throw new Erros('Funcionário não encontrado', 404);
        }
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};

exports.delete = async (req, res) => {
    try {
        const funcionarioExcluido = await Funcionario.findByIdAndRemove(req.params.id);
        if (funcionarioExcluido) {
            res.json({ message: 'Funcionário removido' });
        } else {
            throw new Erros('Funcionário não encontrado', 404);
        }
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};

exports.verificarFuncionario = async (req, res) => {
    try {
      const { email } = req.params;
  
      const funcionarioExistente = await Funcionario.findOne({ email });
  
      if (funcionarioExistente) {
        res.json({ existe: true });
      } else {
        res.json({ existe: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};