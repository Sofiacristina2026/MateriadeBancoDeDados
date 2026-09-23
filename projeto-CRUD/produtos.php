<?php

header("Content-Type: application/json");

require "conexao.php";

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo == "POST") {

    $json = file_get_contents("php://input");

    $dados = json_decode($json, true);

    $sql = "INSERT INTO produtos (nome, preco) VALUES (?, ?)";

    $comando = $PDO->prepare($sql);

    $comando->execute([
        $dados["nome"],
        $dados["preco"]
    ]);

    echo json_encode(["Mensagem" => "Produto cadastrado com sucesso!"]);
}

if ($metodo == "GET") {

    $sql = "SELECT * FROM produtos ORDER BY id";

    $comando = $PDO->query($sql);

    $produtos = $comando->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($produtos);
}

if ($metodo == "PUT") {

    $json = file_get_contents("php://input");

    $dados = json_decode($json, true);

    $sql = "UPDATE produtos SET nome=?, preco=? WHERE id=?";

    $comando = $PDO->prepare($sql);

    $comando->execute([
        $dados["nome"],
        $dados["preco"],
        $dados["id"]
    ]);

    echo json_encode(["Mensagem" => "Produto Atualizado com sucesso!"]);
}

if ($metodo == "DELETE") {

    $json = file_get_contents("php://input");

    $dados = json_decode($json, true);

    $sql = "DELETE FROM produtos WHERE id=?";

    $comando = $PDO->prepare($sql);

    $comando->execute([
        $dados["id"]
    ]);

    echo json_encode(["Mensagem" => "Produto deletado com sucesso!"]);
}

