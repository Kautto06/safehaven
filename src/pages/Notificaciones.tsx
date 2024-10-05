import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonImg,
} from '@ionic/react';
import Header from '../components/Header';
import '../assets/Notificaciones.css';
import { chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';
import markAsRead from '../helpers/vermas'
const Notificaciones: React.FC = () => {
    const [notifications, setNotifications] = useState(
        Array(5).fill({
          title: "Title",
          content: "Lorem ipsum dolor sit amet. Aut magnam assumenda non porro dolor...",
          isRead: false // Estado de lectura inicial
        })
    );

    const unreadCount = notifications.filter(notification => !notification.isRead).length;

    const handleReadNotification = (index: number) => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification, i) =>
            i === index ? { ...notification, isRead: true } : notification
          )
        );
    };

    

    return (
        <IonPage>
            <Header />
            <IonContent className='notification-body'>
                <main>
                    <div className="notification-container">
                        <div className="notification-header">
                            <h1>Notificaciones</h1>
                            <div className="notification-bell">
                                🔔
                                {unreadCount > 0 && (
                                    <span className="notification-count">{unreadCount}</span> // Contador de notificaciones no leídas
                                )}
                            </div>
                        </div>

                        {notifications.map((notification, index) => (
                            <div className="notification-card" key={index}>
                                <div className='notification-title'>{notification.title}</div>
                                <div className='notification-content'>{notification.content}</div>
                                <IonButton className='notification-button' onClick={()=>handleReadNotification(index)}>Ver más</IonButton>
                                <span className="close-btn">&times;</span>
                                <div className={`notification-status ${notification.isRead ? 'read-status' : ''}`}>
                                    {notification.isRead ? 'Leído' : ''}
                                </div>
                            </div>
                        ))}

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
                    </div>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default Notificaciones;

