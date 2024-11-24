
<?php

$nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
$pw = filter_input(INPUT_POST, 'pw', FILTER_SANITIZE_STRING);

$hash= password_hash($pw, PASSWORD_DEFAULT);

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'prueba3';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo  json_encode(["status" => "error", "message" => "Error al conectar con la base de datos: " . $conn->connect_error]);
    
}

$insertarUsuario = $conn->prepare("INSERT INTO usuarios (nombre, password) values (?, ?)");

if (!$insertarUsuario) {
    echo json_encode(["status" => "error", "message" => "Erorr con la consulta: " . $conn->error]);
    $conn->close();
}

$insertarUsuario->bind_param("ss", $nombre, $hash);

$resultado = $insertarUsuario->execute();

if ($resultado) {
    echo json_encode(["status" => "success", "message" => "Se insertó correctamente a: '$nombre'"]);
} else {
    echo json_encode(["status" => "error", "message" => "No se logró registrar al usuario: '$nombre'"]);
}

$insertarUsuario->close();
$conn->close();
?>