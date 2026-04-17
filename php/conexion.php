<?php
/*
Archivo: conexion.php
Descripción: Establece la conexión con la base de datos MariaDB en XAMPP.
*/

// Datos de conexión
$host = "localhost"; //127.0.0.1
$usuario = "root";
$password = ""; // En XAMPP por defecto está vacío
$bd = "clientes";
$puerto = 3307; //3306 si cambias el puerto

// Crear conexión
$conn = new mysqli($host, $usuario, $password, $bd, $puerto);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Opcional: mensaje de conexión exitosa (solo para pruebas)
// echo "Conexión exitosa";

?>