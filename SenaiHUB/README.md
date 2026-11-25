# SenaiHUB - Sistema Web com Node.js e MongoDB Atlas

Projeto integrador desenvolvido para o SENAI, conectando front-end moderno a uma API REST com banco de dados NoSQL (MongoDB Atlas).

---

## 🚀 Como Executar o Projeto (Modo Fácil)

Se você estiver no Windows, basta dar **dois cliques** no arquivo:
👉 `iniciar_sistema.bat`

Ele vai automaticamente:
1. Ligar o servidor Node.js no backend.
2. Conectar com o MongoDB na nuvem.
3. Abrir o site no seu navegador padrão.

---

## 🛠️ Como Executar Manualmente (Terminal)

### 1. Iniciar o Back-end
```bash
cd backend
npm install
npm start
```
*O servidor iniciará em `http://localhost:3000` conectado ao MongoDB.*

### 2. Abrir o Front-end
Abra os arquivos da pasta `frontend` diretamente no seu navegador:
* `PaginaInicial.html` - Página principal do SenaiHUB.
* `produtos.html` - Painel interativo do CRUD de produtos no MongoDB (Criar, Listar, Editar e Deletar).
* `cadastro.html` - Cadastro de novos usuários salvo no banco com senha criptografada (bcrypt).
* `LoginEntrar.html` - Tela de login com autenticação no MongoDB.

---

## 📡 Rotas da API (Back-end)

### Usuários:
* `POST /usuarios/cadastro`: Cadastra novo usuário (criptografa a senha com bcrypt).
* `POST /usuarios/login`: Valida email e senha e autentica o usuário.
* `GET /usuarios`: Lista todos os usuários cadastrados.

### Produtos (CRUD MongoDB):
* `POST /produtos`: Cria um novo produto (Create).
* `GET /produtos`: Lista todos os produtos (Read).
* `GET /produtos/:id`: Busca um produto específico por ID (Read).
* `PUT /produtos/:id`: Atualiza um produto por ID (Update).
* `DELETE /produtos/:id`: Apaga um produto por ID (Delete).

---

## 📂 Estrutura de Pastas

```
SenaiHUB/
├── backend/
│   ├── .env               # Variáveis de ambiente (MONGO_URI)
│   ├── index.js           # API Express + MongoDB CRUD
│   ├── package.json       # Dependências (express, mongodb, cors, dotenv, bcrypt)
│   └── node_modules/
├── frontend/
│   ├── script.js          # Conexão Front-end <-> Back-end (fetch API)
│   ├── PaginaInicial.html # Página inicial com atalhos e status do usuário
│   ├── produtos.html      # Tela interativa do CRUD de produtos
│   ├── cadastro.html      # Formulário de cadastro com validações
│   ├── LoginEntrar.html   # Formulário de login
│   ├── style.css          # Folha de estilo
│   └── fotos/             # Imagens e logos do projeto
├── iniciar_sistema.bat    # Executável para ligar tudo com 1 clique
└── README.md              # Documentação do projeto
```
