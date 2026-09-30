<?php

header("Content-Type: application/json");

require "conexao.php";

$metodo = $_SERVER["REQUEST_METHOD"];

/* POST - CADASTRAR */
if ($metodo == "POST") {

    $json = file_get_contents("php://input");
    $dados = json_decode($json, true);

    if (
        empty($dados["nome"]) ||
        empty($dados["categoria"]) ||
        empty($dados["fornecedor"]) ||
        !isset($dados["quantidade"]) ||
        !isset($dados["preco_unitario"])
    ) {
        echo json_encode([
            "mensagem" => "Preencha todos os campos obrigatórios"
        ]);
        exit;
    }

    if (
        $dados["categoria"] != "eletrica" &&
        $dados["categoria"] != "mecanica" &&
        $dados["categoria"] != "hidraulica"
    ) {
        echo json_encode([
            "mensagem" => "Categoria inválida"
        ]);
        exit;
    }

    if ($dados["quantidade"] < 0) {
        echo json_encode([
            "mensagem" => "A quantidade não pode ser negativa"
        ]);
        exit;
    }

    if ($dados["preco_unitario"] <= 0) {
        echo json_encode([
            "mensagem" => "O preço deve ser maior que zero"
        ]);
        exit;
    }

    $sql = "INSERT INTO pecas
            (nome, categoria, fornecedor, quantidade, preco_unitario)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        $dados["nome"],
        $dados["categoria"],
        $dados["fornecedor"],
        $dados["quantidade"],
        $dados["preco_unitario"]
    ]);

    echo json_encode([
        "mensagem" => "Peça cadastrada com sucesso"
    ]);
}


/* GET - LISTAR */
elseif ($metodo == "GET") {

    $sql = "SELECT * FROM pecas";

    $stmt = $pdo->query($sql);

    $pecas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($pecas);
}


/* PUT - ATUALIZAR */
elseif ($metodo == "PUT") {

    $json = file_get_contents("php://input");
    $dados = json_decode($json, true);

    if (
        !isset($dados["id"]) ||
        empty($dados["nome"]) ||
        empty($dados["categoria"]) ||
        empty($dados["fornecedor"]) ||
        !isset($dados["quantidade"]) ||
        !isset($dados["preco_unitario"])
    ) {
        echo json_encode([
            "mensagem" => "Preencha todos os campos obrigatórios"
        ]);
        exit;
    }

    if (
        $dados["categoria"] != "eletrica" &&
        $dados["categoria"] != "mecanica" &&
        $dados["categoria"] != "hidraulica"
    ) {
        echo json_encode([
            "mensagem" => "Categoria inválida"
        ]);
        exit;
    }

    if ($dados["quantidade"] < 0) {
        echo json_encode([
            "mensagem" => "A quantidade não pode ser negativa"
        ]);
        exit;
    }

    if ($dados["preco_unitario"] <= 0) {
        echo json_encode([
            "mensagem" => "O preço deve ser maior que zero"
        ]);
        exit;
    }

    $sql = "UPDATE pecas
            SET nome = ?,
                categoria = ?,
                fornecedor = ?,
                quantidade = ?,
                preco_unitario = ?
            WHERE id = ?";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        $dados["nome"],
        $dados["categoria"],
        $dados["fornecedor"],
        $dados["quantidade"],
        $dados["preco_unitario"],
        $dados["id"]
    ]);

    echo json_encode([
        "mensagem" => "Peça atualizada com sucesso"
    ]);
}


/* DELETE - EXCLUIR */
elseif ($metodo == "DELETE") {

    $json = file_get_contents("php://input");
    $dados = json_decode($json, true);

    if (!isset($dados["id"])) {
        echo json_encode([
            "mensagem" => "Informe o id da peça"
        ]);
        exit;
    }

    $sql = "DELETE FROM pecas WHERE id = ?";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        $dados["id"]
    ]);

    echo json_encode([
        "mensagem" => "Peça excluída com sucesso"
    ]);
}