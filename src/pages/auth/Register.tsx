import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonAlert, IonDatetime, IonSelect, IonSelectOption, IonCheckbox, IonInputPasswordToggle, IonItem, IonLabel } from '@ionic/react';
import '../../assets/auth/Register.css';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '../../hooks';

export const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState<string | undefined>(undefined); // Valor inicial
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const { startRegister, status, errorMessage: authErrorMessage } = useAuthStore(); // Usa el hook personalizado

  // Formatear la fecha de nacimiento en formato YYYY-MM-DD
  const formatBirthDate = (date: string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // +1 porque getMonth() devuelve el mes desde 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Retorna en formato YYYY-MM-DD
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(gender)
    // Validaciones
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !birthdate || !gender) {
      setErrorMessage('Por favor, complete todos los campos.');
      setShowAlert(true);
      return;
    }

    console.log('Género seleccionado:', gender); // Agregar esta línea para verificar el valor

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

    // Formatear la fecha de nacimiento antes de enviarla
    const formattedBirthdate = formatBirthDate(birthdate);

    // Llamar al método `startRegister` del hook `useAuthStore`
    try {
      await startRegister({
        email,
        password,
        phone,
        birthday: formattedBirthdate, // Usa la fecha formateada
        gender, // Asegúrate de que sea una cadena
        nombre: firstName,
        apellidos: lastName
      });

      // Si el registro es exitoso, redirigir a la página de login
      if (status === 'authenticated') {
        window.location.href ='/login'
      } else if (authErrorMessage) {
        setErrorMessage(authErrorMessage);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrorMessage('Error al registrar el usuario.');
      setShowAlert(true);
    }
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
              <IonSelect 
                value={gender} 
                onIonChange={(e) => {
                  const selectedGender = e.detail.value;
                  setGender(selectedGender);
                  console.log('Género seleccionado:', selectedGender); // Agrega este log
                }} 
                interface="action-sheet" 
                placeholder="Selecciona género"
              >
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
                  // Asegúrate de que value sea una cadena antes de usar setBirthdate
                  if (typeof value === 'string') {
                    setBirthdate(value); // Si es una cadena, establece el valor
                  } else {
                    setBirthdate(''); // De lo contrario, establece a cadena vacía
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
                <IonInputPasswordToggle slot="end" onClick={() => setShowPassword(!showPassword)} />
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
                <IonInputPasswordToggle slot="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
              </IonInput>
            </div>

            <IonItem lines="none">
              <IonCheckbox checked={termsAccepted} onIonChange={(e) => setTermsAccepted(e.detail.checked)} />
              <IonLabel style={{ marginLeft: '10px' }}>Acepto los términos y condiciones</IonLabel>
            </IonItem>

            <button type="submit" className="custom-button" disabled={status === 'checking'}>
              {status === 'checking' ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <div style={{ marginTop: '20px' }}>
            <p>¿Ya tienes una cuenta? 
              <span 
                style={{ color: '#5C8268', cursor: 'pointer', textDecoration: 'underline' }} 
                onClick={() => window.location.href = '/login'}
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


