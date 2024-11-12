import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';
import { IonContent, IonPage, IonButton, IonIcon, IonImg, IonSpinner } from '@ionic/react';
import pageApi from '../../api/backend';
import { useAuthStore } from '../../hooks/auth/useAuthStore';
import { Footer, Header } from '../../components';

export const EditProfile: React.FC = () => {
  // Accedemos al usuario desde el estado de Redux
  const { user, status} = useAuthStore();

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

  // Estado para los datos del formulario
  const [name, setName] = useState(user?.name || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // Si no está autenticado, mostramos la página de carga
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

  // Enviar los datos modificados al servidor utilizando axios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Aquí es donde verificas si el token está disponible antes de enviar la solicitud
    const token = localStorage.getItem('token'); // Obtener el token desde el almacenamiento local
    console.log("Token enviado en la solicitud:",token)
  
    if (!token) {
      console.error('Token no disponible');
      return;  // Si no hay token, no envíes la solicitud
    }
  
    try {
      // Enviar la solicitud al backend con el token y los datos actualizados
      const response = await pageApi.put(
        '/user/update',
        { nombre: name, apellidos: lastName, phone },
        { headers: { 'x-token': token } } // Asegúrate de incluir el token en los headers
      );
  
      const data = response.data;
  
      if (data.ok) {
        console.log('Usuario actualizado:', data.user);
      } else {
        console.log('Error al actualizar:', data.msg);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="profile-form">
          <h2>Editar Perfil</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Apellido:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label>Teléfono:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit">Guardar Cambios</button>
          </form>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

