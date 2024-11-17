import React, { useState } from 'react';
import { IonPage } from '@ionic/react';

import '../../assets/admin/AdminActivity.css'; // Asegúrate de tener el archivo CSS adecuado para los estilos
import { useHistory } from 'react-router';

export const ActivityAdmin: React.FC = () => {
  const history = useHistory();

  // Estado para almacenar las actividades de los usuarios
  const [activities, setActivities] = useState([
    { id: 1, usuario: 'Usuario1', tipo: 'Denuncia Anónima', fecha: '2024-11-16', detalles: 'Denunció abuso en el hogar' },
    { id: 2, usuario: 'Usuario2', tipo: 'Inscripción en Taller', fecha: '2024-11-15', detalles: 'Se inscribió en Taller de Autoayuda' },
    { id: 3, usuario: 'Usuario3', tipo: 'Comentario en Foro', fecha: '2024-11-14', detalles: 'Dejó un comentario de apoyo en el foro' }
  ]);

  // Estado para mostrar las estadísticas de actividad global
  const [stats, setStats] = useState({
    totalDenuncias: 50,
    totalInscripciones: 30,
    totalComentarios: 100,
  });

  const handleGoBack = () => {
    history.push('/admin'); // Redirige a la página principal de administración
  };

  return (
    <IonPage>
      <main className="activity-admin-container">
        <header className="activity-admin-header">
          <h1>Administración de Actividades</h1>
          <p className="activity-admin-description">
            Aquí puedes revisar el historial de actividades de los usuarios, así como obtener una visión global de su participación en la plataforma.
          </p>
        </header>

        <div className="back-button-container">
          <button className="back-button" onClick={handleGoBack}>
              Volver a la página principal
          </button>
        </div>

        <section className="activity-admin-stats">
          <h2>Estadísticas de Actividad</h2>
          <div className="activity-admin-stat-card">
            <strong>Total de Denuncias Anónimas:</strong> {stats.totalDenuncias}
          </div>
          <div className="activity-admin-stat-card">
            <strong>Total de Inscripciones a Talleres:</strong> {stats.totalInscripciones}
          </div>
          <div className="activity-admin-stat-card">
            <strong>Total de Comentarios en el Foro:</strong> {stats.totalComentarios}
          </div>
        </section>

        <section className="activity-admin-list">
          <h2>Historial de Actividades de los Usuarios</h2>
          {activities.map((activity) => (
            <div key={activity.id} className="activity-admin-card">
              <div className="activity-admin-card-header">
                <strong>{activity.usuario}</strong> - <span>{activity.fecha}</span>
              </div>
              <div className="activity-admin-card-content">
                <p><strong>Tipo de Actividad:</strong> {activity.tipo}</p>
                <p><strong>Detalles:</strong> {activity.detalles}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </IonPage>
  );
};
