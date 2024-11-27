<?php

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Content-Type: aplication/json');


$json= file_get_contents('php://input');

$usuarioo=json_decode($json);

$email = $usuarioo->email;
$pw = $usuarioo->password;



$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'pandemic';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo  json_encode(["status" => "error", "message" => "Error al conectar con la base de datos: " . $conn->connect_error]);
    exit;
}

$comprobarUsuario = $conn->prepare("SELECT email, password FROM usuarios WHERE email = ?");

if (!$comprobarUsuario) {
    echo json_encode(["status" => "error", "message" => "Error al preparar la consulta: " . $conn->error]);
    $conn->close();
    exit;
}
$comprobarUsuario->bind_param("s", $email);

$comprobarUsuario->execute();
$resultado = $comprobarUsuario->get_result();

if ($resultado->num_rows == 1) {
    $usuario = $resultado->fetch_assoc();
    var_dump($usuario);

    if (password_verify($pw, $usuario['password'])) {
        echo json_encode(["status" => "success", "message" => "Se logueó correctamente a: $email"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
    }
} elseif ($resultado->num_rows > 1) {
    echo json_encode(["status" => "error", "message" => "Hay varios usuarios con el mismo email"]);
} else {
    echo json_encode(["status" => "error", "message" => "No se logró iniciar sesión"]);
}

$comprobarUsuario->close();
$conn->close();
?>

