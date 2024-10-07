import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { menuOutline } from 'ionicons/icons';
import '../assets/header.css'; 
import logo from '../assets/logos/logoNoBackground.png'


const DropdownMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="dropdown-menu">
            <IonList>
                <IonItem routerLink="/login" onClick={onClose}>
                    <IonLabel>Login</IonLabel>
                </IonItem>
                <IonItem routerLink="/Expertos" onClick={onClose}>
                    <IonLabel>NuestroExpertos</IonLabel>
                </IonItem>
                <IonItem routerLink="/Foro" onClick={onClose}>
                    <IonLabel>Foro</IonLabel>
                </IonItem>
                <IonItem routerLink="/Denuncia" onClick={onClose}>
                    <IonLabel>Denuncia</IonLabel>
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

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <IonHeader>
            <IonToolbar className='cabecera'>
                <IonTitle className="header-title">
                    <img src={logo} alt="Logo" className="header-logo" />
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={toggleMenu} aria-expanded={showMenu} aria-label="Abrir menú">
                        <IonIcon icon={menuOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            {showMenu && <DropdownMenu onClose={() => setShowMenu(false)} />}
        </IonHeader>
    );
};

export default Header;
