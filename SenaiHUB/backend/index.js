// ==============================================================
// BACKEND SENAIHUB - API Express com MongoDB
// ==============================================================
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

// Permite conexões do front-end (CORS)
app.use(cors());

// Permite ler dados em JSON e de formulários enviados pelo navegador
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log amigável de cada requisição que chega
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// Pegando a URL de conexão do MongoDB do arquivo .env
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!uri) {
    console.error('ERRO: Variável MONGO_URI não encontrada no arquivo .env!');
}

const client = new MongoClient(uri);

// Banco de dados e coleções
const db = client.db('loja');
const produtos = db.collection('produtos');
const usuarios = db.collection('usuarios');

// --------------------------------------------------------------
// Rota de teste inicial
// --------------------------------------------------------------
app.get('/', (req, res) => {
    res.json({ mensagem: 'API do SenaiHUB rodando com sucesso!' });
});

// ==============================================================
// ROTAS DE USUÁRIOS (CADASTRO E LOGIN)
// ==============================================================

// 1. Cadastrar usuário (POST /usuarios/cadastro)
app.post('/usuarios/cadastro', async (req, res) => {
    try {
        const { nome, email, idade, telefone, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
        }

        // Verifica se já existe um usuário com o mesmo email
        const usuarioExistente = await usuarios.findOne({ email: email.toLowerCase().trim() });
        if (usuarioExistente) {
            return res.status(400).json({ erro: 'Este email já está cadastrado no sistema!' });
        }

        // Criptografa a senha para ninguém ver a senha real no banco
        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        // Monta o novo usuário
        const novoUsuario = {
            nome: nome.trim(),
            email: email.toLowerCase().trim(),
            idade: idade ? Number(idade) : null,
            telefone: telefone ? telefone.trim() : '',
            senha: senhaCriptografada,
            criadoEm: new Date()
        };

        const resultado = await usuarios.insertOne(novoUsuario);

        res.status(201).json({
            sucesso: true,
            mensagem: 'Usuário cadastrado com sucesso!',
            id: resultado.insertedId,
            nome: novoUsuario.nome,
            email: novoUsuario.email
        });
    } catch (erro) {
        console.error('Erro ao cadastrar usuário:', erro);
        res.status(500).json({ erro: 'Erro interno no servidor ao cadastrar usuário.', detalhe: erro.message });
    }
});

// 2. Login de usuário (POST /usuarios/login)
app.post('/usuarios/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Preencha o email e a senha.' });
        }

        // Procura o usuário pelo email
        const usuario = await usuarios.findOne({ email: email.toLowerCase().trim() });
        if (!usuario) {
            return res.status(401).json({ erro: 'Email ou senha incorretos.' });
        }

        // Confere se a senha digitada bate com a salva no banco
        const senhaBate = await bcrypt.compare(senha, usuario.senha);
        if (!senhaBate) {
            return res.status(401).json({ erro: 'Email ou senha incorretos.' });
        }

        res.json({
            sucesso: true,
            mensagem: 'Login realizado com sucesso!',
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (erro) {
        console.error('Erro no login:', erro);
        res.status(500).json({ erro: 'Erro interno ao realizar login.', detalhe: erro.message });
    }
});

// 3. Listar usuários (GET /usuarios)
app.get('/usuarios', async (req, res) => {
    try {
        // Busca todos os usuários sem enviar a senha por segurança
        const lista = await usuarios.find({}, { projection: { senha: 0 } }).toArray();
        res.json(lista);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: erro.message });
    }
});

// ==============================================================
// ROTAS DO CRUD DE PRODUTOS
// ==============================================================

// 1. Criar um produto (POST /produtos)
app.post('/produtos', async (req, res) => {
    try {
        const novoProduto = await produtos.insertOne(req.body);
        res.status(201).json(novoProduto);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao cadastrar produto', detalhe: erro.message });
    }
});

// 2. Listar todos os produtos (GET /produtos)
app.get('/produtos', async (req, res) => {
    try {
        const lista = await produtos.find().toArray();
        res.json(lista);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar produtos', detalhe: erro.message });
    }
});

// 3. Buscar um produto pelo ID (GET /produtos/:id)
app.get('/produtos/:id', async (req, res) => {
    try {
        const resultado = await produtos.findOne({
            _id: new ObjectId(req.params.id)
        });
        if (!resultado) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.json(resultado);
    } catch (erro) {
        res.status(400).json({ erro: 'ID inválido ou erro na busca', detalhe: erro.message });
    }
});

// 4. Atualizar um produto (PUT /produtos/:id)
app.put('/produtos/:id', async (req, res) => {
    try {
        const { _id, ...dadosParaAtualizar } = req.body;
        const resultado = await produtos.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: dadosParaAtualizar }
        );
        res.json(resultado);
    } catch (erro) {
        res.status(400).json({ erro: 'Erro ao atualizar produto', detalhe: erro.message });
    }
});

// 5. Apagar um produto (DELETE /produtos/:id)
app.delete('/produtos/:id', async (req, res) => {
    try {
        const resultado = await produtos.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.json(resultado);
    } catch (erro) {
        res.status(400).json({ erro: 'Erro ao deletar produto', detalhe: erro.message });
    }
});

// Porta onde o servidor vai rodar
const PORT = process.env.PORT || 3000;

// Conectando ao banco e ligando o servidor
client.connect()
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!');
        app.listen(PORT, () => {
            console.log(`API rodando na porta ${PORT}`);
        });
    })
    .catch((erro) => {
        console.error('Erro ao conectar ao MongoDB:', erro.message);
    });
