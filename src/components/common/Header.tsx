import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { menuOutline, personCircleOutline, notifications, logOutOutline } from 'ionicons/icons';
import '../../assets/common/header.css';
import logo from '../../assets/logos/logoNoBackground.png';
import { useAuthStore } from '../../hooks/auth/useAuthStore';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import pageApi from '../../api/backend';

// DropdownMenu con window.location.href
const DropdownMenu: React.FC<{ onClose: () => void, isAdmin: boolean }> = ({ onClose, isAdmin }) => {
    const handleNavigation = (path: string) => {
        window.location.href = path; // Redirige a la ruta
        onClose(); // Cierra el menú
    };

    return (
        <div className="dropdown-menu">
            <IonList>
                <IonItem onClick={() => handleNavigation("/expertos")} routerLink='/expertos'>
                    <IonLabel>Nuestros Expertos</IonLabel>
                </IonItem>
                <IonItem onClick={() => handleNavigation("/foro")} routerLink='/foro'>
                    <IonLabel>Foro</IonLabel>
                </IonItem>
                <IonItem onClick={() => handleNavigation("/denuncia")} routerLink='/denuncia'>
                    <IonLabel>Denuncia</IonLabel>
                </IonItem>
                <IonItem onClick={() => handleNavigation("/autoevaluacion")} routerLink='/autoevaluacion'>
                    <IonLabel>Autoevaluación</IonLabel>
                </IonItem>
                <IonItem onClick={() => handleNavigation("/calendario")} routerLink='/calendario'>
                    <IonLabel>Calendario de actividades</IonLabel>
                </IonItem>
                <IonItem onClick={() => handleNavigation("/notificaciones")} routerLink='/notificaciones'>
                    <IonLabel>Notificaciones</IonLabel>
                </IonItem>
                <IonItem onClick={() => handleNavigation("/actividades")} routerLink='/actividades'>
                    <IonLabel>Actividades</IonLabel>
                </IonItem>
                {/* Mostrar solo si es admin */}
                {isAdmin && (
                    <IonItem onClick={() => handleNavigation("/admin")} routerLink='/admin'>
                        <IonLabel>Modo Admin</IonLabel>
                    </IonItem>
                )}
            </IonList>
        </div>
    );
};

export const Header: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);  // Nuevo estado para controlar si el usuario es admin
    const { startLogout } = useAuthStore();
    const history = useHistory();
    const email = localStorage.getItem("email"); // Suponiendo que el correo está guardado en localStorage

    // Función para obtener el usuario y verificar el rol
    const fetchUserRole = async () => {
        if (email) {
            try {
                const {data} = await pageApi.get(`/user/`, { params:{ email }}); // Ajusta la URL según tu API
                if (data[0].Rol === 'Admin') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario", error);
            }
        }
    };

    useEffect(() => {
        fetchUserRole(); // Obtener el rol del usuario al montar el componente
    }, [email]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleProfileRedirect = () => {
        window.location.href = "/perfilusuario"; // Redirige directamente a la página de perfil de usuario
    };

    const handleLogout = async () => {
        startLogout();
        localStorage.clear(); // Limpia el localStorage
        setShowProfileMenu(false);
        window.location.href = "/login"; // Redirige a la página de inicio de sesión
    };

    return (
        <IonHeader>
            <IonToolbar className='cabecera'>
                <IonTitle className="header-title">
                    <div className="logo-button" onClick={() => (window.location.href = '/')}>
                        <img src={logo} alt="Logo" className="header-logo" />
                    </div>
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={toggleMenu} aria-expanded={showMenu} aria-label="Abrir menú">
                        <IonIcon icon={menuOutline} />
                    </IonButton>
                    <IonButton onClick={handleProfileRedirect} aria-label="Ir al perfil de usuario">
                        <IonIcon icon={personCircleOutline} />
                    </IonButton>
                    <IonButton routerLink="/notificaciones" aria-label="Ir a notificaciones">
                        <IonIcon icon={notifications} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            {showMenu && <DropdownMenu onClose={() => setShowMenu(false)} isAdmin={isAdmin} />}
            {showProfileMenu && (
                <div className="dropdown-menu">
                    <IonList>
                        <IonItem className='logout-button' onClick={handleLogout} aria-label="Cerrar sesión">
                            <IonIcon icon={logOutOutline} slot="start" />
                            <IonLabel>Cerrar Sesión</IonLabel>
                        </IonItem>
                    </IonList>
                </div>
            )}
        </IonHeader>
    );
};
