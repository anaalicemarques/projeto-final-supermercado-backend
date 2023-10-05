const Erros = require("./erros");

function errosTratamento (erro, res) {
    if (erro instanceof Erros) {
        return res.status(erro.status).json({
            mensagem: erro.mensagem
        })
    }
    return res.status(500).json({
        mensagem: "Erro no servidor"
    })
}

module.exports = errosTratamento