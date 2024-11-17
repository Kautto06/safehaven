import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { thumbsUpOutline } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import pageApi from '../../api/backend';

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
      } catch (error) {
        console.error("Error al cargar los detalles del post", error);
      }
    };

    fetchPostDetails(); // Llama a la API para obtener los detalles del post
  }, [id]); // Vuelve a ejecutarse cada vez que cambia el ID del post

  const handleLike = async () => {
    try {
      // Si ya se ha dado like, disminuirlo
      if (hasLiked) {
        const response = await pageApi.post(`/foro/like/remove/${id}`); // Llamada a API para disminuir los likes
        setLikes(response.data.Likes); // Actualiza los likes
      } else {
        const response = await pageApi.post(`/foro/like/${id}`); // Llamada a la API para incrementar los likes
        setLikes(response.data.Likes); // Actualiza los likes
      }
      setHasLiked(!hasLiked); // Cambia el estado de "like" para alternar entre dar like y quitarlo
    } catch (error) {
      console.error("Error al dar like", error);
    }
  };

  if (!post) {
    return <div>Cargando...</div>; // Muestra un cargando si no se han cargado los detalles
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de la Publicación</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>{post.Titulo}</h2>
        <p>{post.Contenido}</p>
        <p><strong>Autor:</strong> {post.autor}</p>
        
        <IonButton onClick={handleLike} disabled={hasLiked}>
          <IonIcon icon={thumbsUpOutline} /> {likes} Likes
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DetallePost;
