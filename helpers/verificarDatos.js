function validarFormulario() {
    let esValido = true;

    // Limpiar mensajes de error previos
    document.querySelectorAll('.error-message').forEach(function(span) {
        span.textContent = '';
    });

    // Validación del correo electrónico
    var correo = document.getElementById("correo").value;
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        document.getElementById("error-correo").textContent = "Por favor, ingrese un correo electrónico válido.";
        esValido = false;
    }

    // Validación del número de teléfono
    var telefono = document.getElementById("telefono").value;
    var regexTelefono = /^[0-9]{9,12}$/; // Acepta entre 9 y 12 dígitos
    if (!regexTelefono.test(telefono)) {
        document.getElementById("error-telefono").textContent = "Por favor, ingrese un número de teléfono válido.";
        esValido = false;
    }

    // Puedes agregar más validaciones aquí, si es necesario.

    return esValido; // Si todo es válido, permite el envío del formulario
}
