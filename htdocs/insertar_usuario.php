<?php

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Content-Type: aplication/json');


$json= file_get_contents('php://input');

$usuario=json_decode($json);


$nombre = $usuario->nombre;
$pw = $usuario->pw;
$email = $usuario->email;
$apellido=$usuario->apellido;

$hash= password_hash($pw, PASSWORD_BCRYPT);

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'pandemic';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo  json_encode(["status" => "error", "message" => "Error al conectar con la base de datos: " . $conn->connect_error]);
    
}

$insertarUsuario = $conn->prepare("INSERT INTO usuarios (email, nombre, password, apellido) values (?,?,?,?)");

if (!$insertarUsuario) {
    echo json_encode(["status" => "error", "message" => "Erorr con la consulta: " . $conn->error]);
    $conn->close();
}

$insertarUsuario-> bind_param("ssss", $email, $nombre, $hash, $apellido);

$resultado = $insertarUsuario->execute();

if ($resultado) {
    echo json_encode(["status" => "success", "message" => "Se inserto correctamente a: $usuario->email"]);
} else {
    echo json_encode(["status" => "error", "message" => "No se logro registrar al usuario: $usuario->email"]);
}

$insertarUsuario->close();
$conn->close();
?>