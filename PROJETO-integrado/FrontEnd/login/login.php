
<?php

session_start();

require "conexao.php";

// Recebe os dados do formulário
$email = trim($_POST["email"] ?? "");
$senha = $_POST["senha"] ?? "";

// Verifica se os campos foram preenchidos
if ($email === "" || $senha === "") {
    exit("Preencha o email e a senha.");
}

try {

    // Busca o usuário pelo email cadastrado
    $sql = "SELECT id, nome, email, senha_hash
            FROM usuarios
            WHERE email = :email";

    $consulta = $pdo->prepare($sql);

    $consulta->execute([
        "email" => $email
    ]);

    $usuario = $consulta->fetch(PDO::FETCH_ASSOC);

    // Confere se o usuário existe e se a senha está correta
    if (
        $usuario &&
        password_verify($senha, $usuario["senha_hash"])
    ) {

        // Cria a sessão do usuário autenticado
        session_regenerate_id(true);

        $_SESSION["usuario_id"] = $usuario["id"];
        $_SESSION["usuario_nome"] = $usuario["nome"];

        // Redireciona após confirmar o login
        header("Location: PaginaInicial.php");
        exit;

    } else {

        // Não permite avançar com dados incorretos
        http_response_code(401);

        echo "<h2>Login não realizado!</h2>";
        echo "<p>Email ou senha incorretos.</p>";
        echo '<p><a href="LoginEntrar.html">Tentar novamente</a></p>';

    }

} catch (PDOException $erro) {

    // Registra o erro no log do servidor
    error_log($erro->getMessage());

    http_response_code(500);

    echo "Ocorreu um erro ao verificar o login. Tente novamente.";

}
?>

