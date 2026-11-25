// ==============================================================
// SENAIHUB - script.js
// ==============================================================
// Este script faz a conexão entre as páginas HTML (Front-end)
// e a API do Node.js com o banco de dados MongoDB (Back-end).

// Endereço da API do seu Back-end
const API_URL = 'http://localhost:3000';

// Função para traduzir erros em mensagens amigáveis
function formatarMensagemErro(erro) {
    if (!erro) return 'Ocorreu um erro inesperado.';
    const msg = (typeof erro === 'object' && erro.message) ? erro.message : String(erro);
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Load failed')) {
        return 'Não foi possível conectar ao servidor. O back-end (Node.js) está ligado? Inicie com "npm start" no terminal ou dê dois cliques no arquivo "iniciar_sistema.bat".';
    }
    return msg;
}

// ==============================================================
// 1. MÓDULO DE USUÁRIOS (CADASTRO E LOGIN)
// ==============================================================

// Cadastrar novo usuário no MongoDB
async function cadastrarUsuario(dados) {
    try {
        const resposta = await fetch(`${API_URL}/usuarios/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || 'Falha ao cadastrar usuário');
        }

        return { sucesso: true, dados: resultado };
    } catch (erro) {
        return { sucesso: false, erro: formatarMensagemErro(erro) };
    }
}

// Fazer login de usuário conferindo no MongoDB
async function fazerLogin(email, senha) {
    try {
        const resposta = await fetch(`${API_URL}/usuarios/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || 'Falha ao realizar login');
        }

        // Guarda o usuário logado no navegador para lembrar dele
        localStorage.setItem('senaihub_usuario', JSON.stringify(resultado.usuario));

        return { sucesso: true, dados: resultado };
    } catch (erro) {
        return { sucesso: false, erro: formatarMensagemErro(erro) };
    }
}

// Pegar os dados do usuário atualmente logado
function obterUsuarioLogado() {
    const dados = localStorage.getItem('senaihub_usuario');
    return dados ? JSON.parse(dados) : null;
}

// Deslogar o usuário
function fazerLogout() {
    localStorage.removeItem('senaihub_usuario');
    window.location.href = 'LoginEntrar.html';
}

// ==============================================================
// 2. MÓDULO CRUD DE PRODUTOS (CONFORME INDEX.JS)
// ==============================================================

// Criar Produto (POST /produtos)
async function criarProduto(dadosDoProduto) {
    try {
        const resposta = await fetch(`${API_URL}/produtos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosDoProduto)
        });

        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao cadastrar produto');
        return resultado;
    } catch (erro) {
        console.error('Erro em criarProduto:', erro);
        throw erro;
    }
}

// Listar todos os Produtos (GET /produtos)
async function listarProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/produtos`);
        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao buscar produtos');
        return resultado;
    } catch (erro) {
        console.error('Erro em listarProdutos:', erro);
        throw erro;
    }
}

// Buscar Produto por ID (GET /produtos/:id)
async function buscarProdutoPorId(id) {
    try {
        const resposta = await fetch(`${API_URL}/produtos/${id}`);
        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error(resultado.erro || 'Produto não encontrado');
        return resultado;
    } catch (erro) {
        console.error('Erro em buscarProdutoPorId:', erro);
        throw erro;
    }
}

