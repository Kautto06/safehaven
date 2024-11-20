import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonImg } from '@ionic/react';
import '../../assets/expertos/Expertos.css';
import { Footer, Header } from '../../components';
import pageApi from '../../api/backend';

export const Expertos: React.FC = () => {
  const [expertos, setExpertos] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [expertoDetalles, setExpertoDetalles] = useState<any>(null);

  useEffect(() => {
    const fetchExpertos = async () => {
      try {
        const response = await pageApi.get('/experts/paginado', {
          params: { page: currentPage, limit: 5 }
        });
        setExpertos(response.data.expertos);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error al cargar los expertos", error);
      }
    };

    fetchExpertos();
  }, [currentPage]);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewMore = async (expertId: number) => {
    try {
      if (!expertId) {
        console.error('ID del experto no válido');
        return;
      }
      const response = await pageApi.get(`/experts/detalles/${expertId}`);
      setExpertoDetalles(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener los detalles del experto", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setExpertoDetalles(null);
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="forum-body">
        <main>
          <h1>Nuestros Expertos</h1>
          <section className="forum-content">
            {expertos.length > 0 ? (
              expertos.map((expert) => (
                <div key={expert.ID} className="forum-item">
                  <IonImg
                    src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-260nw-1340428865.jpg"
                    alt="Imagen del experto"
                    className="forum-image"
                  />
                  <div className="forum-text">
                    <h2 className="forum-title">{expert.nombre}</h2>
                    <p>{expert.texto}</p>
                    <p>{expert.ocupación}</p>
                    <IonButton fill="clear" className="view-button" onClick={() => handleViewMore(expert.expertId)}>
                      Ver
                    </IonButton>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron expertos</p>
            )}
          </section>
        </main>

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

        <Footer />
      </IonContent>

      {/* Modal Personalizado */}
      {showModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            {expertoDetalles ? (
              <div className="expert-details">
                <h2>{expertoDetalles.nombre} {expertoDetalles.apellido}</h2>
                <p><strong>Teléfono:</strong> {expertoDetalles.Telefono}</p>
                <p><strong>Email:</strong> {expertoDetalles.Email}</p>
                <p><strong>Género: </strong> {expertoDetalles.Genero}</p>
                <p><strong>Ocupación: </strong> {expertoDetalles.Ocupación}</p>
                <p><strong>Descripción: </strong> {expertoDetalles.descripcion}</p>
                <p><strong>Fecha de Nacimiento: </strong> {expertoDetalles.Fecha_Nacimiento}</p>
                <p><strong>Dirección: </strong> {expertoDetalles.Direccion}</p>
                <p><strong>Certificaciones: </strong> {expertoDetalles.Certificaciones}</p>
                <p><strong>Modalidad de Atención: </strong> {expertoDetalles.Modalidad_Atencion}</p>
                <p><strong>Acerca de mí: </strong> {expertoDetalles.About_Me}</p>
              </div>
            ) : (
              <p>No se pudieron cargar los detalles del experto.</p>
            )}
            <div className="modal-footer">
              <button onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </IonPage>
  );
};
