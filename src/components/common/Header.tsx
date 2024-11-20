import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { menuOutline, personCircleOutline, notifications, logOutOutline } from 'ionicons/icons';
import '../../assets/common/header.css';
import logo from '../../assets/logos/logoNoBackground.png';
import { useAuthStore } from '../../hooks/auth/useAuthStore';
import { useHistory } from 'react-router-dom';

// DropdownMenu con window.location.href
const DropdownMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
                <IonItem onClick={() => handleNavigation("/admin")} routerLink='/admin'>
                    <IonLabel>Modo Admin</IonLabel>
                </IonItem>
            </IonList>
        </div>
    );
};

export const Header: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { startLogout } = useAuthStore();
    const history = useHistory();

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
            {showMenu && <DropdownMenu onClose={() => setShowMenu(false)} />}
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
