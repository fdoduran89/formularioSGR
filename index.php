<?php session_start(); ?>
<!doctype html>
<html lang="es-ES">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Formulario de Contacto</title>
  <!-- Vinculación de la hoja de estilos CSS -->
  <link rel="stylesheet" href="css/style.css" />
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body>
  <!-- Contenedor principal centrado -->
  <div class="container">
    <h1>Registrar Usuarios</h1>
    <img src="./img/Logo_SmartGridRoom.png" alt="Logo SmartGridRoom" class="logo" />
    <!--<p class="descripcion">Completa el formulario y te responderemos a la brevedad.</p>
    
            FORMULARIO 
            - Se usa POST para enviar datos sensibles.
            - La acción apunta a "procesar.php".
            - El evento 'submit' será interceptado por JavaScript para validación previa.
        -->
    <form id="formulario-contacto" method="POST" action="./php/procesar.php">
      <!-- Campo: Nombre completo -->
      <div class="campo">
        <label for="nombre">Nombre completo *</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ej: Ana García" required />
        <span class="error-message" id="error-nombre"></span>
      </div>

      <!-- Campo: Correo electrónico -->
      <div class="campo">
        <label for="correo">Correo electrónico *</label>
        <input type="email" id="correo" name="correo" placeholder="ana@correo.com" required />
        <span class="error-message" id="error-correo"></span>
      </div>

      <!-- Campo: Contraseña -->
      <div class="campo">
        <label for="password">Contraseña *</label>
        <input type="password" id="password" name="password" placeholder="Ej 345%Este&.*" required />
        <span class="error-message" id="error-password"></span>
      </div>

      <!-- Campo: Teléfono -->
      <div class="campo">
        <label for="telefono">Teléfono *</label>
        <input type="tel" id="telefono" name="telefono" placeholder="+57 312 345 678" required />
        <span class="error-message" id="error-telefono"></span>
      </div>

      <!-- Campo: Rol (select para opciones predefinidas) -->
      <div class="campo">
        <label for="rol">Rol *</label>
        <select id="rol" name="rol" required>
          <option value="" disabled selected>-- Selecciona el rol --</option>
          <option value="administrador">Administrador</option>
          <option value="operador">Operador</option>
        </select>
        <span class="error-message" id="error-rol"></span>
      </div>

      <!-- Campo: Esto (select para indicar activo o desactivo) -->
      <div class="campo">
        <label for="estado">Estado del usuario *</label>
        <select id="estado" name="estado" required>
          <option value="" disabled selected>
            -- Selecciona el estado del usuario --
          </option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <span class="error-message" id="error-estado"></span>
      </div>

      <!-- Botón de envío -->
      <button type="submit" class="btn-enviar">Crear Usuario</button>

    </form>
  </div>


  <!-- SWEETALERT PHP MESSAGES -->

  <?php if (isset($_SESSION['success'])): ?>
    <script>
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: "<?= $_SESSION['success']; ?>"
      });
    </script>
  <?php unset($_SESSION['success']);
  endif; ?>

  <?php if (isset($_SESSION['error'])): ?>
    <script>
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "<?= $_SESSION['error']; ?>"
      });
    </script>
  <?php unset($_SESSION['error']);
  endif; ?>

  <?php if (isset($_SESSION['warning'])): ?>
    <script>
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: "<?= $_SESSION['warning']; ?>"
      });
    </script>
  <?php unset($_SESSION['warning']);
  endif; ?>

  <script src="./javascript/script.js"></script>
</body>

</html>