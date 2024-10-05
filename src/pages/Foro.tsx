import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonImg } from '@ionic/react';
import { thumbsUpOutline, createOutline, chevronBackOutline, chevronForwardOutline, filterOutline } from 'ionicons/icons';
import Header from '../components/Header';
import '../assets/Foro.css'


const Foro: React.FC = () => {
  const [likes, setLikes] = useState<number[]>(Array(4).fill(10)); // Inicializa con 10 likes en cada publicación
  const [liked, setLiked] = useState<boolean[]>(Array(4).fill(false)); // Estado para indicar si se ha dado "like"

  const handleLikeClick = (index: number) => {
    const newLikes = [...likes];
    const newLiked = [...liked];
    
    // Alternar el estado de "liked"
    if (newLiked[index]) {
      newLikes[index] -= 1; // Disminuye si ya se había dado "like"
    } else {
      newLikes[index] += 1; // Aumenta si no se había dado "like"
    }
    
    newLiked[index] = !newLiked[index]; // Cambia el estado de "liked"
    
    setLikes(newLikes); // Actualiza el estado de likes
    setLiked(newLiked); // Actualiza el estado de liked
  };
  return (
    <IonPage>
      <Header/>

      <IonContent className='forum-body'>
        <main>
          <h1>AlvaroWeko</h1>
          <div className="header-right">
            <span>Publicaciones más populares</span>
            <IonButton fill="clear" className="sort-button">
              <IonIcon slot="icon-only" icon={filterOutline} />
            </IonButton>
          </div>

          <section className="forum-content">
            {Array(4).fill(0).map((_, idx) => (
              <div key={idx} className="forum-item">
                <IonImg src="https://d22kgo07nfc6jd.cloudfront.net/media/upload/fbf50514e50f8574fea6db58da3909273ddb330669c9dec57b82abbf19165.jpg" alt="Imagen del foro" className="forum-image" />
                <div className='forum-text'>
                  <h2 className='forum-title'>Título del Mensaje</h2 >
                  <p>Ejemplo de contenido del mensaje del foro. Aquí puedes poner un resumen del mensaje o tema que se está discutiendo.</p>
                  <IonButton className='view-button'>Ver</IonButton>
                </div>
                  
                <IonButton fill="clear" className="like-button" onClick={() => handleLikeClick(idx)}>
                <IonIcon icon={thumbsUpOutline} /> {likes[idx]}
              </IonButton>
              </div>
            ))}
          </section>
        </main>

        <div className="pagination">
          <IonButton fill="clear" className="pagination-link">
            <IonIcon icon={chevronBackOutline} /> Anterior
          </IonButton>
          <IonButton fill="clear" className="pagination-link">1</IonButton>
          <IonButton fill="clear" className="pagination-link">2</IonButton>
          <IonButton fill="clear" className="pagination-link">3</IonButton>
          <IonButton fill="clear" className="pagination-link">
            Siguiente <IonIcon icon={chevronForwardOutline} />
          </IonButton>
        </div>

        <div className="create-post-container">
          <IonButton className='create-post-button'>
            <IonIcon slot="start" icon={createOutline} /> Crear publicación
          </IonButton>
        </div>
        

        
      </IonContent>
    </IonPage>
  );
};

export default Foro;
