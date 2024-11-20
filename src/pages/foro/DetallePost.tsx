import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import pageApi from '../../api/backend';
import { IonContent, IonPage, IonImg, IonButton } from '@ionic/react';

import '../../assets/foro/detallePost.css';
import { Footer, Header } from '../../components';

// Definir el tipo para el estado de navegación
interface LocationState {
  from: string;
}

export const DetallePost: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState<any>(null); // El post detallado
  const [likes, setLikes] = useState<number>(0); // Los likes de la publicación
  const [hasLiked, setHasLiked] = useState<boolean>(false); // Para controlar si el usuario ya dio like
  const history = useHistory();
  const location = useLocation<LocationState>(); // Usamos el tipo LocationState aquí
  
  // Captura la página de origen (anterior) desde el estado de la navegación
  const previousPage = location.state?.from || '/'; // Si no hay estado, regresa al home por defecto

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await pageApi.get(`/foro/detalles/${id}`);
        setPost(response.data); // Establece los detalles del post
        setLikes(response.data.Likes); // Establece los likes
      } catch (error) {
        console.error("Error al cargar los detalles del post", error);
      }
    };

    fetchPostDetails(); // Llama a la API para obtener los detalles del post
  }, [id]);

  const handleLike = async () => {
    try {
      if (hasLiked) {
        const response = await pageApi.post(`/foro/remove/${id}`);
        setLikes(response.data.Likes); // Actualiza los likes
      } else {
        const response = await pageApi.post(`/foro/like/${id}`);
        setLikes(response.data.Likes); // Actualiza los likes
      }
      setHasLiked(!hasLiked); // Cambia el estado de "like"
    } catch (error) {
      console.error("Error al dar like", error);
    }
  };

  const handleGoBack = () => {
    window.location.href = previousPage  // Redirige a la página anterior
  };

  if (!post) {
    return <div>Cargando...</div>; // Muestra un cargando si no se han cargado los detalles
  }

  return (
    <IonPage>
      <Header />
      <IonContent className="detailforum-post-detail-content">
        <main>
          <button className="detailforum-back-button" onClick={handleGoBack}>Volver</button>
          <h1 className="detailforum-post-title">{post.Titulo}</h1>
          <section className="detailforum-post-detail-container">
            <div className="detailforum-post-detail-text">
              {/* Contenido del post */}
              <p className="detailforum-post-description">{post.Contenido}</p>
              <p>
                <strong>Autor:</strong> {post.autor}
              </p>
              
              {/* Botón de likes directamente aquí */}
              <button
                className={`detailforum-like-button ${hasLiked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                {hasLiked ? "❤️" : "🤍"} {likes} Likes
              </button>
            </div>
          </section>
        </main>
      </IonContent>
      <Footer />
    </IonPage>
  );
};
