# SenaiHUB - Sistema Web com Node.js e MongoDB Atlas

## Sobre o projeto

O SenaiHUB é um projeto integrador desenvolvido durante o curso de Tecnologia da Informação do SENAI.

A ideia surgiu com o objetivo de criar um site que ajudasse os alunos a organizarem melhor sua rotina escolar, reunindo informações importantes em um só lugar.

O projeto foi desenvolvido utilizando HTML, CSS e JavaScript na parte visual, além de Node.js e MongoDB Atlas para a parte do servidor e armazenamento dos dados.

Durante o desenvolvimento, pude aprender mais sobre como funciona a comunicação entre o front-end, o back-end e o banco de dados, além de conhecer novas ferramentas e colocar em prática alguns conteúdos estudados durante as aulas.

## Objetivos do projeto

O principal objetivo do SenaiHUB é facilitar a organização dos alunos, oferecendo algumas ferramentas para ajudar no dia a dia escolar.

Entre as funcionalidades desenvolvidas estão:

- Página inicial com informações e ferramentas de organização.
- Calendário escolar de 2026.
- Planejamento diário para organizar horários e atividades.
- Área para adicionar eventos e recados.
- Cadastro de novos usuários.
- Login com verificação de email e senha.
- Gerenciamento de produtos utilizando o CRUD do MongoDB.

## Tecnologias utilizadas

Durante a criação do projeto, utilizei as seguintes tecnologias:

### HTML

Utilizado para criar a estrutura das páginas, como cadastro, login, página inicial e gerenciamento de produtos.

### CSS

Utilizado para personalizar o site, organizando cores, fontes, tamanhos, imagens de fundo e outros detalhes visuais.

### JavaScript

Utilizado para fazer as funcionalidades das páginas funcionarem, como formulários, cadastro, login e comunicação com o servidor.

### Node.js

Utilizado para executar o JavaScript no servidor e permitir a comunicação entre o site e o banco de dados.

### Express

Utilizado para criar e organizar as rotas da API, recebendo as informações enviadas pelo front-end.

### MongoDB Atlas

Banco de dados utilizado para armazenar as informações dos usuários e dos produtos cadastrados.

### bcrypt

Utilizado para criptografar as senhas dos usuários antes de armazená-las no banco de dados.

## Estrutura de pastas

Organizei os arquivos do projeto em pastas para separar a parte visual da parte responsável pelo funcionamento do sistema.

```text
SenaiHUB/
│
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── fotos/
│   ├── cadastro.html
│   ├── LoginEntrar.html
│   ├── PaginaInicial.html
│   ├── produtos.html
│   ├── script.js
│   └── style.css
│
├── .env
├── index.js
├── iniciar_sistema.bat
├── package.json
└── README.md
```

### Para que serve cada arquivo?

- **backend:** pasta que contém os arquivos responsáveis pelo servidor e pela conexão com o MongoDB.
- **frontend:** pasta onde ficam as páginas e os arquivos responsáveis pela parte visual.
- **index.js:** arquivo que contém as rotas da API, responsáveis pelo cadastro, login e gerenciamento de produtos.
- **script.js:** faz a comunicação entre as páginas HTML e o servidor.
- **cadastro.html:** página utilizada para cadastrar novos usuários.
- **LoginEntrar.html:** página utilizada para realizar o login.
- **PaginaInicial.html:** página principal do sistema.
- **produtos.html:** página utilizada para cadastrar, consultar, editar e excluir produtos.
- **style.css:** arquivo utilizado para personalizar a aparência das páginas.
- **fotos:** pasta onde ficam armazenadas as imagens utilizadas no site.
- **iniciar_sistema.bat:** arquivo que facilita a inicialização do projeto no Windows.
- **.env:** arquivo utilizado para guardar informações de configuração e conexão com o banco de dados.
- **package.json:** contém as informações do projeto e suas dependências.

## Como executar o projeto (modo fácil)

Para facilitar a inicialização do sistema no Windows, criei um arquivo chamado `iniciar_sistema.bat`.

Basta dar dois cliques nesse arquivo para iniciar o sistema.

Ele foi criado para automatizar algumas etapas:

1. Iniciar o servidor Node.js.
2. Realizar a conexão com o MongoDB Atlas.
3. Abrir o site no navegador.

É importante que o Node.js esteja instalado e que o arquivo `.env` esteja configurado corretamente.

## Como executar manualmente pelo terminal

