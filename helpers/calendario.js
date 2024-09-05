document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendar-body');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const monthYearSpan = document.getElementById('month-year');
    
    let fechaActual = new Date(2024, 0, 1); // Enero 2024

    const obtenerNombreMes = (mes) => {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return meses[mes];
    };

    const generarCalendario = (fecha) => {
        calendarBody.innerHTML = ''; // Limpiar el calendario
        
        const mes = fecha.getMonth();
        const anio = fecha.getFullYear();
        const primerDia = new Date(anio, mes, 1);
        const ultimoDia = new Date(anio, mes + 1, 0);

        let diaActual = primerDia.getDay();
        let diasDelMes = ultimoDia.getDate();

        let fila = document.createElement('tr');
        
        for (let i = 0; i < diaActual; i++) {
            let celdaVacia = document.createElement('td');
            fila.appendChild(celdaVacia);
        }

        for (let dia = 1; dia <= diasDelMes; dia++) {
            if (diaActual === 7) {
                calendarBody.appendChild(fila);
                fila = document.createElement('tr');
                diaActual = 0;
            }

            let celdaDia = document.createElement('td');
            celdaDia.setAttribute('data-dia', dia); // Establecer el atributo data-dia
            fila.appendChild(celdaDia);
            diaActual++;
        }

        calendarBody.appendChild(fila);
    }

    const actualizarCalendario = () => {
        generarCalendario(fechaActual);
        // Actualizar el texto del mes y año
        monthYearSpan.textContent = `${obtenerNombreMes(fechaActual.getMonth())} ${fechaActual.getFullYear()}`;
    }

    prevMonthButton.addEventListener('click', () => {
        fechaActual.setMonth(fechaActual.getMonth() - 1);
        actualizarCalendario();
    });

    nextMonthButton.addEventListener('click', () => {
        fechaActual.setMonth(fechaActual.getMonth() + 1);
        actualizarCalendario();
    });

    // Inicializar el calendario con la fecha actual
    actualizarCalendario();
});