// Atualizar Produto (PUT /produtos/:id)
async function atualizarProduto(id, novosDados) {
    try {
        const resposta = await fetch(`${API_URL}/produtos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novosDados)
        });

        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao atualizar produto');
        return resultado;
    } catch (erro) {
        console.error('Erro em atualizarProduto:', erro);
        throw erro;
    }
}

// Deletar Produto (DELETE /produtos/:id)
async function deletarProduto(id) {
    try {
        const resposta = await fetch(`${API_URL}/produtos/${id}`, {
            method: 'DELETE'
        });

        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao deletar produto');
        return resultado;
    } catch (erro) {
        console.error('Erro em deletarProduto:', erro);
        throw erro;
    }
}

// ==============================================================
// 3. INTEGRAÇÃO AUTOMÁTICA COM AS PÁGINAS DO PROJETO
// ==============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------
    // A) SE ESTIVER NA PÁGINA DE CADASTRO (cadastro.html)
    // ----------------------------------------------------------
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const campoNome = document.getElementById('nome');
            const campoEmail = document.getElementById('email');
            const campoIdade = document.getElementById('idade');
            const campoTelefone = document.getElementById('telefone');
            const campoSenha = document.getElementById('senha');
            const mensagem = document.getElementById('mensagem');

            // Pega o valor da senha
            const valorSenha = campoSenha.value;

            if (!valorSenha || valorSenha.length < 3) {
                if (mensagem) {
                    mensagem.textContent = 'Digite uma senha com pelo menos 3 caracteres!';
                    mensagem.style.color = '#ffdddd';
                }
                return;
            }

            const dadosUsuario = {
                nome: campoNome.value,
                email: campoEmail.value,
                idade: campoIdade ? campoIdade.value : null,
                telefone: campoTelefone ? campoTelefone.value : '',
                senha: campoSenha.value
            };

            if (mensagem) {
                mensagem.textContent = 'Salvando no banco de dados MongoDB... aguarde.';
                mensagem.style.color = '#ffffff';
            }

            const resposta = await cadastrarUsuario(dadosUsuario);

            if (resposta.sucesso) {
                if (mensagem) {
                    mensagem.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';
                    mensagem.style.color = '#90ee90';
                }
                setTimeout(() => {
                    window.location.href = 'LoginEntrar.html';
                }, 1500);
            } else {
                if (mensagem) {
                    mensagem.textContent = 'Erro: ' + resposta.erro;
                    mensagem.style.color = '#ffdddd';
                }
            }
        });
    }

    // ----------------------------------------------------------
    // B) SE ESTIVER NA PÁGINA DE LOGIN (LoginEntrar.html)
    // ----------------------------------------------------------
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const mensagem = document.getElementById('mensagemLogin');

            if (mensagem) {
                mensagem.textContent = 'Conectando ao banco...';
                mensagem.style.color = '#ffffff';
            }

            const resposta = await fazerLogin(email, senha);

            if (resposta.sucesso) {
                if (mensagem) {
                    mensagem.textContent = 'Login aprovado! Entrando...';
                    mensagem.style.color = '#90ee90';
                }
                setTimeout(() => {
                    window.location.href = 'PaginaInicial.html';
                }, 1000);
            } else {
                if (mensagem) {
                    mensagem.textContent = 'Erro: ' + resposta.erro;
                    mensagem.style.color = '#ffdddd';
                }
            }
        });
    }

    // ----------------------------------------------------------
    // C) SE ESTIVER NA PÁGINA INICIAL (PaginaInicial.html)
    // ----------------------------------------------------------
    const usuarioLogado = obterUsuarioLogado();
    const infoUsuario = document.getElementById('infoUsuario');
    if (infoUsuario) {
        if (usuarioLogado) {
            infoUsuario.innerHTML = `Olá, <strong>${usuarioLogado.nome}</strong>! <button id="btnSair" style="margin-left:10px; padding:4px 10px; border:none; border-radius:5px; background:white; color:#e21a3b; font-weight:bold; cursor:pointer;">Sair</button>`;
            const btnSair = document.getElementById('btnSair');
            if (btnSair) {
                btnSair.addEventListener('click', fazerLogout);
            }
        } else {
            infoUsuario.innerHTML = `<a href="LoginEntrar.html" style="color:white; text-decoration:none; font-weight:bold; background:rgba(0,0,0,0.2); padding:5px 10px; border-radius:5px; margin-right:5px;">Entrar</a> <a href="cadastro.html" style="color:#e21a3b; text-decoration:none; font-weight:bold; background:white; padding:5px 10px; border-radius:5px;">Cadastrar</a>`;
        }
    }

    // ----------------------------------------------------------
    // D) SE ESTIVER NA PÁGINA DE GERENCIAR PRODUTOS (produtos.html)
    // ----------------------------------------------------------
    const tabelaProdutos = document.getElementById('tabelaProdutosCorpo');
    const formProduto = document.getElementById('formProduto');

    if (tabelaProdutos) {
        carregarTabelaProdutos();
    }

    if (formProduto) {
        formProduto.addEventListener('submit', async (e) => {
            e.preventDefault();

            const id = document.getElementById('produtoId').value;
            const nome = document.getElementById('produtoNome').value;
            const preco = parseFloat(document.getElementById('produtoPreco').value);
            const descricao = document.getElementById('produtoDescricao').value;

            const dados = { nome, preco, descricao };

            try {
                if (id) {
                    // Atualizar produto existente (PUT)
                    await atualizarProduto(id, dados);
                    alert('Produto atualizado com sucesso no MongoDB!');
                } else {
                    // Criar novo produto (POST)
                    await criarProduto(dados);
                    alert('Produto cadastrado com sucesso no MongoDB!');
                }

                formProduto.reset();
                document.getElementById('produtoId').value = '';
                const btnSubmit = document.getElementById('btnSalvarProduto');
                if (btnSubmit) btnSubmit.textContent = 'Cadastrar Produto';
                carregarTabelaProdutos();
            } catch (erro) {
                alert('Erro ao salvar produto: ' + erro.message);
            }
        });
    }
});

// Função para recarregar a lista de produtos na tabela
async function carregarTabelaProdutos() {
    const tabela = document.getElementById('tabelaProdutosCorpo');
    if (!tabela) return;

    tabela.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:15px;">Carregando produtos do MongoDB...</td></tr>';

    try {
        const lista = await listarProdutos();

        if (lista.length === 0) {
            tabela.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:15px;">Nenhum produto cadastrado ainda no MongoDB.</td></tr>';
            return;
        }

        tabela.innerHTML = '';
        lista.forEach(prod => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="padding:10px; border-bottom:1px solid #ddd;"><strong>${prod.nome || '-'}</strong></td>
                <td style="padding:10px; border-bottom:1px solid #ddd;">R$ ${Number(prod.preco || 0).toFixed(2)}</td>
                <td style="padding:10px; border-bottom:1px solid #ddd;">${prod.descricao || '-'}</td>
                <td style="padding:10px; border-bottom:1px solid #ddd; text-align:center;">
                    <button onclick="prepararEdicaoProduto('${prod._id}', '${escapeHtml(prod.nome || '')}', ${prod.preco || 0}, '${escapeHtml(prod.descricao || '')}')" style="background:#2563eb; color:white; border:none; padding:6px 12px; border-radius:5px; cursor:pointer; margin-right:5px;">Editar</button>
                    <button onclick="confirmarExclusaoProduto('${prod._id}')" style="background:#dc2626; color:white; border:none; padding:6px 12px; border-radius:5px; cursor:pointer;">Excluir</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    } catch (erro) {
        const msg = formatarMensagemErro(erro);
        tabela.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:15px; color:#c8102e; font-weight:bold;">${msg}</td></tr>`;
    }
}

// Preparar os dados no formulário para edição
function prepararEdicaoProduto(id, nome, preco, descricao) {
    document.getElementById('produtoId').value = id;
    document.getElementById('produtoNome').value = nome;
    document.getElementById('produtoPreco').value = preco;
    document.getElementById('produtoDescricao').value = descricao;

    const btnSubmit = document.getElementById('btnSalvarProduto');
    if (btnSubmit) btnSubmit.textContent = 'Salvar Alterações';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Confirmar e excluir produto
async function confirmarExclusaoProduto(id) {
    if (confirm('Tem certeza que deseja apagar este produto do MongoDB?')) {
        try {
            await deletarProduto(id);
            alert('Produto apagado com sucesso!');
            carregarTabelaProdutos();
        } catch (erro) {
            alert('Erro ao apagar: ' + erro.message);
        }
    }
}

// Função auxiliar para evitar problemas com aspas no HTML
function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
