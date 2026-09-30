<?php

$host = "142.168.10.103";
$usuario = "postgres";
$senha = "1234";
$banco = "chamados";

$PDO = new PDO(
    "pgsql:host=$host;port=5432;dbname=$banco",
    $usuario,
    $senha
);
try {
    $pdo = new PDO(
        "pgsql:host=$host;port=$port;dbname=$dbname",
        $user,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo json_encode([
        "erro" => "Erro na conexão com o banco"
    ]);
}
?>