import React, { useState, useEffect } from 'react';
import { Footer, Header } from '../../components';
import pageApi from '../../api/backend'; // Aquí importas la API de backend
import { IonPage } from '@ionic/react';

import '../../assets/notificaciones/Notificaciones.css';

export const Notificaciones: React.FC = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await pageApi.get('/notificaciones/paginado', {
                    params: { page: currentPage, limit: 5 } // Ajuste de los parámetros
                });
               
                setNotifications(response.data.notifications);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error al cargar las notificaciones", error);
            }
        };
    
        fetchNotifications();
    }, [currentPage]);

    const handlePagination = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <IonPage id="notificaciones-page">
            <Header />
            <div className="notification-body">
                <main>
                    <div className="notification-container">
                        <div className="notification-header">
                            <h1>Notificaciones SafeHaven</h1>
                        </div>

                        {notifications && notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification.notificationId} className="notification-card-wrapper">
                                    <div className="notification-card">
                                        <h2>{notification.Titulo}</h2>
                                        <p>{notification.Contenido}</p>
                                        <p>{notification.Descripcion}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron notificaciones</p>
                        )}

                        <div className="pagination">
                            <button 
                                className="pagination-link" 
                                disabled={currentPage === 1} 
                                onClick={() => handlePagination(currentPage - 1)}>
                                Anterior
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button 
                                    key={i} 
                                    className={`pagination-link ${currentPage === i + 1 ? 'active' : ''}`} 
                                    onClick={() => handlePagination(i + 1)}>
                                    {i + 1}
                                </button>
                            ))}

                            <button 
                                className="pagination-link" 
                                disabled={currentPage === totalPages} 
                                onClick={() => handlePagination(currentPage + 1)}>
                                Siguiente
                            </button>
                        </div>
                        
                    </div>
                    
                </main>
                <Footer />
            </div>
        </IonPage>
    );
};
