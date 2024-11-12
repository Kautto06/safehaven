import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import React, { useState } from 'react';
import { IonContent, IonPage, IonButton, IonIcon, IonImg, IonSpinner } from '@ionic/react';
import { createOutline} from 'ionicons/icons';

import { useAuthStore } from '../hooks/useAuthStore'; 
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import profile from '../assets/images/profile.svg';
import '../assets/PerfilUsuario.css';

const UserProfile: React.FC = () => {
  const { user, status } = useSelector((state: RootState) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { startLogout } = useAuthStore();
  const history = useHistory();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES').format(date);
  };

  const handleLogout = async () => {
    startLogout(); // Llama a la función para cerrar sesión
    localStorage.clear(); // Limpia el localStorage
    setShowProfileMenu(false); // Cierra el menú de perfil
    history.push('/login'); // Redirige a la página de inicio de sesión
};
const handleEditProfile = () => {
  history.push('/EditarPerfil'); // Redirige a una página de edición
};

  if (status !== 'authenticated' || !user || !('name' in user)) {
    return (
      <IonPage>
        <Header />
        <IonContent>
          <div className="loading-container">
            <IonSpinner name="bubbles" />
            <p>Cargando...</p>
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Header />
      <div className='profile-body'>
        <div className='user-profile-content'>
          <h1>Perfil usuario</h1>
          <div className="profile-detail">
          <IonImg src={profile} alt="Imagen perfil" className="profile-image" />
            <p><span>Nombre:</span> {user.name}</p>
            <p><span>Apellido:</span> {user.lastName}</p>
            <p><span>Email:</span> {user.email}</p>
            <p><span>Fecha de Nacimiento:</span> {formatDate(user.birthday)}</p>
            <p><span>Teléfono:</span> {user.phone}</p>
          </div>
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            <span className="edit-icon">
              <IonIcon icon={createOutline} />
            </span>
            Editar Perfil
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
      <Footer />
    </IonPage>
  );
};

export default UserProfile;
