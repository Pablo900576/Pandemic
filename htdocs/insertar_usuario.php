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
$nick= $usuario->nick;

$hash= password_hash($pw, PASSWORD_BCRYPT);


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo  json_encode(["status" => "error", "message" => "Error al conectar con la base de datos: " . $conn->connect_error]);    
}


$selectEmail= $conn->prepare("SELECT * from usuarios where email = ?");

$selectEmail-> bind_param("s", $email);

$selectEmail->execute();

$comprobarEmail = $selectEmail->get_result();

$insertarUsuario = $conn->prepare("INSERT INTO usuarios (email, nombre, password, apellido, nick) values (?,?,?,?,?)");


$insertarUsuario-> bind_param("sssss", $email, $nombre, $hash, $apellido,$nick);

if($comprobarEmail->num_rows==0){
    $resultado = $insertarUsuario->execute();

    if ($resultado) {
        echo json_encode(["status" => "success", "message" => "Se inserto correctamente a: $email"]);
    } else {
        echo json_encode(["status" => "error", "message" => "No se logro registrar al usuario: $email"]);
    }    
}else{
    echo json_encode(["status"=>"error", "message"=> "Ese email ya está registrado."]);
}





$selectEmail->close();
$insertarUsuario->close();
$conn->close();
?>