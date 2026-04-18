// =====================================================
// JAVASCRIPT - VALIDACIÓN FRONTEND
// Intercepta el envío del formulario, valida campos,
// muestra errores y previene envío si no es válido.
// =====================================================

// =====================================================
// SMARTGRIDROOM - VALIDACIÓN FRONTEND
// Este script valida el formulario antes de enviarlo al backend.
// Evita datos incorrectos y mejora la seguridad del sistema.
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  // 1. REFERENCIAS AL DOM (INPUTS DEL FORMULARIO)
  const formulario = document.getElementById("formulario-contacto");

  const inputs = {
    nombre: document.getElementById("nombre"),
    email: document.getElementById("correo"), //
    password: document.getElementById("password"),
    telefono: document.getElementById("telefono"),
    rol: document.getElementById("rol"),
    estado: document.getElementById("estado"),
  };

  // 2. REFERENCIAS A MENSAJES DE ERROR
  const errores = {
    nombre: document.getElementById("error-nombre"),
    email: document.getElementById("error-email"),
    password: document.getElementById("error-password"),
    telefono: document.getElementById("error-telefono"),
    rol: document.getElementById("error-rol"),
    estado: document.getElementById("error-estado"),
  };

  // Mensaje global del backend (éxito o error general)
  const mensajeEstado = document.getElementById("mensaje-estado");

  // 3. FUNCIÓN PRINCIPAL DE VALIDACIÓN
  function validarFormulario() {
    let esValido = true;

    // Limpiar mensaje global
    mensajeEstado.className = "mensaje-estado";
    mensajeEstado.style.display = "none";
    mensajeEstado.textContent = "";

    // Limpiar errores anteriores
    for (let campo in inputs) {
      inputs[campo].classList.remove("error");
      errores[campo].textContent = "";
    }

    // 4. VALIDACIÓN: NOMBRE
    const nombre = inputs.nombre.value.trim();
    if (nombre.length < 3) {
      mostrarError("nombre", "El nombre debe tener al menos 3 caracteres.");
      esValido = false;
    }

    // 5. VALIDACIÓN: EMAIL

    const email = inputs.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      mostrarError("email", "Correo electrónico inválido.");
      esValido = false;
    }

    // 6. VALIDACIÓN: CONTRASEÑA
    // Reglas:
    // - mínimo 8 caracteres
    // - 1 mayúscula
    // - 1 minúscula
    // - 1 carácter especial
    const password = inputs.password.value.trim();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      mostrarError(
        "password",
        "La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 carácter especial.",
      );
      esValido = false;
    }

    // 7. VALIDACIÓN: TELÉFONO
    const telefono = inputs.telefono.value.trim();

    if (!/^[\d\s\+\-\(\)]{7,20}$/.test(telefono)) {
      mostrarError("telefono", "Número de teléfono inválido.");
      esValido = false;
    }

    // 8. VALIDACIÓN: ROL
    if (inputs.rol.value === "") {
      mostrarError("rol", "Debes seleccionar un rol.");
      esValido = false;
    }

    // 9. VALIDACIÓN: ESTADO
    if (inputs.estado.value === "") {
      mostrarError("estado", "Debes seleccionar un estado.");
      esValido = false;
    }

    return esValido;
  }

  // 10. FUNCIÓN PARA MOSTRAR ERRORES
  function mostrarError(campo, mensaje) {
    inputs[campo].classList.add("error");
    errores[campo].textContent = mensaje;
  }

  // 11. EVENTO SUBMIT DEL FORMULARIO
  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // evita envío automático

    // Validar antes de enviar
    if (!validarFormulario()) {
      Swal.fire("Error", "Corrige los errores del formulario", "error");
      return;
    }

    // Confirmación de envío
    Swal.fire({
      title: "¿Enviar formulario?",
      text: "Verifica que los datos sean correctos",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        formulario.submit(); // envío real al backend (PHP)
      }
    });
  });

  // 12. VALIDACIÓN EN TIEMPO REAL (BLUR)
  for (let campo in inputs) {
    inputs[campo].addEventListener("blur", function () {
      const valor = this.value.trim();
      let mensajeError = "";

      switch (campo) {
        case "nombre":
          if (valor.length < 3) mensajeError = "Mínimo 3 caracteres.";
          break;

        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))
            mensajeError = "Correo inválido.";
          break;

        case "password":
          if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(valor))
            mensajeError = "Contraseña no cumple los requisitos.";
          break;

        case "telefono":
          if (!/^[\d\s\+\-\(\)]{7,20}$/.test(valor))
            mensajeError = "Teléfono inválido.";
          break;

        case "rol":
          if (valor === "") mensajeError = "Selecciona un rol.";
          break;

        case "estado":
          if (valor === "") mensajeError = "Selecciona un estado.";
          break;
      }

      if (mensajeError !== "") {
        mostrarError(campo, mensajeError);
      } else {
        inputs[campo].classList.remove("error");
        errores[campo].textContent = "";
      }
    });
  }
});

// 13. MENSAJES DESDE EL BACKEND (PHP)
// Se leen parámetros URL para mostrar estados del servidor

const params = new URLSearchParams(window.location.search);
const mensaje = document.getElementById("mensaje");

if (params.get("ok") === "1") {
  mensaje.textContent = "Usuario registrado correctamente";
  mensaje.style.color = "green";
}

if (params.get("error") === "email") {
  mensaje.textContent = "Email inválido";
  mensaje.style.color = "red";
}

if (params.get("error") === "password") {
  mensaje.textContent = "Contraseña inválida";
  mensaje.style.color = "red";
}

if (params.get("error") === "bd") {
  mensaje.textContent = "Error al guardar en la base de datos";
  mensaje.style.color = "red";
}
