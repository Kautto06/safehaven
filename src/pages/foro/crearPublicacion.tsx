import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import pageApi from '../../api/backend'; // Asegúrate de tener configurado el backend
import { useAuthStore } from '../../hooks/auth/useAuthStore';
import { Footer, Header } from '../../components';

import '../../assets/foro/crearPost.css';

export const CrearPublicacion: React.FC = () => {
  const { user, status } = useAuthStore();
  const dispatch = useDispatch();
  const history = useHistory();
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Agregar una clase única al body cuando el componente se monte
  useEffect(() => {
    document.body.classList.add('create-post-page');

    // Eliminar la clase cuando el componente se desmonte
    return () => {
      document.body.classList.remove('create-post-page');
    };
  }, []);

  if (status !== 'authenticated' || !user || !('name' in user)) {
    return (
      <IonPage className="loading-page">
        <Header />
        <IonContent className="loading-content">
          <div className="loading-container">
            <IonSpinner name="bubbles" className="loading-spinner" />
            <p className="loading-text">Cargando...</p>
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    );
  }

  const handleTituloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(event.target.value);
  };

  const handleContenidoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContenido(event.target.value);
  };

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
      setErrorMessages(errors);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no disponible');
      return;
    }

    try {
      const response = await pageApi.post(
        '/foro/crear',
        { Titulo: titulo, Contenido: contenido, ID_Usuario: user.email },
        { headers: { 'x-token': token } }
      );

      const data = response.data;

      if (data.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          window.location.href = '/foro'
        }, 2000);
      } else {
        setErrorMessages([data.msg]);
      }
    } catch (error) {
      setErrorMessages(['Error en la solicitud. Intenta de nuevo más tarde.']);
    }
  };

  const handleCancel = () => {
    window.location.href = '/foro'
  };

  return (
    <IonPage className="create-post-page">
      <Header/>
      <div className="create-post-body">
        <div className="create-post-content">
          <h2 className="create-post-title">Crear Publicación</h2>
          <form onSubmit={handleSubmit} className="create-post-form">
            <div className="form-group">
              <label className="form-label">Título:</label>
              <input
                type="text"
                value={titulo}
                onChange={handleTituloChange}
                placeholder="Ingresa el título de la publicación"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Contenido:</label>
              <textarea
                value={contenido}
                onChange={handleContenidoChange}
                placeholder="Escribe el contenido aquí"
                className="form-textarea"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="button save-button">
                Publicar
              </button>
              <button type="button" onClick={handleCancel} className="button cancel-button">
                Cancelar
              </button>
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
      <Footer/>
    </IonPage>
  );
};
