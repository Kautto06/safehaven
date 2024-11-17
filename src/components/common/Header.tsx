import React, { useState,useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { menuOutline, personCircleOutline, notifications, logOutOutline } from 'ionicons/icons';
import '../../assets/common/header.css';
import logo from '../../assets/logos/logoNoBackground.png';
import { useAuthStore } from '../../hooks/auth/useAuthStore'; 
import { useHistory } from 'react-router-dom';



const DropdownMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="dropdown-menu">
            <IonList>
                <IonItem routerLink="/expertos" onClick={onClose}>
                    <IonLabel>Nuestros Expertos</IonLabel>
                </IonItem>
                <IonItem routerLink="/foro" onClick={onClose}>
                    <IonLabel>Foro</IonLabel>
                </IonItem>
                <IonItem routerLink="/denuncia" onClick={onClose}>
                    <IonLabel>Denuncia</IonLabel>
                </IonItem>
                <IonItem routerLink="/autoevaluacion" onClick={onClose}>
                    <IonLabel>Autoevaluación</IonLabel>
                </IonItem>
                <IonItem routerLink="/calendario" onClick={onClose}>
                    <IonLabel>Calendario de actividades</IonLabel>
                </IonItem>
                <IonItem routerLink="/notificaciones" onClick={onClose}>
                    <IonLabel>Notificaciones</IonLabel>
                </IonItem>
                <IonItem routerLink="/actividades" onClick={onClose}>
                            <IonLabel>Actividades</IonLabel>
                </IonItem>
                <IonItem routerLink="/admin" onClick={onClose}>
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
    const history = useHistory(); // Usar el hook useHistory para redirigir



    const toggleMenu = () => {
        setShowMenu(!showMenu); // Alterna entre true y false
        console.log("showMenu:", !showMenu);
    };


    const handleProfileRedirect = () => {
        history.push('/perfilusuario'); // Redirige directamente a la página de perfil de usuario
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
                    <div className="logo-button" onClick={() => (history.push('/'))}>
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