
 // Importando as bibliotecas
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

// Utilizando a biblioteca Express
const app = express();
app.use(express.json());

// Conectando ao MongoDB
const client = new MongoClient(process.env.MONGO_URI);

// Selecionando o banco e a coleção
const produtos = client.db('loja').collection('produtos');

// Criando um produto (POST)
app.post('/produtos', async (req, res) => {
    const novo_produto = await produtos.insertOne(req.body);
    res.status(201).json(novo_produto);
});

// Listando todos os produtos (GET)
app.get('/produtos', async (req, res) => {
    const lista = await produtos.find().toArray();
    res.json(lista);
});

// Buscando um produto pelo ID (GET)
app.get('/produtos/:id', async (req, res) => {
    const resultado = await produtos.findOne({
        _id: new ObjectId(req.params.id)
    });
    res.json(resultado);
});

// Atualizando um produto (PUT)
app.put('/produtos/:id', async (req, res) => {
    const resultado = await produtos.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json(resultado);
});

// Apagando um produto (DELETE)
app.delete('/produtos/:id', async (req, res) => {
    const resultado = await produtos.deleteOne({
        _id: new ObjectId(req.params.id)
    });
    res.json(resultado);
});

// Conectando ao banco e iniciando o servidor
client.connect()
    .then(() => {
        console.log('Conectado ao MongoDB');

        app.listen(3000, () => {
            console.log('API rodando na porta 3000');
        });
    })
    .catch((erro) => {
        console.log('Erro ao conectar:', erro.message);
    });
