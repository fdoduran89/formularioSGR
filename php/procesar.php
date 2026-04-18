<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // SANITIZACIÓN
    $nombre = trim(htmlspecialchars($_POST['nombre']));
    $correo = trim(htmlspecialchars($_POST['correo']));
    $password = trim($_POST['password']);
    $telefono = trim(htmlspecialchars($_POST['telefono']));
    $rol = trim(htmlspecialchars($_POST['rol']));
    $estado = trim(htmlspecialchars($_POST['estado']));

        // VALIDACIÓN CAMPOS VACÍOS
        if (
        empty($nombre) ||
        empty($correo) ||
        empty($password) ||
        empty($telefono) ||
        empty($rol) ||
        empty($estado)
    ) {
        echo "<script>
            alert('Todos los campos son obligatorios');
            window.history.back();
        </script>";
        exit();
    }

        // VALIDACIÓN EMAIL
        if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo "<script>
            alert('Correo inválido');
            window.history.back();
        </script>";
        exit();
    }

        // VALIDACIÓN PASSWORD (REGEX)
        if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/", $password)) {
        echo "<script>
            alert('Contraseña inválida: mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 símbolo');
            window.history.back();
        </script>";
        exit();
    }

        // HASH DE CONTRASEÑA (SEGURIDAD)
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        // INSERT SEGURIDAD SQL
        $stmt = $conn->prepare("
        INSERT INTO contactos (nombre, correo, password, telefono, rol, estado)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "ssssss",
        $nombre,
        $correo,
        $passwordHash,
        $telefono,
        $rol,
        $estado
    );

        // EJECUCIÓN
        if ($stmt->execute()) {

    $stmt->close();
    $conn->close();

    echo "<script>
        alert('Datos enviados correctamente');
        window.location='/formulario/index.php';
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