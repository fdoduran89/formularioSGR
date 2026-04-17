<?php
/*
Archivo: procesar.php
Descripción: Recibe los datos del formulario, los valida y los inserta en la base de datos.
*/

// Incluir conexión
include("conexion.php");

// Verificar si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitización de datos
    $nombre = trim(htmlspecialchars($_POST['nombre']));
    $correo = trim(htmlspecialchars($_POST['correo']));
    $telefono = trim(htmlspecialchars($_POST['telefono']));
    $asunto = trim(htmlspecialchars($_POST['asunto']));
    $mensaje = trim(htmlspecialchars($_POST['mensaje']));

    // Validaciones
    if (
        empty($nombre) ||
        empty($correo) ||
        empty($telefono) ||
        empty($asunto) ||
        empty($mensaje)
    ) {
        echo "<script>
            alert('Todos los campos son obligatorios');
            window.history.back();
        </script>";
        exit();
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo "<script>
            alert('Correo inválido');
            window.history.back();
        </script>";
        exit();
    }

    // Preparar consulta (previene inyección SQL)
    $stmt = $conn->prepare("INSERT INTO contactos (nombre, correo, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)");

    // Vincular parámetros
    $stmt->bind_param("sssss", $nombre, $correo, $telefono, $asunto, $mensaje);

    // Ejecutar
if ($stmt->execute()) {

    $stmt->close();
    $conn->close();

    echo "<script>
        alert('Datos enviados correctamente');
        window.location='/formulario/index.html';
    </script>";
    exit();

} else {

    $stmt->close();
    $conn->close();

    echo "<script>
        alert('Error al guardar en la base de datos');
        window.location='/formulario/index.html';
    </script>";
    exit();
}
}