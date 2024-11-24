<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'prueba3';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error al realizar la conexión"]);
    exit;
}

$select_usuarios = "select * from usuarios";

$resultado = $conn->query($select_usuarios);
if ($resultado->num_rows > 0) {
    $usuarios = [];
    

    while ($row = $resultado->fetch_assoc()) {
        $usuarios[] = [
            'id' => $row['id'],
            'nombre' => $row['nombre']
        ];
    }
    

    echo json_encode(["status" => "success", "data" => $usuarios]);
} else {

    echo json_encode(["status" => "error", "message" => "No se pudo recuperar la lista de usuarios"]);
}

$conn->close();
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        table {
            width: 35%;
            margin: 20px;
            border-collapse: collapse;

        }

        th,
        td {
            border: solid 1px;
            padding: 8px;
            text-align:center;
        }
        th{
            background-color: #f2f2f2;
        }
        td{
            background: #bebfbf
        }
    </style>
    <title>Mostrar usuarios</title>
</head>

<body>
    <h1>

    </h1>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($usuarios as $usuario) {
                echo "<tr>
                        <td>".$usuario['id']."</td>
                        <td>".$usuario['nombre']."</td>
                    </tr>";
            }
            ?>
        </tbody>
    </table>

</body>

</html>
