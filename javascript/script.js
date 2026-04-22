// =====================================================
// SMARTGRIDROOM - VALIDACIÓN FRONTEND
// =====================================================

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telefonoRegex = /^[\d\s\+\-\(\)]{7,20}$/;

document.addEventListener("DOMContentLoaded", function () {
  // 1. REFERENCIAS AL DOM
  const formulario = document.getElementById("formulario-contacto");

  const inputs = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    password: document.getElementById("password"),
    telefono: document.getElementById("telefono"),
    rol: document.getElementById("rol"),
    estado: document.getElementById("estado"),
  };

  const errores = {
    nombre: document.getElementById("error-nombre"),
    correo: document.getElementById("error-correo"),
    password: document.getElementById("error-password"),
    telefono: document.getElementById("error-telefono"),
    rol: document.getElementById("error-rol"),
    estado: document.getElementById("error-estado"),
  };

  // 2. FUNCIÓN PARA MOSTRAR ERRORES
  function mostrarError(campo, mensaje) {
    inputs[campo].classList.add("error");
    errores[campo].textContent = mensaje;
  }

  // 3. VALIDACIÓN PRINCIPAL
  function validarFormulario() {
    let esValido = true;

    // Limpiar errores
    for (let campo in inputs) {
      inputs[campo].classList.remove("error");
      errores[campo].textContent = "";
    }

    // Nombre
    const nombre = inputs.nombre.value.trim();
    if (nombre.length < 3) {
      mostrarError("nombre", "El nombre debe tener al menos 3 caracteres.");
      esValido = false;
    }

    // Correo
    const correo = inputs.correo.value.trim();
    if (!correoRegex.test(correo)) {
      mostrarError("correo", "Correo electrónico inválido.");
      esValido = false;
    }

    // Password
    const password = inputs.password.value.trim();
    if (!passwordRegex.test(password)) {
      mostrarError(
        "password",
        "Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 símbolo.",
      );
      esValido = false;
    }

    // Teléfono
    const telefono = inputs.telefono.value.trim();
    if (!telefonoRegex.test(telefono)) {
      mostrarError("telefono", "Número de teléfono inválido.");
      esValido = false;
    }

    // Rol
    if (inputs.rol.value === "") {
      mostrarError("rol", "Selecciona un rol.");
      esValido = false;
    }

    // Estado
    if (inputs.estado.value === "") {
      mostrarError("estado", "Selecciona un estado.");
      esValido = false;
    }

    return esValido;
  }

  // 4. VALIDACIÓN EN TIEMPO REAL (MEJOR CON "input")
  for (let campo in inputs) {
    inputs[campo].addEventListener("input", function () {
      const valor = this.value.trim();
      let mensajeError = "";

      switch (campo) {
        case "nombre":
          if (valor.length < 3) mensajeError = "Mínimo 3 caracteres.";
          break;

        case "correo":
          if (!correoRegex.test(valor)) mensajeError = "Correo inválido.";
          break;

        case "password":
          if (!passwordRegex.test(valor))
            mensajeError = "Contraseña no válida.";
          break;

        case "telefono":
          if (!telefonoRegex.test(valor)) mensajeError = "Teléfono inválido.";
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

  // 5. EVENTO SUBMIT
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarFormulario()) {
      Swal.fire("Error", "Corrige los errores del formulario", "error");
      return;
    }

    // Confirmación antes de enviar
    Swal.fire({
      title: "¿Enviar formulario?",
      text: "Verifica que los datos sean correctos",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        formulario.submit();
      }
    });
  });
});
