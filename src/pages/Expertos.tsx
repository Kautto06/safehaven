import React, { useState } from 'react';

import { IonPage, IonHeader, IonContent, IonImg, IonButton, IonIcon, IonPopover, IonList, IonItem, IonLabel, IonToast } from '@ionic/react';
import { callOutline, arrowBackOutline, arrowForwardOutline, funnelOutline } from 'ionicons/icons';
import '../assets/Expertos.css';
import logo from '../assets/Logos/logoNoBackground.png';
import profile from '../assets/images/profile.svg';
import Header from '../components/Header';

const Expertos: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<any | undefined>(undefined);
  const [showToast, setShowToast] = useState(false);

  const openPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent); // Usa `nativeEvent` para obtener el evento del DOM
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
    setPopoverEvent(undefined);
  };

  const copyPhoneNumber = async (phoneNumber: string) => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setShowToast(true); // Muestra la alerta
    } catch (error) {
      console.error('Error al copiar el número:', error);
    }
  };
  return (
    <IonPage>
      {/* Header */}
      <Header/>

      {/* Main content */}
      <IonContent className='experts-body'>
        <main>
          <h1>Expertos</h1>
          <div className="header-right">
            <span>Expertos más destacados</span>
            <IonButton fill="clear" className="sort-button" onClick={openPopover}>
              <IonIcon slot="icon-only" icon={funnelOutline}></IonIcon>
            </IonButton>

            {/* Popover (Dropdown Menu) */}
            <IonPopover
              isOpen={showPopover}
              event={popoverEvent}
              onDidDismiss={closePopover}
            >
              <IonList>
                <IonItem button onClick={() => console.log('Ordenar por nombre')}>
                  <IonLabel>Ordenar por nombre</IonLabel>
                </IonItem>
                <IonItem button onClick={() => console.log('Ordenar por fecha')}>
                  <IonLabel>Ordenar por fecha</IonLabel>
                </IonItem>
                <IonItem button onClick={() => console.log('Ordenar por popularidad')}>
                  <IonLabel>Ordenar por popularidad</IonLabel>
                </IonItem>
              </IonList>
            </IonPopover>
          </div>

          {/* Expert List */}
          <section className="experts-content">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="forum-item" key={index}>
                <IonImg src={profile} alt="Imagen experto" className="forum-image" />
                <div className="forum-text">
                  <h2 className="forum-title">Título del Mensaje {index + 1}</h2>
                  <p>
                    Ejemplo de contenido del mensaje del experto. Aquí puedes poner un resumen del mensaje o tema que se está discutiendo.
                  </p>
                  <IonButton className="view-button">Ver</IonButton>
                </div>
                <IonButton
                  className="phone-button"
                  fill="outline"
                  onClick={() => copyPhoneNumber('+123456789')}
                >
                  <IonIcon icon={callOutline} />
                  Contactar
                </IonButton>
              </div>
            ))}
          </section>
        </main>

        {/* Pagination */}
        <div className="pagination">
          <IonButton fill="clear" className="pagination-link">
            <IonIcon slot="start" icon={arrowBackOutline}></IonIcon>
            Anterior
          </IonButton>
          <IonButton fill="clear" className="pagination-link">1</IonButton>
          <IonButton fill="clear" className="pagination-link">2</IonButton>
          <IonButton fill="clear" className="pagination-link">3</IonButton>
          <IonButton fill="clear" className="pagination-link">
            Siguiente
            <IonIcon slot="end" icon={arrowForwardOutline}></IonIcon>
          </IonButton>
        </div>
      </IonContent>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Número copiado al portapapeles"
        duration={1500}
        position="bottom"
      />
    </IonPage>
  );
};

export default Expertos;