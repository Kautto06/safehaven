function validarFormulario() {
    let esValido = true;

    // Limpiar mensajes de error previos
    document.querySelectorAll('.error-message').forEach(function(span) {
        span.textContent = '';
    });

    // Validación del nombre
    var nombre = document.getElementById("nombre").value;
    if (nombre.trim() === '') {
        document.getElementById("error-nombre").textContent = "El nombre es obligatorio.";
        esValido = false;
    }

    // Validación de los apellidos
    var apellidos = document.getElementById("apellidos").value;
    if (apellidos.trim() === '') {
        document.getElementById("error-apellidos").textContent = "Los apellidos son obligatorios.";
        esValido = false;
    }

    // Validación del teléfono
    var telefono = document.getElementById("telefono").value;
    var regexTelefono = /^[0-9]{9,12}$/; // Acepta entre 9 y 12 dígitos
    if (!regexTelefono.test(telefono)) {
        document.getElementById("error-telefono").textContent = "Por favor, ingrese un número de teléfono válido.";
        esValido = false;
    }

    // Validación del correo electrónico
    var correo = document.getElementById("correo").value;
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        document.getElementById("error-correo").textContent = "Por favor, ingrese un correo electrónico válido.";
        esValido = false;
    }

    // Validación de la contraseña
    var contrasena = document.getElementById("password").value;
    var confirmarContrasena = document.getElementById("confirmPassword").value;
    if (contrasena.length < 6) { // Ejemplo: Contraseña debe tener al menos 6 caracteres
        document.getElementById("error-contrasena").textContent = "La contraseña debe tener al menos 6 caracteres.";
        esValido = false;
    } else if (contrasena !== confirmarContrasena) {
        document.getElementById("error-confirmar-contrasena").textContent = "Las contraseñas no coinciden.";
        esValido = false;
    }

    // Validación del género
    var genero = document.getElementById("genero").value;
    if (genero === '') {
        document.getElementById("error-genero").textContent = "Seleccione un género.";
        esValido = false;
    }

    return esValido; // Si todo es válido, permite el envío del formulario
}

document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los elementos con la clase 'toggle-password'
    const togglePasswordElements = document.querySelectorAll('.toggle-password');

    togglePasswordElements.forEach(togglePassword => {
        togglePassword.addEventListener('click', function() {
            // Obtiene el campo de contraseña asociado al clic
            const passwordField = document.querySelector(`#${this.getAttribute('data-target')}`);
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.querySelector('i').classList.remove('fa-eye');
                this.querySelector('i').classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                this.querySelector('i').classList.remove('fa-eye-slash');
                this.querySelector('i').classList.add('fa-eye');
            }
        });
    });
});