Caso prefira iniciar o projeto manualmente, siga os passos abaixo.

### 1. Abrir o projeto

Abra a pasta SenaiHUB no Visual Studio Code.

### 2. Entrar na pasta do backend

Abra o terminal e digite:

```bash
cd backend
```

### 3. Instalar as dependências

Execute o comando:

```bash
npm install
```

Esse comando instala as ferramentas necessárias para o funcionamento do servidor.

### 4. Iniciar o servidor

Execute:

```bash
node index.js
```

Se estiver tudo configurado corretamente, aparecerão mensagens informando que o MongoDB foi conectado e que a API está funcionando na porta 3000.

O endereço local da API é:

```text
http://localhost:3000
```

### 5. Abrir o front-end

Com o servidor ligado, abra a pasta `frontend` e execute a página `LoginEntrar.html` utilizando uma extensão como o Live Server no Visual Studio Code.

Assim, será possível acessar o site pelo navegador.

## Rotas da API (Back-end)

As rotas são os caminhos utilizados para que o front-end consiga enviar e receber informações do servidor.

No projeto, foram criadas rotas para trabalhar com usuários e produtos.

### Usuários

| Método | Rota | Função |
|---|---|---|
| POST | `/usuarios/cadastro` | Cadastra um novo usuário. |
| POST | `/usuarios/login` | Verifica o email e a senha para realizar o login. |
| GET | `/usuarios` | Lista os usuários cadastrados. |

### Produtos (CRUD MongoDB)

Para praticar o CRUD, desenvolvi algumas rotas que permitem realizar as quatro operações principais de um banco de dados.

| Método | Rota | Função |
|---|---|---|
| POST | `/produtos` | Cadastra um novo produto. |
| GET | `/produtos` | Lista todos os produtos. |
| GET | `/produtos/:id` | Busca um produto específico pelo ID. |
| PUT | `/produtos/:id` | Atualiza as informações de um produto. |
| DELETE | `/produtos/:id` | Exclui um produto pelo ID. |

### O que significa CRUD?

CRUD é uma sigla em inglês que representa quatro operações utilizadas para trabalhar com dados:

- **Create (Criar):** adicionar novas informações.
- **Read (Ler):** consultar informações que já estão salvas.
- **Update (Atualizar):** modificar informações existentes.
- **Delete (Excluir):** apagar informações do banco de dados.

No SenaiHUB, essas operações foram utilizadas na página de gerenciamento de produtos.

## Banco de dados MongoDB

O projeto utiliza o MongoDB Atlas, que permite armazenar os dados na nuvem.

Dentro do banco de dados `loja`, foram utilizadas duas coleções principais:

### Coleção usuarios

Armazena as informações dos usuários cadastrados, como:

- Nome.
- Email.
- Idade.
- Telefone.
- Senha criptografada.
- Data de criação da conta.

### Coleção produtos

Armazena as informações dos produtos cadastrados:

- Nome.
- Preço.
- Descrição.

## Segurança das informações

Uma parte importante do projeto foi o cuidado com as senhas dos usuários.

Para isso, utilizei a biblioteca `bcrypt`, que transforma a senha em um código criptografado antes de salvá-la no banco de dados.

Também utilizei o arquivo `.env` para guardar as informações de conexão com o MongoDB, evitando deixar esses dados diretamente no código.

**Importante:** o arquivo `.env` não deve ser enviado publicamente para o GitHub, pois pode conter informações privadas de acesso ao banco de dados.

## O que aprendi durante o desenvolvimento?

Desenvolver o SenaiHUB foi uma experiência importante para o meu aprendizado na área de Tecnologia da Informação.

Como ainda estou no começo dos meus estudos, precisei pesquisar bastante, testar diferentes códigos e corrigir alguns erros durante o desenvolvimento.

Consegui conhecer melhor o funcionamento do Node.js, aprender a utilizar o MongoDB Atlas e entender como acontece a comunicação entre o front-end e o back-end.

Também aprendi a importância de organizar os arquivos, criar rotas, trabalhar com formulários e utilizar o CRUD para cadastrar, consultar, editar e excluir informações.

Sei que ainda tenho muito para aprender, mas desenvolver esse projeto foi uma oportunidade de colocar em prática o que venho estudando e conhecer um pouco mais sobre o mundo da programação.

---

**Projeto desenvolvido para fins educacionais durante o curso de Tecnologia da Informação do SENAI.**