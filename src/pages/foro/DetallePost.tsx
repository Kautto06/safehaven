import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { thumbsUpOutline } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import pageApi from '../../api/backend';

const DetallePost: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState<any>(null); // El post detallado
  const [likes, setLikes] = useState<number>(0); // Los likes de la publicación

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
      const response = await pageApi.post(`/foro/like/${id}`); // Llama a la API para incrementar el like
      setLikes(response.data.Likes); // Actualiza el número de likes
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
        
        <IonButton onClick={handleLike}>
          <IonIcon icon={thumbsUpOutline} /> {likes} Likes
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DetallePost;
