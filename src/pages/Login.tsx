import React, { useState, useEffect } from 'react';
import { IonContent, IonInputPasswordToggle, IonPage, IonButton, IonInput, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../assets/Login.css';
import logo from '../assets/logos/logoNoBackground.png';
import { useAuthStore } from '../hooks/useAuthStore'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  
  const { startLogin, status, errorMessage: authErrorMessage } = useAuthStore();

  useEffect(() => {
    if (status === 'authenticated') {
      history.push('/');
    }
  }, [status, history]);

  useEffect(() => {
    if (authErrorMessage) {
      setErrorMessage(authErrorMessage);
      setShowAlert(true);
    }
  }, [authErrorMessage]);

  const verificarDatos = () => {
    if (!email || !password) {
      setErrorMessage('Por favor, ingrese su correo electrónico y contraseña.');
      setShowAlert(true);
      return false;
    }
    setShowAlert(false);
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificarDatos()) return;
    try {
      await startLogin({ email, password });
      history.push('/')
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      setErrorMessage('Error al intentar iniciar sesión.');
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-body">
        <div className="login-container">
          <img src={logo} alt='Logo Safe Haven' className="logo" />
          <h2>Ingresar datos</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <IonInput
                label='Correo Electrónico'
                fill='outline'
                labelPlacement='floating'
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                placeholder="Correo Electrónico"
                required
              />
            </div>

            <div className="form-group password-field">
              <IonInput
                label='Contraseña'
                fill='outline'
                labelPlacement='floating'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
              >
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
              </IonInput>
            </div>
            <IonButton type="submit" expand="block" disabled={status === 'checking'}>
              {status === 'checking' ? 'Verificando...' : 'Entrar'}
            </IonButton>
          </form>

          <div className="register-link">
            <p>¿No tienes una cuenta?{' '}
              <span
                style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => history.push('/register')}
              >
                Registrarse
              </span>
            </p>
          </div>
        </div>

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

export default Login;
