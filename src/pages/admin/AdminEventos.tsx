import React, { useState, useEffect } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../assets/admin/AdminEvents.css';
import { getEventos, crearEvento, actualizarEvento, eliminarEvento, getEventoId } from './services/eventos';

interface Evento {
  ID: number;
  Titulo_Evento: string;
  Tipo: string;
  Fecha: string; // Se puede manejar como string para ser procesado más fácilmente
  Horario: string; // Se puede manejar como string para ser procesado más fácilmente
}

export const AdminEvents: React.FC = () => {
  const history = useHistory();

  const [events, setEvents] = useState<Evento[]>([]);
  const [newEvent, setNewEvent] = useState({
    Titulo_Evento: '',
    Tipo: '',
    Fecha: '',
    Horario: '' // Agregar un campo para el horario
  });
  const [editEvent, setEditEvent] = useState<Evento | null>(null);  // Cambiado para coincidir con la interfaz

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);

  useEffect(() => {
    // Cargar eventos desde la API
    const fetchEventos = async () => {
      try {
        const eventos = await getEventos();
        setEvents(eventos);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      }
    };
    fetchEventos();
  }, []);

  const handleGoBack = () => {
    window.location.href = "/admin";
  };

  const handleAddEvent = async () => {
    try {
      let newEvento = await crearEvento(newEvent);
      newEvento = await getEventoId(newEvento.eventoId)
      setEvents([...events, newEvento[0]]);
      setNewEvent({ Titulo_Evento: '', Fecha: '', Tipo: '', Horario: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error al agregar evento:', error);
    }
  };

  const handleEditEvent = (event: Evento) => {
    setEditEvent(event);  // Ahora editEvent es directamente un Evento
    setShowEditForm(true);
  };

  const handleSaveEvent = async () => {
    try {
      if (editEvent) {
        await actualizarEvento(editEvent.ID, {
          Titulo_Evento: editEvent.Titulo_Evento,
          Fecha: editEvent.Fecha,
          Tipo: editEvent.Tipo,
          Horario: editEvent.Horario,  // Asegúrate de que el horario también se pasa
        });
        setEvents(events.map(event =>
          event.ID === editEvent.ID
            ? { ...event, Titulo_Evento: editEvent.Titulo_Evento, Fecha: editEvent.Fecha, Tipo: editEvent.Tipo, Horario: editEvent.Horario }
            : event
        ));
        setEditEvent(null);
        setShowEditForm(false);
      }
    } catch (error) {
      console.error('Error al guardar evento:', error);
    }
  };

  const handleDeleteEvent = async () => {
    if (eventToDelete !== null) {
      try {
        await eliminarEvento(eventToDelete);
        setEvents(events.filter(event => event.ID !== eventToDelete));
        setEventToDelete(null);
      } catch (error) {
        console.error('Error al eliminar evento:', error);
      }
    }
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setEventToDelete(null);
    setShowDeleteConfirm(false);
  };

  return (
    <IonPage>
      <div className="events-admin-container">
        <header className="events-admin-header">
          <h1>Administración de Eventos</h1>
          <p className="events-admin-description">
            El administrador puede agregar, modificar y eliminar eventos relacionados con la prevención de violencia de género.
          </p>
        </header>

        <div className="back-button-container-admin">
          <button className="back-button-admin" onClick={handleGoBack}>
            Volver a la página principal
          </button>
        </div>

        <div className="events-admin-list">
          <h2>Eventos Disponibles</h2>
          {events.map((event) => (
            <div key={event.ID} className="events-admin-card">
              <div className="events-admin-card-header">
                <strong>{event.Titulo_Evento}</strong> - <span>{event.Fecha}</span>
              </div>
              <div className="events-admin-card-content">
                <p><strong>Tipo: </strong>{event.Tipo}</p>
              </div>
              <div className="events-admin-card-content">
                <span><strong>Horario: </strong>{event.Horario}</span> {/* Aquí mostramos el horario en una línea separada */}
              </div>
              <div className="events-admin-card-actions">
                <button onClick={() => handleEditEvent(event)} className="events-admin-button">Editar</button>
                <button onClick={() => { setEventToDelete(event.ID); setShowDeleteConfirm(true); }} className="events-admin-button danger">Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        <div className="events-admin-add-button">
          <button onClick={() => setShowAddForm(true)} className="events-admin-button">Agregar Evento</button>
        </div>

        {showAddForm && (
          <div className="events-admin-popup">
            <div className="events-admin-popup-content">
              <h3>Agregar Nuevo Evento</h3>
              <input
                type="text"
                placeholder="Título del evento"
                value={newEvent.Titulo_Evento}
                onChange={(e) => setNewEvent({ ...newEvent, Titulo_Evento: e.target.value })}
              />
              <input
                type="date"
                value={newEvent.Fecha}
                onChange={(e) => setNewEvent({ ...newEvent, Fecha: e.target.value })}
              />
              <textarea
                placeholder="Tipo del evento"
                value={newEvent.Tipo}
                onChange={(e) => setNewEvent({ ...newEvent, Tipo: e.target.value })}
              />
              <input
                type="time"
                value={newEvent.Horario}
                onChange={(e) => setNewEvent({ ...newEvent, Horario: e.target.value })}
              />
              <button onClick={handleAddEvent} className="events-admin-button success">Agregar</button>
              <button onClick={() => setShowAddForm(false)} className="events-admin-button">Cancelar</button>
            </div>
          </div>
        )}

        {showEditForm && editEvent && (
          <div className="events-admin-popup">
            <div className="events-admin-popup-content">
              <h3>Editar Evento</h3>
              <input
                type="text"
                placeholder="Título del evento"
                value={editEvent.Titulo_Evento}
                onChange={(e) => setEditEvent({ ...editEvent, Titulo_Evento: e.target.value })}
              />
              <input
                type="date"
                value={editEvent.Fecha}
                onChange={(e) => setEditEvent({ ...editEvent, Fecha: e.target.value })}
              />
              <textarea
                placeholder="Descripción del evento"
                value={editEvent.Tipo}
                onChange={(e) => setEditEvent({ ...editEvent, Tipo: e.target.value })}
              />
              <input
                type="time"
                value={editEvent.Horario}
                onChange={(e) => setEditEvent({ ...editEvent, Horario: e.target.value })}
              />
              <button onClick={handleSaveEvent} className="events-admin-button success">Guardar</button>
              <button onClick={() => setShowEditForm(false)} className="events-admin-button">Cancelar</button>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="events-admin-popup">
            <div className="events-admin-popup-content">
              <h3>¿Estás seguro de que deseas eliminar este evento?</h3>
              <button onClick={handleDeleteEvent} className="events-admin-button danger">Sí, eliminar</button>
              <button onClick={handleCancelDelete} className="events-admin-button">Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </IonPage>
  );
};
