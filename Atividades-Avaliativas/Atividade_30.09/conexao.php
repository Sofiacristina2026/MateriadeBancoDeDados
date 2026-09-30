<?php

$host = "192.168.10.103";
$usuario = "postgres";
$senha = "1234";
$banco = "almoxerifado";

$pdo = new PDO(
    "pgsql:host=$host;port=5432;dbname=$banco",
    $usuario,
    $senha
);
 

