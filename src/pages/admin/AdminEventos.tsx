import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../assets/admin/AdminEvents.css';

export const AdminEvents: React.FC = () => {
  const history = useHistory();

  const [events, setEvents] = useState([
    { id: 1, title: 'Taller de Prevención de Violencia', date: '2024-11-20', description: 'Un taller enfocado en la prevención de violencia de género.' },
    { id: 2, title: 'Charla sobre Derechos de las Mujeres', date: '2024-11-25', description: 'Charla informativa sobre los derechos de las mujeres.' },
    { id: 3, title: 'Actividad Comunitaria de Apoyo', date: '2024-12-01', description: 'Reunión comunitaria para apoyo mutuo en situaciones de violencia.' }
  ]);

  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [editEvent, setEditEvent] = useState<{ id: number | null, title: string, date: string, description: string }>({ id: null, title: '', date: '', description: '' });

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);

  const handleGoBack = () => {
    history.push('/admin');
  };

  const handleAddEvent = () => {
    const newId = events.length + 1;
    setEvents([...events, { id: newId, title: newEvent.title, date: newEvent.date, description: newEvent.description }]);
    setNewEvent({ title: '', date: '', description: '' });
    setShowAddForm(false);
  };

  const handleEditEvent = (event: any) => {
    setEditEvent({ id: event.id, title: event.title, date: event.date, description: event.description });
    setShowEditForm(true);
  };

  const handleSaveEvent = () => {
    setEvents(events.map(event =>
      event.id === editEvent.id ? { ...event, title: editEvent.title, date: editEvent.date, description: editEvent.description } : event
    ));
    setEditEvent({ id: null, title: '', date: '', description: '' });
    setShowEditForm(false);
  };

  const handleDeleteEvent = () => {
    if (eventToDelete !== null) {
      setEvents(events.filter(event => event.id !== eventToDelete));
      setEventToDelete(null);
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

        <div className="back-button-container">
          <button className="back-button" onClick={handleGoBack}>
              Volver a la página principal
          </button>
        </div>

        <div className="events-admin-list">
          <h2>Eventos Disponibles</h2>
          {events.map((event) => (
            <div key={event.id} className="events-admin-card">
              <div className="events-admin-card-header">
                <strong>{event.title}</strong> - <span>{event.date}</span>
              </div>
              <div className="events-admin-card-content">
                <p>{event.description}</p>
              </div>
              <div className="events-admin-card-actions">
                <button onClick={() => handleEditEvent(event)} className="events-admin-button">Editar</button>
                <button onClick={() => { setEventToDelete(event.id); setShowDeleteConfirm(true); }} className="events-admin-button danger">Eliminar</button>
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
                value={newEvent.title} 
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <input 
                type="date" 
                value={newEvent.date} 
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
              <textarea 
                placeholder="Descripción del evento" 
                value={newEvent.description} 
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <button onClick={handleAddEvent} className="events-admin-button success">Agregar</button>
              <button onClick={() => setShowAddForm(false)} className="events-admin-button">Cancelar</button>
            </div>
          </div>
        )}

        {showEditForm && (
          <div className="events-admin-popup">
            <div className="events-admin-popup-content">
              <h3>Editar Evento</h3>
              <input 
                type="text" 
                placeholder="Título del evento" 
                value={editEvent.title} 
                onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
              />
              <input 
                type="date" 
                value={editEvent.date} 
                onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
              />
              <textarea 
                placeholder="Descripción del evento" 
                value={editEvent.description} 
                onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
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
