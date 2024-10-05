import React, { useState } from 'react';
import { IonContent,IonInputPasswordToggle, IonPage, IonButton, IonInput, IonItem, IonLabel, IonAlert, IonIcon ,IonRouterLink} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../assets/Login.css';
import logo from '../assets/logos/logoNoBackground.png'

const Login: React.FC = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const verificarDatos = () => {
    if(!email || !password){
      setErrorMessage('Por favor, ingrese su correo electrónico y contraseña.');
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validación básica
    
    if (!email || !password) {
      setErrorMessage('Por favor, ingrese su correo electrónico y contraseña.');
      setShowAlert(true);
      return;
    }
    setEmail("")
    setPassword("")
    // Aquí puedes manejar el envío del formulario, autenticación, etc.
    console.log('Formulario enviado', { email, password });
  };

  const goToRegister = () => {
    history.push('/register');
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
                    label='Correo Electrónico:'
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
              <button onClick={verificarDatos} type="submit">Entrar</button>
            </form>

            <div className="register-link">
            <p>¿No tienes una cuenta?{' '}
            <span 
                style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }} 
                onClick={goToRegister} 
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

export default Login;
