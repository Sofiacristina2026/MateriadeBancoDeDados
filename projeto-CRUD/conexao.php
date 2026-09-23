<?php

$host = "Seu IP aqui";
$usuario = "Seu usuraio aqui";
$senha = "Sua senha aqui";
$banco = "lojasegundao";

$PDO = new PDO(
    "pgsql:host=$host;port=5432;dbname=$banco",
    $usuario,
    $senha
);


