import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Para redirigir a la pestaña anterior
import { jwtDecode } from 'jwt-decode';
import '../../assets/denuncia/Denuncia.css'; // Importar los estilos
import { Footer, FooterDenuncia, Header } from '../../components';
import { crearDenuncia, actualizarImagenDenuncia } from './services/denuncia'; // Importamos la función de crear denuncia

export const Denuncia: React.FC = () => {
  const [violenceType, setViolenceType] = useState<string | undefined>(undefined);
  const [incidentLocation, setIncidentLocation] = useState<string>('');
  const [incidentDescription, setIncidentDescription] = useState<string>('');
  const [relationshipWithAggressor, setRelationshipWithAggressor] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false); // Estado para el popup
  const [alertMessage, setAlertMessage] = useState<string>(''); // Mensaje del popup
  const history = useHistory(); // Hook para manejar la redirección

  // Obtener el email del usuario desde el token almacenado
  const getUserEmail = (): string | null => {
    const token = localStorage.getItem('token'); // Ajusta el nombre del token según tu configuración
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.uid || null; // Asegúrate de que el token tenga un campo 'email'
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  };

  // Manejar la selección de archivo
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userEmail = getUserEmail();
    if (!userEmail) {
      setAlertMessage('No se pudo obtener la información del usuario. Por favor, inicia sesión nuevamente.');
      setShowAlert(true);
      return;
    }

    if (!violenceType || !incidentLocation || !incidentDescription || !relationshipWithAggressor) {
      setAlertMessage('Por favor, complete todos los campos obligatorios');
      setShowAlert(true);
      return;
    }

    try {
      const newDenuncia = {
        TipoViolencia: violenceType,
        UbicacionIncidente: incidentLocation,
        Contenido: incidentDescription,
        RelacionAgresor: relationshipWithAggressor,
        estado: 'Pendiente',
        ID_USUARIO: userEmail, // Incluimos el ID_USUARIO
      };

      // Si hay archivo, incluirlo en la creación
      let createdDenuncia;
      if (file) {
        createdDenuncia = await crearDenuncia(newDenuncia); // Llamamos al servicio con el archivo
        createdDenuncia = await actualizarImagenDenuncia(createdDenuncia.ID, file);
      } else {
        createdDenuncia = await crearDenuncia(newDenuncia); // Llamamos al servicio sin archivo
      }

      // Si la denuncia se creó correctamente
      setAlertMessage('La denuncia se ha enviado correctamente.');
      setShowAlert(true); // Mostramos el popup de éxito
    } catch (error) {
      setAlertMessage('Hubo un error al enviar la denuncia. Inténtalo nuevamente.');
      setShowAlert(true); // Mostramos el popup de error
    }
  };

  // Manejar la redirección después de aceptar el popup
  const handleAlertDismiss = () => {
    setShowAlert(false);
    history.push('/denuncia'); // Redirigimos a la página de denuncia
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="report-body">
        <main>
          <h1 className="anonymous-report-title">Denuncia Anónima</h1>
          <form className="anonymous-report-form" onSubmit={handleSubmit}>
            {/* Tipo de violencia */}
            <IonItem className="form-section">
              <IonLabel className="violence-type">Tipo de violencia:</IonLabel>
              <div className="select-container">
                <IonSelect
                  id="violence-type"
                  name="violence-type"
                  placeholder="Seleccionar opción"
                  value={violenceType}
                  onIonChange={(e) => setViolenceType(e.detail.value)}
                >
                  <IonSelectOption value="psicologica">Psicológica</IonSelectOption>
                  <IonSelectOption value="fisica">Física</IonSelectOption>
                  <IonSelectOption value="sexual">Sexual</IonSelectOption>
                  <IonSelectOption value="economica">Económica</IonSelectOption>
                  <IonSelectOption value="verbal">Verbal</IonSelectOption>
                </IonSelect>
              </div>
            </IonItem>

            {/* Ubicación del incidente */}
            <IonItem className="form-section">
              <IonLabel position="stacked">Ubicación del incidente:</IonLabel>
              <IonTextarea
                id="incident-location"
                rows={3}
                placeholder="Describe la ubicación del incidente"
                value={incidentLocation}
                onIonChange={(e) => setIncidentLocation(e.detail.value!)}
              ></IonTextarea>
            </IonItem>

            {/* Descripción del incidente */}
            <IonItem className="form-section">
              <IonLabel position="stacked">Descripción del incidente:</IonLabel>
              <IonTextarea
                id="incident-description"
                rows={3}
                placeholder="Describe el incidente"
                value={incidentDescription}
                onIonChange={(e) => setIncidentDescription(e.detail.value!)}
              ></IonTextarea>
            </IonItem>

            {/* Relación con el agresor */}
            <IonItem className="form-section">
              <IonLabel position="stacked">Relación con el agresor:</IonLabel>
              <IonTextarea
                id="relationship-with-aggressor"
                rows={3}
                placeholder="Describe tu relación con el agresor"
                value={relationshipWithAggressor}
                onIonChange={(e) => setRelationshipWithAggressor(e.detail.value!)}
              ></IonTextarea>
            </IonItem>

            {/* Adjuntar pruebas */}
            <IonItem className="form-section">
              <IonLabel position="stacked">Adjuntar pruebas (Opcional):</IonLabel>
              <div className="file-upload">
                <input type="file" onChange={handleFileChange} />
              </div>
            </IonItem>

            {/* Botón de envío */}
            <IonButton type="submit" expand="block" fill="clear" className="submit-button">
              Enviar
            </IonButton>
          </form>
        </main>
      </IonContent>
      <Footer />
      
      {/* Popup de confirmación */}
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={handleAlertDismiss}
        header="Confirmación"
        message={alertMessage}
        buttons={[
          {
            text: 'Aceptar',
            handler: handleAlertDismiss,
          },
        ]}
      />
    </IonPage>
  );
};
