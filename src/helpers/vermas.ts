const markAsRead = (): void => {
    const button = document.getElementById('notificationButton') as HTMLButtonElement; // Asumiendo que el botón es un elemento de tipo botón
    if (!button) {
        console.error('El botón no se encontró');
        return;
    }

    const isRead = button.getAttribute('data-read') === 'true';  // Verifica si está marcado como leído

    if (!isRead) {
        // Cambiar el estilo del botón
        button.classList.add('read');

        // Actualizar el estado a leído
        button.setAttribute('data-read', 'true');

        // Simulación de notificación leída
        alert('Has leído la notificación');

        // Aquí puedes agregar código adicional para cambiar el estado en un backend o en una base de datos
        // Ejemplo: enviar solicitud AJAX para actualizar estado en un servidor
    } else {
        alert('Ya has leído esta notificación');
    }
}

export default markAsRead