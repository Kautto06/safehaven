import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonSpinner,IonTextarea  } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import pageApi from '../../api/backend'; // Asegúrate de tener configurado el backend
import { useAuthStore } from '../../hooks/auth/useAuthStore';
import { Footer, Header } from '../../components';




export const CrearPublicacion: React.FC = () => {
  // Accedemos al usuario desde el estado de Redux
  const { user, status } = useAuthStore();
  const dispatch = useDispatch();
  const history = useHistory();
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

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

  const handleTituloChange = (event: any) => {
    setTitulo(event.detail.value);
  };
  
  const handleContenidoChange = (event: any) => {
    setContenido(event.detail.value);
  };
  

  // Enviar los datos modificados al servidor utilizando axios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessages([]);
    let errors: string[] = [];
    if (titulo.length === 0 || titulo.length > 100) {
      errors.push('El título debe tener entre 1 y 100 caracteres.');
    }

    if (contenido.length === 0 || contenido.length > 1000) {
      errors.push('El contenido debe tener entre 1 y 1000 caracteres.');
    }

    if (errors.length > 0) {
      setErrorMessages(errors); // Guardamos los errores en el estado
      return;
    }

    const token = localStorage.getItem('token'); // Obtener el token desde el almacenamiento local
    console.log('Token enviado en la solicitud:', token);

    if (!token) {
      console.error('Token no disponible');
      return;  // Si no hay token, no envíes la solicitud
    }

    try {
      // Enviar la solicitud al backend con el token y los datos de la publicación
      const response = await pageApi.post(
        '/foro/crear', // Ruta del backend para crear la publicación
        { Titulo: titulo, Contenido: contenido, ID_Usuario: user.email },
        { headers: { 'x-token': token } } // Asegúrate de incluir el token en los headers
      );

      const data = response.data;

      if (data.ok) {
        setShowSuccessMessage(true); // Mostrar el mensaje de éxito
        setTimeout(() => {
          setShowSuccessMessage(false); // Ocultar el mensaje después de 2 segundos
          history.push('/foro'); // Redirigir a la página del foro o a donde quieras
        }, 2000);
      } else {
        setErrorMessages([data.msg]); // Si hay un error, mostrarlo
      }
    } catch (error) {
      setErrorMessages(['Error en la solicitud. Intenta de nuevo más tarde.']); // Mostrar mensaje de error en caso de excepción
    }
  };

  const handleCancel = () => {
    history.push('/foro'); // Redirige a la página del foro si cancela
  };

  return (
    <IonPage>
      <Header />
      <div className="edit-profile-body">
        <div className="edit-profile-content">
          <h2>Crear Publicación</h2>
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div>
              <label>Título:</label>
              <IonInput
                value={titulo}
                onIonChange={handleTituloChange}
                placeholder="Ingresa el título de la publicación"
              />
            </div>
            <div>
              <label>Contenido:</label>
              <IonTextarea
                value={contenido}
                onIonInput={handleContenidoChange}  // Usamos IonInput para el textarea
                placeholder="Escribe el contenido aquí"
                />
            </div>
            <div className="button-group">
              <IonButton type="submit" className="save-button">Publicar</IonButton>
              <IonButton type="button" onClick={handleCancel} className="cancel-button">Cancelar</IonButton>
            </div>
          </form>
          {showSuccessMessage && (
            <div className="success-message">Publicación creada con éxito</div>
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
