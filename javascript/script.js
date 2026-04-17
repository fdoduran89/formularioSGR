// =====================================================
// JAVASCRIPT - VALIDACIÓN FRONTEND
// Intercepta el envío del formulario, valida campos,
// muestra errores y previene envío si no es válido.
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Obtenemos referencias a los elementos del DOM
    const formulario = document.getElementById('formulario-contacto');
    const inputs = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        asunto: document.getElementById('asunto'),
        mensaje: document.getElementById('mensaje')
    };
    
    // Referencias a los spans de error
    const errores = {
        nombre: document.getElementById('error-nombre'),
        email: document.getElementById('error-email'),
        telefono: document.getElementById('error-telefono'),
        asunto: document.getElementById('error-asunto'),
        mensaje: document.getElementById('error-mensaje')
    };

    // Mensaje de estado del backend (se limpia al validar)
    const mensajeEstado = document.getElementById('mensaje-estado');

    // Función principal de validación
    function validarFormulario() {
        let esValido = true;
        
        // Limpiar mensaje de estado previo
        mensajeEstado.className = 'mensaje-estado';
        mensajeEstado.style.display = 'none';
        mensajeEstado.textContent = '';

        // Limpiar clases de error y mensajes previos
        for (let campo in inputs) {
            inputs[campo].classList.remove('error');
            errores[campo].textContent = '';
        }

        // 1. Validar nombre (no vacío)
        const nombreValor = inputs.nombre.value.trim();
        if (nombreValor === '') {
            mostrarError('nombre', 'El nombre completo es obligatorio.');
            esValido = false;
        } else if (nombreValor.length < 3) {
            mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres.');
            esValido = false;
        }

        // 2. Validar email (formato)
        const emailValor = inputs.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValor === '') {
            mostrarError('email', 'El correo electrónico es obligatorio.');
            esValido = false;
        } else if (!emailRegex.test(emailValor)) {
            mostrarError('email', 'Ingresa un correo electrónico válido (ej: nombre@dominio.com).');
            esValido = false;
        }

        // 3. Validar teléfono (no vacío y formato básico)
        const telefonoValor = inputs.telefono.value.trim();
        if (telefonoValor === '') {
            mostrarError('telefono', 'El teléfono es obligatorio.');
            esValido = false;
        } else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(telefonoValor)) {
            mostrarError('telefono', 'Ingresa un número de teléfono válido.');
            esValido = false;
        }

        // 4. Validar asunto (select con opción)
        const asuntoValor = inputs.asunto.value;
        if (asuntoValor === '') {
            mostrarError('asunto', 'Debes seleccionar un asunto.');
            esValido = false;
        }

        // 5. Validar mensaje (no vacío, longitud mínima)
        const mensajeValor = inputs.mensaje.value.trim();
        if (mensajeValor === '') {
            mostrarError('mensaje', 'El mensaje no puede estar vacío.');
            esValido = false;
        } else if (mensajeValor.length < 10) {
            mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres.');
            esValido = false;
        }

        // Si todo es válido, mostrar en consola (opcional)
        if (esValido) {
            console.log('Validación frontend exitosa. Datos listos para enviar:', {
                nombre: nombreValor,
                email: emailValor,
                telefono: telefonoValor,
                asunto: asuntoValor,
                mensaje: mensajeValor
            });
        } else {
            console.warn('Validación frontend fallida. Corrige los errores.');
        }

        return esValido;
    }

    // Función auxiliar para mostrar error en un campo específico
    function mostrarError(campo, mensaje) {
        inputs[campo].classList.add('error');
        errores[campo].textContent = mensaje;
    }

    // Manejador del evento submit
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

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
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                formulario.submit(); // 🔥 envía a PHP
            }
        });
    });

});

    // (Opcional) Validación en tiempo real al perder foco
    for (let campo in inputs) {
        inputs[campo].addEventListener('blur', function() {
            // Validar solo ese campo
            const campoId = this.id;
            const valor = this.value.trim();
            let mensajeError = '';
            
            switch(campoId) {
                case 'nombre':
                    if (valor === '') mensajeError = 'El nombre es obligatorio.';
                    else if (valor.length < 3) mensajeError = 'Mínimo 3 caracteres.';
                    break;
                case 'email':
                    if (valor === '') mensajeError = 'El email es obligatorio.';
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) mensajeError = 'Email inválido.';
                    break;
                case 'telefono':
                    if (valor === '') mensajeError = 'El teléfono es obligatorio.';
                    else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(valor)) mensajeError = 'Teléfono inválido.';
                    break;
                case 'asunto':
                    if (valor === '') mensajeError = 'Selecciona un asunto.';
                    break;
                case 'mensaje':
                    if (valor === '') mensajeError = 'El mensaje es obligatorio.';
                    else if (valor.length < 10) mensajeError = 'Mínimo 10 caracteres.';
                    break;
            }
            
            if (mensajeError) {
                inputs[campoId].classList.add('error');
                errores[campoId].textContent = mensajeError;
            } else {
                inputs[campoId].classList.remove('error');
                errores[campoId].textContent = '';
            }
        });
    }
});
const params = new URLSearchParams(window.location.search);
const mensaje = document.getElementById("mensaje");

if (params.get("ok") === "1") {
    mensaje.textContent = "Mensaje enviado correctamente";
    mensaje.style.color = "green";
}

if (params.get("error") === "email") {
    mensaje.textContent = "Email inválido";
    mensaje.style.color = "red";
}

if (params.get("error") === "bd") {
    mensaje.textContent = "Error al guardar en la base de datos";
    mensaje.style.color = "red";
}