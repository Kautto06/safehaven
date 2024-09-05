const buttons = document.querySelectorAll('.notification-button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Cambiamos el estado de la notificación a "Leído"
        const notificationCard = this.closest('.notification-card');
        const status = notificationCard.querySelector('.notification-status');
        status.textContent = 'Leído';
        status.classList.add('read'); // Cambia el color del texto

        // Opcional: Cambia el estilo de la tarjeta o deshabilita el botón si lo prefieres
        this.disabled = true;
        this.style.backgroundColor = '#ccc'; // Cambia el color del botón
    });
});