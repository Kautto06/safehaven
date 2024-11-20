import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import pageApi from '../../api/backend';
import { useAuthStore } from '../../hooks/auth/useAuthStore';
import { Footer, Header } from '../../components';
import { updateUser } from '../../store/auth/authSlice';

import '../../assets/perfil/EditarPerfil.css';

export const EditProfile: React.FC = () => {
  // Accedemos al usuario desde el estado de Redux
  const { user, status} = useAuthStore();
  const dispatch =useDispatch();
  const history = useHistory();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo caracteres alfabéticos y limitar a 100 caracteres
    if (/^[A-Za-záéíóúÁÉÍÓÚ\s]*$/.test(value) && value.length <= 100) {
      setName(value);
    }
  };
  
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo caracteres alfabéticos y limitar a 100 caracteres
    if (/^[A-Za-záéíóúÁÉÍÓÚ\s]*$/.test(value) && value.length <= 100) {
      setLastName(value);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo números y limitar a 9 caracteres
    if (/^\d{0,9}$/.test(value)) {
      setPhone(value);
    }
  };
  

  // Enviar los datos modificados al servidor utilizando axios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessages([]);
    let errors: string[] = [];
    if (phone.length !== 9) {
      errors.push('El número de teléfono debe tener 9 caracteres');
    }
  
    if (name.length === 0 || name.length > 100) {
      errors.push('El nombre debe tener entre 1 y 100 caracteres alfabéticos.');
    }
  
    if (lastName.length === 0 || lastName.length > 100) {
      errors.push('El apellido debe tener entre 1 y 100 caracteres alfabéticos.');
    }
  
    if (errors.length > 0) {
      setErrorMessages(errors); // Guardamos los errores en el estado
      return;
    }
    
  
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
        { nombre: name, apellidos: lastName, phone, email:localStorage.getItem("email") },
        { headers: { 'x-token': token } } // Asegúrate de incluir el token en los headers
      );
      
      
  
      const data = response.data;
  
      if (data.ok) {

        const aux={
          name,
          lastName,
          phone,
          email:user.email,
          gender:user.gender,
          birthday:user.birthday
        }
        dispatch(updateUser(aux))
        setShowSuccessMessage(true); // Mostrar el mensaje de éxito
        setTimeout(() => {
          setShowSuccessMessage(false); // Ocultar el mensaje después de 2 segundos
          window.location.href ='/PerfilUsuario'
        }, 2000);


      } else {
        setErrorMessages([data.msg]); // Si hay un error, mostrarlo
      }
    } catch (error) {
      setErrorMessages(['Error en la solicitud. Intenta de nuevo más tarde.']); // Mostrar mensaje de error en caso de excepción
    }
  };

  const handleCancel = () => {
    window.location.href ='/PerfilUsuario' // Redirige a la página de perfil
  };

  return (
    <IonPage>
      <Header />
      <div className="edit-profile-body">
        <div className="edit-profile-content">
          <h2>Editar Perfil</h2>
          <form onSubmit={handleSubmit} className="edit-profile-form">
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
                placeholder="Ejemplo: 911111111"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="save-button">Guardar Cambios</button>
              <button type="button" onClick={handleCancel} className="cancel-button">Volver</button>
            </div>
          </form>
          {showSuccessMessage && (
            <div className="success-message">Cambios guardados con éxito</div>
          )}
            {errorMessages.length > 0 && (
          <div className="error-messages">
            {errorMessages.map((error, index) => (
              <div key={index} className="error-message">{error}</div>
            ))}
          </div>
        )}
        </div>
      </div>
      <Footer />
    </IonPage>
  );
};