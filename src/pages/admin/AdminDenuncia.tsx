import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import '../../assets/admin/AdminDenuncia.css';
import { useHistory } from 'react-router';

export const AdminDenuncias: React.FC = () => {
    const history = useHistory();
  // Array de ejemplo con denuncias
  const [denuncias, setDenuncias] = useState([
    {
      tipo: "Psicológica",
      lugar: "Casa de la víctima",
      descripcion: "He sufrido amenazas y comentarios humillantes constantes por parte de mi pareja.",
      fecha: "2024-11-10",
      estado: "Pendiente", // Se puede marcar como "En Proceso" o "Resuelta"
    },
    {
      tipo: "Física",
      lugar: "Trabajo",
      descripcion: "Fui golpeada por mi pareja en un arranque de celos.",
      fecha: "2024-11-09",
      estado: "Pendiente",
    },
    {
      tipo: "Acoso laboral",
      lugar: "Oficina",
      descripcion: "Mi jefe me ha hecho comentarios inapropiados y ha creado un ambiente de trabajo hostil.",
      fecha: "2024-11-08",
      estado: "Pendiente",
    },
    {
      tipo: "Abuso sexual",
      lugar: "Evento social",
      descripcion: "Fui víctima de abuso sexual por parte de un conocido.",
      fecha: "2024-11-07",
      estado: "Pendiente",
    },
    {
      tipo: "Económica",
      lugar: "Casa",
      descripcion: "Mi pareja controla todas mis finanzas y no me deja tener acceso a mi propio dinero.",
      fecha: "2024-11-06",
      estado: "Pendiente",
    },
  ]);

  const handleGoBack = () => {
    // Redirige a la página principal de administración
    history.push('/admin'); // Cambia '/admin' por la ruta correspondiente a tu página principal de administración
  };

  // Función para cambiar el estado de la denuncia
  const handleMarcarEnProceso = (index: number) => {
    // Actualiza el estado de la denuncia a "En Proceso"
    denuncias[index].estado = "En Proceso";
    // Fuerza la actualización del componente para reflejar el cambio
    setDenuncias([...denuncias]);
  };
  
  const handleMarcarResuelta = (index: number) => {
    // Actualiza el estado de la denuncia a "Resuelta"
    denuncias[index].estado = "Resuelta";
    // Fuerza la actualización del componente para reflejar el cambio
    setDenuncias([...denuncias]);
  };

  return (
    <IonPage className="admin-denuncias-container">
    <header className="admin-header-denuncia">
        <h1 className="header-title-denuncia">Administración de Denuncias Anónimas</h1>
        <p className="header-description">
        Revisa, clasifica y toma acciones correspondientes basadas en las denuncias recibidas.
        </p>
    </header>

    <div className="back-button-container">
        <button className="back-button" onClick={handleGoBack}>
        Volver a la página principal
        </button>
    </div>

    <section className="denuncia-list">
        {denuncias.map((denuncia, index) => (
        <div key={index} className="denuncia-card">
            <div className="denuncia-card-header">
            <h3 className="denuncia-card-title">{`Denuncia de violencia ${denuncia.tipo}`}</h3>
            <p className="denuncia-card-subtitle">{`Fecha: ${denuncia.fecha}`}</p>
            </div>

            <div className="denuncia-card-content">
            <p><strong>Tipo de violencia:</strong> {denuncia.tipo}</p>
            <p><strong>Lugar del incidente:</strong> {denuncia.lugar}</p>
            <p><strong>Descripción:</strong> {denuncia.descripcion}</p>
            </div>

            <div className="denuncia-actions">
            <button
                className="action-button en-proceso"
                onClick={() => handleMarcarEnProceso(index)}
                disabled={denuncia.estado === "En Proceso" }
            >
                Marcar como en proceso
            </button>
            <button
                className="action-button resuelta"
                onClick={() => handleMarcarResuelta(index)}
                disabled={denuncia.estado === "Resuelta"}
            >
                Marcar como resuelta
            </button>
            </div>

            <div className="denuncia-status">
            <p><strong>Estado:</strong> {denuncia.estado}</p>
            </div>
        </div>
        ))}
    </section>
    </IonPage>
  );
};

