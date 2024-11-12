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
} from '@ionic/react';
 // Asumiendo que ya tienes el Footer creado
import '../../assets/denuncia/Denuncia.css'; // Importar los estilos
import { Footer, FooterDenuncia, Header } from '../../components';





export const Denuncia: React.FC = () => {
  const [violenceType, setViolenceType] = useState<string | undefined>(undefined);
  const [incidentLocation, setIncidentLocation] = useState<string>('');
  const [incidentDescription, setIncidentDescription] = useState<string>('');
  const [relationshipWithAggressor, setRelationshipWithAggressor] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log({
      violenceType,
      incidentLocation,
      incidentDescription,
      relationshipWithAggressor,
      file,
    });
  };

  return (
    <IonPage>
      <Header /> 
      <IonContent className='report-body'>
        <main>
          <h1 className="anonymous-report-title">Denuncia Anónima</h1>
          <form className="anonymous-report-form" onSubmit={handleSubmit}>
            {/* Tipo de violencia */}
            <IonItem className='form-section'>
              <IonLabel className='violence-type'>Tipo de violencia:</IonLabel>
              <div className='select-container'>
                <IonSelect
                    id='violence-type'
                    name='violence-type'
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
            <IonItem className='form-section'>
              <IonLabel position='stacked'>Ubicación del incidente:</IonLabel>
              <IonTextarea
                id='incident-location'
                rows={3}
                placeholder="Describe la ubicación del incidente"
                value={incidentLocation}
                onIonChange={(e) => setIncidentLocation(e.detail.value!)}
              ></IonTextarea>
            </IonItem>

            {/* Descripción del incidente */}
            <IonItem className='form-section'>
              <IonLabel position='stacked'>Descripción del incidente:</IonLabel>
              <IonTextarea
                id='incident-description'
                rows={3}
                placeholder="Describe el incidente"
                value={incidentDescription}
                onIonChange={(e) => setIncidentDescription(e.detail.value!)}
              ></IonTextarea>
            </IonItem>

            {/* Relación con el agresor */}
            <IonItem className='form-section'>
              <IonLabel position='stacked'>Relación con el agresor:</IonLabel>
              <IonTextarea
                id='relationship-with-aggressor'
                rows={3}
                placeholder="Describe tu relación con el agresor"
                value={relationshipWithAggressor}
                onIonChange={(e) => setRelationshipWithAggressor(e.detail.value!)}
              ></IonTextarea>
            </IonItem>

            {/* Adjuntar pruebas */}
            <IonItem className='form-section'>
              <IonLabel position='stacked'>Adjuntar pruebas (Opcional):</IonLabel>
              <div className='file-upload'>
                <input type="file" onChange={handleFileChange} />
              </div>
              
            </IonItem>

            {/* Botón de envío */}
            <IonButton type="submit" expand="block" fill='clear' className="submit-button">
              Enviar
            </IonButton>
          </form>
        </main>
      </IonContent>
       {/* Usamos tu componente de footer */}
      <Footer/>
    </IonPage>
  );
};
