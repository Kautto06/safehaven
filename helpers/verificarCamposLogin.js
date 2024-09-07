function mostrarMensaje(titulo, mensaje, botonTexto) {
    const modal = document.getElementById("mensaje");
    const modalBody = document.getElementById("modal-body-text");
    const modalButton = document.getElementById("modal-button");
    
    modalBody.innerHTML = `<strong>${titulo}</strong><br>${mensaje}`;
    modalButton.textContent = botonTexto;
    modalButton.onclick = () => {
        // Cerrar el modal y limpiar los campos del formulario
        modal.style.display = "none";
        document.getElementById("loginForm").reset(); // Limpiar los campos del formulario
    };
    
    document.getElementById("modal-close").onclick = () => {
        modal.style.display = "none";
        document.getElementById("loginForm").reset(); // Limpiar los campos del formulario
    };
    
    modal.style.display = "block";
}

function iniciarSesion(event) {
    event.preventDefault(); // Evita el envío del formulario para manejar el login con JavaScript

    const correo = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (usuario) {
        // Mostrar mensaje de éxito
        mostrarMensaje("Éxito", "Inicio de sesión exitoso.", "Ir al Inicio", "home");
    } else {
        // Mostrar mensaje de error
        mostrarMensaje("Error", "Correo electrónico o contraseña incorrectos. Por favor, inténtelo de nuevo.", "Cerrar");
    }
}

function togglePassword() {
    const togglePasswordElements = document.querySelectorAll('.toggle-password');

    togglePasswordElements.forEach(togglePassword => {
        togglePassword.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordField = document.getElementById(targetId);

            if (passwordField) {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    this.querySelector('i').classList.remove('fa-eye');
                    this.querySelector('i').classList.add('fa-eye-slash');
                } else {
                    passwordField.type = 'password';
                    this.querySelector('i').classList.remove('fa-eye-slash');
                    this.querySelector('i').classList.add('fa-eye');
                }
            }
        });
    });
}

function mostrarUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log('Usuarios registrados:', usuarios);
}

// Maneja la inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Agrega el evento submit al formulario

    
    document.getElementById("loginForm").addEventListener('submit', iniciarSesion);
    togglePassword();
    mostrarUsuarios();

    // Inicializa el toggle de la contraseña
    
});
