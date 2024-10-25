import React, { useState, useEffect } from 'react';
import { IonDatetime, IonButton, IonIcon, IonPage, IonContent, IonItem, IonInput } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/Calendario.css'

const CalendarComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Fecha actual
  const [calendarDays, setCalendarDays] = useState<Date[]>([]); // Días visibles en el calendario

  // Función para obtener los días del mes con los días antes y después para rellenar semanas completas
  const generateCalendarDays = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysArray: Date[] = [];

    // Obtener el día de la semana del primer día del mes (0 = Domingo, 6 = Sábado)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Añadir los días del mes anterior para rellenar la primera semana
    for (let i = firstDayOfWeek; i > 0; i--) {
      const prevDay = new Date(year, month, 1);
      prevDay.setDate(prevDay.getDate() - i);
      daysArray.push(prevDay);
    }

    // Añadir los días del mes actual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      daysArray.push(new Date(year, month, day));
    }

    // Añadir los días del próximo mes para rellenar la última semana
    const lastDayOfWeek = lastDayOfMonth.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      const nextDay = new Date(year, month + 1, i);
      daysArray.push(nextDay);
    }

    setCalendarDays(daysArray);
  };

  // Cambiar mes hacia adelante o atrás
  const changeMonth = (direction: string) => {
    const newDate = new Date(currentDate);
    if (direction === 'next') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  useEffect(() => {
    generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  // Función para resaltar días
  const getDayStyle = (date: Date, isCurrentMonth: boolean) => {
    const day = date.getUTCDate();

    // Si el día no pertenece al mes actual, usar un color gris
    if (!isCurrentMonth) {
      return {
        color: '#999', // Texto gris
        backgroundColor: '#f0f0f0', // Fondo gris claro
      };
    }

    // Resaltado de días que pertenecen al mes actual
    if (day % 5 === 0) {
      return {
        color: '#800080',
        backgroundColor: '#ffc0cb',
      };
    }
    if (day % 3 === 0) {
      return {
        color: 'var(--ion-color-secondary-contrast)',
        backgroundColor: 'var(--ion-color-secondary)',
      };
    }
    return {};
  };

  return (
    <IonPage>
      <Header />
      
      <IonContent className='calendar-page-body'>
        <h2 className="event-title">Eventos Importantes</h2>

        {/* Barra de búsqueda */}
        <div className="search-event">
          <input  className='search-event-input' placeholder="Buscar un evento"></input>
          <IonButton className='search-event-button'>🔍</IonButton>
        </div>
        
        <div className="calendar-controls">
          <IonButton className='calendar-controls-button ' onClick={() => changeMonth('prev')}>
            <IonIcon icon={arrowBack} />
            Mes Anterior
          </IonButton>
          <span id="month-year">
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </span>
          <IonButton className='calendar-controls-button ' onClick={() => changeMonth('next')}>
            Mes Siguiente
            <IonIcon icon={arrowForward} />
          </IonButton>
        </div>

        {/* Tabla del calendario */}
        <div className="calendar-container">
          <table className="calendar">
            <thead>
              <tr>
                <th>Domingo</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
              </tr>
            </thead>
            <tbody id="calendar-body">
              {/* Aquí dividimos los días en filas de semanas */}
              {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
                    // Determinar si el día pertenece al mes actual
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    return (
                      <td key={dayIndex} style={getDayStyle(day, isCurrentMonth)}>
                        {day.getDate()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <IonButton className="save-event-btn">Guardar Evento</IonButton>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default CalendarComponent;
