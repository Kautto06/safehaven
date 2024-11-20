import React, { useEffect, useState } from 'react';
import { IonPage, IonButton, IonAlert } from '@ionic/react';
import '../../assets/admin/AdminDenuncia.css';
import { useHistory } from 'react-router';
import {
  obtenerDenuncias,
  actualizarDenuncia,
  eliminarDenuncia,
  actualizarEstadoDenuncia,
} from './services/denuncia';
import { useAuthStore } from '../../hooks';

// Interfaz de la denuncia
interface Denuncia {
  ID: number;
  TipoViolencia: string;
  UbicacionIncidente: string;
  Contenido: string;
  RelacionAgresor: string; // Relación con el agresor
  estado: string; // Puede ser "Pendiente", "En Proceso" o "Resuelta"
  ID_USUARIO: string; // ID del usuario relacionado
  LinkImagen?: string; // URL de la imagen (puede ser opcional si no hay imagen)
}

export const AdminDenuncias: React.FC = () => {
  const history = useHistory();
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]); // Tipado explícito
  const [showAlert, setShowAlert] = useState<boolean>(false); // Para mostrar/ocultar el alert
  const [denunciaAEliminar, setDenunciaAEliminar] = useState<number | null>(null); // ID de la denuncia a eliminar

  // Cargar las denuncias desde el backend
  useEffect(() => {
    const cargarDenuncias = async () => {
      try {
        const data = await obtenerDenuncias();
        console.log('Datos cargados:', data);
        setDenuncias(data); // Asegúrate de que `data` sea un array de tipo Denuncia[]

      } catch (error) {
        console.error('Error al cargar las denuncias:', error);
      }
    };

    cargarDenuncias();
  }, []); // Asegúrate de que esto se ejecute solo una vez
  
  // Función para actualizar el estado de la denuncia
  const actualizarEstado = async (id: number, nuevoEstado: string) => {
    try {
      await actualizarEstadoDenuncia(id, nuevoEstado); // Actualiza el estado en el backend
      // Sincroniza el estado en el frontend después de la actualización
      setDenuncias((prevDenuncias) =>
        prevDenuncias.map((denuncia) =>
          denuncia.ID === id ? { ...denuncia, estado: nuevoEstado } : denuncia
        )
      );

    } catch (error) {
      console.error('Error al actualizar la denuncia:', error);
    }
  };

  // Función para marcar denuncia como "En Proceso"
  const handleMarcarEnProceso = (id: number) => {
    actualizarEstado(id, 'En Proceso');
  };

  // Función para marcar denuncia como "Resuelta"
  const handleMarcarResuelta = (id: number) => {
    actualizarEstado(id, 'Resuelta');
  };

  // Función para confirmar la eliminación de la denuncia
  const handleEliminarDenuncia = (id: number) => {
    setDenunciaAEliminar(id); // Guardamos la denuncia que queremos eliminar
    setShowAlert(true); // Mostramos el alert de confirmación
  };

  // Función para eliminar la denuncia después de la confirmación
  const confirmarEliminar = async () => {
    if (denunciaAEliminar !== null) {
      try {
        await eliminarDenuncia(denunciaAEliminar);
        setDenuncias((prevDenuncias) => prevDenuncias.filter((denuncia) => denuncia.ID !== denunciaAEliminar));
      } catch (error) {
        console.error('Error al eliminar la denuncia:', error);
      }
    }
    setShowAlert(false); // Ocultamos el alert después de eliminar
    setDenunciaAEliminar(null); // Limpiamos la denuncia seleccionada para eliminar
  };

  // Función para cancelar la eliminación
  const cancelarEliminar = () => {
    setShowAlert(false); // Solo ocultamos el alert
    setDenunciaAEliminar(null); // Limpiamos la denuncia seleccionada
  };

  // Navegar de regreso a la página principal del administrador
  const handleGoBack = () => {
    window.location.href = '/admin'
  };

  return (
    <IonPage className="admin-denuncias-container">
      <header className="admin-header-denuncia">
        <h1 className="header-title-denuncia">Administración de Denuncias Anónimas</h1>
        <p className="header-description">
          Revisa, clasifica y toma acciones correspondientes basadas en las denuncias recibidas.
        </p>
      </header>

      <div className="back-button-container-admin">
        <button className="back-button-admin" onClick={() => history.push('/admin')}>
          Volver a la página principal
        </button>
      </div>

      {denuncias.length === 0 ? (
        <div className="no-denuncias-message">
          <h2>No hay denuncias registradas en este momento</h2>
          <p>Por favor, revisa más tarde.</p>
        </div>
      ) : (
        <section className="denuncia-list">
          {denuncias.map((denuncia) => (
            <div key={denuncia.ID} className="denuncia-card">
              <div className="denuncia-card-header">
                <h3 className="denuncia-card-title">{`Denuncia de violencia ${denuncia.TipoViolencia}`}</h3>
              </div>

              <div className="denuncia-card-content">
                <p><strong>Tipo de violencia:</strong> {denuncia.TipoViolencia}</p>
                <p><strong>Lugar del incidente:</strong> {denuncia.UbicacionIncidente}</p>
                <p><strong>Descripción:</strong> {denuncia.Contenido}</p>
                <p><strong>ID del Usuario:</strong> {denuncia.ID_USUARIO}</p>
                {denuncia.LinkImagen && (
                  <div>
                    <strong>Prueba adjunta: </strong>
                    <img
                      src={denuncia.LinkImagen}
                      alt="Prueba adjunta"
                      className="denuncia-image"
                    />
                  </div>
                )}
              </div>

              <div className="denuncia-actions">
                <button
                  className="action-button en-proceso"
                  onClick={() => handleMarcarEnProceso(denuncia.ID)}
                  disabled={denuncia.estado === 'En Proceso'}
                >
                  Marcar como en proceso
                </button>
                <button
                  className="action-button resuelta"
                  onClick={() => handleMarcarResuelta(denuncia.ID)}
                  disabled={denuncia.estado === 'Resuelta'}
                >
                  Marcar como resuelta
                </button>
                <button
                  className="action-button eliminar"
                  onClick={() => handleEliminarDenuncia(denuncia.ID)}
                >
                  Eliminar
                </button>
              </div>

              <div className="denuncia-status">
                <p><strong>Estado:</strong> {denuncia.estado}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Confirmar eliminación'}
        message={'¿Estás seguro de que deseas eliminar esta denuncia?'}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: cancelarEliminar,
          },
          {
            text: 'Eliminar',
            handler: confirmarEliminar,
          },
        ]}
      />
    </IonPage>
  );
};