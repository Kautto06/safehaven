// src/pages/AutoevaluacionInfo.tsx
import React from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import '../../assets/autoevaluacion/InfoAutoevaluacion.css';
import { useHistory } from 'react-router';
import { Footer, Header } from '../../components';

export const AutoevaluacionInfo: React.FC = () => {
    const history = useHistory();
    return (
    <IonPage>
      <Header />
      <div className="info-body">
        <main className='main-info'>
          <h1 className='infoAut-header'>Autoevaluación de Relaciones Personales</h1>
          <p className='parrafo-infoAut'>
            Esta autoevaluación tiene como objetivo ayudarte a reflexionar sobre algunos aspectos
            importantes de tus relaciones personales. Las preguntas abordan temas sensibles como el
            respeto, la autonomía, la seguridad y el bienestar en las relaciones.
          </p>
          <p className='parrafo-infoAut'>
            Al responder, te invitamos a que seas lo más honesto/a posible. Las respuestas que
            brindes son confidenciales y pueden ayudarte a identificar patrones o señales de alerta en
            tus relaciones. Recuerda que esta herramienta es solo un recurso y no reemplaza el
            acompañamiento profesional.
          </p>
          <p className='parrafo-infoAut'>
            Si alguna de las preguntas te genera incomodidad o te hace reflexionar sobre una
            situación preocupante, considera buscar apoyo de profesionales o redes de apoyo en tu
            comunidad. 
          </p>

          <IonButton className="begin-button"  expand="block" onClick={() => history.push('/autoevaluacion/formulario')}>
            Comenzar Autoevaluación
          </IonButton>
        </main>
      </div>
      <Footer />
    </IonPage>
  );
};

