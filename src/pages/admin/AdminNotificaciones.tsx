import React, { useState, useEffect } from 'react';
import { IonPage } from '@ionic/react';
import { notificacionesApi } from './services/notificaciones'; // Ajusta la ruta de importación según corresponda

import '../../assets/admin/AdminActivity.css'; // Asegúrate de tener el archivo CSS adecuado para los estilos


interface Notificacion {
  ID: number;
  Titulo: string;
  Contenido: string;
  ID_Usuario: string;
  Descripcion?: string | null;
}


export const AdminNotificacion: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [newNotificacion, setNewNotificacion] = useState<Notificacion>({
    ID: 0, // Esto se ajustará cuando creemos una nueva notificación
    Titulo: '',
    Contenido: '',
    Descripcion: '',
    ID_Usuario : ''
  });

  const [isEditing, setIsEditing] = useState<boolean>(false); // Para manejar el modo de edición

  // Cargar las notificaciones
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const data = await notificacionesApi.obtenerTodasLasNotificaciones();
        setNotificaciones(data);
      } catch (error) {
        console.error('Error al obtener las notificaciones', error);
      }
    };
    fetchNotificaciones();
  }, []);

  const handleGoBack = () => {
    window.location.href = "/admin"; // Redirige a la página principal de administración
  };

  const handleCreateNotification = async () => {
    try {
      newNotificacion.ID_Usuario=localStorage.getItem('email') || ''
      let createdNotification = await notificacionesApi.crearNotificacion(newNotificacion);
      
      createdNotification = await notificacionesApi.obtenerNotificaionId(createdNotification.ID)
      console.log(createdNotification)
      setNotificaciones([...notificaciones, createdNotification.notificacion[0]]);
      setNewNotificacion({ ID: 0, Titulo: '', Contenido: '', Descripcion: '' ,ID_Usuario: ''}); // Limpiar formulario
    } catch (error) {
      console.error('Error al crear la notificación', error);
    }
  };

  const handleEditNotification = (notification: Notificacion) => {
    setNewNotificacion(notification);
    setIsEditing(true);
  };

  const handleUpdateNotification = async () => {
    try {
      await notificacionesApi.actualizarNotificacion(newNotificacion.ID, newNotificacion);
      setNotificaciones(
        notificaciones.map((noti) =>
          noti.ID === newNotificacion.ID ? newNotificacion : noti
        )
      );
      setNewNotificacion({ ID: 0, Titulo: '', Contenido: '', Descripcion: '' ,ID_Usuario: ''});
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar la notificación', error);
    }
  };

  const handleDeleteNotification = async (id: number) => {
    try {
      await notificacionesApi.eliminarNotificacion(id);
      setNotificaciones(notificaciones.filter((noti) => noti.ID !== id));
    } catch (error) {
      console.error('Error al eliminar la notificación', error);
    }
  };

  return (
    <IonPage>
      <main className="activity-admin-container">
        <header className="activity-admin-header">
          <h1>Administración de Notificaciones</h1>
          <p className="activity-admin-description">
            Aquí puedes gestionar las notificaciones de los usuarios, incluyendo su creación, edición y eliminación.
          </p>
        </header>

        <div className="back-button-container-admin">
          <button className="back-button-admin" onClick={handleGoBack}>
            Volver a la página principal
          </button>
        </div>

        <section className="activity-admin-notification-form">
          <h2>{isEditing ? 'Editar Notificación' : 'Crear Nueva Notificación'}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isEditing) {
                handleUpdateNotification();
              } else {
                handleCreateNotification();
              }
            }}
          >
            <div>
              <label>Título:</label>
              <input
                type="text"
                value={newNotificacion.Titulo}
                onChange={(e) => setNewNotificacion({ ...newNotificacion, Titulo: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Contenido:</label>
              <textarea
                value={newNotificacion.Contenido}
                onChange={(e) => setNewNotificacion({ ...newNotificacion, Contenido: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Descripción (opcional):</label>
              <textarea
                value={newNotificacion.Descripcion || ''}
                onChange={(e) => setNewNotificacion({ ...newNotificacion, Descripcion: e.target.value })}
              />
            </div>
            <button type="submit">{isEditing ? 'Actualizar Notificación' : 'Crear Notificación'}</button>
          </form>
        </section>

        <section className="activity-admin-notifications-list">
          <h2>Lista de Notificaciones</h2>
          {notificaciones.map((notification) => (
            <div key={notification.ID} className="activity-admin-notification-card">
              <div className="notification-card-header">
                <strong>{notification.Titulo}</strong>
              </div>
              <div className="notification-card-content">
                <p><strong>Contenido:</strong> {notification.Contenido}</p>
                <p><strong>Descripción:</strong> {notification.Descripcion || 'No disponible'}</p>
              </div>
              <div className="notification-card-actions">
                <button onClick={() => handleEditNotification(notification)}>Editar</button>
                <button onClick={() => handleDeleteNotification(notification.ID)}>Eliminar</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </IonPage>
  );
};
