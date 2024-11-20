import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonImg, IonIcon } from '@ionic/react';
import { thumbsUpOutline, filterOutline} from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; 
import '../../assets/foro/Foro.css';
import { Footer, Header } from '../../components';
import pageApi from '../../api/backend';

export const Foro: React.FC = () => {
  const [foro, setForo] = useState<any[]>([]); // Almacena las publicaciones del foro
  const [likes, setLikes] = useState<number[]>([]); // Inicializa con los likes de la API
  const [orderBy, setOrderBy] = useState<'popular' | 'recent'>('popular'); // Estado para el orden (por popularidad o por fecha)
  const [totalPages, setTotalPages] = useState<number>(1); // Total de páginas
  const [currentPage, setCurrentPage] = useState<number>(1); // Página actual

  const history = useHistory(); // Hook para redirigir

  // Función para manejar el cambio de orden
  const handleOrderChange = async () => {
    const newOrder = orderBy === 'popular' ? 'recent' : 'popular';
    setOrderBy(newOrder); // Cambia el estado de orden
  
    // Reinicia la página a la primera página
    setCurrentPage(1); 
  
    // Consulta a la API para obtener las publicaciones según el nuevo orden
    try {
      const response = await pageApi.get('/foro/ordenar', {
        params: { orderBy: newOrder, page: 1, limit: 5 } // La página ahora es 1
      });
      setForo(response.data.publicaciones); // Actualiza las publicaciones con los resultados
      setLikes(response.data.publicaciones.map((post: any) => post.Likes)); // Actualiza los likes
      setTotalPages(response.data.totalPages); // Actualiza el total de páginas
    } catch (error) {
      console.error("Error al obtener publicaciones", error);
    }
  };
  // Función para obtener las publicaciones al cargar la página
  useEffect(() => {
    const fetchForo = async () => {
      try {
        const response = await pageApi.get('/foro/ordenar', {
          params: { orden: orderBy, page: currentPage, limit: 5 }
        });
        console.log('Publicaciones del foro:', response.data.publicaciones); // Verifica la respuesta
        setForo(response.data.publicaciones); 
        setLikes(response.data.publicaciones.map((post: any) => post.Likes));
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error al cargar las publicaciones", error);
      }
    };
  
    fetchForo();
  }, [orderBy, currentPage]); // Se ejecuta cada vez que cambia 'orderBy' o 'currentPage'

  const handlePagination = (page: number) => {
    setCurrentPage(page); // Cambia la página actual
  };
  
  const handleViewMore = (postId: number) => {
    console.log('Redirigiendo a post con ID:', postId);  // Verifica el ID
    window.location.href =`/foro/detalle/${postId}`
  };
  return (
    <IonPage>
      <Header />
      <IonContent className='forum-body'>
        <main>
          <h1>Foro</h1>
          <button 
              className="create-post-button" 
              onClick={() => history.push('/crearPublicacion')}
            >
              Crear publicación
        </button>
          <div className="header-right">
            <span>Publicaciones {orderBy === 'popular' ? 'más populares' : 'más recientes'}</span>
            <IonButton fill="clear" className="sort-button-forum" onClick={handleOrderChange}>
              <IonIcon slot="icon-only" icon={filterOutline} />
            </IonButton>
          </div>

          <section className="forum-content">
              {foro.length > 0 ? (
                foro.map((post, idx) => (
                  <div key={post.ID} className="forum-item">
                    <IonImg 
                      src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-260nw-1340428865.jpg" 
                      alt="Imagen del foro" 
                      className="forum-image" 
                    />
                    <div className='forum-text'>
                      <h2 className='forum-title'>{post.Titulo}</h2>
                      <p>{post.texto_preview}</p>
                      <p><strong>Autor:</strong> {post.autor}</p>
                      <IonButton fill='clear' className='view-button' onClick={() => handleViewMore(post.ID)}>
                        Ver
                      </IonButton>
                    </div>
                    
                    {/* Recuento de likes en la esquina inferior izquierda */}
                    <div className="likes-count">
                      <IonIcon icon={thumbsUpOutline} /> {likes[idx]} Likes
                    </div>
                  </div>
                ))
              ) : (
                <p>No se encontraron publicaciones en el foro</p>
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

            {/* Botones de paginación */}
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
      
    </IonPage>
  );
};