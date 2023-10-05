const Produto = require('../models/produto');
const Erros = require('../errors/erros');
const errosTratamento = require('../errors/errosTratamento');

exports.listAll = async (req, res) => {
    try {
        const produtos = await Produto.find();
        if (produtos) {
            res.json(produtos);
        } else {
            throw new Erros('Não existem produtos cadastrados', 404);
        }
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};

exports.listById = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (produto) {
            res.json(produto);
        } else {
            throw new Erros('Produto não encontrado', 404);
        }
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};

exports.create = async (req, res) => {
    try {
        const dadosNovoProduto = req.body;
        const produtoCadastrado = await new Produto(dadosNovoProduto).save();
        res.status(201).json(produtoCadastrado);
    } catch (error) {
        errosTratamento (error, res);
        console.error(error);
    }
};

exports.update = async (req, res) => {
    try {
        const { nome, precoAtual, precoPromocao, tipo, descricao, dataValidade, quantidade } = req.body;
        const produtoAtualizado = await Produto.findByIdAndUpdate(
            req.params.id,
            { nome, precoAtual, precoPromocao, tipo, descricao, dataValidade, quantidade },
            { new: true }
        );
        if (produtoAtualizado) {
            res.json(produtoAtualizado);
        } else {
            throw new Erros('Produto não encontrado', 404);
        }
    } catch (error) {
        errosTratamento (error, res);
    }
};

exports.delete = async (req, res) => {
    try {
        const produtoExcluido = await Produto.findByIdAndRemove(req.params.id);
        if (produtoExcluido) {
            res.json({ message: 'Produto removido' });
        } else {
            throw new Erros('Produto não encontrado', 404);
        }
    } catch (error) {
        errosTratamento (error, res);
    }
};

exports.cadastrarPromocao = async (req, res) => {
    try {
        const { nome, precoPromocao, tipo } = req.body;

        const produtos = await Produto.find({ nome, tipo });

        if (produtos.length === 0) {
            throw new Erros('Nenhum produto encontrado com o mesmo nome e tipo', 404);
        }

        const produtosAtualizados = [];

        for (const produto of produtos) {
            const produtoCompleto = await Produto.findById(produto._id);

            const produtoAtualizado = await atualizarProduto(produto._id, {
                nome: produtoCompleto.nome,
                precoAtual: produtoCompleto.precoAtual,
                precoPromocao,
                tipo,
                descricao: produtoCompleto.descricao,
                dataValidade: produtoCompleto.dataValidade,
                quantidade: produtoCompleto.quantidade,
                urlImagem: produtoCompleto.urlImagem
            });

            produtosAtualizados.push(produtoAtualizado);
        }

        res.json({ message: 'Promoção cadastrada para todos os produtos com o mesmo nome e tipo', produtos: produtosAtualizados });

    } catch (error) {
        errosTratamento (error, res);
    }
};

async function atualizarProduto(id, dadosAtualizados) {
    try {
        const produtoAtualizado = await Produto.findByIdAndUpdate(
            id,
            dadosAtualizados,
            { new: true }
        );
        return produtoAtualizado;
    } catch (error) {
        throw new Error('Erro ao atualizar o produto');
    }
}