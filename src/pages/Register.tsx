import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel, IonAlert, IonDatetime, IonSelect, IonSelectOption, IonCheckbox,IonInputPasswordToggle } from '@ionic/react';
import '../assets/Register.css';

import { useHistory } from 'react-router-dom';




const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  



  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState<string | undefined>();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Validaciones
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !birthdate || !gender) {
      setErrorMessage('Por favor, complete todos los campos.');
      setShowAlert(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      setShowAlert(true);
      return;
    }
    if (!termsAccepted) {
      setErrorMessage('Debe aceptar los términos y condiciones.');
      setShowAlert(true);
      return;
    }
    // Registro de usuario exitoso
  };

  return (
    <IonPage>
      <IonContent className="register-body">
        <div className="register-container">
          <h2>Registro de Usuario</h2>
          <form onSubmit={handleRegister}>
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput value={firstName} onIonChange={(e) => setFirstName(e.detail.value!)} required />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Apellido</IonLabel>
              <IonInput value={lastName} onIonChange={(e) => setLastName(e.detail.value!)} required />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Teléfono</IonLabel>
              <IonInput type="tel" value={phone} onIonChange={(e) => setPhone(e.detail.value!)} required />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Correo Electrónico</IonLabel>
              <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Género</IonLabel>
              <IonSelect value={gender} onIonChange={(e) => setGender(e.detail.value)} interface="action-sheet" placeholder="Selecciona género">
                <IonSelectOption value="male">Masculino</IonSelectOption>
                <IonSelectOption value="female">Femenino</IonSelectOption>
                <IonSelectOption value="other">Otro</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
                <IonLabel position="stacked">Fecha de Nacimiento</IonLabel>
                <IonDatetime
                    value={birthdate}
                    onIonChange={(e) => {
                    const value = e.detail.value;
                    if (Array.isArray(value)) {
                        setBirthdate(value.join(',')); 
                    } else {
                        setBirthdate(value ?? ''); 
                    }
                    }}
                    presentation="date"
                />
            </IonItem>


            <div className="form-group password-field">
      <IonInput
        label='Contraseña'
        fill='solid'
        labelPlacement='floating'
        type={showPassword ? 'text' : 'password'}
        value={password}
        onIonChange={(e) => setPassword(e.detail.value!)}
        required
      >
        <IonInputPasswordToggle 
          slot="end" 
          onClick={() => setShowPassword(!showPassword)} 
        />
      </IonInput>
    </div>
                    <div className="form-group password-field">
                <IonInput
                    label='Confirmar Contraseña'
                    fill='solid'
                    labelPlacement='floating'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                    required
                >
                    <IonInputPasswordToggle
                    slot="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                </IonInput>
                </div>

            <IonItem lines="none">
              <IonCheckbox checked={termsAccepted} onIonChange={(e) => setTermsAccepted(e.detail.checked)} />
              <IonLabel style={{ marginLeft: '10px' }}>Acepto los términos y condiciones</IonLabel>
            </IonItem>

            <button type="submit" className="custom-button">Registrarse</button>

            

          </form>
          <div style={{ marginTop: '20px' }}>
            <p>¿Ya tienes una cuenta? 
              <span 
                style={{ color: '#5C8268', cursor: 'pointer', textDecoration: 'underline' }} 
                onClick={() => history.push('/Login')} 
              >
                Iniciar Sesión
              </span>
            </p>
          </div>
        </div>

        {/* Modal de error */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message={errorMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
