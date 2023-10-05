const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const produtoRoutes = require('./src/routes/produtoRoutes');
const funcionarioRoutes = require('./src/routes/funcionarioRoutes');
const funcionarioVerificacaoRoutes = require('./src/routes/funcionarioVerificacaoRoutes');
const authRoutes = require('./src/routes/authRoutes');
const errosTratamento = require('./src/errors/errosTratamento');

mongoose.connect("mongodb://127.0.0.1/projeto-supermercado", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/produtos', produtoRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/funcionarios/verificacao', funcionarioVerificacaoRoutes);
app.use('/funcionarios/login', authRoutes);
app.use(errosTratamento);

app.listen(parseInt(3333), () => {
    console.log(`Server is running at http://localhost:mongodb://127.0.0.1/projeto-supermercado`);
  });