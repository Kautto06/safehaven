import React, { useState, useEffect } from 'react';
import { IonAlert, IonButton, IonIcon, IonPage, IonContent,IonModal } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import '../../assets/calendario/Calendario.css';
import { getEventos } from './services/evento';
import { Footer, Header } from '../../components';

interface Evento {
  ID: number;
  Titulo_Evento: string;
  Tipo: string;
  Fecha: string;
  Horario: string;
}

export const CalendarComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventosDelDia, setEventosDelDia] = useState<Evento[]>([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const data: Evento[] = await getEventos();
        setEventos(data);
        console.log(data)
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    };

    cargarEventos();
  }, []);

  useEffect(() => {
    const generateCalendarDays = (year: number, month: number) => {
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      const daysArray: Date[] = [];
      const firstDayOfWeek = firstDayOfMonth.getDay();
      for (let i = firstDayOfWeek; i > 0; i--) {
        const prevDay = new Date(year, month, 1);
        prevDay.setDate(prevDay.getDate() - i);
        daysArray.push(prevDay);
      }

      for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        daysArray.push(new Date(year, month, day));
      }

      const lastDayOfWeek = lastDayOfMonth.getDay();
      for (let i = 1; i < 7 - lastDayOfWeek; i++) {
        const nextDay = new Date(year, month + 1, i);
        daysArray.push(nextDay);
      }

      setCalendarDays(daysArray);
    };

    generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const formatFecha = (fecha: string | Date): string => {
    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return date.toISOString().split('T')[0];
  };

  const tieneEventos = (fecha: Date) => {
    const fechaFormateada = formatFecha(fecha);
    return eventos.some(evento => formatFecha(evento.Fecha) === fechaFormateada);
  };

  const abrirPopup = (fecha: Date) => {
    const fechaFormateada = formatFecha(fecha);
    const eventosDelDiaSeleccionado = eventos.filter(evento => formatFecha(evento.Fecha) === fechaFormateada);
    setEventosDelDia(eventosDelDiaSeleccionado);
    setMostrarPopup(true);
  };

  const changeMonth = (direction: string) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="calendar-page-body">
        <h2 className="event-title">Eventos Importantes</h2>
        <div className="calendar-controls">
          <IonButton className='calendar-controls-button' onClick={() => changeMonth('prev')}>
            <IonIcon icon={arrowBack} /> Mes Anterior
          </IonButton>
          <span id="month-year">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </span>
          <IonButton className='calendar-controls-button' onClick={() => changeMonth('next')}>
            Mes Siguiente <IonIcon icon={arrowForward} />
          </IonButton>
        </div>
        <div className="calendar-container">
          <table className="calendar">
            <thead>
              <tr>
                <th>Dom</th>
                <th>Lun</th>
                <th>Mar</th>
                <th>Mié</th>
                <th>Jue</th>
                <th>Vie</th>
                <th>Sáb</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    const hasEvent = tieneEventos(day);

                    return (
                      <td
                        key={dayIndex}
                        className={`calendar-day ${hasEvent ? 'event-day' : ''} ${isCurrentMonth ? '' : 'outside-month'}`}
                        onClick={() => hasEvent && abrirPopup(day)}
                      >
                        {day.getDate()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <IonModal isOpen={mostrarPopup} onDidDismiss={() => setMostrarPopup(false)}>
          <div className="modal-container">
            <h2 className="modal-title">Eventos del Día</h2>
            {eventosDelDia.length > 0 ? (
              <div className="modal-eventos-lista">
                {eventosDelDia.map(evento => (
                  <div key={evento.ID} className="modal-evento-item">
                    <h3>{evento.Titulo_Evento}</h3>
                    <p><strong>Tipo:</strong> {evento.Tipo}</p>
                    <p><strong>Horario:</strong> {evento.Horario}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="modal-no-eventos">No hay eventos para este día.</p>
            )}
            <IonButton expand="block" onClick={() => setMostrarPopup(false)}>
              Cerrar
            </IonButton>
          </div>
        </IonModal>
      </IonContent>
      <Footer />
    </IonPage>
  );
};
