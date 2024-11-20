import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner } from '@ionic/react';
import { useAuthStore } from '../../hooks/auth/useAuthStore'; // Asegúrate de que este es el path correcto
import { Footer, Header } from '../../components';
import pageApi from '../../api/backend'; // Asegúrate de que 'pageapi' está instalado y configurado
import { useHistory } from 'react-router-dom'; // Para redirigir a otras páginas

import '../../assets/actividades/Actividades.css';

export const Actividades: React.FC = () => {
  const { user, status } = useAuthStore();  // Obtener el usuario autenticado
  const [acciones, setAcciones] = useState<any[]>([]);  // Para almacenar las acciones
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);  // Página actual
  const [totalPages, setTotalPages] = useState<number>(1);  // Total de páginas
  const [pageSize] = useState<number>(10);  // Tamaño de página fijo, se puede cambiar si es necesario
  const history = useHistory(); // Para redirigir

  const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);  // Convertimos la fecha en un objeto Date
    return date.toLocaleDateString('es-ES');  // Formateamos solo la fecha (año, mes, día)
  };

  if (status !== 'authenticated' || !user || !('name' in user)) {
    return (
      <IonPage>
        <Header />
        <IonContent>
          <div className="loading-container">
            <IonSpinner name="bubbles" />
            <p>Cargando...</p>
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    );
  }

  // Función para obtener las acciones del historial
  useEffect(() => {
    const obtenerAcciones = async () => {
      if (user && user.email) {  // Verificamos si el usuario está autenticado
        try {
          setLoading(true);  // Iniciar el estado de carga

          // Llamada a la API para obtener las acciones con paginación
          const response = await pageApi.get(`/actividad/acciones/${user.email}`, {
            params: { page: currentPage, pageSize }  // Pasamos los parámetros de paginación
          });

          setAcciones(response.data.acciones);  // Guardamos las acciones en el estado
          setTotalPages(response.data.totalPages);  // Establecemos el total de páginas
        } catch (error) {
          console.error('Error al obtener las acciones:', error);
        } finally {
          setLoading(false);  // Terminamos la carga
        }
      }
    };

    obtenerAcciones();
  }, [user, currentPage, pageSize]);  // Añadimos currentPage como dependencia para actualizar la página

  // Función para manejar la paginación
  const handlePagination = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Función para manejar el clic en cada contenedor de acción
  const manejarAccion = (accion: { tipo_accion: string; id_objeto: number }) => {

    switch (accion.tipo_accion) {
      case 'Publicacion':
        history.push(`/foro/detalle/${accion.id_objeto}`, { from: '/actividades' });
        break;
      case 'AutoEvaluacion':
        history.push(`/resultados/${accion.id_objeto}`);
        break;  
      default:
        console.log('Acción desconocida');
        break;
    }
  };

  return (
    <IonPage>
      <Header /> {/* Componente Header */}
      
      <IonContent class="activity-body">
        <section className="activity-section">
          <h1>Tu historial de actividades</h1>
          {loading ? (
            <p>Cargando actividades...</p>
          ) : (
            <div className="activity-grid">
              {acciones.length > 0 ? (
                acciones.map((accion, index) => (
                  <IonCard key={index} onClick={() => manejarAccion(accion)}>
                    <IonCardHeader>
                      <IonCardTitle>{accion.tipo_accion}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>{accion.descripcion}</p>
                      <p><strong>Fecha:</strong> {formatearFecha(accion.fecha)}</p>
                    </IonCardContent>
                  </IonCard>
                ))
              ) : (
                <p>No hay actividades para mostrar.</p>
              )}
            </div>
          )}

          <div className="pagination">
            <button
              className="pagination-link"
              disabled={currentPage === 1}
              onClick={() => handlePagination(currentPage - 1)}
            >
              <span className="pagination-icon">←</span> Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`pagination-link ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => handlePagination(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="pagination-link"
              disabled={currentPage === totalPages}
              onClick={() => handlePagination(currentPage + 1)}
            >
              Siguiente <span className="pagination-icon">→</span>
            </button>
          </div>
        </section>
      </IonContent>

      <Footer /> {/* Componente Footer */}
    </IonPage>
  );
};
