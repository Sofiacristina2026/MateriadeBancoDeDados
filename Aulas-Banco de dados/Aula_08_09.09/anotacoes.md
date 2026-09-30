<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesquisa de Satisfação</title>
</head>
<body>

    <h1>Pesquisa de Satisfação</h1>

    <form action="">

        <label for="nome">
            Nome:
        </label>
        <br>
        <input type="text"
        id="nome"
        name="nome"
        required
        placeholder="Digite seu nome">
        <br><br>

        <label for="email">
            E-mail:
        </label>
        <br>
        <input type="email"
        id="email"
        name="email"
        required
        placeholder="Digite seu e-mail">
        <br><br>

        <label for="telefone">
            Telefone:
        </label>
        <br>
        <input type="tel"
        id="telefone"
        name="telefone"
        required
        placeholder="(00) 00000-0000">
        <br><br>

        <label for="unidade">
            Unidade atendida:
        </label>
        <br>

        <select id="unidade" name="unidade">
            <option value="">Selecione uma unidade</option>
            <option value="campinas">Campinas</option>
            <option value="americana">Americana</option>
            <option value="limeira">Limeira</option>
        </select>

        <br><br>

        <h3>Avaliação Geral</h3>

        <input type="radio"
        id="otimo"
        name="avaliacao"
        value="otimo">

        <label for="otimo">
            Ótimo
        </label>

        <br>

        <input type="radio"
        id="bom"
        name="avaliacao"
        value="bom">

        <label for="bom">
            Bom
        </label>

        <br>

        <input type="radio"
        id="regular"
        name="avaliacao"
        value="regular">

        <label for="regular">
            Regular
        </label>

        <br>

        <input type="radio"
        id="ruim"
        name="avaliacao"
        value="ruim">

        <label for="ruim">
            Ruim
        </label>

        <br><br>

        <h3>Serviços Utilizado




