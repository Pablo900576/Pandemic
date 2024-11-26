<?php

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Content-Type: aplication/json');


$json= file_get_contents('php://input');

$usuario=json_decode($json);
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'pandemic';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo  json_encode(["status" => "error", "message" => "Error al conectar con la base de datos: " . $conn->connect_error]);
    
}

$insertarUsuario = ("INSERT INTO usuarios (email, nombre, password, apellido) values ('$usuario->email','$usuario->nombre','$usuario->password','$usuario->apellido')");

$conn->query($insertarUsuario);
?>