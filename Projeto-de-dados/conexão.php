<?php
$HOST = "192.168.'0.103"
$usuario ="postgres";
$senha ="1234";
$banco = "lojasofia";

$pdo = new PDO(
    "pgsql:host=$host;port=5432;dbane=$banco",
    $usuario,
    $senha
);

