import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { menuOutline, personCircleOutline, notifications, logOutOutline } from 'ionicons/icons';
import '../assets/header.css'; 
import logo from '../assets/logos/logoNoBackground.png';
import { useAuthStore } from '../hooks/useAuthStore'; 
import { useHistory } from 'react-router-dom';

const DropdownMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="dropdown-menu">
            <IonList>
                <IonItem routerLink="/Expertos" onClick={onClose}>
                    <IonLabel>Nuestros Expertos</IonLabel>
                </IonItem>
                <IonItem routerLink="/Foro" onClick={onClose}>
                    <IonLabel>Foro</IonLabel>
                </IonItem>
                <IonItem routerLink="/Denuncia" onClick={onClose}>
                    <IonLabel>Denuncia</IonLabel>
                </IonItem>
                <IonItem routerLink="/Autoevaluacion" onClick={onClose}>
                    <IonLabel>Autoevaluación</IonLabel>
                </IonItem>
                <IonItem routerLink="/Calendario" onClick={onClose}>
                    <IonLabel>Calendario de actividades</IonLabel>
                </IonItem>
                <IonItem routerLink="/Actividades" onClick={onClose}>
                    <IonLabel>Actividades</IonLabel>
                </IonItem>
                <IonItem routerLink="/Notificaciones" onClick={onClose}>
                    <IonLabel>Notificaciones</IonLabel>
                </IonItem>
            </IonList>
        </div>
    );
};

const Header: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { startLogout } = useAuthStore();
    const history = useHistory(); // Usar el hook useHistory para redirigir

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleLogout = async () => {
        startLogout(); // Llama a la función para cerrar sesión
        localStorage.clear(); // Limpia el localStorage
        setShowProfileMenu(false); // Cierra el menú de perfil
        history.push('/login'); // Redirige a la página de inicio de sesión
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
                    <IonButton onClick={toggleProfileMenu} aria-expanded={showProfileMenu} aria-label="Abrir menú de perfil">
                        <IonIcon icon={personCircleOutline} />
                    </IonButton>
                    <IonButton routerLink="/Notificaciones" aria-label="Ir a notificaciones">
                        <IonIcon icon={notifications} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            {showMenu && <DropdownMenu onClose={() => setShowMenu(false)} />}
            {showProfileMenu && (
                <div className="dropdown-menu">
                    <IonList>
                        <IonItem routerLink="/Actividades" onClick={() => setShowProfileMenu(false)}>
                            <IonLabel>Actividades</IonLabel>
                        </IonItem>
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

export default Header;
