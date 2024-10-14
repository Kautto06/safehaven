import React from 'react';
import { IonContent, IonPage, IonTitle, IonButton, IonInput, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import Header from '../components/Header'; // Asegúrate de que la ruta sea la correcta
import Footer from '../components/Footer';
import '../assets/Actividades.css';

const Actividades: React.FC = () => {
  return (
    <IonPage>
      <Header /> {/* Importa el componente de tu header aquí */}
        <IonContent class='activity-body'>
            <section className="activity-section">
                <h1>Tu actividad</h1>

                <div className="search-bar">
                    <input className="search-bar-input" placeholder="Ingrese Busqueda" />
                    <IonButton className='search-bar-button' fill='clear'>Buscar</IonButton>
                </div>

                <div className='activity-grid'>
                    {[...Array(6)].map((_, i) => (
                        <div className="activity-card">
                            <div className="activity-icon">ℹ️</div>
                            <div className="activity-content">
                                <h2>Title</h2>
                                <p>Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.</p>
                            </div>
                        </div>
                    ))}
                    
                </div>

                <div className="pagination">
                    <IonButton className='pagination-link'>&laquo; Anterior</IonButton>
                    <IonButton className='pagination-link'>1</IonButton>
                    <IonButton className='pagination-link'>2</IonButton>
                    <IonButton className='pagination-link'>3</IonButton>
                    <IonButton className='pagination-link'>Siguiente &raquo;</IonButton>
                </div>
            </section>
        </IonContent>
        <Footer/>
    </IonPage>
  );
};

export default Actividades;
