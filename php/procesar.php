<?php
session_start();
include("conexion.php");

//Evita que alguien acceda directamente a: procesar.php
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
        $_SESSION['error'] = "Todos los campos son obligatorios";
        header("Location: ../index.php");
        exit();
    }

    // VALIDACIÓN correo
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['error'] = "Correo inválido";
        header("Location: index.php");
        exit();
    }

    // VALIDACIÓN PASSWORD (REGEX)
if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/", $password)) {
    $_SESSION['error'] = "Contraseña inválida (mínimo 8 caracteres, mayúscula, minúscula y símbolo)";
    header("Location: ../index.php");
    exit();
}

    // HASH DE CONTRASEÑA (SEGURIDAD)
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // VALIDAR SI EL CORREO YA EXISTE
    $check = $conn->prepare("SELECT id FROM usuarios WHERE correo = ?");
    $check->bind_param("s", $correo);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
    $_SESSION['warning'] = "Este correo ya está registrado";

    $check->close();
    header("Location: ../index.php");
    exit();
    }

    $check->close();

    // INSERT SEGURIDAD SQL
    $stmt = $conn->prepare("
        INSERT INTO usuarios (nombre, correo, password, telefono, rol, estado)
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
        $_SESSION['success'] = "Usuario creado correctamente";
    } else {
        $_SESSION['error'] = "Error al guardar en la base de datos";
    }

    $stmt->close();
    $conn->close();

    header("Location: ../index.php");
    exit();
}
?>