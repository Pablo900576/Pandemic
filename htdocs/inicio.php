<?php

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Content-Type: aplication/json');

$json= file_get_contents('php://input');

$usuario=json_decode($json);

$email = $usuario->email;
$pw = $usuario->pw;


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo  json_encode(["status" => "error", "message" => "Error al conectar con la base de datos: " . $conn->connect_error]);
    exit;
}

$comprobarUsuario = $conn->prepare("SELECT email, password, nombre, nick FROM usuarios WHERE email = ?");

if (!$comprobarUsuario) {
    echo json_encode(["status" => "error", "message" => "Error al preparar la consulta: " . $conn->error]);
    $conn->close();
    exit;
}
$comprobarUsuario->bind_param("s", $email);

$comprobarUsuario->execute();
$resultado = $comprobarUsuario->get_result();

if ($resultado->num_rows == 1) {
    $usuarioo = $resultado->fetch_assoc();
    $nombre= $usuarioo['nombre'];
    $nick= $usuarioo['nick'];
    $pw2= $usuarioo['password'];
    if (password_verify($pw,$pw2)) {
        
        echo json_encode(["status" => "success", "message" => "Se logueó correctamente a: $email", "nombre"=>$nombre, "nick"=>$nick, "email"=>$email]);
    } else {
        echo json_encode(["status" => "error", "message" => "Contraseña incorrecta", "nombre"=>$nombre, "nick"=>$nick, "email"=>$email]);
    }
} elseif ($resultado->num_rows > 1) {
    echo json_encode(["status" => "error", "message" => "Hay varios usuarios con el mismo email"]);
} else {
    echo json_encode(["status" => "error", "message" => "No se logró iniciar sesión"]);
}

$comprobarUsuario->close();
$conn->close();
?>

