import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pageApi from '../../api/backend';
import { thumbsUpOutline } from 'ionicons/icons';
import { IonContent, IonPage, IonImg, IonIcon } from '@ionic/react';

import '../../assets/foro/detallePost.css';
import { Footer, Header } from '../../components';

const DetallePost: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState<any>(null); // El post detallado
  const [likes, setLikes] = useState<number>(0); // Los likes de la publicación
  const [hasLiked, setHasLiked] = useState<boolean>(false); // Para controlar si el usuario ya dio like

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await pageApi.get(`/foro/detalles/${id}`);
        setPost(response.data); // Establece los detalles del post
        setLikes(response.data.Likes); // Establece los likes
        console.log(response.data);
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

  if (!post) {
    return <div>Cargando...</div>; // Muestra un cargando si no se han cargado los detalles
  }

  return (
    <IonPage>
      <Header />
      <IonContent className="post-detail-content">
        <main>
          <h1 className="post-title">{post.Titulo}</h1>
          <section className="post-detail-container">
            <IonImg
              className="post-image"
              src={
                post.Imagen ||
                "https://www.shutterstock.com/image-vector/no-image-available-icon-template-260nw-1340428865.jpg"
              }
              alt="Imagen del foro"
            />
            <div className="post-detail-text">
              {/* Contenido del post */}
              <p className="post-description">{post.Contenido}</p>
              <p>
                <strong>Autor:</strong> {post.autor}
              </p>
              
              {/* Botón de likes directamente aquí */}
              <button
                  className={`like-button ${hasLiked ? 'liked' : ''}`}
                  onClick={handleLike}
                >
                  {/* Texto en lugar del IonIcon */}
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

export default DetallePost;
