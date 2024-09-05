// Función para mostrar la notificación
function showNotification() {
    document.getElementById('notification').style.display = 'block';
}

// Función para ocultar la notificación (opcional, si quieres permitir cerrar el mensaje)
function hideNotification() {
    document.getElementById('notification').style.display = 'none';
}

// Función para ver los resultados (puedes redirigir a otra página o mostrar más contenido)
function viewResults() {
    alert('Aquí irían los resultados.');
}

// Manejar el envío del formulario
document.getElementById('evaluationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío real del formulario
    showNotification(); // Muestra la notificación
});

// Función para restablecer el formulario (opcional)
function resetForm() {
    document.getElementById('evaluationForm').reset();
}


// Función para mostrar la notificación y el overlay
function showNotification() {
    const notification = document.getElementById('notification');
    const overlay = document.getElementById('overlay');

    if (notification && overlay) {
        notification.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        console.error('No se encontró el elemento con el ID notification o overlay');
    }
}

// Función para ocultar la notificación y el overlay (opcional, si quieres permitir cerrar el mensaje)
function hideNotification() {
    const notification = document.getElementById('notification');
    const overlay = document.getElementById('overlay');

    if (notification && overlay) {
        notification.style.display = 'none';
        overlay.style.display = 'none';
    }
}

// Función para ver los resultados
function viewResults() {
    alert('Aquí irían los resultados.');
}

// Manejar el envío del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('evaluationForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío real del formulario
            showNotification(); // Muestra la notificación y el overlay
        });
    } else {
        console.error('No se encontró el formulario con el ID evaluationForm');
    }
});

// Función para restablecer el formulario (opcional)
function resetForm() {
    const form = document.getElementById('evaluationForm');
    if (form) {
        form.reset();
    }
}
